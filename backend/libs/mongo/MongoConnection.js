const mongoose = require("mongoose");
// Connection URI
const uri =
  "mongodb://localhost/document-viewer?maxPoolSize=20&w=majority";
// Create a new MongoClient

const mongo = mongoose.createConnection(uri)

module.exports = {mongo}
