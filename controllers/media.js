//forms
const formidable = require('formidable');

//fs
var fs = require('fs');

//db
const mongoose = require('mongoose');
const Media = mongoose.model('media');
const User = mongoose.model('users');

// Load the SDK and AWS client
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

//send helper
const sendhelper = function(res, response){
    res.status = response.status;
    res.send(response.msg);
}


//*****************************************************************************************
//HELPER FUNCTIONS AND CONTROLLER FOR MEDIA UPLOADS


//create metadata in database and save file to bucket
const saveDBAndBucket = function(res, file, fields, filedata, userid){
    const item = {
        mediaType: file.type.split('/')[0],
        extension: file.type.split('/').pop(),
        creator: userid,
        isPrivate: fields.isPrivate,
        canAccess: [],
        name: fields.name
    }
    console.log(item);
    const newmedia = new Media(item);
    newmedia.save()
        .then(function (media, err){
            if (err){
                console.log("saving to db failed");
                sendhelper(res, {status:503, msg:err});
            }
            else{
                console.log("saving to db succeeded");
                saveBucket(res, file, fields, filedata, media);
                return;
            }
        });
}


//write file to bucket
const saveBucket = function(res, file, fields, filedata, DBEntry){
    //information about bucket and upload
    const bucketName = 'it-project-media';
    const keyName = DBEntry._id.toString() + '.' + DBEntry.extension;

    //writing to bucket
    const params = {Bucket: bucketName, Key: keyName, Body: filedata};
    s3.putObject(params, function(err, data) {
        if (err){
            console.log("Upload to bucket failed");
            console.error(err);
            Media.deleteOne({ _id: DBEntry._id }, sendhelper(res, {status:503, msg:"upload failed"})); //not sure how to handle an error here
            return;
        }
        console.log("Successfully uploaded data to " + bucketName + '/' + keyName + ". Request complete.");
        sendhelper(res, {status:200 ,msg:DBEntry.toString()});
        return;
    });
}


//validate media type is acceptable
const validateMediaType = function(file){
    type = file.type.split('/').pop();
    if (type != 'jpg' && type != 'png' && type != 'gif' && type != 'jpeg'
        && type != 'docx' && type != 'pdf' && type != 'ppx' && type != 'xls'
        && type != 'mp4' && type != 'mp3' && type != 'wav' && type != 'mov'
        && type != 'txt' && type != 'py' && type != 'c' && type != 'js' && type != 'java') return false;
    return true;
}

//ensure media is a reasonable size
const validateMediaSize = function (file){
    const MAX_FILE_SIZE = 100 * 1024 * 1024; //100 mb
    if (file.size >= MAX_FILE_SIZE) return false;
    return true;
}


const validateFields = function(fields){
    //TODO
    return 'SUCCESS';
}

const validateAll = function(file, fields){
    if (!validateMediaSize(file)){
        return {status: 400, msg:'File was too large'};
    }
    if (!validateMediaType(file)){
        return {status: 415, msg:'File type is unsupported'};
    }
    fieldStatus = validateFields(fields);
    return fieldStatus;
}


const uploadMedia = function(req, res, next){
    console.log("id is: " +req.user.id);
    const form = new formidable.IncomingForm();
    form.maxFileSize = 15 * 1024 * 1024; //15 meg
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            sendhelper(res,{status:500, msg:'Error parsing form data'});
            return;
        }
        const validationStatus = validateAll(files.mediafile, fields);
        if (validationStatus != 'SUCCESS'){
            console.log(validationStatus);
            sendhelper(res, validationStatus);
            return;
        }
        console.log('validation success');
        fs.readFile(files.mediafile.path, function(err, data){
            if (err){
                sendhelper(res, {status:400, msg: 'Error reading file'});
                return;
            }
            saveDBAndBucket(res, files.mediafile, fields, data, req.user.id);
        });
    })
    .on('error', function (err){
            console.log(err);
            res.status = 500;
            res.send("Unknown error when parsing form");
    });
}



//*****************************************************************************************
//CONTROLLER FOR SERVING MEDIA
const serveMedia = function(req, res, next){
    if (!req.body.mediaID) {
        console.log('no media id provided');
        sendhelper(res, {status:400, msg:'No media id provided'});
        return;
    }

    //check if media can be accessed by user
    console.log('getting media metadata');
    Media.findById(req.body.mediaID)
        .lean()
        .then((doc)=> {
            console.log('checking if user has access to media');
            if (doc.creator !== req.user.id
                && doc.isPrivate !== false
                && doc.canAccess.includes(req.user.id)){
                console.log('user does not have permission to view media')
                sendhelper(res, {status:401, msg: 'user does not have permission to view media'});
                return;
            }
            //fetch media from file server
            console.log('fetching media');
            const filepath = req.body.mediaID+'.'+doc.extension;
            const bucketName = 'it-project-media';
            const params = {Bucket: bucketName, Key: filepath};

            s3.getObject(params, function(err, data){
                if (err){
                    console.log(err);
                    sendhelper(res, {status: 500, msg: 'Error retrieving file'});
                    return;
                }
                console.log('serving media');
                //serve media to user.
                //I don't think converting here is necessary as it wastes server time, but I've included it to make it easier to check responses
                //code retrieved from https://stackoverflow.com/questions/23097928/node-js-throws-btoa-is-not-defined-error
                const base64form = Buffer.from(data.Body, 'binary').toString('base64');
                sendhelper(res, {status: 200, msg: base64form});
                console.log('Successfully returned file, request complete.')
            });
        })
        .catch((err) =>{
            console.log(err);
            sendhelper(res, {status: 503, msg: 'unknown error'});
        });
};






//exports
module.exports.uploadMedia = uploadMedia;
module.exports.serveMedia = serveMedia;