//const users = require('../../controllers/user');
const request = require("supertest");
const app = require("../../app");
const database = require("../../models/index");
describe("my first test", ()=> {
    beforeEach(() => {
        return database.clearCollections();
    });
    test("tests first function", async (done) => {
        const payload = {
            email: "test@123245.com",
            password: "testing123",
            firstName: "firstTest",
            lastName: "lastTest",
            username: "user22Test"
        }
        const response = await request(app)
            .post("/api/user/add")
            .send(payload)
        expect(response.status).toBe(200);
        done();
    });
});

afterAll(async (done) => {
    database.disconnectDB();
    done();
})