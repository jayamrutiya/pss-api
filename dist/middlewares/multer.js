"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTemplate = exports.uploadDocument = exports.uploadCompanyReply = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const BadRequest_1 = require("../errors/BadRequest");
exports.uploadCompanyReply = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./src/public/");
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
    fileFilter: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        // if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
        //   return callback(new BadRequest("Only pdf are allowed"));
        // }
        if (ext !== ".pdf") {
            return cb(new BadRequest_1.BadRequest("Only pdf is allowed"));
        }
        cb(null, true);
    },
});
exports.uploadDocument = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./src/public/");
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
    fileFilter: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        // if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
        //   return callback(new BadRequest("Only pdf are allowed"));
        // }
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".pdf") {
            return cb(new BadRequest_1.BadRequest("Only Image or PDF is allowed"));
        }
        cb(null, true);
    },
});
exports.uploadTemplate = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./src/public/Template");
        },
        filename: function (req, file, cb) {
            var ext = path_1.default.extname(file.originalname);
            cb(null, `${Date.now()}_${req.body.type}.${ext}`);
        },
    }),
    fileFilter: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        // if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
        //   return callback(new BadRequest("Only pdf are allowed"));
        // }
        if (ext !== ".docx" && ext !== ".doc") {
            return cb(new BadRequest_1.BadRequest("Only DOCX is allowed"));
        }
        cb(null, true);
    },
});
//# sourceMappingURL=multer.js.map