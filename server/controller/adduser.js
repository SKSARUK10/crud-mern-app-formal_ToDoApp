const userModel = require("../models/userModel");

const adduser = (req, res) => {
  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports = adduser;
