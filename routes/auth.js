const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const getApi = require("../api/get-api");
const postApi = require("../api/post-api");

// 1. MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage: storage }).single("myfile");

// 2. IMAGE UPLOAD ROUTE
router.post("/upload-image", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: "Multer Error", error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: "No file selected." });
        }
        // Return JSON so the frontend doesn't get a '<!DOCTYPE' error
        return res.status(200).json({ filename: req.file.filename });
    });
});

// 3. GET ROUTES
router.get("/me", (req, res) => getApi(req, res));
router.get("/getProfile", (req, res) => getApi(req, res));

// 4. POST ROUTES
router.post("/insert-records", (req, res) => postApi(req, res));
router.post("/check-users", (req, res) => postApi(req, res));
router.post("/insert-profile", (req, res) => postApi(req, res));
router.post("/update-profile", (req, res) => postApi(req, res));
router.post("/SearchProfile", (req, res) => postApi(req, res));

module.exports = router;