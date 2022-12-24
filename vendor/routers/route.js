const router = require("express").Router();
const routage = require("../controllers/controller");
const uploadFile = require("../functions/uploads");


// LES ROUTES DELETE

// LES ROUTES GET

router.get("/generateur/ref", (req, res) => { routage.generateurRef(req, res); });

router.get("/dateverif", (req, res) => { routage.dateVerif(req, res); });

router.get("/select/aleatoire/annonce", (req, res) => { routage.annonceAleatoire(req, res); });

router.get("/select/aleatoire/annonce/:idEvent", (req, res) => { routage.annonceAleatoireEvent(req, res); });

router.get("/select/annonce/:id", (req, res) => { routage.annonceSelector(req, res); });

// LES ROUTES POST

router.post("/annonceur", (req, res) => { routage.annonceurAdd(req, res); });

router.post("/evenement", (req, res) => { routage.evenementAdd(req, res); });

router.post("/annonce", uploadFile, (req, res) => { routage.annonceAdd(req, res); });

router.post("/gagner", (req, res) => { routage.gagnerAdd(req, res); });

// LES ROUTES PUT


module.exports = router;