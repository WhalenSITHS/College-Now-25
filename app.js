const express = require("express");
const port = process.env.PORT || 3000;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
require("./DB/mongoose");
const routes = require("./Routes/index");
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "College Now API",
      version: ".7",
      description: " My teacher made me do this",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./app.js", "./Routes/index.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

app.use("/", routes);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
