const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
require("./DB/mongoose");
const routes = require("./Routes/index");
//routes imported from routes folder
app.use(express.json());
//app.use(express.urlencoded());
app.use("/", routes);
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
