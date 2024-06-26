"use strict";
//모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//라우팅
const home = require("./src/routes/home"); //라우팅한것(index.js)파일에 접근
//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use("/", home);

//url을 통해 전달되는 데이터에 한글 공백 등과 같은 문자가 포함될 경우 인식되지 않는 문제 해결
//url encoded가 해주는듯 일단 패스
//미들웨어란 무엇일까

module.exports = app;
