require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const signUpRoute = require("./routes/signUpRoute");
const logInRoute = require("./routes/logInRoute");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/sign-up", signUpRoute);
app.use("/log-in", logInRoute);

app.listen(parseInt(PORT), () => {
  console.log("Running");
});
