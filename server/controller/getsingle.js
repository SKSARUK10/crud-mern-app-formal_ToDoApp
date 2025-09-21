const userModel = require("../models/userModel");

const getsingle = (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports = getsingle;
