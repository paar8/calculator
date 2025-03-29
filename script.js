let display = document.querySelector(".displaytext");
let operators = ["÷", "×", "-", "+", "%", "π"];
let realoperators = ["*", "/", "-", "+", "%", "π"];

function setText(e) {
  if (display.textContent.length >= 10) {
    return alert("Exceeds 10 digits. WRITE A NUMBER UNDER 10 DIGITS");
  }

  if (countOperators() >= 1 && operators.includes(e.target.textContent)) {
    return;
  }

  if (display.textContent.includes(".") && e.target.textContent.includes("."))
    return;
  display.textContent += e.target.textContent;
}

document.querySelectorAll(".numkeys, .operator, #percent").forEach((button) => {
  button.addEventListener("click", (e) => setText(e));
});

document.querySelector("#clear").addEventListener("click", () => {
  display.textContent = "";
});

document.querySelector("#backspace").addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
});

document.querySelector("#squared").addEventListener("click", () => {
  if (display.textContent.length >= 10){
    alert("Result is too long");
    return;
  }
  let temp = display.textContent * display.textContent;
  let temp2 = temp.toFixed(2).split(".");
  if(temp2[1]=== "00"){
    display.textContent = temp;
  }else{
    display.textContent = temp.toFixed(2);
  }
});

document.querySelector("#equalsto").addEventListener("click", () => {
  calculate();
});

function countOperators() {
  let count = 0;
  let text = display.textContent;

  for (let i = 0; i < text.length; i++) {
    if (operators.includes(text[i])) {
      count++;
    }
  }
  return count;
}

function calculate() {
  let opt = display.textContent.replace("×", "*").replace("÷", "/");
  let checkopt = false;
  let foundopt = "";
  let ans = 0;
  for (let i = 0; i < opt.length; i++) {
    if (realoperators.includes(opt[i])) {
      foundopt = opt[i];
      checkopt = true;
    }
  }

  if (foundopt === "") return alert("Enter an operator first");
  console.log(foundopt);
  if (foundopt === "/") {
    let temp = opt.split("/");
    ans = temp[0] / temp[1];
    // display.textContent = ans.toFixed(2);
  } else if (foundopt === "*") {
    let temp = opt.split("*");
    ans = temp[0] * temp[1];
    // display.textContent = ans.toFixed(2);
  } else if (foundopt === "-") {
    let temp = opt.split("-");
    ans = temp[0] - temp[1];
    // display.textContent = ans.toFixed(2);
  } else if (foundopt === "+") {
    let temp = opt.split("+");
    ans = Number(temp[0]) + Number(temp[1]);
    // display.textContent = ans.toFixed(2);
  } else if (foundopt === "%") {
    let temp = opt.split("%");
    ans = (temp[0] * temp[1]) / 100;
    // display.textContent = ans.toFixed(2);
  } else alert("Invalid Argument");

  let temp = ans.toFixed(2).split(".");
  if(temp[1] === "00"){
    display.textContent = ans;
  }else{
    display.textContent = ans.toFixed(2);
  }
}
