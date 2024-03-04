const Blog = require("../models/blog");


const handleCreateBlog = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
};

module.exports = { handleCreateBlog };
