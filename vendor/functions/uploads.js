const util = require("util");
const multer = require("multer");
const generateur = require("./generator");

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, generateur.generateRef(10).replace(/[^a-zA-Z0-9]/g, '') + '_' + Date.now() + '_' + file.originalname.replace(/[^a-zA-Z0-9.]/g, ''));
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("joinedFile");

// req.body.filename = storage._handleFile

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;