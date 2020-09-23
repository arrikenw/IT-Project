// AWS
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

// fetch media from file server
const fetchMediaUtil = async (mediaID, extension) => {
  console.log("fetching1 media");
  const filepath = `${mediaID}.${extension}`;
  console.log(filepath);
  const bucketName = "it-project-media";
  const params = { Bucket: bucketName, Key: filepath };
  let retVal;

  try {
    retVal = await s3.getObject(params).promise();
  } catch (e) {
    console.log(`File retrieval failed: ${e}`);
    return null;
  }
  // code retrieved from https://stackoverflow.com/questions/23097928/node-js-throws-btoa-is-not-defined-error
  if (retVal) {
    console.log("Retrieved file");
    return Buffer.from(retVal.Body, "binary").toString("base64");
  }
  console.log("Error retrieving file");
  return null;
};

module.exports = fetchMediaUtil;
