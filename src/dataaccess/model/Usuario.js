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
    

})

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;