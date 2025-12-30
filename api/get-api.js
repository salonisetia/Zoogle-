const profile = require("./Profiles");
module.exports = (req, res) => {
  if (req.url == "/") {
    res.send({ title: "Hello World!" });
  } else if (req.url == `/getProfile`) {
    profile
      .find()
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "No profile found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error fetching profile" });
      });
  } else if (req.url == `/getProfile/${req.params.id}`) {
    profile
      .findOne()
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "No profile found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error fetching profile" });
      });
  }
};
