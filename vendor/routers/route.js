const router = require("express").Router();
const routage = require("../controllers/controller");



// utilitaires 
//générer un référence de gagnant
router.get("/generateur/ref", (req, res) => { routage.generateurRef(req, res); });

//enregistrer un gagnant
router.post("/gagner", (req, res) => { routage.gagnerAdd(req, res); });

// mettre à jour les dates
router.get("/dateverif", (req, res) => { routage.dateVerif(req, res); });


// routes liés aux annonces
router.get("/select/aleatoire/annonce", (req, res) => { routage.annonceAleatoire(req, res); });

router.get("/select/aleatoire/annonce/:idEvent", (req, res) => { routage.annonceAleatoireEvent(req, res); });

router.get("/select/annonce/:id", (req, res) => { routage.annonceSelector(req, res); });

router.post("/annonce", (req, res) => { routage.annonceAdd(req, res); });


// routes liés aux annonceurs
router.post("/annonceur", (req, res) => { routage.annonceurAdd(req, res); });
router.get("/annonceur", (req, res) => { routage.annonceurGet(req, res); });


// routes liés aux événements
router.post("/evenement", (req, res) => { routage.evenementAdd(req, res); });





module.exports = router;