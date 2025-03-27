/* const request = require("supertest");
const app = require("../app");
const Store = require("../Models/Stores");

jest.mock("../Models/Stores");

describe("GET /stores", () => {
  it("should return paginated results", async () => {
    const mockStores = [{ name: "Mock Store 1" }, { name: "Mock Store 2" }];

    const skip = jest.fn().mockReturnThis();
    const limit = jest.fn().mockResolvedValue(mockStores);

    Store.find.mockReturnValue({ skip, limit });
    Store.countDocuments.mockResolvedValue(20);

    const res = await request(app).get("/stores?page=2&limit=2");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      currentPage: 2,
      totalPages: 10,
      totalStores: 20,
      results: mockStores,
    });
  });
});

describe("POST /stores", () => {
  it("should create a new store and return it", async () => {
    const storeData = { name: "Coffee Corner", tags: ["coffee", "bakery"] };

    // Mock a plain object returned by .save()
    Store.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        toJSON: () => ({
          _id: "mocked-id",
          name: "Coffee Corner",
          tags: ["coffee", "bakery"],
          slug: "coffee-corner",
        }),
      }),
    }));

    const res = await request(app).post("/stores").send(storeData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      name: "Coffee Corner",
      tags: ["coffee", "bakery"],
      slug: "coffee-corner",
    });
  });
});
 */

/////////////////////////
const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Store = require("../Models/Stores");
const Review = require("../Models/Reviews");
const User = require("../Models/User");

jest.mock("../Models/Stores");
jest.mock("../Models/Reviews");
jest.mock("../Models/User");

describe("Protected Route /protected", () => {
  it("should return user info if token is valid", async () => {
    const fakeUser = { _id: "123", username: "user1" };

    const token = "Bearer fake.jwt.token";

    // mock JWT decoding
    jest.spyOn(jwt, "verify").mockReturnValue({ _id: "123" });
    User.findOne.mockResolvedValue(fakeUser);

    const res = await request(app)
      .get("/protected")
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.username).toBe("user1");
  });

  it("should return 401 if token is missing", async () => {
    const res = await request(app).get("/protected");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /reviews", () => {
  it("should create and return a review", async () => {
    const reviewPayload = {
      title: "Awesome Shop",
      content: "Best place ever!",
      shop: "store-id-123",
    };

    Review.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: "rev-id",
        ...reviewPayload,
      }),
    }));

    const res = await request(app).post("/reviews").send(reviewPayload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      title: "Awesome Shop",
      content: "Best place ever!",
      shop: "store-id-123",
    });
  });

  it("should handle missing fields with 500", async () => {
    Review.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Missing fields")),
    }));

    const res = await request(app).post("/reviews").send({});

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Error creating post");
  });
});

describe("GET /reviews", () => {
  it("should return all reviews with populated shops", async () => {
    const mockReviews = [
      {
        title: "Great Place",
        content: "So fun!",
        shop: { _id: "shop1", name: "Shop 1" },
      },
    ];

    const populate = jest.fn().mockResolvedValue(mockReviews);
    Review.find.mockReturnValue({ populate });

    const res = await request(app).get("/reviews");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("title", "Great Place");
  });
});
