const express = require("express");
const User = require("../models/user");

const handleSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).status(200).redirect("/");
    } catch (error) {
        return res.status(500).render("signin", { error: "Incorrect Email or Password!" });
    }
};

const handleSignUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const newUser = await User.create({
            fullName,
            email,
            password,
        });
        if (req.file) {
            profileImageUrl = `/images/${req.file.filename}`;
            const user = await User.findOneAndUpdate(
                { email },
                { profileImageUrl },
                {
                    new: true,
                }
            );
        }

        return res.status(201).redirect("signin");
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .render("signup", { message: "Failed to Create User", Problem: error });
    }
};

const handleLogOut = async (req, res) => {
    res.clearCookie("token").redirect("/");
};

module.exports = { handleSignIn, handleSignUp, handleLogOut };
