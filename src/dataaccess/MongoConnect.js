const mongoose = require("mongoose");

const server= 'desarrollosuv-bp8su.mongodb.net'
const port= '27017'
const database= 'photogram_db'
const user= 'rodrigoOP'
const password= 'r91C98A98'
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
})

module.exports = mongoose;