const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const app = express();

//config .env file
const dotenv = require("dotenv");
dotenv.config();

//set Ejs as view  engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//For Parsing Form Data
app.use(express.urlencoded({ extended: false }));

//Global route that render home page from views folder
app.use("/user", userRoutes);
app.get("/", (req, res) => {
    return res.render("home");
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
