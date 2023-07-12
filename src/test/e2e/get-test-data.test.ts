import supertest from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../../config/express";
import ENV from "../../config/env";

describe("get test data", () => {
  let request: supertest.SuperTest<supertest.Test>;

  let prisma: PrismaClient;

  beforeAll(async () => {
    request = await supertest(app);
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: `${ENV.DATABASE_URL}`,
        },
      },
    });
  });

  describe("get test data", () => {
    test("get test data 200", async () => {
      const res = await request.post("/api/v1.0/test").send({
        test: "Hello",
      });
      console.log(res.body);

      expect(res.status).toBe(200);
    });
  });

  afterAll((done) => {
    prisma.$disconnect();
    done();
  });
});
