import multer from "multer";
import path from "path";
import { BadRequest } from "../errors/BadRequest";

export const uploadCompanyReply = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/public/");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    // if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    //   return callback(new BadRequest("Only pdf are allowed"));
    // }
    if (ext !== ".pdf") {
      return cb(new BadRequest("Only pdf is allowed"));
    }
    cb(null, true);
  },
});

export const uploadDocument = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/public/");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    // if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    //   return callback(new BadRequest("Only pdf are allowed"));
    // }
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".pdf") {
      return cb(new BadRequest("Only Image or PDF is allowed"));
    }
    cb(null, true);
  },
});

export const uploadTemplate = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/public/Template");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${req.body.type}_${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    // if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    //   return callback(new BadRequest("Only pdf are allowed"));
    // }
    if (ext !== ".docx" && ext !== ".doc") {
      return cb(new BadRequest("Only DOCX is allowed"));
    }
    cb(null, true);
  },
});
