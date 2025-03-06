const Store = require("../Models/Stores");
exports.createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.json(store);
  } catch (error) {
    res.status(500).json(error);
  }
};
