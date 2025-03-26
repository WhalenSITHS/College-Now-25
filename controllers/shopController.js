const Store = require("../Models/Stores");
/* exports.createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    console.log("POST /stores hit");
    res.status(201).json(store);
    console.log("POST /stores hit");
  } catch (error) {
    res.status(500).json(error);
  }
};
 */
exports.createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    const savedStore = await store.save();
    res.status(201).json(savedStore.toJSON ? savedStore.toJSON() : savedStore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
