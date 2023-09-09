import multer from "multer";

export const uploadCompanyReply = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/public/");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
