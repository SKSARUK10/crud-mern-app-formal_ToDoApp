const userModel = require("../models/userModel");

//updateuser
const updateuser = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email, age: req.body.age }
    )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};
module.exports = updateuser;
