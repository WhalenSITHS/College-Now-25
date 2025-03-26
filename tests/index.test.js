const request = require("supertest");
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
