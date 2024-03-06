const express = require("express");
const fs = require("fs");
const router = express.Router();
const { handleCreateBlog, handleGetBlog  , handleCreateComment, handleBlogEdit} = require("../controllers/blog");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");

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


//edit and delete routes
router.get("/edit/:blogId", async (req, res) => {
    try {
        console.log(req.params.blogId);
        const blog = await Blog.findById(req.params.blogId);
        console.log(blog);
        return res.render("editBlog", { user: req.user, blog });
    } catch (error) {
        console.log(error);
    }
});

router.get("/delete/:id", async (req, res) => {
    try {
        
        await Blog.findByIdAndDelete(req.params.id);
        return res.redirect("/");
    } catch (error) {
        console.log(error);
    }

});

router.post("/edit/:id" , handleBlogEdit);

module.exports = router;
