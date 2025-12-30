const Register = require("./Register");
const Profiles = require("./Profiles");

module.exports = (req, res) => {
  //Register User
  if (req.url == "/insert-records") {
    // console.log(req.body);
    const { Full_Name, email, Password, Confirm_Password } = req.body;
    const register = new Register({
      Full_Name,
      email,
      Password,
      Confirm_Password,
    });
    register
      .save()
      .then(() => {
        res.status(201).json({ message: "Record Saved" });
      })
      .catch((error) => {
        res
          .status(409)
          .json({ message: error.message || "Registration failed" });
      });
  } else if (req.url == "/insert-profile") {
    const {
      email,
      contact_number,
      business_name,
      business_category,
      description,
      address,
      image,
    } = req.body;
    const profiles = new Profiles({
      email,
      contact_number,
      business_name,
      business_category,
      description,
      address,
      image,
    });
    profiles
      .save()
      .then(() => {
        res.status(201).json({ message: "Record Saved" });
      })
      .catch((error) => {
        res
          .status(409)
          .json({ message: error.message || "Registration failed" });
      });
  } else if (req.url == "/check-users") {
    const { Email, Password } = req.body;
    Register
      .findOne({ $and: [{ email: Email }, { Password: Password }] })
      .then((data) => {
        if (data) {
          res.status(200).json({ message: data });
        } else {
          res.status(404).json({ message: "Invalid Username or Password" });
        }
      })
      .catch((error) => {
        res.status(404).json({ message: error });
      });
  } else if (req.url == "/update-profile") {
    const {
      email,
      contact_number,
      business_name,
      business_category,
      description,
      address,
      image,
    } = req.body;
    
    Profiles
      .findOneAndUpdate(
        { email: email },
        {
          contact_number,
          business_name,
          business_category,
          description,
          address,
          image,
        },
        { new: true, upsert: true }
      )
      .then((data) => {
        res.status(200).json({ message: "Profile updated successfully", data: data });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message || "Profile update failed" });
      });
  } else if(req.url == "/SearchProfile"){
    const{
      txt
    } = req.body;

    Profiles.find({$text:{$search:txt}})
    .then((data)=>{
      if(data){
        res.status(200).json({data});
      }
      else{
        res.status(400).json({message:"No Result Found"});
      }
    })
    .catch((error) => {
        res.status(500).json({ message:"Error fetching profile" });
      });
  }
};