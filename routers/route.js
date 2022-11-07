const router = require("express").Router();
const { annonceurAdd } = require("../controllers/controller");


router.post("/annonceur", (req, res) => { annonceurAdd(req, res); });


module.exports = router;
