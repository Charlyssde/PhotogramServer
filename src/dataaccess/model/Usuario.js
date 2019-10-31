const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

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
    apellidos:{
        required: true,
        type: String
    },
    correo: {
        required: true,
        type: String,
    },
    estadoCuenta: {
        required: true,
        type: String
    },
    fotoPerfil: {
        required: false,
        type: String
    },
    estado:{
        required: false,
        type: String
    }

})

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;