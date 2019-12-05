const express = require('express');
const app = express();
const apiRoute = require("./routes/api.route");
const apiUsuario = require("./routes/api.usuario.route");
const bodyParser = require("body-parser");
const Admin = require("./dataaccess/model/Usuario");
const jwt = require("jsonwebtoken");
const config = require("./config");

app.use(bodyParser.json({limit: '10mb'}));
app.use("/api", apiRoute);
app.use("/api", apiUsuario)


app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT + "!");
})