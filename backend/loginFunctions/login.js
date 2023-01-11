const util = require("../utils/util");
const auth = require("../utils/auth");
const userDB = require("../databaseFunctions/user");

const bcrypt = require("bcryptjs");

exports.login = async (body) => {
    const username = body.username;
    const password = body.password;

    if (!username || !password) {
        return util.buildResponse(401, {
          message: "username and password is required",
        });
    }

    const user = await userDB.getUser(username);
    if (!user || !user.username || !bcrypt.compareSync(password, user.password)) {
        return util.buildResponse(401, {
            message: "Username or password is incorrect",
        });
    }

    const userInfo = {
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    };
    
    const token = auth.generateToken(userInfo);
    
    const response = {
        user: userInfo,
        token: token,
    };

    return util.buildResponse(200, response);
}