const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const config = require("./config/default");
const apiRoute = require('./routes/api.route');
const apiUsuarioRoute = require('./routes/api.usuario.route');
const apiImagenRoute = require('./routes/api.imagen.route');
const apiCommentReactionRoute = require('./routes/api.comentario_reaccion')
const apiModeradorRoute = require('./routes/api.moderador.route');
const chat = require('./routes/api.chat.route');
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

app.use("/api", apiRoute);
app.use('/api', apiUsuarioRoute);
app.use('/api', apiImagenRoute);
app.use('/api', apiCommentReactionRoute)
app.use('/api', apiModeradorRoute);
chat(app, io);

/**
 * Inicialización del servidor
 */


server.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT);
})



app.use('/static', express.static('imgs'));
module.exports = app;