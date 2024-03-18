const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const router = require("./route/route");

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/crud");

server.get("/test", (req, res) => {
  res.send("okay");
});

server.use("/todo", router);

server.listen(5000, () => {
  console.log("server up and running at 5000");
});
