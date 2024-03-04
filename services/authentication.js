const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function createToken(user) {
    const payload = {
        _id: user._id,
        name : user.fullName,
        email: user.email,
        profileImageURL: user.profileImageUrl,
        role: user.role,
    };

    const token = JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token , process.env.SECRET_KEY);
    return payload;
}

module.exports = {createToken , validateToken};
