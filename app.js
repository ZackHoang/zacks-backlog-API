require("dotenv").config();
const app = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors);

app.listen(parseInt(PORT), () => {
  console.log("Running");
});
