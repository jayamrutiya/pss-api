import supertest from "supertest";
import app from "../../config/express";

describe("update employee", () => {
  let request: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    request = await supertest(app);
    console.log("Do database connection.");
  });

  afterAll(async () => {
    console.log("disconnect database.");
  });

  describe("update employee", () => {
    test("update employee", async () => {
      const updateEmployee = await request.put("/api/v1.0/employee/1").send({
        firstName: "jay",
        lastName: "a",
        emailId: "jay.a@dntinfotech.com",
        phoneNumber: 1234567899,
        isActive: true,
      });
      expect(updateEmployee.status).toBe(200);
    });

    test("update employee with duplicate email", async () => {
      try {
        const updateEmployee = await request.put("/api/v1.0/employee/1").send({
          firstName: "jay",
          lastName: "a",
          emailId: "jay.amrutiya@dntinfotech.com",
          phoneNumber: 1234567899,
          isActive: true,
        });
        expect(updateEmployee.status).toBe(400);
      } catch (error) {
        expect(error.message).toBe("This emailid already in use.");
      }
    });

    test("update employee with invalid employee id", async () => {
      try {
        const updateEmployee = await request.put("/api/v1.0/employee/2").send({
          firstName: "jay",
          lastName: "a",
          emailId: "jay.amrutiya@dntinfotech.com",
          phoneNumber: 1234567899,
          isActive: true,
        });
        expect(updateEmployee.status).toBe(404);
      } catch (error) {
        expect(error.message).toBe("Employee not found.");
      }
    });
  });
});
