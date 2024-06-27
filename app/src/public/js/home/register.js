"use strict";
const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  confirmPsword = document.querySelector("#confirm-psword"),
  psword = document.querySelector("#psword"),
  regesterBtn = document.querySelector("#button");

regesterBtn.addEventListener("click", register);

function register() {
  if (!id.value) return alert("아이디를 입력해주세여");

  if (confirmPsword.value !== psword.value)
    return alert("비밀번호가 일치하지 않습니다.");

  const req = {
    id: id.value,
    name: name.value,
    confirmPsword: confirmPsword.value,
    psword: psword.value,
  };

  fetch("/register", {
    //처음 매개변수 : 경로 두번째 매개변수:Object로 보냄
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }) //req를 보내기
    .then((res) => res.json()) //res를 받아서 처리하는 과정
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
}
