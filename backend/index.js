const express = require("express");
const app = express();
const cors = require("cors")

const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');

mongoose.connect('mongodb://127.0.0.1:27017/db_mern').then(() => { console.log('yup')})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRoutes);

app.listen(8000, function () {
  console.log("SERWER DZIAŁA na porcie 8000")
}
)