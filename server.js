const express = require("express");
const cors = require("cors");
const session = require('express-session');
const path = require("path");
const fs = require('fs');
require("dotenv").config();

let MongoStore = require('connect-mongo');
if (typeof MongoStore.create !== 'function') {
    MongoStore = MongoStore.default;
}

const auth = require("./routes/auth");
require("./api/config");

const app = express();

if (!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
}

app.use(session({
  secret: 'zoogle_secret_key', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true,
    secure: false 
  }
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mapping static folders
app.use("/home", express.static(path.join(__dirname, "home")));
app.use("/about", express.static(path.join(__dirname, "about")));
app.use("/login", express.static(path.join(__dirname, "login")));
app.use("/sign_up", express.static(path.join(__dirname, "sign_up")));
app.use("/user_profile", express.static(path.join(__dirname, "user_profile")));
app.use("/profile", express.static(path.join(__dirname, "profile")));
app.use("/card", express.static(path.join(__dirname, "card")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home", "index.html"));
});

// Added Logout handler
app.post("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "Logged out" });
});

app.use(auth);

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5550;

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});