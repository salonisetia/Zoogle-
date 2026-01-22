const ProfileModel = require("./Profiles"); // Imports the Mongoose model

module.exports = (req, res) => {
  // 1. Root API Check
  if (req.url === "/") {
    return res.status(200).send({ title: "Zoogle API Active" });
  }

  // 2. Get All Profiles (Fixes: Profiles.find is not a function)
  if (req.url === "/getProfile") {
    return ProfileModel.find()
      .then((data) => {
        if (data && data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "No profiles found" });
        }
      })
      .catch((err) => {
        console.error("Database Error:", err);
        res.status(500).json({ message: "Error fetching profiles" });
      });
  }

  // 3. Get Current User Session (For Live Authentication)
  if (req.url === "/me") {
    if (req.session && req.session.userId) {
      return res.json({
        authenticated: true,
        Full_Name: req.session.userName,
        email: req.session.userEmail
      });
    } else {
      return res.json({ authenticated: false });
    }
  }

  // 4. Get Profile by ID
  // Note: req.params.id is populated by the router in auth.js
  if (req.params && req.params.id) {
    return ProfileModel.findById(req.params.id)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "Profile not found" });
        }
      })
      .catch((err) => {
        console.error("ID Fetch Error:", err);
        res.status(500).json({ message: "Error fetching profile by ID" });
      });
  }
};