const express = require("express");
const getall = require("../controller/getall");
const getsingle = require("../controller/getsingle");
const updateuser = require("../controller/updateuser");
const adduser = require("../controller/adduser");
const deleteuser = require("../controller/deleteuser");

const router = express.Router();
router.post("/adduser", adduser);
router.get("/getall", getall);
router.get("/getuser/:id", getsingle);
router.put("/updateuser/:id", updateuser);
router.delete("/deleteuser/:id", deleteuser);

module.exports = router;
console.log("router is ready to use");
