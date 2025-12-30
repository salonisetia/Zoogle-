const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect("mongodb://127.0.0.1:27017/backend_with_mongo")
.then(()=>{
  console.log("Connection created");
})
.catch(()=>{
  console.log("Connection failed");
})
mongodb:module.exports=mongoose;