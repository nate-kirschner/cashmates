const util = require("../utils/util");
const auth = require("../utils/auth");

const userDB = require("../dao/user");
const roomDB = require("../dao/room");
const roommatesDb = require('../dao/roommates');

const bcrypt = require("bcryptjs");

exports.login = async (body) => {
    const username = body.username;
    const password = body.password;

    if (!username || !password) {
        return util.buildResponse(401, {
          message: "username and password is required",
        });
    }

    const user = await userDB.getUser(username)[0];
    if (!user || !user.username || !bcrypt.compareSync(password, user.password)) {
        return util.buildResponse(401, {
            message: "Username or password is incorrect",
        });
    }

    const userInfo = {
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id
    };

    const room = await roommatesDb.getRoomIdByUser(userInfo.id)[0]
    let roomId;
    if (!room || !room.room_id) {
        roomId = null;
    } else {
        roomId = room.room_id;
    }
    
    const token = auth.generateToken(userInfo);
    
    const response = {
        user: userInfo,
        roomId: roomId,
        token: token,
    };

    return util.buildResponse(200, response);
}