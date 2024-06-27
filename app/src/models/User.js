"use strict";

const UserStorage = require("./UserStorage");
class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    const { id, psword } = await UserStorage.getUserInfo(client.id);
    //왜 undefind가 뜰까...
    //내가 getinfo에서 데이터베이스를 읽어올 때 promise로 읽기로 했는데 비동기방식으로
    //기본적으로 자바스크립트는 동기일걸 아마 근데 console.log가 실행은 되었는데 아직 읽고있음..
    //그니까 <pending> <=이거는 아직 읽어오지 못했다는거임 비동기니까

    if (id) {
      if (id === client.id && psword === client.psword) {
        return { success: true };
      }
      return { success: false, msg: "비밀번호가 틀렸습니다." };
    }
    return { success: false, msg: "존재하지 않는 아이디입니다." };
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}
module.exports = User;
