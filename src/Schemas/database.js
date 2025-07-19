const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://namasteNodejs:EG92UZXr5Zti8Gmw@ashish-mongodb.2oytwxp.mongodb.net/');
}

module.exports = connectDB;
