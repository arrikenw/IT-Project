const mongoose = require("mongoose");

const PostModel = mongoose.model("posts");
const Media = mongoose.model("media");

const getPost = (req, res) => {
  const user = req.user.id;

  const query = {};
  query.$and = [];
  // search for public posts or posts that belong to the user
  query.$and.push({ $or: [{ private: false }, { userID: user }] });

  // if request has search term, search the post titles and descriptions for it
  if (req.body.search) {
    query.$and.push({
      $or: [
        { title: { $regex: req.body.search } },
        { description: { $regex: req.body.search } },
      ],
    });
  }

  // if request searches for specific post by id, add it to the request
  if (req.body.filters) {
    query.$and.push(req.body.filters);
  }

  // use given limit amount, otherwise use default value
  let limit = 10;
  if (req.body.limit) {
    limit = req.body.limit;
  }

  // use given skip amount, otherwise use default value
  let skip = 0;
  if (req.body.skip) {
    skip = req.body.skip;
  }

  // use given sort field, otherwise use default value
  let sortField = "createdAt";
  if (req.body.sortField) {
    sortField = req.body.sortField;
  }

  // use given sort direction, otherwise use default value
  let sortDirection = "desc";
  if (req.body.sortDirection) {
    sortDirection = req.body.sortDirection;
  }

  const onResult = (result) => {
    console.log(`getPost successful: found ${result.length} posts`);
    res.status(200);
    res.send(result);
  };

  const onError = (err) => {
    console.log(`getPost not successful: ${err.message}`);
    res.status(500);
    res.send("Get post not successful- something went wrong, try again");
  };

  const sort = {};
  sort[sortField] = sortDirection;
  PostModel.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .then(onResult)
    .catch(onError);
};

const getPublicPost = (req, res) => {
  const query = {};
  query.$and = [];
  // search for public posts or posts that belong to the user
  query.$and.push({ private: false });

  // if request has search term, search the post titles and descriptions for it
  if (req.body.search) {
    query.$and.push({
      $or: [
        { title: { $regex: req.body.search } },
        { description: { $regex: req.body.search } },
      ],
    });
  }

  // if request searches for specific post by id, add it to the request
  if (req.body.filters) {
    query.$and.push(req.body.filters);
  }

  // use given limit amount, otherwise use default value
  let limit = 10;
  if (req.body.limit) {
    limit = req.body.limit;
  }

  // use given skip amount, otherwise use default value
  let skip = 0;
  if (req.body.skip) {
    skip = req.body.skip;
  }

  // use given sort field, otherwise use default value
  let sortField = "createdAt";
  if (req.body.sortField) {
    sortField = req.body.sortField;
  }

  // use given sort direction, otherwise use default value
  let sortDirection = "desc";
  if (req.body.sortDirection) {
    sortDirection = req.body.sortDirection;
  }

  const onResult = (result) => {
    console.log(`getPublicPost successful: found ${result.length} posts`);
    res.status(200);
    res.send(result);
  };

  const onError = (err) => {
    console.log(`getPublicPost not successful: ${err.message}`);
    res.status(500);
    res.send("Get public post not successful- something went wrong, try again");
  };

  const sort = {};
  sort[sortField] = sortDirection;
  PostModel.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .then(onResult)
    .catch(onError);
};


//done and dusted :cool:
const addPost = (req, res) => {

  const onPostSave = (err, newPost) => {
    // catch different errors
    if (err) {
      if (err.message.startsWith("error name")) {
        console.log(
            "addPost not successful: email address already has an account"
        );
        res.status(400);
        res.send(
            "Add Post not successful - email address already has an account"
        );
        return;
      }
      // TODO Handle different errors

      res.status(500);
      console.log(`addUser not successful: ${err.message}`);
      res.send("Add post not successful - something went wrong, try again");
      return;
    }
    console.log(`addPost successful: ${newPost._id}`);
    res.status(201);
    res.send({ id: newPost._id });
  };

  const setThumbHelper = (req, payload) => {
    if (!req.body.thumbnailURL){
      let videoThumb = "5f736f876b93c95300af61e0";
      let audioThumb = "5f736fae6b93c95300af61e1";
      let imageThumb = "5f736fdd6b93c95300af61e2";
      let textThumb = "5f7370026b93c95300af61e3";
      let applicationThumb = "5f7370156b93c95300af61e4";
      switch (payload.contentCategory) {
        case "video":
          payload.thumbnailURL = videoThumb;
          break;
        case "image":
          payload.thumbnailURL = imageThumb;
          break;
        case "audio":
          payload.thumbnailURL = audioThumb;
          break;
        case "text":
          payload.thumbnailURL = textThumb;
          break;
        case "application":
          payload.thumbnailURL = applicationThumb;
          break;
      }
    }
    else{
      payload.thumbnailURL = req.body.thumbnailURL;
    }

    if (req.body.private) {
      payload.private = req.body.private;
    }

    return payload;
  }

  if (!req.body.title){
    console.log("addPost not successful: missing post title");
    res.status(400);
    res.send("Add post not successful - missing post attributes");
    return;
  }
  if (!req.body.mediaID){
    console.log("addPost not successful: missing post media");
    res.status(400);
    res.send("Add post not successful - missing post media");
  }

  Media.findById(req.body.mediaID)
      .lean()
      .then((doc) => {
        console.log("checking if user has access to media");
        if (
            doc.creator.toString() !== req.user.id.toString() &&
            doc.isPrivate !== false &&
            !doc.canAccess.includes(mongoose.Types.ObjectId(req.user.id))
        ) {
          console.log("Poster does not have access permissions for media in their post\"");
          sendHelper(res, {
            status: 401,
            msg:
                "Add post was not successful - user does not have access permissions for media in their post",
          });
          return;
        }else{
          //build payload and set content category
          const payload = { title: req.body.title, userID: req.user.id, mediaID: req.body.mediaID};
          if (req.body.description) {
            payload.description = req.body.description;
          }
          payload.contentCategory = doc.contentCategory;
          setThumbHelper(req, payload);
          console.log("Finished building payload");
          const data = new PostModel(payload);
          data.save(onPostSave);

        }
      })
      .catch((err) => {
        console.log(err);
        sendHelper(res, {
          status: 503,
          msg:
              "Add post was not successful - error checking media information in database",
        });
      });
};

const updatePost = (req, res) => {
  const { userID } = req.user;
  const postID = req.body.postID;
  const update = JSON.parse(JSON.stringify(req.body.update));

  const onUpdatePost = (err, results) => {
    if (err) {
      console.log(`updatePost not successful: ${err.message}`);
      res.status(500);
      res.send("update not successful - something went wrong, try again");
      return;
    }
    if (results.n === 1) {
      console.log(`updatePost successful: updated post ${postID}`);
      res.status(200);
      res.send({ postID });
      return;
    }
    console.log(`updatePost not successful: could not find post ${postID}`);
    res.status(400);
    res.send(`update not successful - could not find post ${postID}`);
  };

  PostModel.updateOne({ _id: postID, userID }, update, onUpdatePost());
};

const deletePost = (req, res) => {
  const { userID } = req.user;
  const postID = req.body.postID;

  const onDeletePost = (err, results) => {
    if (err) {
      console.log(`deletePost not successful: ${err.message}`);
      res.status(500);
      res.send("delete not successful - something went wrong, try again");
      return;
    }
    if (results.n === 1) {
      console.log(`deletePost successful: updated post ${postID}`);
      res.status(200);
      res.send({ postID });
      return;
    }
    console.log(`deletePost not successful: could not find post ${postID}`);
    res.status(400);
    res.send(`delete not successful - could not find post ${postID}`);
  };

  PostModel.deleteOne({ _id: postID, userID }, onDeletePost());
};

const likePost = (req, res) => {
  const { userID } = req.user;
  const postID = req.body.postID;

  const onLikePost = (err, results) => {
    if (err) {
      console.log(`likePost not successful: ${err.message}`);
      res.status(500);
      res.send("like not successful - something went wrong, try again");
      return;
    }
    if (results.n === 1) {
      console.log(`likePost successful: updated post ${postID}`);
      res.status(200);
      res.send({ postID });
      return;
    }
    console.log(`likePost not successful: could not find post ${postID}`);
    res.status(400);
    res.send(`like not successful - could not find post ${postID}`);
  };

  PostModel.updateOne(
    { _id: postID },
    { $addToSet: { likedBy: userID } },
    onLikePost
  );
};

const unlikePost = (req, res) => {
  const { userID } = req.user;
  const postID = req.body.postID;

  const onUnlikePost = (err, results) => {
    if (err) {
      console.log(`unlikePost not successful: ${err.message}`);
      res.status(500);
      res.send("unlike not successful - something went wrong, try again");
      return;
    }
    if (results.n === 1) {
      console.log(`unlikePost successful: updated post ${postID}`);
      res.status(200);
      res.send({ postID });
      return;
    }
    console.log(`unlikePost not successful: could not find post ${postID}`);
    res.status(400);
    res.send(`unlike not successful - could not find post ${postID}`);
  };

  PostModel.updateOne(
    { _id: postID },
    { $pull: { likedBy: userID } },
    onUnlikePost
  );
};

module.exports.getPost = getPost;
module.exports.getPublicPost = getPublicPost;
module.exports.addPost = addPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.likePost = likePost;
module.exports.unlikePost = unlikePost;
