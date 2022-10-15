const express = require("express");
const dotenv = require("dotenv");
const { connectToMongoDB } = require("./config");
const { userRoutes } = require("./routes");
const { notFound, errorHandler } = require("./middleware");

const app = express();
app.use(express.json()); // To accept JSON data
dotenv.config();
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);

app.use(notFound); // Handle invalid routes
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
