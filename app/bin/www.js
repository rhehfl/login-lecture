"use strict";
//포트번호
const PORT = 3000;

const app = require("../app.js");

app.listen(PORT, () => {
  //서버 가동 포트 3000
  console.log("서버가동");
});
