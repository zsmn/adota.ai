const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_USR || "mongodb+srv://adotaai:zilpirocada@cluster0.mjf69.mongodb.net/adota-ai?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;