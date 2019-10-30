const express = require('express');
const app = express();
const config = require("../config");
const apiRoute = require('./routes/api.route');

app.use("/api", apiRoute);

app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT + "!");
})