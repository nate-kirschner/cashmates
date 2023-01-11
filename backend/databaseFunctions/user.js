const dbUtil = require("../utils/db");

exports.getUser = async (username) => {
    return dbUtil.makeQuery("select id, username, password, email, firstname, lastname from user where username = ?", [username]);
}

exports.saveUser = async ({ username, email, password, firstname, lastname }) => {
    return dbUtil.makeQuery("insert into user (username, password, email, firstname, lastname) values (?, ?, ?, ?, ?)", [username, password, email, firstname, lastname]);
}




