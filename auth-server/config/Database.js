const mongoose = require("mongoose");
let dbUrl = process.env.DB_URL || "mongodb://localhost:27017/auth_project";

exports.dbConnect = async () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
      console.log("Mongodb connection Error:", err);
    });
};
