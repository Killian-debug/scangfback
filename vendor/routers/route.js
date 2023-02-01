const router = require("express").Router();
const routage = require("../controllers/controller");
const uploadFile = require("../functions/uploads");


// LES ROUTES DELETE

// LES FONCTIONS

router.get("/generateur/ref", (req, res) => { routage.generateurRef(req, res); });

router.get("/dateverif", (req, res) => { routage.dateVerif(req, res); });


// LES ROUTES DES ANNONCES

router.get("/select/aleatoire/annonce", (req, res) => { routage.annonceAleatoire(req, res); });

router.get("/select/aleatoire/annonce/:idEvent", (req, res) => { routage.annonceAleatoireEvent(req, res); });

router.get("/select/annonce/:id", (req, res) => { routage.annonceSelector(req, res); });

router.get("/select/pub/annonce", (req, res) => { routage.annoncePubAleatoire(req, res); });

router.post("/annonce", uploadFile, (req, res) => { routage.annonceAdd(req, res); });


// LES ROUTES D'ANNONCEURS

router.post("/annonceur", (req, res) => { routage.annonceurAdd(req, res); });

// LES ROUTES DES EVENEMENTS

router.post("/evenement", (req, res) => { routage.evenementAdd(req, res); });


// LES ROUTES DES STATS

// ajouter un visite
router.post("/visite", (req, res) => { routage.visiteAdd(req, res); });

//ajouter un gain
router.post("/gagner", (req, res) => { routage.gagnerAdd(req, res); });

// LES ROUTES PUT


module.exports = router;