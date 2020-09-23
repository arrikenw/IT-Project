// forms
const formidable = require("formidable");

// fs
const fs = require("fs");

// db
const mongoose = require("mongoose");

const Media = mongoose.model("media");

// AWS
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

// MIME types
const mime = require("mime-types");

// send helper
const sendHelper = (res, response) => {
  res.status(response.status).send(response.msg);
};

// fetch util
const fetchMediaUtil = require("../utils/fetchMediaUtil.js")

//* ****************************************************************************************
// HELPER FUNCTIONS AND CONTROLLER FOR MEDIA UPLOADS

// write file to bucket
const saveBucket = (res, file, fields, fileData, DBEntry) => {
  // information about bucket and upload
  const bucketName = "it-project-media";
  const keyName = `${DBEntry._id.toString()}.${DBEntry.extension}`;

  // writing to bucket
  const params = { Bucket: bucketName, Key: keyName, Body: fileData };
  s3.putObject(params, (err) => {
    if (err) {
      console.log("Upload to bucket failed");
      console.error(err);
      Media.deleteOne(
        { _id: DBEntry._id },
        sendHelper(res, {
          status: 503,
          msg: "Media upload failed - error saving media to file bucket",
        })
      ); // not sure how to handle an error here
      return;
    }
    console.log(
      `Successfully uploaded data to ${bucketName}/${keyName}. Request complete.`
    );
    // creating new object to avoid sending over creation / update timestamps
    const successMsg = {
      _id: DBEntry._id,
      mimeType: DBEntry.mimeType,
      contentCategory: DBEntry.contentCategory,
      extension: DBEntry.extension,
      isPrivate: DBEntry.isPrivate,
      canAccess: DBEntry.canAccess,
      creator: DBEntry.creator,
      givenFileName: DBEntry.givenFileName,
    };
    sendHelper(res, { status: 201, msg: successMsg });
  });
};

// create metadata in database and save file to bucket
const saveDBAndBucket = (res, file, fields, fileData, userId) => {
  const item = {
    mimeType: file.type,
    contentCategory: file.type.split("/")[0],
    extension: mime.extension(file.type),
    creator: userId,
    isPrivate: fields.isPrivate,
    canAccess: [],
    givenFileName: fields.givenFileName,
  };
  console.log(item);
  const newMedia = new Media(item);
  newMedia.save().then((media, err) => {
    if (err) {
      console.log(err);
      sendHelper(res, {
        status: 503,
        msg: "Media upload failed - saving to database failed",
      });
    } else {
      console.log("saving to db succeeded");
      saveBucket(res, file, fields, fileData, media);
    }
  });
};

// validate media type is acceptable
const validateMediaType = (file) => {
  const type = mime.extension(file.type);
  if (
    type !== "jpg" &&
    type !== "png" &&
    type !== "gif" &&
    type !== "jpeg" &&
    type !== "docx" &&
    type !== "pdf" &&
    type !== "ppx" &&
    type !== "xls" &&
    type !== "mp4" &&
    type !== "mp3" &&
    type !== "wav" &&
    type !== "mov" &&
    type !== "txt" &&
    type !== "py" &&
    type !== "c" &&
    type !== "js" &&
    type !== "java"
  )
    return false;
  return true;
};

// ensure media is a reasonable size
const validateMediaSize = (file) => {
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 mb
  if (file.size >= MAX_FILE_SIZE) return false;
  return true;
};

const validateFields = (fields) => {
  if (!fields.isPrivate || !fields.givenFileName) {
    return {
      status: 400,
      msg: "Media upload failed - fields absent or invalid",
    };
  }
  if (fields.givenFileName.length > 20) {
    return {
      status: 400,
      msg: "Media upload failed - file display name is too large",
    };
  }
  return "valid";
};

const validateAll = (file, fields) => {
  if (!file) {
    return { status: 400, msg: "Media upload failed - File was not attached" };
  }
  if (!validateMediaSize(file)) {
    return { status: 400, msg: "Media upload failed - File was too large" };
  }
  if (!validateMediaType(file)) {
    // unsure if 415 is appropriate here
    return {
      status: 400,
      msg: "Media upload failed - File type is unsupported",
    };
  }
  return validateFields(fields);
};

const uploadMedia = (req, res) => {
  console.log(`id is: ${req.user.id}`);
  const form = new formidable.IncomingForm();
  form.maxFileSize = 15 * 1024 * 1024; // 15 meg
  form
    .parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        sendHelper(res, {
          status: 500,
          msg: "Media upload failed - Error parsing form data",
        });
        return;
      }
      const validationStatus = validateAll(files.mediafile, fields);
      if (validationStatus !== "valid") {
        console.log(validationStatus.msg);
        sendHelper(res, validationStatus);
        return;
      }
      console.log("validation success");
      fs.readFile(files.mediafile.path, (err2, data) => {
        if (err2) {
          sendHelper(res, {
            status: 400,
            msg: "Media upload failed - Error reading file",
          });
          return;
        }
        saveDBAndBucket(res, files.mediafile, fields, data, req.user.id);
      });
    })
    .on("error", (err) => {
      console.log(err);
      sendHelper(res, {
        status: 500,
        msg: "Media upload failed - Unknown error while parsing form",
      });
    });
};

//* ****************************************************************************************
// CONTROLLER FOR SERVING MEDIA
const serveMedia = async (req, res) => {
  if (!req.body.mediaID) {
    console.log("no media id provided");
    sendHelper(res, {
      status: 400,
      msg: "Media retrieval failed - No media id provided",
    });
    return;
  }

  // check if media can be accessed by user
  console.log("getting media metadata");
  Media.findById(req.body.mediaID)
    .lean()
    .then(async (doc) => {
      console.log("checking if user has access to media");
      if (
        doc.creator.toString() !== req.user.id.toString() &&
        doc.isPrivate !== false &&
        !doc.canAccess.includes(mongoose.Types.ObjectId(req.user.id))
      ) {
        console.log("user does not have permission to view media");
        sendHelper(res, {
          status: 401,
          msg:
            "Media retrieval failed - user does not have permission to view media",
        });
        return;
      }

      let mediab64 = await fetchMediaUtil(req.body.mediaID, doc.extension);
      if (!mediab64 || mediab64 === null){
        sendHelper(res, {status: 500, msg: "Media retrieval failed - failed to retrieve file from server"});
        console.log("Failed to retrieve media from s3 server");
      }else{
        sendHelper(res, { status: 200, msg: { b64media: mediab64, extension: doc.extension, mimeType: doc.mimeType } });
        console.log("Successfully returned file, request complete.");
      }
      })
    .catch((err) => {
      console.log(err);
      sendHelper(res, {
        status: 503,
        msg:
          "Media retrieval failed - error retrieving media information from database",
      });
    });
};

//* ****************************************************************************************
// CONTROLLER AND HELPER FUNCTIONS FOR DELETING MEDIA

const deleteMongo = (res, id) => {
  Media.findByIdAndDelete(id, (err, doc) => {
    console.log(`deleted mongo ${doc}`);
    if (err) {
      console.log(err);
      sendHelper(res, {
        status: 500,
        msg: "Media deletion failed - error deleting media",
      });
    } else {
      sendHelper(res, {
        status: 200,
        msg: `Media deletion success - deleted ${id}`,
      });
    }
  });
};

const deleteS3AndMongo = (res, id, extension) => {
  const filepath = `${id}.${extension}`;
  const bucketName = "it-project-media";
  const params = { Bucket: bucketName, Key: filepath };
  s3.deleteObject(params, (err, data) => {
    console.log(`deleted s3 ${data}`);
    if (err) {
      console.log(err);
      sendHelper(res, {
        status: 500,
        msg: "Media deletion failed - error deleting media from s3 bucket",
      });
    } else {
      console.log("media deletion succeeded");
      deleteMongo(res, id);
    }
  });
};

const deleteMedia = (req, res) => {
  if (!req.body.mediaID) {
    console.log("no media id provided");
    sendHelper(res, {
      status: 400,
      msg: "Media deletion failed - No media id provided",
    });
    return;
  }

  // check if media can be deleted by user
  console.log("getting media metadata");
  Media.findById(req.body.mediaID)
    .lean()
    .then((doc) => {
      console.log("checking if user created media");
      if (doc.creator.toString() !== req.user.id.toString()) {
        console.log("user does not have permission to delete media");
        sendHelper(res, {
          status: 401,
          msg:
            "Media deletion failed - user does not have permission to delete media",
        });
      } else {
        deleteS3AndMongo(res, req.body.mediaID, doc.extension);
      }
    })
    .catch((err) => {
      console.log(err);
      sendHelper(res, {
        status: 503,
        msg: "Media deletion failed - error deleting media",
      });
    });
};

// exports
module.exports.uploadMedia = uploadMedia;
module.exports.serveMedia = serveMedia;
module.exports.deleteMedia = deleteMedia;
