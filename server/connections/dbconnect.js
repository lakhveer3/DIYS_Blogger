const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/diy');
module.exports = mongoose.connection;
