//forms
const formidable = require('formidable');

//db
const mongoose = require('mongoose');
const Media = mongoose.model('media');
const User = mongoose.model('users');

// Load the SDK and AWS client
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Bucket data

const uploadMedia = function(file, fields, user){
    //bucket data
    const bucketName = 'it-project-media';
    const keyName = user + '/' + file.name;

    //writing to bucket
    const params = {Bucket: bucketName, Key: keyName, Body: file.body}; //idk if it is file.body, file.data etc.
    s3.putObject(params, function(err, data) {

        //check upload success
        if (err) return err
        console.log("Successfully uploaded data to " + bucketName + '/' + keyName);

        //put info about uploaded file into the database
        const item = {
            mediaType: file.type.split('/')[0],
            mediaURL: data.TODO, //TODO FIGURE OUT WHAT THE BUCKET RETURNS
            tags: fields.tags,
            creator: user._id,
            isPrivate: fields.isPrivate,
            canAccess: fields.canAccess
        }
        console.log(item);
        const newmedia =new Media(item);
        newmedia.save()
            .then(function (media, err){
                if (err){
                    //TODO SEND TO USER
                    return err;
                }
                else{
                    //TODO SEND TO USER
                    console.log(media);
                }
            })
            .catch(function (err){
                //TODO SEND TO USER
                //TODO HANDLE DB ISSUES
                return err;
            });
        console.log(data);
    });
    return 'SUCCESS';
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
        return 'ERROR. File was too large';
    }
    if (!validateMediaType(file)){
        return 'ERROR. File type is unsupported';
    }
    fieldStatus = validateFields(fields);
    return fieldStatus;
}

const handleMediaUpload = (req) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 15 * 1024 * 1024; //15 meg
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return false;
        }
        const validationStatus = validateAll(files[0], fields);
        if (validationStatus != 'SUCCESS'){
            //TODO send message to user
            return validationStatus;
        }
        console.log('validation success');
        const uploadStatus = uploadMedia(file, fields, user);
        if (uploadStatus != 'SUCCESS'){
            //TODO send message to user
            return uploadStatus;
        }
    })
    .catch('error', function (err){
            console.log(err)
    });
    return;
}

