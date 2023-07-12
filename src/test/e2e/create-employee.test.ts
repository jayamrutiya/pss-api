import supertest from "supertest";
import app from "../../config/express";

describe("create employee", () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    request = await supertest(app);
    console.log("Do database connection.");
  });

  afterAll(async () => {
    console.log("disconnect database.");
  });

  describe("create employee", () => {
    test("create employee", async () => {
      const createEmployee = await request.post("/api/v1.0/employee").send({
        firstName: "jay",
        lastName: "a",
        emailId: "jay.a@dntinfotech.com",
        phoneNumber: 1234567899,
        isActive: true,
      });
      expect(createEmployee.status).toBe(200);
    });

    test("create employee with duplicate email", async () => {
      try {
        const createEmployee = await request.post("/api/v1.0/employee").send({
          firstName: "jay",
          lastName: "a",
          emailId: "jay.amrutiya@dntinfotech.com",
          phoneNumber: 1234567899,
          isActive: true,
        });
        expect(createEmployee.status).toBe(400);
      } catch (error) {
        expect(error.message).toBe("This emailid already in use.");
      }
    });
  });
});
