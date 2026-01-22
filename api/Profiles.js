const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  contact_number: { type: String, required: true },
  business_name: { type: String, required: true },
  business_category: { type: String, required: true },
  description: { type: String },
  address: { type: String },
  image: { type: String }
});

// Text index for SearchProfile logic
profileSchema.index({ business_name: 'text', description: 'text', business_category: 'text' });

module.exports = mongoose.model("profiles", profileSchema);