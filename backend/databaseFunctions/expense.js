const dbUtil = require("../utils/db");

exports.createExpense = async (expenses) => {
    let query = "insert into expense (user_id, room_id, name, description, due, amount, pay_to, paid) values ";
    let params = []
    expenses.map((expense, index) => {
        const { userId, roomId, name, description, due, amount, payTo, paid } = expense;
        if (index != 0) {
            query += ", ";
        }
        query += "(?, ?, ?, ?, ?, ?, ?, ?)";
        params.push(userId, roomId, name, description, due, amount, payTo, paid);
    })
    
    return dbUtil.makeQuery(query, params)
}