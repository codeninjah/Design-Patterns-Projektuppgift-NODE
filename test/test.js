const request = require("supertest");
let assert = require('assert') 

const app = require("../app");
const { response } = require("../app");

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
      expect(users[0].login).toBeType("string")
      const user = users.find(element => element.login == "b1e77ed4-a3ac-47ec-a01d-5bc1cb473dab")
      expect(user).not.toBeUndefined()
    })
    test("GET /api/users/:id response", async () => {
      const res = await requestWithSupertest.get("/api/users/b1e77ed4-a3ac-47ec-a01d-5bc1cb473dab") 
      expect(res.status).toEqual(200)
      const user = res.body.data
      expect(user.login).toBeType("string")
      expect(user.name).toBe("André")
    })
    test("GET /api/users/:id response error", async () => {
      const res = await requestWithSupertest.get("/api/users/undefined") 
      console.log(res.status)
      expect(res.status).toEqual(404)
    })
    test("Post /api/users", async () => {
      const name = "Skurt"
      const res = await requestWithSupertest.post("/api/users").send({
        name
      })
      expect(res.status).toEqual(200)
      expect(res.text).toBe(name + " is registered")
    })
    test("Post /api/users response error", async () => {
      const name = false
      const res = await requestWithSupertest.post("/api/users").send({
        name
      })
      expect(res.status).toEqual(404)
    })
    test("Delete /api/users/:id", async () => {
      const login = "380e0ff1-3ab8-4a45-85f3-63148ae5560e"
      const name = "Pelle"
      const res = await requestWithSupertest.delete("/api/users/" + login)
      expect(res.status).toEqual(200)
      expect(res.text).toBe(name + " is deleted")
    })
    test("Delete /api/users/:id user doesn't exist error", async () => {
      const login = "wrong Id"
      const res = await requestWithSupertest.delete("/api/users/" + login)
      expect(res.status).toEqual(404)
    })
    test("Delete /api/users/:id wrong id value error", async () => {
      const login = false
      const res = await requestWithSupertest.delete("/api/users/" + login)
      expect(res.status).toEqual(404)
    })
  })
  describe("Test Endpoints /api/products", () => {
    test("GET /api/products response", async () => {
      const res = await requestWithSupertest.get("/api/products")  
      expect(res.status).toEqual(200)
      const products = res.body.data
      expect(res.body.data[0].id).toBeType("string")
      const product = products.find(element => element.id == "b57dcdac-b3dc-4fdc-ab77-092d2f7370f9")
      expect(product).not.toBeUndefined()
    })
    test("GET api/products/:id response", async () => {
      const res = await requestWithSupertest.get("/api/products/55f0c839-c9f5-4a77-bd1f-1d12667bf412")
      expect(res.status).toEqual(200)
      const product = res.body.data
      expect(product.id).toBeType("string")
      expect(product.name).toBe("Ginger")
    })
    test("GET api/products/:id response error ", async () => {
      const res = await requestWithSupertest.get("/api/products/undefined")
      console.log(res.status)
      expect(res.status).toEqual(404)
    })
    test("POST api/products response", async () => {
      const name = "Grillkorv"
      const price = 50
      const res = await requestWithSupertest.post("/api/products").send({
        name, price
      })
      expect(res.status).toEqual(200)
      expect(res.text).toBe(name + " is registered")
    })
    test("POST api/products already exist error", async () => {
      const name = "Ginger"
      const price = 50
      const res = await requestWithSupertest.post("/api/products").send({
        name, price
      })
      expect(res.status).toEqual(404)
    })
    test("POST api/products wrong param error", async () => {
      const name = false
      const price = 50
      const res = await requestWithSupertest.post("/api/products").send({
        name, price
      })
      expect(res.status).toEqual(404)
    })
    test("POST api/products worng price value error", async () => {
      const name = "Grillkorv"
      const price = "hejhop"
      const res = await requestWithSupertest.post("/api/products").send({
        name, price
      })
      expect(res.status).toEqual(404)
    })
    test("PATCH api/products", async () => {
      const id = "5427d4d6-42a6-4d68-be44-a4d78e15cfbe"
      const name = "Kebabistan"
      const res = await requestWithSupertest.patch("/api/products/" + id).send({
        name
      })
      expect(res.status).toEqual(200)
      expect(res.text).toBe(name + " was updated")
    })
    test("PATCH api/products wrong id error", async () => {
      const id = undefined
      const name = "Kebabistan"
      const res = await requestWithSupertest.patch("/api/products/" + id).send({
        name
      })
      expect(res.status).toEqual(404)
    })
    test("PATCH api/products doesn't exist error", async () => {
      const id = "hejhopp"
      const name = "Kebabistan"
      const res = await requestWithSupertest.patch("/api/products/" + id).send({
        name
      })
      expect(res.status).toEqual(404)
    })
    test("PATCH api/products wrong body error", async () => {
      const id = "5427d4d6-42a6-4d68-be44-a4d78e15cfbe"
      const name = false
      const res = await requestWithSupertest.patch("/api/products/" + id).send({
        name
      })
      expect(res.status).toEqual(404)
    })
    test("DELETE api/products", async () => {
      const id = "f458bd27-4f50-4078-822b-c1e2f17b2f3b"
      const name = "Tomat"
      const res = await requestWithSupertest.delete("/api/products/" + id)
      expect(res.status).toEqual(200)
      expect(res.text).toBe(name + " is deleted")
    })
  })
  describe("Test Endpoints /api/carts", () => {
    test("Post api/carts/userLogin", async () => {
      const amount = 2
      const productId = "818ca9b3-a0f1-4267-b429-a8b7a2da66f4"
      const res = await requestWithSupertest.post("/api/cart/3fbdcc8f-0d86-4f43-8d70-70008809bad0").send({
        amount, productId
      })
      expect(res.status).toEqual(200)
      expect(res.text).toBe(amount + " Mellon is added to cart")
    })
    test("Post api/carts/userLogin wrong loginUser error", async () => {
      const amount = 2
      const productId = "0b7f94e5-42d4-4aff-afb2-0260f8fb8e17"
      const res = await requestWithSupertest.post("/api/cart/hejhopp").send({
        amount, productId
      })
      expect(res.status).toEqual(404)
    })
    test("Post api/carts/userLogin wrong productId error", async () => {
      const amount = 2
      const productId = "grillkorv"
      const res = await requestWithSupertest.post("/api/cart/3fbdcc8f-0d86-4f43-8d70-70008809bad0").send({
        amount, productId
      })
      expect(res.status).toEqual(404)
    })
    test("Post api/carts/userLogin wrong amount error", async () => {
      const amount = "hejhop"
      const productId = "0b7f94e5-42d4-4aff-afb2-0260f8fb8e17"
      const res = await requestWithSupertest.post("/api/cart/3fbdcc8f-0d86-4f43-8d70-70008809bad0").send({
        amount, productId
      })
      expect(res.status).toEqual(404)
    })
    test("Get api/cart/userLogin", async () => {
      const userLogin = "4889fbf6-4a66-4cb4-bed9-1c5086379b9f"
      const res = await requestWithSupertest.get("/api/cart/" + userLogin)
      expect(res.status).toEqual(200)
      expect(res.body.data).toBeType("array")
    })
    test("Get api/cart/userLogin wrong userLogin error", async () => {
      const userLogin = "sjsjsjsjjsjs"
      const res = await requestWithSupertest.get("/api/cart/" + userLogin)
      expect(res.status).toEqual(404)
    })
    test("PUT api/cart/userLogin/itemId", async () => {
      const userLogin = "3fbdcc8f-0d86-4f43-8d70-70008809bad0"
      const productId = "818ca9b3-a0f1-4267-b429-a8b7a2da66f4"
      const name = "Mellon"
      const price = 87
      const amount = 10
      const res = await requestWithSupertest.patch("/api/cart/" + userLogin + "/" + productId).send({
        amount
      })
      expect(res.status).toEqual(200)
      expect(res.text).toBe("The amount of " + name + " is changed to " + amount + " and will cost " + (amount * price) + "SEK")
    })
    test("PUT api/cart/userLogin/itemId wrong userLogin error", async () => {
      const userLogin = "hejhopp"
      const productId = "818ca9b3-a0f1-4267-b429-a8b7a2da66f4"
      const amount = 10
      const res = await requestWithSupertest.patch("/api/cart/" + userLogin + "/" + productId).send({
        amount
      })
      expect(res.status).toEqual(404)
    })
    test("PUT api/cart/userLogin/itemId wrong productId error", async () => {
      const userLogin = "4889fbf6-4a66-4cb4-bed9-1c5086379b9f"
      const productId = "hejhop"
      const amount = 10
      const res = await requestWithSupertest.patch("/api/cart/" + userLogin + "/" + productId).send({
        amount
      })
      expect(res.status).toEqual(404)
    })
    test("PUT api/cart/userLogin/itemId wrong amount error", async () => {
      const userLogin = "4889fbf6-4a66-4cb4-bed9-1c5086379b9f"
      const productId = "818ca9b3-a0f1-4267-b429-a8b7a2da66f4"
      const amount = "hejhop"
      const res = await requestWithSupertest.patch("/api/cart/" + userLogin + "/" + productId).send({
        amount
      })
      expect(res.status).toEqual(404)
    })
    test("DELETE/api/cart/userLogin/itemId", async () => {
      const userLogin = "3fbdcc8f-0d86-4f43-8d70-70008809bad0"
      const itemId = "818ca9b3-a0f1-4267-b429-a8b7a2da66f4"
      const name = "Mellon"
      const res = await requestWithSupertest.delete("/api/cart/" + userLogin + "/" + itemId)
      expect(res.status).toEqual(200)
      expect(res.text).toBe(name + " is deleted")
    })
    test("DELETE /api/cart/userLogin/itemId wrong userLogin error", async () => {
      const userLogin = "blabalabalabalabl"
      const itemId = "818ca9b3-a0f1-4267-b429-a8b7a2da66f4"
      const res = await requestWithSupertest.delete("/api/cart/" + userLogin + "/" + itemId)
      expect(res.status).toEqual(404)
    })
    test("DELETE /api/cart/userLogin/itemId wrong itemId error", async () => {
      const userLogin = "3fbdcc8f-0d86-4f43-8d70-70008809bad0"
      const itemId = "hsgsJAKSBKJJ"
      const res = await requestWithSupertest.delete("/api/cart/" + userLogin + "/" + itemId)
      expect(res.status).toEqual(404)
    })
  })
})
  