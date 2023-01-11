const dbUtil = require("../utils/db");

exports.createExpense = async (expense) => {
    const { roomId, name, description, due, amount, payTo, recurring } = expense;
    return dbUtil.makeQuery("insert into expense (room_id, name, description, due, amount, pay_to, recurring) values (?, ?, ?, ?, ?, ?, ?)", [roomId, name, description, due, amount, payTo, recurring])
}

exports.getExpenses = async (userId, roomId) => {
    return dbUtil.makeQuery(
        "select exp.id, exp.name, exp.description, exp.due, exp.amount as tot_amount, ind.amount as ind_amount, exp.pay_to, ind.paid " + 
        "from expense as exp " + 
        "left join individual_expense as ind on exp.id = ind.expense_id " + 
        "where exp.room_id = ? and ind.user_id = ?",
        [roomId, userId]
    )
}