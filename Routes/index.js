const express = require("express");
const router = new express.Router();
const Stores = require("../Models/Stores.js");
const shopController = require("../controllers/shopController");
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");
const upload = require("../middleware/upload");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/protected", authController.authCheck, authController.protected);

router.get("/", (req, res) => {
  try {
    return res.send("We're Live");
  } catch (error) {
    console.log(error);
  }
});
router.get("/stores", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query; // Default: page 1, 10 results per page
    page = parseInt(page);
    limit = parseInt(limit);

    const stores = await Stores.find()
      .skip((page - 1) * limit) // Skip previous pages
      .limit(limit); // Limit results per page

    const totalStores = await Stores.countDocuments();
    const totalPages = Math.ceil(totalStores / limit);

    res.json({
      currentPage: page,
      totalPages,
      totalStores,
      results: stores,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/stores/tag/:tag", async (req, res) => {
  try {
    const stores = await Stores.find({ tags: req.params.tag });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/stores", async (req, res) => {
  try {
    const newStore = new Stores(req.body);
    await newStore.save();
    res.status(201).json(newStore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/stores/:id", async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStore)
      return res.status(404).json({ error: "Store not found" });
    res.json(updatedStore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/stores/:id", async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore)
      return res.status(404).json({ error: "Store not found" });
    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/bank/:name/user/:user", (req, res) => {
  try {
    res.json(req.params.name);
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.send(`${username} has logged in`);
});
router.post(
  "/user/profilePic",
  upload.single("profilePic"),
  userController.uploadProfilePic
);
module.exports = router;
