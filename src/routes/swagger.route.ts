import * as express from "express";
import * as swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger";
import swaggerDocument from "../config/swagger.json";

const router = express.Router();

router.use(`/`, swaggerUi.serve);

router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
