require("dotenv").config();
const express = require("express");
const validator = require("validator");
const db = require("../database/dbConnection");


/**
 * Fonctionnalité d'inscription d'un proprietaire
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
exports.annonceurAdd = async (request, response) => {
    let messageJson = {msg : "", url : "", succes : false, data : null};
    let { nom, email, tel } = await request.body;
    if((nom != "" && nom != undefined) && (email != "" && email != undefined) && (tel != "" && tel != undefined)) {
        if(validator.isEmail(email)) {

        } else {
            
        }
    } else {
        messageJson.msg = "Veuillez renseigner tous les champs.";
        return response.json(messageJson);
    }
}
// id_anncrs	nom_anncrs	email_anncrs	tel_anncrs