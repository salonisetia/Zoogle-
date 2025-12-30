const { type } = require("os");
const mongoose = require("./config");
const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_number: {
    type: String,
    required: true,
    unique: true,
  },
  business_name: {
    type: String,
    required: true,
  },
  business_category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
