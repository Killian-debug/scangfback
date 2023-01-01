const util = require("util");
const multer = require("multer");
const generateur = require("./generator");

const maxSize = 2 * 1024 * 1024;

  var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+"_"+current_time;	

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, date_time + '_' + generateur.generateRef(10).replace(/[^a-zA-Z0-9]/g, '') + '_' + file.originalname.replace(/[^a-zA-Z0-9.]/g, ''));
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("joinedFile");

// req.body.filename = storage._handleFile

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;