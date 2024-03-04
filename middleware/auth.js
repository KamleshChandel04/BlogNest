const { validateToken } = require("../services/authentication");

function Auth(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
           return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.log("Token Validation Failed : ", error);
        }
        return next();
    };
}

module.exports = { Auth };
