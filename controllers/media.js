// forms
const formidable = require("formidable");

//file conversion
const { PDFNet } = require("@pdftron/pdfnet-node");

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
const fetchMediaUtil = require("../utils/fetchMediaUtil.js");

//* ****************************************************************************************
// HELPER FUNCTIONS AND CONTROLLER FOR MEDIA UPLOADS

// write file to bucket
const saveBucket = (res, fileData, DBEntry) => {
  // information about bucket and upload
  const bucketName = "podoju";
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
const saveDBAndBucket = (res, item, fileData) => {
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
      saveBucket(res, fileData, media);
    }
  });
};

// validate media type is acceptable
const validateMediaType = (file) => {
  const type = mime.extension(file.type);
  console.log(type);
  if (
    type !== "jpg" &&
    type !== "png" &&
    type !== "gif" &&
    type !== "jpeg" &&
    type !== "docx" &&
    type !== "pdf" &&
    type !== "pptx" &&
    type !== "xlsx" &&
    type !== "mp4" &&
    type !== "mpga" && // code for mp3
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

const uploadMedia = async (req, res) => {
  await PDFNet.initialize(); //allow us to use PDFNet
  console.log(`id is: ${req.user.id}`);
  const form = new formidable.IncomingForm();
  form.maxFileSize = 15 * 1024 * 1024; // 15 meg
  form
    .parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        sendHelper(res, {
          status: 500,
          msg: "Media upload failed - Error parsing form data",
        });
        PDFNet.shutdown();
        return;
      }
      const validationStatus = validateAll(files.mediafile, fields);
      if (validationStatus !== "valid") {
        console.log(validationStatus.msg);
        sendHelper(res, {status: 400, msg: validationStatus});
        PDFNet.shutdown();
        return;
      }
      console.log("validation success");

      const split = files.mediafile.name.split(".");
      if (split.length != 2){
        sendHelper(res, {status:200, msg: "Media filename did not have exactly 1 period"});
        PDFNet.shutdown();
        return;
      }
        fs.readFile(files.mediafile.path, async (err2, data) => {
          if (err2) {
            sendHelper(res, {
              status: 400,
              msg: "Media upload failed - Error reading file",
            });
            PDFNet.shutdown();
            return;
          }
          if (split[1] == "doc" || split[1] == "docx" || split[1] == "xlsx" || split[1] == "pptx"){
            //const pdfdoc = await PDFNet.PDFDoc.create();
            //await pdfdoc.initSecurityHandler();
            let databuffer = null;
            try {
              console.log(files.mediafile.path);
              databuffer = await PDFNet.Convert.office2PDFBuffer(data); //"https://filesamples.com/samples/document/docx/sample1.docx"
            } catch (e){
              console.log(e);
              console.log("Error converting doc to pdf");
              sendHelper(res, {status: 500, msg: "Error converting doc to pdf"});
              PDFNet.shutdown();
              return;
            }

            let goodBuffer = Buffer.from(databuffer);


            const item = {
              mimeType: 'application/pdf',
              contentCategory: 'application/pdf'.split("/")[0],
              extension: 'pdf',
              creator: req.user.id,
              isPrivate: fields.isPrivate,
              canAccess: [],
              givenFileName: fields.givenFileName,
            };
            PDFNet.shutdown();
            saveDBAndBucket(res, item, goodBuffer);
          }else{
            const item = {
              mimeType: files.mediafile.type,
              contentCategory: files.mediafile.type.split("/")[0],
              extension: mime.extension(files.mediafile.type),
              creator: req.user.id,
              isPrivate: fields.isPrivate,
              canAccess: [],
              givenFileName: fields.givenFileName,
            };
            PDFNet.shutdown();
            saveDBAndBucket(res, item, data);
          }
        });
      })
    .on("error", (err) => {
      console.log(err);
      PDFNet.shutdown();
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

      const mediab64 = await fetchMediaUtil(req.body.mediaID, doc.extension);
      if (!mediab64 || mediab64 === null) {
        sendHelper(res, {
          status: 500,
          msg: "Media retrieval failed - failed to retrieve file from server",
        });
        console.log("Failed to retrieve media from s3 server");
      } else {
        sendHelper(res, {
          status: 200,
          msg: {
            b64media: mediab64,
            extension: doc.extension,
            mimeType: doc.mimeType,
            contentCategory: doc.contentCategory,
          },
        });
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
// CONTROLLER AND HELPER FUNCTIONS FOR UPDATING MEDIA

// ensure update contains relevant fields
const validateUpdate = (update) => {
  if (update.isPrivate === true && update.isPrivate === false) {
    return {
      status: 400,
      msg: "Media update failed - privacy status was not a boolean",
    };
  }

  if (!Array.isArray(update.canAccess)) {
    return {
      status: 400,
      msg: "Media update failed - canAccess list was not a list",
    };
  }

  if (!update.givenFileName) {
    return {
      status: 400,
      msg: "Media update failed - file display name was missing",
    };
  }

  return "success";
};

const performMediaUpdate = (res, id, update, mediaDoc) => {
  const updatedMediaDoc = {
    mimeType: mediaDoc.mimeType,
    contentCategory: mediaDoc.contentCategory,
    extension: mediaDoc.extension,
    creator: mediaDoc.creator,
    isPrivate: update.isPrivate,
    canAccess: update.canAccess,
    givenFileName: update.givenFileName,
  };

  const onUpdateMedia = (err, results) => {
    if (err) {
      // TODO - add specific warnings for invalid field data
      console.log(`Media update failed - error during update: ${err}`);
      sendHelper(res, {
        status: 500,
        msg: "Media update failed - error during update",
      });
    } else {
      console.log(`Media update succeeded: ${results}`);
      sendHelper(res, { status: 201, msg: 'Media update success - updated ${id}'});
    }
  };

  Media.updateOne({ _id: id }, updatedMediaDoc, onUpdateMedia);
};

const updateMediaData = (req, res) => {
  if (!req.body) {
    sendHelper(res, {
      status: 400,
      msg: "Media update failed - no body provided",
    });
    return;
  }

  if (!req.body.id) {
    sendHelper(res, {
      status: 400,
      msg: "Media update failed - request didn't supply media id",
    });
    return;
  }

  if (!req.body.isPrivate) {
    sendHelper(res, {
      status: 400,
      msg: "Media update failed - privacy information was absent",
    });
    return;
  }

  if (!req.body.canAccess) {
    sendHelper(res, {
      status: 400,
      msg: "Media update failed - access information was absent",
    });
    return;
  }

  const update = {
    isPrivate: req.body.isPrivate,
    canAccess: req.body.canAccess,
    givenFileName: req.body.givenFileName,
  };

  const validationStatus = validateUpdate(update);
  if (validationStatus !== "success") {
    console.log("Update validation failed");
    sendHelper(res, validationStatus);
    return;
  }
  console.log("Update validation succeeded");

  // check if user owns the media they want to update
  Media.findById(req.body.id)
    .lean()
    .then((media) => {
      if (req.user.id.toString() !== media.creator.toString()) {
        console.log("Media update failed, requester didn't create the media");
        sendHelper(res, {
          status: 400,
          msg: "Media update failed - requester didn't create the media",
        });
      } else {
        console.log("Attempting to update media");
        performMediaUpdate(res, req.body.id, update, media);
      }
    })
    .catch((err) => {
      console.log(`Media update failed - couldn't find media file: ${err}`);
      sendHelper(res, {
        status: 400,
        msg: "Media update failed - couldn't find media file",
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
module.exports.updateMediaData = updateMediaData;
module.exports.uploadMedia = uploadMedia;
module.exports.serveMedia = serveMedia;
module.exports.deleteMedia = deleteMedia;
