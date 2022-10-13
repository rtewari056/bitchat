const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
