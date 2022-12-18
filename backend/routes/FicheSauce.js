//Import d'Express
const express = require("express");

//Import FicheSauce controller
const ficheSauce = require("../controllers/FicheSauce")

//Import Like controller
const like = require("../controllers/like")

//Importation du middleware multer.js 
const multer = require("../middlewares/multer")


const authentification = require('../middlewares/authentification')

//La fonction Router du framework Express
const router = express.Router();

//Les Routes
router.post('/sauces/', authentification, multer, ficheSauce.createFicheSauce);

//L'affichage de toute les sauces
router.get('/sauces/', authentification, ficheSauce.getAllSauce);

//Affichage d'un objet selon son ID
router.get("/sauces/:id", authentification, ficheSauce.getOneSauce);

//Modification d'une sauce via son ID
router.put("/sauces/:id", authentification, ficheSauce.updateOneSauce);

//Suppression d'une sauce
router.delete("/sauces/:id", authentification, ficheSauce.deleteOneSauce);

//Routes like et dislike
router.post("/sauces/:id/like", authentification, like.likeFicheSauce);

//Exportation du module
module.exports = router;

