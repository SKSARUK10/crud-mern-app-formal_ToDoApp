const userModel = require("../models/userModel");

const getall = (req, res) => {
  userModel
    .find({})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports = getall;
