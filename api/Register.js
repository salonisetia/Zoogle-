const mongoose = require("./config");
const registerSchema = new mongoose.Schema({
  Full_Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Confirm_Password: {
    type: String,
    required: true,
  },
});
const Register = mongoose.model("register", registerSchema);
module.exports = Register;
