const request = require("supertest");
const app = require("../../app");
const database = require("../../models");
const fs = require("fs").promises;

// addMedia testing
describe("test POST /api/media/add route and the addMedia controller", () => {
  // clear database before each test
  let token;
  beforeAll(async () => {
    const payload = {
      email: "test@email.com",
      password: "testing123",
      firstName: "firstTest",
      lastName: "lastTest",
      userName: "user22Test",
    };
    const lpayload = {
      email: "test@email.com",
      password: "testing123",
    };
    await database.clearCollections();
    await request(app).post("/api/user/add").send(payload);
    const lresponse = await request(app).post("/api/user/login").send(lpayload);
    token = lresponse.body.token;
    return true;
  });

  test("addMedia with valid inputs ", async (done) => {
    const response = await request(app)
      .post("/api/media/add")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("isPrivate", false)
      .field("givenFileName", "my file 123")
      .attach("mediafile", "./test/resources/test.png");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");

    // delete from s3 file server after test
    const deleteResponse = await request(app)
      .post("/api/media/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ mediaID: response.body._id });
    done();
  });
});

describe("test POST /api/media/ route and the serveMedia controller", () => {
  // clear database before each test
  let token;
  beforeAll(async () => {
    const payload = {
      email: "test@email.com",
      password: "testing123",
      firstName: "firstTest",
      lastName: "lastTest",
      userName: "user22Test",
    };
    const lpayload = {
      email: "test@email.com",
      password: "testing123",
    };
    await database.clearCollections();
    await request(app).post("/api/user/add").send(payload);
    const lresponse = await request(app).post("/api/user/login").send(lpayload);
    token = lresponse.body.token;
    return true;
  });

  test("retrieveMedia with valid inputs", async (done) => {
    const response = await request(app)
      .post("/api/media/add")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("isPrivate", false)
      .field("givenFileName", "test txt")
      .attach("mediafile", "./test/resources/test.png");

    const payload = {
      mediaID: response.body._id,
    };
    const retrieveResponse = await request(app)
      .post("/api/media/")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    const buffer = new Buffer(retrieveResponse.body.b64media, "base64");
    expect(retrieveResponse.status).toBe(200);

    // delete from s3 file server after test
    const deleteResponse = await request(app)
      .post("/api/media/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ mediaID: response.body._id });
    done();
  });

  // test with incorrect inputs
  test("retrieveMedia with missing media id", async (done) => {
    const response = await request(app)
      .post("/api/media/add")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("isPrivate", false)
      .field("givenFileName", "test txt")
      .attach("mediafile", "./test/resources/test.png");

    const payload2 = {};
    const retrieveResponse = await request(app)
      .post("/api/media/")
      .set("Authorization", `Bearer ${token}`)
      .send(payload2);

    expect(retrieveResponse.status).toBe(400);
    expect(retrieveResponse.text).toBe(
      "Media retrieval failed - No media id provided"
    );

    // delete from s3 file server after test
    const deleteResponse = await request(app)
      .post("/api/media/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({ mediaID: response.body._id });
    done();
  });
});

describe("test POST /api/media/delete route and the deleteMedia controller", () => {
  // clear database before each test
  let token;
  beforeAll(async () => {
    const payload = {
      email: "test@email.com",
      password: "testing123",
      firstName: "firstTest",
      lastName: "lastTest",
      userName: "user22Test",
    };
    const lpayload = {
      email: "test@email.com",
      password: "testing123",
    };
    await database.clearCollections();
    await request(app).post("/api/user/add").send(payload);
    const lresponse = await request(app).post("/api/user/login").send(lpayload);
    token = lresponse.body.token;
    return true;
  });

  test("deleteMedia", async (done) => {
    const response = await request(app)
      .post("/api/media/add")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("isPrivate", false)
      .field("givenFileName", "test txt")
      .attach("mediafile", "./test/resources/test.png");

    const payload = {
      mediaID: response.body._id,
    };
    const deleteResponse = await request(app)
      .post("/api/media/delete")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.text).toBe(
      `Media deletion success - deleted ${response.body._id}`
    );
    done();
  });

  afterAll((done) => {
    database.disconnectDB();
    done();
  });
});
