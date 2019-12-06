const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ImagenSchema = new Schema({
    path:{
        required: true,
        unique: true,
        type: String
    },
    username:{
        required: true,
        type: String,
    },
    fecha:{
        required: true,
        type: Date
    },
    comentarios:{
        required: false,
        type: Array,
    },
<<<<<<< Updated upstream
    reacciones:{
        required:false,
        type: Array,
    },
    favorito:{
        required: false,
=======
    reaccion:{
        required: false,
        type: Array

>>>>>>> Stashed changes
    }
});

var Imagen = mongoose.model('Imagen', ImagenSchema);
module.exports = Imagen;