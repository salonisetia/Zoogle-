const express=require("express");
var cors = require("cors");
const auth = require("./routes/auth");
const app=express();
app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));
require("dotenv").config();   //to add env file

var host=process.env.HOST || "localhost";
var port=process.env.PORT || 5550;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(auth);

app.listen(port,host, () => {
  console.log(`Example app listening on port ${port}`)
});

