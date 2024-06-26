"use strict";
//모듈
const express = require("express");
const app = express();

//라우팅
const home = require("./src/routes/home"); //라우팅한것(index.js)파일에 접근
//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", home);

module.exports = app;
