const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const { Auth } = require("./middleware/auth");
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

//Global route that render home page from views folder
app.use("/user", userRoutes);
app.get("/", (req, res) => {
    return res.render("home", {
        user: req.user,
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
