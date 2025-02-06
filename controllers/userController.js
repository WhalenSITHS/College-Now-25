exports.homePage = (req, res) => {
  const users = ["Tina", "Angie", "Irene"];
  try {
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
