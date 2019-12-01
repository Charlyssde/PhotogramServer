const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

/**
 * Creacion del esquema con los elementos del usuario
 */
var UsuarioSchema = new Schema({
    username: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    nombre: {
        required: true,
        type: String
    },
    apellidoPaterno:{
        required: true,
        type: String
    },
    apellidoMaterno:{
        required: true,
        type: String
    },
    correo: {
        required: true,
        type: String
    },
    estadoCuenta: {
        required: true,
        type: String
    },
    estado:{
        required: false,
        type: String
    },
    amigos:{
        required: false,
        type: Array
    }

})

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;