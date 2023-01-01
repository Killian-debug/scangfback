require("dotenv").config();
const express = require("express");
const excookieParser = require("cookie-parser");
const cros = require("./vendor/functions/corsApi");
const router = require("./vendor/routers/route");

const port = process.env.SERVER_PORT;
const apiVersion = process.env.API_VERSION;
let app = express();

app.use(express.static('./vendor/uploads'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cros);
app.use(excookieParser());
app.use(apiVersion,router);

let server = app.listen(port, () => {
    console.log("Server lancer sur le port : " + port);
});