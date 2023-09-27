import app from "./config/express";
import ENV from "./config/env";
import { iocContainer as Container } from "./config/container";
import { ILoggerService } from "./interfaces/ILoggerService";
import { TYPES } from "./config/types";
import path from "path";

app.listen(ENV.PORT, () => {
  const loggerService = Container.get<ILoggerService>(TYPES.LoggerService);
  loggerService
    .getLogger()
    .info(`⚡️[server]: Server is running at http://localhost:${ENV.PORT}`);
  loggerService
    .getLogger()
    .info(`⚡️[server]: API ROOT: http://localhost:${ENV.PORT}${ENV.API_ROOT}`);
  loggerService
    .getLogger()
    .info(
      `⚡️[server]: API DOCS: http://localhost:${ENV.PORT}${ENV.API_ROOT}/docs`
    );
});

app.use("/api/temp/:name", (req, res) => {
  res.sendFile(
    path.resolve(`../pss-api/src/public/Template/${req.params.name}`)
  );
});

app.use("/api/doc/:name", (req, res) => {
  res.sendFile(path.resolve(`../pss-api/src/public/${req.params.name}`));
});
