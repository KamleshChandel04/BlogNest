const express = require("express");
const router = express.Router();
const { handleSignIn, handleSignUp , handleLogOut} = require("../controllers/user");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//Creating Storage using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Dynamic destination path based on user's name
        const userUploadDir = path.resolve(`./public/images`);
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

//For Get Routes Just Render The SignIn / SignUp Page from Views
router.get("/signin", (req, res) => {
    return res.render("signin");
});
router.get("/signup", (req, res) => {
    return res.render("signup");
});

//For Post Routes Use Route Handler From Controllers
//For Post Routes Use Route Handler From Controllers
router.post("/signin", handleSignIn);
router.post("/signup",upload.single("profileImage") , handleSignUp);
router.get("/logout", handleLogOut);

module.exports = router;
