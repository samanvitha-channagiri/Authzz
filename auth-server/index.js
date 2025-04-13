require("dotenv").config(); //always dotenv should be at the top, then only all the files will get the access
const express = require("express");
const app = express();
const { authRoutes } = require("./routes");
const port = 5500;
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorMiddleware");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(errorHandler); //whatever we pass in the next that will catch here
let dbUrl = "mongodb://localhost:27017/auth_project";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("Mongodb connection Error:", err);
  });
app.listen(port, () => {
  console.log(`App Listening to the port ${port}`);
});

//, { useNewUrlParser: true, useUnifiedTopology: true } //after mongodb c this is default, no need to set
