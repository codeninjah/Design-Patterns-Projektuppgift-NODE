const request = require("supertest");
let assert = require('assert') 

const app = require("./app");

const requestWithSupertest = request(app);

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});

describe("Test Endpoints", () => {
  /*
    test("GET /api/users request", async () => {
      const res = await requestWithSupertest.get("/api/users?name=22")  
      expect(res._query.name).toEqual("22")
    })
    */
    test("GET /api/users response", async () => {
      const res = await requestWithSupertest.get("/api/users")  
      expect(res.status).toEqual(200)
      expect(res.type).toEqual(expect.stringContaining('json'))
      expect(res.body.data).toBeType("array")
      expect(res.body.data[0].name).toBeType("string")
      expect(res.body.data[0].login).toBeType("string")
    })
});
  