const all_keys = document.querySelector("div.calculator-grid");
let firstOperator = undefined;
let firstNumber = 0;
let secondNumber;
let result = firstNumber;

//listen for all key clicks on the calculator
all_keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const display = document.querySelector(".display");
    const displayContent = display.textContent;
    const button_pressed = event.target;
    const action = button_pressed.dataset.action;

    //if the button pressed is a digit, replace first character if 0 and display the digits pressed
    if (!action) {
      if (displayContent === "0" || (firstNumber && !secondNumber)) {
        display.textContent = button_pressed.textContent;
      } else {
        display.textContent = displayContent + button_pressed.textContent;
      }
    }

    //if the decimal button is pressed, concat . to end of displayContent
    //if there's already a ".", do nothing
    if (action === "decimal") {
      if (!displayContent.includes(".")) {
        display.textContent = displayContent + ".";
      }
    }

    //if operation button is pressed, save the first number and operator
    //set display to 0 for the new number to be entered
    if (
      action === "add" ||
      action === "subtract" ||
      action === "divide" ||
      action === "multiply"
    ) {
      firstNumber = displayContent;
      firstOperator = action;
      display.textContent = 0;
    }

    //if AC clicked, set everything to starting values
    if (action === "restart") {
      display.textContent = 0;
      firstNumber = 0;
      firstOperator = undefined;
    }

    //when = clicked, set current display to 2nd value
    //display calculation
    if (action === "calculate") {
      secondNumber = displayContent;
      display.textContent = calculate(firstNumber, secondNumber, firstOperator);
    }
  }
});

//method that takes in the two numbers and operator
//returns result rounded to the 8th decimal place
const calculate = (num1, num2, operation) => {
  num1 = Number.parseFloat(num1);
  num2 = Number.parseFloat(num2);
  if (operation === "add") {
    result = num1 + num2;
  } else if (operation === "subtract") {
    result = num1 - num2;
  } else if (operation === "multiply") {
    result = num1 * num2;
  } else if (operation === "divide") {
    result = num1 / num2;
  }
  return result.toFixed(8);
};
