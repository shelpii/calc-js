"use-strict";

const input = document.querySelector(".calc__screen input");

const buttons = document.querySelector(".buttons");
const btnRemove = document.querySelector(".ac");
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const signs = ["-", "+", "/", "%", "x", "+/-"];

document.addEventListener("DOMContentLoaded", () => {
  let firstNum = "";
  let secondNum = "";
  let sign = "";
  let finish = false;
  input.value = 0;
  let togglePlusMinus = false;

  function clearAll() {
    firstNum = "";
    secondNum = "";
    sign = "";
    input.value = 0;
  }

  btnRemove.addEventListener("click", clearAll);
  buttons.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) return;
    if (e.target.classList.contains("ac")) return;

    input.value = 0;

    const key = e.target.textContent;

    if (numbers.includes(key)) {
      if (secondNum === "" && sign === "") {
        firstNum += key;
        input.value = firstNum;
        console.log(firstNum, secondNum, sign)
        

      } else if (firstNum !== "" && secondNum !== "" && finish) {
        finish = false;
        secondNum = key;
        input.value = secondNum;

      } else {
        secondNum += key;
        input.value = secondNum;
      }
      return;
    }
    if (signs.includes(key)) {
      if (key === '+/-') {

          togglePlusMinus = !togglePlusMinus;
          sign = togglePlusMinus ? "+" : "-";
          input.value = sign;
        } else {
          sign = key;
          input.value = sign;
      }
      return;
    }
    if (key === "=") {
      if (secondNum === '') secondNum = firstNum;
      switch (sign) {
        case "+":
          firstNum = (+firstNum) + (+secondNum);
          break;
        case "-":
          firstNum = (+firstNum) - (+secondNum);
          break;
        case "/":
          if (secondNum === '0') {
            input.value = 'Error';
            firstNum = '';
            secondNum = '';
            sign = '';
            return
          }
          firstNum = (+firstNum) / (+secondNum);
          break;
        case "%":
          firstNum = (+firstNum) % (+secondNum);
          if (firstNum === 0) {
            input.value = 0;
            firstNum = '';
            secondNum = '';
            sign = '';
            return
          }
          break;
        case "x":
          firstNum = (+firstNum) * (+secondNum);
          break;
      }
      finish = true;
      input.value = firstNum;
    }
  });
});
