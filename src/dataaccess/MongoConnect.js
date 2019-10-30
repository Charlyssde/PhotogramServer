const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/photogram", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports = mongoose;