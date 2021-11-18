const request = require("supertest");


const app = require("./app");


describe("Test example", () => {
    test("GET api/users", (done) => {
      // Logic goes here
      request(app)
      .get("api/users")
      .expect("Content-Type", /json/)
      .send({
        email: "francisco@example.com",
      })
      .expect(5000)
    })
    // More things come here
});
  