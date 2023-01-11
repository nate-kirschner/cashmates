const util = require("../utils/util");
const userDB = require("../databaseFunctions/user");

const bcrypt = require("bcryptjs");


exports.signup = async (body) => {
    const username = body.username;
    const password = body.password;
    const email = body.email;
    const firstname = body.firstname;
    const lastname = body.lastname;

    if (!username || !password || !email) {
        return util.buildResponse(401, {
          message: "All fields are required",
        });
    }

    const existingUser = await userDB.getUser(username)[0];
    if (existingUser && existingUser.username) {
        return util.buildResponse(401, {
            message: "User already exists",
        });
    }

    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
        email: email,
        username: username.toLowerCase(),
        password: encryptedPassword,
        firstname: firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase(),
        lastname: lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase()
    };

    const savedUserResponse = await userDB.saveUser(user);
    if (!savedUserResponse) {
        return util.buildResponse(503, { message: "server error" });
    }

    return util.buildResponse(200, { username: username });
}