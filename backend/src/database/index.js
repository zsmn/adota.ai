const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_USR, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;