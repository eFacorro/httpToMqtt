require('dotenv').config();
const { httpToMqtt } = require("./funciones.js");

const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/mqtt", httpToMqtt);

app.listen(process.env.PORT, function () {
  console.log("Server running");
});