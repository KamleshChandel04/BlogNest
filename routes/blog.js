const express = require("express");
const fs = require("fs");
const router = express.Router();
const { handleCreateBlog } = require("../controllers/blog");
const multer = require("multer");
const path = require("path");

//Creating Storage using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userDir = path.resolve(`../public/uploads/${req.user._id}`);
        // Ensure the user's directory exists, create it if it doesn't
        fs.mkdirSync(userDir, { recursive: true });
        //callback funtion (error , result(path))
        cb(null, userDir);
    },
    filename: function (req, file, cb) {
        //Creating a unique filename using Date.now()
        const fileName = `${Date.now()}-${file.originalname}`;
        //callback-function (error , filename)
        cb(null, fileName);
    },
});

//Instance of Multer
const upload = multer({ storage: storage });

// ------Routes--------

//Get routes at Add-new route using Add-Blog
router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.post("/", upload.single("coverImage"), handleCreateBlog);

module.exports = router;
