require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const router = require("./route/route");

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//  process.env.DATABASE
const DB = mongoose.connect(process.env.MONGO_URL);
DB.then(() => {
  console.log("Database successfully connected");
}).catch((err) => {
  console.log(err);
});

server.get("/test", (req, res) => {
  res.send("okay");
});

server.use("/todo", router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("server up and running at 5000");
});
