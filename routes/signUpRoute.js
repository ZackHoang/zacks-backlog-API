const { Router } = require("express");
const { signUp } = require("../controllers/signUpController");
const signUpRoute = Router();

signUpRoute.post("/", signUp);

module.exports = signUpRoute;