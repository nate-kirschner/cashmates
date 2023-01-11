const util = require("../utils/util");
const auth = require("../utils/auth");

exports.verify = async (body) => {
    const username = body.username;
    const token = body.token;

    if (!username || !token) {
        return util.buildResponse(401, {
            verified: false,
            message: "Incorrect request body",
        });
    }

    const verification = auth.verifyToken(username, token);

    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }

    return util.buildResponse(200, {
        verified: true,
        message: "success",
        username: username,
        token: token,
    });
};