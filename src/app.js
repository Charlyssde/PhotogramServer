const express = require('express');
const app = express();
const config = require("./config/default");
const apiRoute = require('./routes/api.route');
const apiUsuarioRoute = require('./routes/api.usuario.route');
const apiImagenRoute = require('./routes/api.imagen.route');
const apiCommentReactionRoute = require('./routes/api.comentario_reaccion')
const apiModeradorRoute = require('./routes/api.moderador.route');
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '10mb'}));
app.use("/api", apiRoute);
app.use('/api', apiUsuarioRoute);
app.use('/api', apiImagenRoute);
app.use('/api', apiCommentReactionRoute)
app.use('/api', apiModeradorRoute);

/**
 * Inicialización del servidor
 */
app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT);
})

app.use('/static', express.static('imgs'));
module.exports = app;