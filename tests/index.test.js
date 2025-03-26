const request = require("supertest");
const app = require("../app");
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.error(err));

  mongoose.connection.on("error", (err) => {
    console.error(`${err.message}`);
  });
}

describe("Express API Tests", () => {
  test("GET /hello should return Hello, World!", async () => {
    const response = await request(app).get("/hello");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Hello, World!" });
  });

  test("POST /echo should return the same message", async () => {
    const response = await request(app)
      .post("/echo")
      .send({ message: "Test Message" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Test Message" });
  });
});
