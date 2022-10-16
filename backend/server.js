const express = require("express");
const dotenv = require("dotenv");
const { connectToMongoDB } = require("./config");
const { userRoutes, chatRoutes } = require("./routes");
const { notFound, errorHandler } = require("./middleware");

const app = express(); // Use express js in our app
app.use(express.json()); // Accept JSON data
dotenv.config(); // Configure and use variables defined in .env file
connectToMongoDB(); // Connect to Database

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound); // Handle invalid routes
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
