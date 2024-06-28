// Set up mongoose connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://user-123:Papa7758$@clusterreps.w6x6iki.mongodb.net/?retryWrites=true&w=majority&appName=ClusterReps', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
