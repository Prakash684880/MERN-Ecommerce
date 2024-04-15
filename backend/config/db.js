
const mongoose = require('mongoose');
require('dotenv').config();


async function connectDb() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDb is connected successfully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;