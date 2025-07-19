const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://namasteNodejs:dS3l717NNZrKHbHi@ashish-mongodb.2oytwxp.mongodb.net/MainProject');
}

module.exports = connectDB;
