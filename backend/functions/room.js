const roomDb = require('../databaseFunctions/room');
const roommatesDb = require("../databaseFunctions/roommates");

const util = require("../utils/util");

function generateUniqueId() {
    let id = ""
    const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i = 0; i < 10; i++) {
        let rand = Math.floor(Math.random() * 26)
        id += ALPHA.charAt(rand)
    }
    return id
}

exports.createRoom = async (body) => {
    const roomName = body.roomName;
    const userId = body.userId;

    if (!roomName || !userId) {
        return util.buildResponse(401, {
          message: "All fields are required",
        });
    }

    uniqueId = generateUniqueId()

    // Create the room
    const createResponse = await roomDb.createRoom(roomName, uniqueId);
    const roomId = createResponse.insertId;

    // Add self as roommate
    await roommatesDb.addRoommate(roomId, userId);

    return util.buildResponse(200, {
        roomId,
    });
}

exports.joinRoom = async (body) => {
    const userId = body.userId;
    const roomUniqueId = body.uniqueId;

    if (!userId || !roomUniqueId) {
        return util.buildResponse(401, {
          message: "All fields are required",
        });
    }

    const roomInfo = await roomDb.getRoomByUniqueId(roomUniqueId)[0];

    await roommatesDb.addRoommate(roomInfo.id, userId);

    return util.buildResponse(200, {
        roomId: roomInfo.id,
    })

}