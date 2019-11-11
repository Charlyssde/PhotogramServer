const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var MensajeSchema = new Schema({
    idMensaje: {
        unique: true,
        required: true,
        type: String
    },
    
    contenido:{
        required: true,
        type: Array
    },
    editado:{
        required: true,
        type: String
    },
    fechaEnvio: {
        required: true,
        type: Date
    },

    tipo: {
        required: true,
        type:String
    },
    
})