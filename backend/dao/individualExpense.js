const dbUtil = require("../utils/db");

exports.createExpense = async ({ expenseId, userId, amount}) => {
    return dbUtil.makeQuery("insert into individual_expense (expense_id, user_id, amount) values (?, ?, ?)", [expenseId, userId, amount])
}