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
describe("test /api/comment/add route and the getPost controller", () => {
  let token;
  let postID;
  // clear database before each test
  beforeEach(async () => {
    await database.clearCollections();
    token = await getUserToken();
    postID = await getPostID(token);
  });

  // 1.1
  test("add a comment with valid inputs", async (done) => {
    const payload = {
      postID,
      comment: "test comment",
    };

    const response = await request(app)
      .post("/api/comment/add")
      .send(payload)
      .set("Authorization", token);
    expect(response.status).toBe(201);
    done();
    /* const payload2 = {
      filters: { _id: postID },
    };

    const response2 = await request(app)
      .post("/api/post/get")
      .send(payload)
      .set("Authorization", token);
    expect(response2.status).toBe(200);
    expect(response2.body[0].comments[0].comment).toBe("test comment");
    done(); */
  });
});

afterAll((done) => {
  database.disconnectDB();
  done();
});
