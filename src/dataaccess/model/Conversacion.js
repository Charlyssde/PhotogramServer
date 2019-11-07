const mongoose = require("../MongoConnect");
const Mensaje = require("./Mensaje");
const Schema = mongoose.Schema;

var ConversacionSchema = new Schema({
    usuarios:{
        required: true,
        type: Array,   
    },

    mensajes:{
        required: true,
        type: Array,
    },
});

var Conversacion = mongoose.model('Conversacion', ConversacionSchema);
module.exports = Conversacion;