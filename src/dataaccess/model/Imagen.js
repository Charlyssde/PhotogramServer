const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ImagenSchema = new Schema({
    name:{
        unique: true,
        required: true,
        type: String,
    },
    route:{
        required: true,
        type: String
    },
    fecha:{
        required: true,
        type: Date
    },
    bufferImg:{
        required: true,
        type: ArrayBuffer
    }
});

var Imagen = mongoose.model('Imagen', ImagenSchema);
module.exports = Imagen;