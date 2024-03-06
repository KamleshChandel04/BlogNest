const Blog = require("../models/blog");
const Comment = require("../models/comment");

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
        return res.render("addBlog", { user: req.user, error: "All fields are mandatory" });
    }
};

const handleGetBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    return res.render("blog", {
        user: req.user,
        blog,
        comments,
    });
};

const handleCreateComment = async (req, res) => {
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });
        return res.status(201).redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        return res.status(400).redirect(`/blog/${req.params.blogId}`);
    }
};

const handleBlogEdit  = async(req ,res)=>{

    try {
        
        const blog = await Blog.findById(req.params.id);
        
        blog.title = req.body.title || blog.title;
        blog.body = req.body.body || blog.body;
        
        await blog.save();
        
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { handleCreateBlog, handleGetBlog, handleCreateComment , handleBlogEdit };
