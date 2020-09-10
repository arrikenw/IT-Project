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
  res.status = response.status;
  res.send(response.msg);
};
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
        console.log("validation failure");
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
const serveMedia = (req, res) => {
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
    .then((doc) => {
      console.log("checking if user has access to media");
      if (
        doc.creator !== req.user.id &&
        doc.isPrivate !== false &&
        doc.canAccess.includes(req.user.id)
      ) {
        console.log("user does not have permission to view media");
        sendHelper(res, {
          status: 401,
          msg:
            "Media retrieval failed - user does not have permission to view media",
        });
        return;
      }
      // fetch media from file server
      console.log("fetching media");
      const filepath = `${req.body.mediaID}.${doc.extension}`;
      const bucketName = "it-project-media";
      const params = { Bucket: bucketName, Key: filepath };

      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err);
          sendHelper(res, {
            status: 500,
            msg:
              "Media retrieval failed - error retrieving media from s3 bucket",
          });
          return;
        }
        console.log("serving media");
        // serve media to user.
        // I don't think converting here is necessary as it wastes server time, but I've included it to make it easier to check responses
        // code retrieved from https://stackoverflow.com/questions/23097928/node-js-throws-btoa-is-not-defined-error
        const base64form = Buffer.from(data.Body, "binary").toString("base64");
        sendHelper(res, { status: 200, msg: base64form });
        console.log("Successfully returned file, request complete.");
      });
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

// exports
module.exports.uploadMedia = uploadMedia;
module.exports.serveMedia = serveMedia;
