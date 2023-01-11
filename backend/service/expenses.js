const expenseDb = require('../dao/expense');
const individualExpenseDb = require('../dao/individualExpense');

const util = require('../utils/util');

exports.getExpenses = async (body) => {
    const userId = body.userId;
    const roomId = body.roomId;

    if (!userId || !roomId) {
        return util.buildResponse(401, {
            message: "Insufficient Parameters",
        });
    }

    const response = await expenseDb.getExpenses(userId, roomId);
    if (!response) {
        return util.buildResponse(401, {
            message: "Server Error",
        });
    }

    return util.buildResponse(200, response);
}

exports.addNewExpense = async (body) => {
    const userId = body.userId;
    const roomId = body.roomId;
    const { name, description, totalAmount, amounts, payTo, recurring, due, alerts } = body.expense;

    if (!userId || !roomId || !name || description === undefined || totalAmount === undefined || !amounts || payTo === undefined || !due || !alerts) {
        return util.buildResponse(401, {
            message: "Insufficient Parameters",
        });
    }

    const expense = {
        roomId,
        name,
        description,
        due,
        amount: totalAmount,
        payTo,
        recurring
    }
    const expenseCreatedResp = await expenseDb.createExpense(expense);
    if (!expenseCreatedResp) {
        return util.buildResponse(401, {
            message: "server error",
        });
    }
    const expenseId = expenseCreatedResp.insertId;

    for (let i = 0; i < amounts.length; i++) {
        const individualExpense = {
            expenseId,
            userId: amounts[i].id,
            amount: amounts[i].amount,
        }
        console.log(individualExpense)
        const indExpResp = await individualExpenseDb.createExpense(individualExpense);
        console.log("resp", indExpResp)
        if (!indExpResp) {
            return util.buildResponse(401, {
                message: "server error",
            });
        }
    }

    return util.buildResponse(200, {
        message: "success",
    });
}