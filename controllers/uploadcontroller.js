//forms
const formidable = require('formidable');

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


//put info about uploaded file into the database
const dbSaveMetadata = function(file, fields, user, resourceurl){
    const item = {
        mediaType: file.type.split('/')[0],
        mediaURL: resourceurl,
        tags: fields.tags,
        creator: user._id,
        isPrivate: fields.isPrivate,
        canAccess: fields.canAccess
    }
    const newmedia = new Media(item);
    newmedia.save()
        .then(function (media, err){
            if (err){
                console.log("saving to db failed")
                sendhelper({status:503, msg:err});
            }
            else{
                console.log(media);
                sendhelper({status:200, msg:media});
            }
        });
}


const uploadMedia = function(file, fields, user){
    //information about bucket and upload
    const bucketName = 'it-project-media';
    const keyName = user + '/' + file.name; //TODO check for key collisions
    const baseurl = 'https://it-project-media.s3-ap-southeast-2.amazonaws.com/'

    //actual resource url
    const resourceurl = baseurl + keyName;

    //writing to bucket
    const params = {Bucket: bucketName, Key: keyName, Body: file.body}; //idk if it is file.body, file.data etc.
    s3.putObject(params, function(err, data) {
        //check upload success
        if (err){
            console.log("Upload to bucket failed");
            sendhelper({status:503, msg:"upload failed"});
        }
        console.log("Successfully uploaded data to " + bucketName + '/' + keyName);
        dbSaveMetadata(file, fields, user, resourceurl);
    });
}


const validateMediaType = function(file){
    type = file.type.split('/').pop();
    if (type != 'jpg' && type != 'png' && type != 'gif' && type != 'jpeg'
        && type != 'docx' && type != 'pdf' && type != 'ppx' && type != 'xls'
        && type != 'mp4' && type != 'mp3' && type != 'wav' && type != 'mov'
        && type != 'txt' && type != 'py' && type != 'c' && type != 'js' && type != 'java') return false;
    return true;
}

const validateMediaSize = function (file){
    const MAX_FILE_SIZE = 200 * 1024 * 1024; //200 mb
    if (file.size >= MAX_FILE_SIZE) return false;
    return true;
}

const validateFields = function(fields){
    //TODO
    return 'SUCCESS';
}

const validateAll = function(file){
    if (!validateMediaSize(file)){
        return {status: 400, msg:'ERROR. File was too large'};
    }
    if (!validateMediaType(file)){
        return {status: 415, msg:'ERROR. File type is unsupported'};
    }
    fieldStatus = validateFields(fields);
    return fieldStatus;
}

const handleMediaUpload = function(req, res){
    const form = new formidable.IncomingForm();
    form.maxFileSize = 15 * 1024 * 1024; //15 meg
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            sendhelper(res,{status:500, msg:"ERROR. Form data could not be parsed"});
            return;
        }
        const validationStatus = validateAll(files[0], fields);
        if (validationStatus != 'SUCCESS'){
            console.log(validationStatus);
            sendhelper(validationStatus);
            return;
        }
        console.log('validation success');
        uploadMedia(file, fields, user);
    })
    .catch('error', function (err){
            console.log(err);
            res.status = 500;
            res.send("Unknown error when parsing form");
    });
}

