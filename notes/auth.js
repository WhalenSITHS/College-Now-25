function trainerCheck(req, res, next) {
  if (req.query.trainer === "ash") {
    next();
  } else {
    res.status(403).json({
      error: "Only trainer Ash can access the pokemon list",
    });
  }
}

module.exports = trainerCheck;
