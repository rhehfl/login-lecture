"use strict";
class UserStorage {
  static #users = {
    id: ["gdy", "구도윤"],
    psword: ["1234", "1234"],
    name: ["이름이름", "ㅁㄴㅇㅁㄴㅇ"],
  };
  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
}
module.exports = UserStorage;
