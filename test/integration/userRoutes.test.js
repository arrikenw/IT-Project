/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require("supertest");
const app = require("../../app");
const database = require("../../models");

// addUser testing
describe("test /api/user/add route and the addUser controller", () => {
  // clear database before each test
  beforeEach(() => {
    return database.clearCollections();
  });

  test("addUser with valid inputs", async (done) => {
    const payload = {
      email: "test@email.com",
      password: "testing123",
      firstName: "firstTest",
      lastName: "lastTest",
      userName: "user22Test",
    };
    const response = await request(app).post("/api/user/add").send(payload);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    // /Sign up successful - account made with id [a-z0-9]{24}/
    done();
  });

  test("addUser with password too short", async (done) => {
    const payload = {
      email: "test@email.com",
      password: "1234",
      firstName: "firstTest",
      lastName: "lastTest",
      userName: "user22Test",
    };
    const response = await request(app).post("/api/user/add").send(payload);
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "Sign up not successful - password must be greater than 8 characters"
    );
    done();
  });
});

//  loginUser testing
describe("test /api/user/login route and the loginUser controller", () => {
  // add database entry to test loginUser
  beforeAll(async () => {
    const payload = {
      email: "test@email.com",
      password: "testing123",
      firstName: "firstTest",
      lastName: "lastTest",
      userName: "user22Test",
    };
    await database.clearCollections();
    await request(app).post("/api/user/add").send(payload);
    return true;
  });

  test("loginUser with valid inputs ", async (done) => {
    const payload = {
      email: "test@email.com",
      password: "testing123",
    };
    const response = await request(app).post("/api/user/login").send(payload);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    done();
  });
});

// getUser testing
describe("test /api/user/add route and the addUser controller", () => {
  // add database entry and get token to test getUser
  let token;
  beforeAll(async () => {
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
    token = `Bearer ${response.body.token}`;
    return true;
  });

  test("getUser with valid token", async (done) => {
    const response = await request(app)
      .get("/api/user/get")
      .send({})
      .set("Authorization", token);
    expect(response.status).toBe(200);
    done();
  });
});

// getPublicUser testing
describe("test /api/user/getPublic route and the getPublicUser controller", () => {
  // add database entries and get ids to test getPublicUser
  const users = {
    ids: [],
  };
  beforeAll(async () => {
    const payloadAddFirst = {
      email: "test@email.com",
      password: "testing123",
      firstName: "firstTest",
      lastName: "lastTest",
      userName: "user22Test",
    };
    const payloadAddSecond = {
      email: "test2@email.com",
      password: "testing1232",
      firstName: "firstTest2",
      lastName: "lastTest2",
      userName: "user22Test2",
    };

    await database.clearCollections();

    const responseOne = await request(app)
      .post("/api/user/add")
      .send(payloadAddFirst);
    users.ids.push(responseOne.body.id);

    const responseTwo = await request(app)
      .post("/api/user/add")
      .send(payloadAddSecond);
    users.ids.push(responseTwo.body.id);
    return true;
  });

  test("getPublicUser with valid input", async (done) => {
    const response = await request(app)
      .post("/api/user/getPublic")
      .send({ IDMatch: users.ids, sortDirection: "asc" });
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("professionalFields", []);
    expect(response.body[0]).toHaveProperty("firstName", "firstTest");
    expect(response.body[0]).toHaveProperty("lastName", "lastTest");
    expect(response.body[0]).toHaveProperty("userName", "user22Test");
    expect(response.body[0]).toHaveProperty("_id", users.ids[0]);

    expect(response.body[1]).toHaveProperty("professionalFields", []);
    expect(response.body[1]).toHaveProperty("firstName", "firstTest2");
    expect(response.body[1]).toHaveProperty("lastName", "lastTest2");
    expect(response.body[1]).toHaveProperty("userName", "user22Test2");
    expect(response.body[1]).toHaveProperty("_id", users.ids[1]);
    done();
  });
});

// updateUser testing
describe("test /api/user/update route and the updateUser controller", () => {
  // add database entry and get token to test updateUser
  let token;
  beforeEach(async () => {
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
    token = `Bearer ${response.body.token}`;
    return true;
  });

  test("updateUser with valid input", async (done) => {
    const payload = {
      password: "testing123",
      update: {
        firstName: "newFirst",
        lastName: "newLast",
      },
    };
    const response = await request(app)
      .post("/api/user/update")
      .send(payload)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    done();
  });
});

/// deleteUser testing
describe("test /api/user/delete route and the deleteUser controller", () => {
  // add database entry and get token to test updateUser
  let token;
  beforeEach(async () => {
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
    token = `Bearer ${response.body.token}`;
    return true;
  });

  test("updateUser with valid input", async (done) => {
    const payload = {
      password: "testing123",
    };
    const response = await request(app)
      .post("/api/user/delete")
      .send(payload)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    done();
  });
});

afterAll((done) => {
  database.disconnectDB();
  done();
});
