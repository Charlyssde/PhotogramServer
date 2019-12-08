require('dotenv').config()

const config = {
    MONGODB_TEST_CONNECTION_STRING: process.env.MONGODB_TEST_CONNECTION_STRING,
    PORT: process.env.PORT,
    BINDIND_IP: process.env.BINDIND_IP,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}


module.exports = config