const mongoose = require("../MongoConnect")
const Schema = mongoose.Schema

var FotoSchema = new Schema ({
    username :{
        type: String,
        required: true,
    },
    fecha :{
        type: Date,
        required: true
    },
    path:{
        type: String,
        required: true
    },
    //Podríamos tener variables comentarios y reacciones, a considerar.

})

var Foto = mongoose.model('Foto', FotoSchema)
module.exports= Foto