const expenseDb = require('../dao/expense');
const individualExpenseDb = require('../dao/individualExpense');

const util = require('../utils/util');

exports.addNewExpense = async (body) => {
    const userId = body.userId;
    const roomId = body.roomId;
    const { name, description, totalAmount, amounts, payTo, due, alerts } = body.expense;

    if (!userId || !roomId || !name || description === undefined || totalAmount === undefined || !amounts || payTo === undefined || !due || !alerts) {
        return util.buildResponse(401, {
          message: "All fields are required",
        });
    }

    const expense = {
        roomId,
        name,
        description,
        due,
        amount: totalAmount,
        payTo,
    }
    const expenseCreatedResp = await expenseDb.createExpense(expense);
    if (!expenseCreatedResp) {
        return util.buildResponse(401, {
            message: "server error",
        });
    }
    const expenseId = expenseCreatedResp.insertId;

    amounts.forEach(async obj => {
        const individualExpense = {
            expenseId,
            userId: obj.id,
            amount: obj.amount,
        }
        const indExpResp = await expenseDb.createExpense(individualExpense);
        if (!indExpResp) {
            return util.buildResponse(401, {
                message: "server error",
            });
        }
    })

    return util.buildResponse(200, {
        message: "success",
    });
}