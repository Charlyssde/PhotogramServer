const express = require('express');
const app = express();
const config = require("./config");
const apiRoute = require('./routes/api.route');
const apiImagenRoute = require('./routes/api.imagen.route');
const apiCommentReactionRoute = require('./routes/api.comentario_reaccion')
const apiModeradorRoute = require('./routes/api.moderador.route');
const apiUsuario = require("./routes/api.usuario.route");
const bodyParser = require("body-parser");
const Admin = require("./dataaccess/model/Usuario");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json({limit: '10mb'}));
app.use("/api", apiRoute);
app.use('/api', apiImagenRoute);
app.use('/api', apiCommentReactionRoute)
app.use('/api', apiModeradorRoute);
app.use("/api", apiUsuario)


app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT + "!");
})