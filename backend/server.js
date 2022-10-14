const express = require("express");
const dotenv = require("dotenv");
const chats = require("./dummy_data");
const connectToMongoDB = require("./config/db");

const app = express();
dotenv.config();
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
