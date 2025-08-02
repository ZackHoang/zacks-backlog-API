const { Router } = require("express");
const { logIn } = require("../config/passportConfig");
const logInRoute = Router();

logInRoute.post("/", logIn);

module.exports = logInRoute;