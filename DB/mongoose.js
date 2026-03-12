const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect("connection string goes here", {})
  .then(() => console.log("connected to DB"));

mongoose.connection.on("error", (err) => {
  console.error(`${err.message}`);
});
