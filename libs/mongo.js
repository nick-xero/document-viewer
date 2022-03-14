const mongoose = require('mongoose');

const uri = 'mongodb://localhost/document-viewer?maxPoolSize=20&w=majority';

const mongo = mongoose.createConnection(uri);

module.exports = { mongo };
