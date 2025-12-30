const express = require("express");
const getApi = require("../api/get-api");
const postApi = require("../api/post-api");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        var temp_file_arr = file.originalname.split(".");
        const file_name = `${Date.now()}.${temp_file_arr[1]}`;
        cb(null, file_name);
    },
});

const upload = multer({
    storage: storage
}).single("myfile");

router.post("/upload-image", upload, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please select a file" });
    }
    
    // Simple file type check
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Please select an image file (JPEG, PNG, GIF, WebP)" });
    }
    
    const fname = req.file.filename;
    const originalName = req.file.originalname;
    const fileSize = req.file.size;
    
    res.status(200).json({ 
        message: "Image uploaded successfully",
        filename: fname,
        originalName: originalName,
        size: fileSize,
        path: `/uploads/${fname}`
    });
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Upload error: ' + error.message });
    }
    res.status(500).json({ message: 'Upload failed', error: error.message });
});

router.get("/", (req, res) => {
  getApi(req, res);
});

router.get("/display", (req, res) => {
  getApi(req, res);
});
router.get("/getProfile", (req, res) => {
  getApi(req, res);
});
router.get("/getProfile/:id", (req, res) => {
  getApi(req, res);
});

router.post("/insert-records", (req, res) => {
  postApi(req, res);
});

router.post("/insert-profile", (req, res) => {
  postApi(req, res);
});

router.post("/check-users", (req, res) => {
  postApi(req, res);
});

router.post("/update-profile", (req, res) => {
  postApi(req, res);
});

router.post("/SearchProfile", (req, res) => {
  postApi(req, res);
});

module.exports = router;
