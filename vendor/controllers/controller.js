require("dotenv").config();
const express = require("express");
const { array } = require("joi");
const { values, forEachRight } = require("lodash");
const { NUMBER } = require("sequelize");
const validator = require("validator");
const db = require("../database/dbConnection");
const generateur = require("../functions/generator");


/**
 * Fonctionnalité d'ajout d'un annonceur
 * @param {express.Request} request { nom, email, tel }
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
exports.annonceurAdd = async (request, response) => {
    let messageJson = {msg : "", url : "", succes : false, data : null};
    let { nom, email, tel, indice } = await request.body;
    if((nom != "" && nom != undefined) && (email != "" && email != undefined) && (tel != "" && tel != undefined)) {
        if(!validator.isEmail(email)) {
            messageJson.msg = "Adresse e-mail invalide.";
            return response.json(messageJson);
        }
        try {
            db.query("SELECT * from annonceurs where email_anncrs = ?", [email], (echec, donne) => {
                if(echec) {
                    messageJson.msg = echec.message;
                    return response.json(messageJson);
                } else {
                    if(donne.length > 0) {
                        messageJson.msg = "L'adresse email est déja utiliser par un annonceur.";
                        return response.json(messageJson);
                    }
                    db.query("INSERT into annonceurs(nom_anncrs, email_anncrs, tel_anncrs) values(?,?,?)", [nom, email, tel], (err, datas) => {
                        if(err) {
                            messageJson.msg = err.message;
                            return response.json(messageJson);
                        }
                        messageJson.succes = true;
                        messageJson.msg = "Annonceur ajouter avec succès.";
                        return response.json(messageJson);
                    });
                }
            });
        } catch (error) {
            messageJson.msg = error.message;
            return response.json(messageJson);
        }
    } else {
        messageJson.msg = "Veuillez renseigner tous les champs.";
        return response.json(messageJson);
    }
}

/**
 * Fonctionnalité d'ajout d'un evenement
 * @param {express.Request} request { nom, organisator, datdeb, datfin }
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
exports.evenementAdd = async (request, response) => {
    let messageJson = {msg : "", url : "", succes : false, data : null};
    let { nom, organisator, datdeb, datfin } = await request.body;
    if((nom != "" && nom != undefined) && (organisator != "" && organisator != undefined) && (datdeb != "" && datdeb != undefined) && 
    (datfin != "" && datfin != undefined)) {
        let datArray = datdeb.split("/");
        let datedeb = await new Date(parseInt(datArray[2]),parseInt(datArray[1]),parseInt(datArray[0]));
        datArray = datfin.split("/");
        let datefin = await new Date(parseInt(datArray[2]),parseInt(datArray[1]),parseInt(datArray[0]));
        if(validator.isDate(datedeb) == false || validator.isDate(datefin) == false) {
            messageJson.msg = "L'une des dates est incorrect.";
            return response.json(messageJson);
        } else {
            if(datefin.getTime() < datedeb.getTime()) {
                messageJson.msg = "La date de début ne peut être suppérieur ala date de fin.";
                return response.json(messageJson);
            }
            try {
                db.query("INSERT into evenements(nom_event, organisator, datdeb, datfin) values(?,?,?,?)", 
                [nom, organisator, datedeb.toLocaleDateString("en-ZA"), datefin.toLocaleDateString("en-ZA")], (err, datas) => {
                if(err) {
                    messageJson.msg = err.message;
                    return response.json(messageJson);
                }
                messageJson.msg = "Evenement ajouté avec succès.";
                messageJson.succes = true;
                return response.json(messageJson);
            });
            } catch (error) {
                messageJson.msg = error.message;
                return response.json(messageJson);
            }
        }
    } else {
        messageJson.msg = "Veuillez renseigner tous les champs.";
        return response.json(messageJson);
    }
}

/**
 * Fonctionnalité d'ajout d'une annonce
 * @param {express.Request} request { description, objectif, type_med, type_url, url_des, type_anncs, duree, limite, id_anncrs, id_event }
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
 exports.annonceAdd = async (request, response) => {
    let messageJson = {msg : "", url : "", succes : false, data : null};
    let { description, objectif, type_med, type_url, url_des, type_anncs, duree, limite, id_anncrs, id_event } = await request.body;
    if((description != "" && description != undefined) && (objectif != "" && objectif != undefined) && (type_med != "" && type_med != undefined) && 
    (type_url != "" && type_url != undefined) && (url_des != "" && url_des != undefined) && (type_anncs != undefined && parseInt(type_anncs) >= 0) && 
    (duree != "" && duree != undefined && parseInt(duree) > 0) && (limite != "" && limite != undefined && parseInt(limite) > 0) && 
    (id_anncrs != "" && id_anncrs != undefined && parseInt(id_anncrs) > 0) && 
    (id_event != "" && id_event != undefined && parseInt(id_event) > 0)) {
        try {
            db.query("SELECT * from evenements where id_event = ?", [id_event], (errEvent, dataEvent) => {
                if(errEvent) {
                    messageJson.msg = errEvent.message;
                    return response.json(messageJson);
                } else {
                    if(dataEvent.length == 0) {
                        messageJson.msg = "Evenement inexistant.";
                        return response.json(messageJson);
                    }
                    db.query("SELECT * from annonceurs where id_anncrs = ?", [id_anncrs], (errAnncrs, dataAnncrs) => {
                        if(errAnncrs) {
                            messageJson.msg = errAnncrs.message;
                            return response.json(messageJson);
                        } else {
                            if(dataAnncrs.length == 0) {
                                messageJson.msg = "Annonceur inexistant.";
                                return response.json(messageJson);
                            }
                            db.query(`INSERT into annonces(id_anncrs,id_event,description,objectif,type_med,type_url,url_des,type_anncs,
                                duree,limite,status) values(?,?,?,?,?,?,?,?,?,?,?)`, 
                            [id_anncrs, id_event, description, objectif, type_med, type_url, url_des, type_anncs, duree, limite, "actif"], 
                            (err) => {
                                if(err) {
                                    messageJson.msg = err.message;
                                    return response.json(messageJson);
                                }
                                messageJson.msg = "Annonce ajoutée avec succés.";
                                messageJson.succes = true;
                                return response.json(messageJson);
                            });
                        }
                    });
                }
            });
        } catch (error) {
            messageJson.msg = error.message;
            return response.json(messageJson);
        }
    } else {
        messageJson.msg = "Veuillez renseigner tous les champs.";
        return response.json(messageJson);
    }
}

/**
 * Fonctionnalité de génération d'une reférence
 * @param {express.Request} request
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
 exports.generateurRef = async (request, response) => {
    let messageJson = {msg : "", url : "", succes : false, data : null};
    messageJson.data = {ref : await generateur.generateRef()}
    messageJson.msg = "Reférence générée avec succès.";
    messageJson.succes = true;
    return response.json(messageJson);
}

/**
 * Fonctionnalité de selection aléatoire d'une annonce
 * @param {express.Request} request
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
 exports.annonceAleatoire = async (request, response) => {
    let messageJson = await {msg : "", url : "", succes : false, data : null};
    try {
        db.query("SELECT id_anncs from annonces", (anncsErr, anncsDatas) => {
            if(anncsErr) {
                messageJson.msg = anncsErr.message;
                return response.json(messageJson);
            }
            if(anncsDatas.length == 0) {
                messageJson.data = "Veuillez ajouter d'annonce.";
                return response.json(messageJson);
            }
            let idAnncsArray = anncsDatas.map(anncsData => anncsData.id_anncs);
            let id = generateur.generateur(idAnncsArray);
            db.query("SELECT * from annonces where id_anncs = ?", [id], (err, datas) => {
                if(err) {
                    messageJson.msg = anncsErr.message;
                    return response.json(messageJson);
                }
                let altAnnonce = datas[0];
                db.query("SELECT * from media where id_anncs = ?", [altAnnonce.id_anncs], (errMedia, datasMedia) => {
                    if(errMedia) {
                        messageJson.msg = errMedia.message;
                        return response.json(messageJson);
                    }
                    altAnnonce.media = datasMedia;
                    messageJson.data = altAnnonce;
                    messageJson.msg = "sélection ok";
                    messageJson.succes = true;
                    return response.json(messageJson);
                });
            });
        });
    } catch (error) {
        messageJson.msg = error.message;
        return response.json(messageJson);
    }
}

/**
 * Fonctionnalité de selection aléatoire d'une annonce d'un evenement
 * @param {express.Request} request {idEvent}
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
 exports.annonceAleatoireEvent = async (request, response) => {
    let messageJson = await {msg : "", url : "", succes : false, data : null};
    let idEvent = request.params.idEvent;
    if((idEvent != "" && idEvent != undefined && parseInt(idEvent) > 0)) {
        try {
            db.query("SELECT * from evenements where id_event = ?",[idEvent], (errEvent, datasEvent) => {
                if(errEvent) {
                    messageJson.msg = errEvent.message;
                    return response.json(messageJson);
                }
                if(datasEvent.length == 0) {
                    messageJson.msg = "Evenement introuvable.";
                    return response.json(messageJson);
                }
                db.query("SELECT id_anncs from annonces where id_event =?", [idEvent], (anncsErr, anncsDatas) => {
                    if(anncsErr) {
                        messageJson.msg = anncsErr.message;
                        return response.json(messageJson);
                    }
                    if(anncsDatas.length == 0) {
                        messageJson.data = "Veuillez ajouter d'annonce.";
                        return response.json(messageJson);
                    }
                    let idAnncsArray = anncsDatas.map(anncsData => anncsData.id_anncs);
                    let id = generateur.generateur(idAnncsArray);
                    db.query("SELECT * from annonces where id_anncs = ?", [id], (err, datas) => {
                        if(err) {
                            messageJson.msg = anncsErr.message;
                            return response.json(messageJson);
                        }
                        let altAnnonce = datas[0];
                        db.query("SELECT * from media where id_anncs = ?", [altAnnonce.id_anncs], (errMedia, datasMedia) => {
                            if(errMedia) {
                                messageJson.msg = errMedia.message;
                                return response.json(messageJson);
                            }
                            altAnnonce.media = datasMedia;
                            messageJson.data = altAnnonce;
                            messageJson.msg = "sélection ok";
                            messageJson.succes = true;
                            return response.json(messageJson);
                        });
                    });
                });
            });
        } catch (error) {
            messageJson.msg = error.message;
            return response.json(messageJson);
        }
    } else {
        messageJson.msg = "Veuillez vérifié l'url.";
        return response.json(messageJson);
    }
}

/**
 * Fonctionnalité de selection d'une annonce
 * @param {express.Request} request {id}
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
 exports.annonceSelector = async (request, response) => {
    let messageJson = await {msg : "", url : "", succes : false, data : null};
    let id = request.params.id;
    if((id != "" && id != undefined)) {
        let verif = await parseInt(id);
        if(verif == NaN) {
            messageJson.msg = "L'identifiant de l'annonce doit être numérique.";
            return response.json(messageJson);
        }
        console.log(verif);
        await db.query("SELECT * from annonces where id_anncs = ?", [id], (err, datas) => {
            if(err) {
                messageJson.msg = anncsErr.message;
                return response.json(messageJson);
            }
            if(datas.length == 0) {
                messageJson.msg = "Annonce non trouvée.";
                return response.json(messageJson);
            }
            let altAnnonce = datas[0];
            db.query("SELECT * from media where id_anncs = ?", [altAnnonce.id_anncs], (errMedia, datasMedia) => {
                if(errMedia) {
                    messageJson.msg = errMedia.message;
                    return response.json(messageJson);
                }
                altAnnonce.media = datasMedia;
                messageJson.data = altAnnonce;
                messageJson.msg = "sélection ok";
                messageJson.succes = true;
                return response.json(messageJson);
            });
        });
    } else {
        messageJson.msg = "Veuillez revérifier l'url.";
        return response.json(messageJson);
    }
}

/**
 * Fonctionnalité de selection aléatoire d'une annonce
 * @param {express.Request} request { variable }
 * @param {express.Response} response { msg, url, succes, data }
 * @returns Object
 */
 exports.fonction = async (request, response) => {
    let messageJson = {msg : "", url : "", succes : false, data : null};
    let { variable } = await request.body;
    if((variable != "" && variable != undefined)) {

    } else {
        messageJson.msg = "Veuillez renseigner tous les champs.";
        return response.json(messageJson);
    }
}