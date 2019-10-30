const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;