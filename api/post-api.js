const Register = require("./Register");
const Profiles = require("./Profiles");

module.exports = (req, res) => {
  if (req.url == "/insert-records") {
    const { Full_Name, email, Password, Confirm_Password } = req.body;

    return Register.findOne({ email: email })
      .then((existingUser) => {
        if (existingUser) return res.status(409).json({ message: "Email already exists." });
        const register = new Register({ Full_Name, email, Password, Confirm_Password });
        return register.save();
      })
      .then((user) => {
        if (user && !res.headersSent) {
          req.session.userId = user._id;
          req.session.userEmail = user.email;
          req.session.userName = user.Full_Name;
          return res.status(201).json({ message: "Registration successful!", user });
        }
      })
      .catch((error) => !res.headersSent && res.status(500).json({ message: error.message }));

  } else if (req.url == "/check-users") {
    const { Email, Password } = req.body;
    return Register.findOne({ email: Email, Password: Password })
      .then((user) => {
        if (user) {
          req.session.userId = user._id;
          req.session.userEmail = user.email;
          req.session.userName = user.Full_Name;
          return res.status(200).json({ message: user });
        }
        return res.status(401).json({ message: "Invalid credentials" });
      })
      .catch(() => !res.headersSent && res.status(500).json({ message: "Server error" }));

  } else if (req.url == "/insert-profile" || req.url == "/update-profile") {
    const { email, ...updateData } = req.body;
    return Profiles.findOneAndUpdate({ email }, updateData, { new: true, upsert: true })
      .then((data) => res.status(200).json({ message: "Profile saved", data }))
      .catch((err) => !res.headersSent && res.status(500).json({ message: err.message }));
  }
};