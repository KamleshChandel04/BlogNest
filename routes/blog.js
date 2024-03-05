const express = require("express");
const fs = require("fs");
const router = express.Router();
const { handleCreateBlog, handleGetBlog  , handleCreateComment} = require("../controllers/blog");
const multer = require("multer");
const path = require("path");

//Creating Storage using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Dynamic destination path based on user's name
        const userUploadDir = path.resolve(`./public/uploads/${req.user.name}`);
        if (!fs.existsSync(userUploadDir)) {
            fs.mkdirSync(userUploadDir, { recursive: true });
        }
        //callback funtion (error , result(path))
        cb(null, userUploadDir);
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
router.get("/:id", handleGetBlog);

// ------Comments--------
router.post('/comment/:blogId' , handleCreateComment)


module.exports = router;
