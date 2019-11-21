const express = require('express');
const app = express();
const config = require("../config");
const apiRoute = require('./routes/api.route');
const apiUsuarioRoute = require('./routes/api.usuario.route');
const apiImagenRoute = require('./routes/api.imagen.route');
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '10mb'}));
app.use("/api", apiRoute);
app.use('/api', apiUsuarioRoute);
app.use('/api', apiImagenRoute);

/**
 * Inicialización del servidor
 */
app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT);
})

module.exports = app;