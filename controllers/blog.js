const Blog = require("../models/blog");

const handleCreateBlog = async (req, res) => {
    const { title, body } = req.body;

    //if user Not uploaded the file then it will use the image form images folder
    let imagePath = "/images/NoPost.png";

    //if user uploaded the file then it will get the dynamic path
    if (req.file?.filename) imagePath = `/uploads/${req.user.name}/${req.file.filename}`;

    try {
        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImageURL: imagePath,
        });
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        return res.status(400).send(`Failed to Create Blog : ${error}`);
    }
};

const handleGetBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.render("blog", {
        user: req.user,
        blog,
    });
};

module.exports = { handleCreateBlog, handleGetBlog };
