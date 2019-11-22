const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ReaccionSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        requires: true,
    },
    fecha:{
        type: Date,
        required: true
    } 
});