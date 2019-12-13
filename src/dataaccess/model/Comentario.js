const mongoose = require("../MongoConnect");

const Schema = mongoose.Schema;

var ComentarioSchema = new Schema({
    username:{
        unique: true,
        required: true,
        type: String,
    },
    fecha:{
        required: true,
        unique: true,
        type: Number,
    },
    contenido:{
        required: true,
        unique: false,
        type: String,
    }
});

var Comentario = mongoose.model('Comentario', ComentarioSchema);
module.exports = Comentario;