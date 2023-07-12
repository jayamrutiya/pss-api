import supertest from "supertest";
import app from "../../config/express";

describe("get employee", () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    request = await supertest(app);
    console.log("Do database connection.");
  });

  afterAll(async () => {
    console.log("disconnect database.");
  });

  describe("get employee", () => {
    test("get employee", async () => {
      const getEmployee = await request.get("/api/v1.0/employee/1");
      expect(getEmployee.status).toBe(200);
    });
  });
});
