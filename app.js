require('./config/db').connect();
const express=require('express');
const app=express();
const parser = require("body-parser");
const port=8080;

app.use(express.json());

app.use("/", require("./controller/routecontroller"));
app.listen(port, console.log("Server is listening on port"+port));