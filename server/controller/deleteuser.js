const userModel = require("../models/userModel");
const deleteuser = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

module.exports = deleteuser;
