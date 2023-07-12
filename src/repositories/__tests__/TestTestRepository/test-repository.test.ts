import { PrismaClient } from "@prisma/client";
import { TYPES } from "../../../config/types";
import { iocContainer as Container } from "../../../config/container";
import { ILoggerService } from "../../../interfaces/ILoggerService";
import { IDatabaseService } from "../../../interfaces/IDatabaseService";

describe("authentication and authorization", () => {
  const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
  const databaseService = Container.get<IDatabaseService>(
    TYPES.DatabaseService
  );

  let prisma: PrismaClient;

  // connection db before starting the test
  beforeAll(() => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://postgres:fenil2301@localhost:5432/thelink",
        },
      },
    });
  });

  // disconnect db after testing is over
  afterAll((done) => {
    prisma.$disconnect();
    done();
  });

  describe("test", () => {
    test("test", async () => {
      try {
        const result = true;
        expect(result).toBe(true);
      } catch (error) {
        // Left empty
      }
    });
  });
});
