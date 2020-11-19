/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require("supertest");
const app = require("../../app");
const database = require("../../models");

// send helper
const sendHelper = (res, response) => {
  res.status(response.status).send(response.msg);
};

const getUserToken = async () => {
  const payloadAdd = {
    email: "test@email.com",
    password: "testing123",
    firstName: "firstTest",
    lastName: "lastTest",
    userName: "user22Test",
  };
  const payloadLogin = {
    email: "test@email.com",
    password: "testing123",
  };
  await database.clearCollections();
  await request(app).post("/api/user/add").send(payloadAdd);
  const response = await request(app)
    .post("/api/user/login")
    .send(payloadLogin);
  return `Bearer ${response.body.token}`;
};

const getPostID = async (token) => {
  const mediaResponse = await request(app)
    .post("/api/media/add")
    .set("Authorization", token)
    .set("Content-Type", "multipart/form-data")
    .field("isPrivate", false)
    .field("givenFileName", "test txt")
    .attach("mediafile", "./test/resources/test.png");

  const payload = {
    title: "Test post title",
    description: "test post description",
    mediaID: mediaResponse.body._id,
    private: true,
  };

  const response = await request(app)
    .post("/api/post/add")
    .send(payload)
    .set("Authorization", token);
  return response.body.id;
};

const getMediaID = async (token) => {
  const response = await request(app)
    .post("/api/media/add")
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "multipart/form-data")
    .field("isPrivate", false)
    .field("givenFileName", "test txt")
    .attach("mediafile", "./test/resources/test.png");

  return response.body._id;
};

// 1
describe("test /api/post/add route and the addPost controller", () => {
  let token;
  let mediaID;
  // clear database before each test
  beforeEach(async () => {
    await database.clearCollections();
    token = await getUserToken();
    // mediaID = await getMediaID();
  });

  // 1.1
  test("addPost with valid inputs", async (done) => {
    console.log(token);

    const mediaResponse = await request(app)
      .post("/api/media/add")
      .set("Authorization", token)
      .set("Content-Type", "multipart/form-data")
      .field("isPrivate", false)
      .field("givenFileName", "test txt")
      .attach("mediafile", "./test/resources/test.png");
    const payload = {
      title: "Test post title",
      description: "test post description",
      mediaID: mediaResponse.body._id,
      private: true,
    };

    const response = await request(app)
      .post("/api/post/add")
      .send(payload)
      .set("Authorization", token);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    done();
  });
});

// 2
describe("test /api/post/get route and the getPost controller", () => {
  let token;
  let postID;
  // clear database before each test
  beforeEach(async () => {
    await database.clearCollections();
    token = await getUserToken();
    postID = await getPostID(token);
  });

  // 2.1
  test("getPost with valid inputs", async (done) => {
    const payload = {
      search: "Test post title",
      filters: { _id: postID },
      limit: 1,
      skip: 0,
      sortField: "createdAt",
      sortDirection: "desc",
    };
    const response = await request(app)
      .post("/api/post/get")
      .send(payload)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("_id", postID);
    expect(response.body[0]).toHaveProperty("title", "Test post title");
    expect(response.body[0]).toHaveProperty(
      "description",
      "test post description"
    );
    expect(response.body[0]).toHaveProperty("private", true);
    done();
  });
});

// 3
describe("test /api/post/update route and updatePost controller", () => {
  let token;
  let postID;
  // clear database before each test
  beforeEach(async () => {
    await database.clearCollections();
    token = await getUserToken();
    postID = await getPostID(token);
  });

  // 3.1
  test("updatePost with valid inputs", async (done) => {
    const payload = {
      update: {
        title: "updated title",
      },
      postID,
    };
    const response = await request(app)
      .post("/api/post/update")
      .send(payload)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body.postID).toMatch(/[a-z0-9]{24}/);
    done();
  });
});

// 4
describe("test /api/comment/add route and addComment controller", () => {
  let token;
  let postID;
  // clear database before each test
  beforeEach(async () => {
    await database.clearCollections();
    token = await getUserToken();
    postID = await getPostID(token);
  });

  // 4.1
  test("addComment with valid inputs", async (done) => {
    const payload = {
      postID,
      comment: "Test comment",
    };
    const response = await request(app)
      .post("/api/comment/add")
      .send(payload)
      .set("Authorization", token);
    expect(response.status).toBe(201);
    done();
  });
});

afterAll((done) => {
  database.disconnectDB();
  done();
});
