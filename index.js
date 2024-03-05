const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const { Auth } = require("./middleware/auth");
const Blog = require("./models/blog");
const app = express();

//config .env file
const dotenv = require("dotenv");
dotenv.config();

//set Ejs as view  engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//For Parsing Form Data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(Auth("token"));
app.use(express.static(path.resolve("./public")));

//Global route that render home page from views folder
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

//connect to Mogno DB
mongoose
    .connect(process.env.CONNECTION_URL)
    .then(
        app.listen(process.env.PORT, () => {
            console.log(`Sever Running On Port : ${process.env.PORT}`);
        })
    )
    .catch((err) => console.log(`Server Not Responding : ${err}`));
