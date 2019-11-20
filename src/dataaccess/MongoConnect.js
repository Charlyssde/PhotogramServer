const mongoose = require("mongoose");

const server= 'desarrollosuv-bp8su.mongodb.net'
const database= 'photogram_db'
const user= 'rodrigoOP'
const password= 'r91C98A98'
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/test?retryWrites=true&w=majority`)

module.exports = mongoose;