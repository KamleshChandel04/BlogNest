const Blog = require("../models/blog");

const handleCreateBlog = async (req, res) => {
    const { title, body } = req.body;
    try {
        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.user.name}/${req.file.filename}`,
        });
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        return res.status(400).send(`Failed to Create Blog : ${error}`);
    }
};

module.exports = { handleCreateBlog };
