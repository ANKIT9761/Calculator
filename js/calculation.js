// for design mode script

// design-mode script ends.

const input = document.querySelector("input");

const finalAnswer = document.querySelector(".final__answer");

input.value = "";
document.querySelectorAll(".num__key").forEach((e1) => {
  e1.onclick = () => {
    // input.value =
    //   input.value !== "0" ? input.value + e1.innerText : e1.innerText;
    currentVal = currentVal === "" ? e1.innerText : currentVal + e1.innerText;
    input.value = input.value !== 0 ? input.value + e1.innerText : currentVal;
    console.log("currentVal: " + currentVal);
    console.log("input value: " + input.value);
    // if (operatorCount > 0) {
    //   buffer.push({ value: parseFloat(currentVal) });
    //   ans = evaluate(buffer);
    //   renderFinalAnswer(ans);
    //   buffer.pop();
    // }
  };
});

const renderFinalAnswer = (answer) => (finalAnswer.innerText = answer);

const upperBuffer = [];
const buffer = [];

let currentVal = "";
let ans = 0;
let operatorCount = 0;

const opCallBack = (opName) => (e) => {
  operatorCount++;
  let localVal = parseFloat(currentVal);
  let operator = e.target.innerText;

  console.log("Inside callback 1: " + input.value);
  if (opName === "backspace") {
    let ansString = input.value;
    if (typeof ansString.slice(-1) !== "number") operatorCount--;
    currentVal = currentVal.substring(0, currentVal.length - 1);
    input.value = ansString.substring(0, ansString.length - 1);
    operator = "";
  } else if (opName === "percent") {
    ans = equalFunc();
    if (!ans) {
      alert("Wrong expression");
      clearFunc();
    } else {
      ans /= 100;
      buffer.push({ value: ans });
      buffer.push({ value: "multiply" });
      renderFinalAnswer(ans);
    }
  } else {
    if (buffer && buffer.length) {
      buffer.push({ value: localVal });

      const result = evaluate(buffer);

      buffer.push({ value: result });
      buffer.push({ value: opName });

      ans = result;
      renderFinalAnswer(ans);
    } else {
      buffer.push({ value: localVal });
      buffer.push({ value: opName });
    }
  }
  input.value = input.value + operator;
  currentVal = "";
  console.log("Inside callback: " + input.value);
};

const evaluate = (buffer) => {
  const secondOperand = buffer.pop().value;
  const operator = buffer.pop().value;
  const firstOperand = buffer.pop().value;

  switch (operator) {
    case "add":
      return firstOperand + secondOperand;
      break;
    case "subtract":
      return firstOperand - secondOperand;
      break;
    case "multiply":
      return firstOperand * secondOperand;
      break;
    case "divide":
      return firstOperand / secondOperand;
      break;
    default:
      return secondOperand;
  }
};

for (const opName of [
  "add",
  "subtract",
  "multiply",
  "divide",
  "percent",
  "backspace",
]) {
  document.querySelector(`.op__key[op=${opName}]`).onclick = opCallBack(opName);
  console.log(input.value);
}

let equalFunc = () => {
  if (buffer && buffer.length) {
    buffer.push({ value: parseFloat(currentVal) });
    input.value = evaluate(buffer);
  } else {
    input.value = currentVal;
    return currentVal;
  }
  renderFinalAnswer(input.value);
};
document.querySelector(".op__key[op=equal]").addEventListener("click", () => {
  equalFunc();
  setTimeout(clearFunc, 2000);
});
let clearFunc = () => {
  console.log("Inside AC");
  input.value = "";
  buffer.length = 0;
  currentVal = "";
  operatorCount = 0;
  ans = 0;
  renderFinalAnswer(0);
};

document
  .querySelector(".op__key[op=clear]")
  .addEventListener("click", clearFunc);
