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
});

var Imagen = mongoose.model('Imagen', ImagenSchema);
module.exports = Imagen;