const request = require("supertest");
let assert = require('assert') 
const { compareName } = require("./compare")

const app = require("../app");

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
  describe("Test Endpoints /api/users", () => {
    test("GET /api/users response", async () => {
      const res = await requestWithSupertest.get("/api/users")  
      expect(res.status).toEqual(200)
      expect(res.type).toEqual(expect.stringContaining('json'))
      expect(res.body.data).toBeType("array")
      expect(res.body.data[0].name).toBeType("string")
      expect(res.body.data[0].login).toBeType("string")
      //const name = compareName(res.body.data, "b1e77ed4-a3ac-47ec-a01d-5bc1cb473dab", "André", "login")
      //expect(name).toBe(true)
    })
    test("GET /api/users/:id response", async () => {
      const res = await requestWithSupertest.get("/api/users/b1e77ed4-a3ac-47ec-a01d-5bc1cb473dab") 
      expect(res.status).toEqual(200)
      expect(res.type).toEqual(expect.stringContaining('json'))
      const user = res.body.data
      expect(user).toBeType("object")
      expect(user.name).toBeType("string")
      expect(user.login).toBeType("string")
      const name = compareName(user, "b1e77ed4-a3ac-47ec-a01d-5bc1cb473dab", "André")
      expect(name).toBe(true)
    })
  })
  describe("Test Endpoints /api/products", () => {
    test("GET /api/products response", async () => {
      const res = await requestWithSupertest.get("/api/products")  
      expect(res.status).toEqual(200)
      expect(res.type).toEqual(expect.stringContaining('json'))
      expect(res.body.data).toBeType("array")
      expect(res.body.data[0].name).toBeType("string")
      expect(res.body.data[0].id).toBeType("string")
    })
  })
})
  