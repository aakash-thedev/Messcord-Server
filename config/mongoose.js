const mongoose = require('mongoose');

// to prevent this warning : DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
mongoose.set('useCreateIndex', true);

// store it in a variable
mongoose.connect('mongodb://localhost/PingMessagingApp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// if there is any error
db.on('error', console.error.bind(console, 'error connecting to database'));

// if successfull
db.once('open', () => console.log("Database Connected successfully"));

module.exports = db;