const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var SchemaModerador = new Schema ({
    username: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

var Moderador = mongoose.model('Moderador', SchemaModerador);
module.exports = Moderador;