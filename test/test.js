const request = require("supertest");
let assert = require('assert') 

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
      const users = res.body.data
      //expect(res.type).toMatch(expect.stringContaining('json'))
      //expect(users).toBeType("array")
      //expect(users[0].name).toBeType("string")
      expect(users[0].login).toBeType("string")
      const user = users.find(element => element.login == "b1e77ed4-a3ac-47ec-a01d-5bc1cb473dab")
      expect(user).not.toBeUndefined()
    })
    test("GET /api/users/:id response", async () => {
      const res = await requestWithSupertest.get("/api/users/b1e77ed4-a3ac-47ec-a01d-5bc1cb473dab") 
      expect(res.status).toEqual(200)
      const user = res.body.data
      //expect(res.type).toEqual(expect.stringContaining('json'))
      //expect(user).toBeType("object")
      //expect(user.name).toBeType("string")
      expect(user.login).toBeType("string")
      expect(user.name).toBe("André")
      // kolla om är userobject kolla om product object
      // kolla ett testfall : id - kolla om fail - id som inte finns
    })
    test("GET /api/users/:id response error", async () => {
      const res = await requestWithSupertest.get("/api/users/undefined") 
      console.log(res.status)
      expect(res.status).toEqual(404)
    })
  })
  describe("Test Endpoints /api/products", () => {
    test("GET /api/products response", async () => {
      const res = await requestWithSupertest.get("/api/products")  
      expect(res.status).toEqual(200)
      //expect(res.type).toEqual(expect.stringContaining('json'))
      const products = res.body.data
      //expect(res.body.data).toBeType("array")
      //expect(res.body.data[0].name).toBeType("string")
      expect(res.body.data[0].id).toBeType("string")
      const product = products.find(element => element.id == "b57dcdac-b3dc-4fdc-ab77-092d2f7370f9")
      expect(product).not.toBeUndefined()
    })
  })
})
  