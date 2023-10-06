"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("../config/types");
const container_1 = require("../config/container");
const passport_1 = __importDefault(require("../middlewares/passport"));
const TemplateController_1 = __importDefault(require("../controllers/TemplateController"));
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
// Get service instance and create a new User controller
const loggerService = container_1.iocContainer.get(types_1.TYPES.LoggerService);
const templateService = container_1.iocContainer.get(types_1.TYPES.TemplateService);
const templateController = new TemplateController_1.default(loggerService, templateService);
router.post("/", multer_1.uploadTemplate.single("file"), passport_1.default.authenticate("jwt", { session: false }), (req, res) => templateController.upsertTemplate(req, res));
router.get("/", passport_1.default.authenticate("jwt", { session: false }), (req, res) => templateController.getTemplatesByType(req, res));
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), (req, res) => templateController.getTemplatesById(req, res));
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), (req, res) => templateController.deleteTemplate(req, res));
exports.default = router;
//# sourceMappingURL=template.route.js.map