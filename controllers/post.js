const mongoose = require("mongoose");

const PostModel = mongoose.model("posts");

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
  if (req.body.id) {
    query.$and.push({ _id: req.body.id });
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
    console.log(`getUser not successful: ${err.message}`);
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
  res.send("not finished");
};

const addPost = (req, res) => {
  if (!req.body.title) {
    console.log("addPost not successful: missing forum attributes");
    res.status(400);
    res.send("Add post not successful - missing forum attributes");
    return;
  }

  const payload = { title: req.body.title, userID: req.user.id };
  if (req.body.description) {
    payload.description = req.body.description;
  }
  if (req.body.private) {
    payload.private = req.body.private;
  }

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

  const data = new PostModel(payload);
  data.save(onPostSave);
};

const updatePost = (req, res) => {
  res.send("not finished");
};

const deletePost = (req, res) => {
  res.send("not finished");
};

const likePost = (req, res) => {
  res.send("not finished");
};

const unlikePost = (req, res) => {
  res.send("not finished");
};

module.exports.getPost = getPost;
module.exports.getPublicPost = getPublicPost;
module.exports.addPost = addPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.likePost = likePost;
module.exports.unlikePost = unlikePost;
