"use strict";

const fs = require("fs").promises; //프러미스 사용

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const userInfo = Object.keys(users).reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }
  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});

    return newUsers;
  }
  static getUsers(isAll, ...fields) {
    return (
      fs
        .readFile("./src/databases/users.json") //readFile을 비동기처리로 읽어오기 왜와이 비동기가 좋잖아 평생 데이터읽기만 할순없으니깐
        //읽는동안 다른거도 해야지 파일 값을 읽어서 promises를 리턴을하겠지? 작업성공하면?
        //근데 그거를 처리할때는 then을 사용해야한다 정도만 알자
        .then((data) => {
          return this.#getUsers(data, isAll, fields);
        })
        .catch((err) => console.error)
    );
  }
  static getUserInfo(id) {
    //id의 이름 아이디 비번등등 가져옴
    return (
      fs
        .readFile("./src/databases/users.json") //readFile을 비동기처리로 읽어오기 왜와이 비동기가 좋잖아 평생 데이터읽기만 할순없으니깐
        //읽는동안 다른거도 해야지 파일 값을 읽어서 promises를 리턴을하겠지? 작업성공하면?
        //근데 그거를 처리할때는 then을 사용해야한다 정도만 알자
        .then((data) => {
          return this.#getUserInfo(data, id);
        })
        .catch((err) => console.error)
    );
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));

    return { success: true };
  }
}
module.exports = UserStorage;
