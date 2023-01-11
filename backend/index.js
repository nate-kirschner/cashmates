const signupService = require('./service/signup')
const loginService = require('./service/login')
const verifyService = require('./service/verify')
const roomService = require('./service/room')
const expenseService = require('./service/expenses')

const util = require('./utils/util')

exports.handler = async (event) => {
    const { httpMethod, resource } = event;
    const requestBody = JSON.parse(event.body);

    let response;

    if (httpMethod === "POST" && resource === "/signup") {
        response = await signupService.signup(requestBody);
    } else if (httpMethod === "POST" && resource === "/login") {
        response = await loginService.login(requestBody);
    } else if (httpMethod === "POST" && resource === "/verify") {
        response = await verifyService.verify(requestBody);
    } else if (httpMethod === "POST" && resource === "/joinroom") {
        response = await roomService.joinRoom(requestBody);
    } else if (httpMethod === "POST" && resource === "/createroom") {
        response = await roomService.createRoom(requestBody);
    } else if (httpMethod === "POST" && resource === "/addnewexpense") {
        response = await expenseService.addNewExpense(requestBody);
    } else if (httpMethod === "POST" && resource === "/expenses") {
        response = await expenseService.getExpenses(requestBody);
    } else {
        response = util.buildResponse(404, "404 Not Found");
    }

    return response;
}