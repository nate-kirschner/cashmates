const dbUtil = require("../utils/db");

exports.getRoomByUniqueId = (uniqueId) => {
    return dbUtil.makeQuery("select * from room where unique_id = ?", [uniqueId]);          
}

exports.createRoom = (roomName, uniqueId) => {
    console.log("creating room with", roomName, uniqueId)
    return dbUtil.makeQuery("insert into room (name, unique_id) values (?, ?)", [roomName, uniqueId]);
}

exports.changeRoomName = (roomName, uniqueId) => {
    return dbUtil.makeQuery("update room set name = ? where unique_id = ?", [roomName, uniqueId]);
}