require('dotenv').config()//always dotenv should be at the top, then only all the files will get the access
const express = require("express");
const {dbConnect}=require('./config/Database');
const { appConfig } = require('./config/AppConfig');



const startServer=async()=>{
const app = express();
//for database connection
await dbConnect();
//App Default Config
await appConfig(app);
}
startServer();
