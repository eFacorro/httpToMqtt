require('dotenv').config();
const { httpToMqtt, ping } = require("./funciones.js");

const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'https://botrix.live'}));

app.post("/mqtt", httpToMqtt);
app.get("/ping", ping);

app.listen(process.env.PORT, function () {
  console.log("Server running");
});