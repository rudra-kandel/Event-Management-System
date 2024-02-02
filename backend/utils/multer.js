const multer = require("multer");
const path = require("path");
const slugify = require("slugify");

const parseData = path.parse(__dirname);
const filePath = `${parseData.dir}/uploads`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const newFileName = slugify(`${Date.now()}-${file.originalname}`, {
      lower: true,
    });
    cb(null, newFileName);
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 3145728 }, // 3MB
  fileFilter: function (req, file, cb) {
    console.log(file.fieldname);
    // if uploading images
    if (file.fieldname === "imageaasas" || file.fieldname === "event_pic") {
      const allowedExtensions = /jpg|jpeg|jfif|png|svg|webp/;
      const validateExt = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
      );
      const validateMime = allowedExtensions.test(file.mimetype);
      if (validateExt && validateMime) cb(null, true);
      else
        cb(
          `${`${file.fieldname[0].toUpperCase()}${file.fieldname.slice(
            1
          )}`} format is not supported`
        );
    } else {
      const allowedExtensions = /jpg|jpeg|jfif|png|svg|webp|doc|docx|pdf/;
      const validateExt = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
      );
      const validateMime = allowedExtensions.test(file.mimetype);

      if (validateExt && validateMime) cb(null, true);
      else cb("File type is not supported");
    }
  },
});
