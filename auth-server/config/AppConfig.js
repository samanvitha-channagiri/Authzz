const { authRoutes } = require("../routes");
const errorHandler = require("../middlewares/errorMiddleware");
var cookieParser=require('cookie-parser')
const helmet=require('helmet')
const express = require("express");

exports.appConfig=(app)=>{
    const port = process.env.PORT||5500;
app.use(helmet())
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(errorHandler) //whatever we pass in the next that will catch here

app.listen(port, () => {
  console.log(`App Listening to the port ${port}`);
});
}


//, { useNewUrlParser: true, useUnifiedTopology: true } //after mongodb c this is default, no need to set