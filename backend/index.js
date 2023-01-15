const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
require("dotenv").config();
//
const connectMongo = require("./db");
//Connecting mongodb
connectMongo();

app.get("/", (req, res) => {
  res.status(200).send("ok root connected...");
});

//registration of the userRouter
app.use(require("./router/activityRouter"))

app.listen(8080, (e) => {
  if (e) console.log("error occurred in server");
  console.log("server is listening on port 8080");
});
