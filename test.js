const request = require("supertest");
let assert = require('assert') 

const app = require("./app");

const requestWithSupertest = request(app);



describe("Test Endpoints", () => {
    test("GET /api/users", async () => {
      const res = await requestWithSupertest.get("/api/users")  
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(Array.isArray(res.body.data))
      // expect((res)=>{
        // res.body.data.length = 5
        // typeof(res.body.data) == "string"
        // Array.isArray(res.body.data)
      // })
      // expect(firstLine).toEqual(20);
    })

    // test("GET /api/users", (done) => {
      
    //   request(app)

    //   .get("/api/users")
    //   .expect("Content-Type", /json/)
    //   .expect(200)
    //   .then(response => {
    //     assert(response.body[0].name, 'Kalle')
    //     done();
    // })
    // .catch(err => done(err))

    // })


    
});
  