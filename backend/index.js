const express = require("express");
const app = express();
const cors = require("cors")

const mongoose = require("mongoose");


mongoose.connect('mongodb://127.0.0.1:27017/db_mern');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.listen(8080, function () {
  console.log("SERWER DZIAŁA")
}
)