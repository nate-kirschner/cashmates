const dbUtil = require("../utils/db");

exports.getRoomIdByUser = (userId) => {
    return dbUtil.makeQuery("select room_id from roommates where user_id = ?", [userId]);
}

exports.getRoommates = (roomId) => {
    return dbUtil.makeQuery("select * from roommates where room_id = ?", [roomId]);
}

exports.addRoommate = (roomId, userId) => {
    return dbUtil.makeQuery("insert into roommates (room_id, user_id) values (?, ?)", [roomId, userId]);
}

exports.removeRoommate = (roomId, userId) => {
    return dbUtil.makeQuery("delete from roommates where room_id = ? and user_id = ?", [roomId, userId]);
}