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
    describe("/api/users", () =>
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

  describe(" GET /api/users", () => {
    describe("/api/users", () =>
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




