const mongoose = require('mongoose');
require("dotenv").config();

// Use the CONNECTION_STRING from your .env file
const dbURI = process.env.CONNECTION_STRING;

mongoose.connect(dbURI)
.then(() => {
  console.log("Live MongoDB Atlas Connection Created");
})
.catch((err) => {
  console.log("Connection Failed. Error:", err.message);
});

module.exports = mongoose;