import request from "supertest";
import app from "../../server.js";

//USER_ROUTES_TEST
describe(" GET /api/search", () => {
  describe("when passed all info", () =>
    test('should return status 200 & content-type "application/json"', async () => {
      const response = await request(app)
        .get("/api/search?username=developer")
        .set({ Authorization: process.env.BEARER });
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    }));
  describe("when some info is missing", () =>
    test('should return a 500 status code to show there was a user error', async () => {
      const response = await request(app)
        .get("/api/search?username=developer")
        .set({ Authorization: " " });
      expect(response.status).toBe(500);
    }));
});

describe(" GET /api/users", () => {
    describe("when passed all info", () =>
    test('should return status 200 & content-type "application/json"', async () => {
      const response = await request(app)
        .get("/api/users")
        .set({ Authorization: process.env.BEARER });
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    }));
    describe("when some info is missing", () =>
      test('should return a 500 status code to show there was a user error', async () => {
        const response = await request(app)
        .get("/api/users")
        .set({ Authorization: " " });
        expect(response.status).toBe(500);
      }));
  });

  describe(" GET /api/user/:id", () => {
    describe("when passed all info", () =>
    test('should return status 200 & content-type "application/json"', async () => {
      const response = await request(app)
        .get(`/api/user/${process.env.USER_ID}`)
        .set({ Authorization: process.env.BEARER });
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("application/json");
    }));
    describe("when some info is missing", () =>
      test('should return a 500 status code to show there was a user error', async () => {
        const response = await request(app)
        .get(`/api/user/test`)
        .set({ Authorization: process.env.BEARER });
        expect(response.status).toBe(500);
      }));
  });

  //AUTH_ROUTES_TEST

  


// router.post('/logout',authCtrl.logout);

// router.post('/refresh_token',authCtrl.generateAccessToken);


describe(" POST /api/login", () => {
    describe('when passed all info', ()=>
    test('should return status 200 & content-type "application/json"',async ()=>{
    
    const response = await request(app)
        .post('/api/login')
        .send({ 
            email: "developer@mail.com",
            password: "123456"  })
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json')
    }))
    
    
    describe("when some info is missing", () =>
      test('should return a 500 status code to show there was a user error', async () => {
        const response = await request(app)
        .post('/api/login')
        .send({ 
            email: "developer@mail.com",
            password: ""  })
        expect(response.status).toBe(400);
      }));
  });

  describe(" POST /api/login", () => {
    describe('when passed all info', ()=>
    test('should return status 200 & content-type "application/json"',async ()=>{
    
    const response = await request(app)
        .post('/api/login')
        .send({ 
            email: "developer@mail.com",
            password: "123456"  })
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json')
    }))
    
    
    describe("when some info is missing", () =>
      test('should return a 500 status code to show there was a user error', async () => {
        const response = await request(app)
        .post('/api/login')
        .send({ 
            email: "developer@mail.com",
            password: ""  })
        expect(response.status).toBe(400);
      }));
  });

