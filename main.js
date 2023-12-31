const numberInput = document.getElementById("numberInput");
const romanInput = document.getElementById("romanInput");
const slider = document.getElementById("slider");
const outputElement = document.getElementById("output");
const outputContainer = document.getElementById("outputContainer");
const romanOutputElement = document.getElementById("romanOutput");
const romanOutputContainer = document.getElementById("romanOutputContainer");
let variable = null;

slider.addEventListener("input", function () {
  const sliderValue = parseFloat(slider.value);
  numberInput.value = sliderValue;
  updateVariable(sliderValue);
});

numberInput.addEventListener("input", function () {
  const inputValue = numberInput.value;
  const pattern = /^\d*\.?\d*$/;

  if (pattern.test(inputValue)) {
    const numericValue = parseFloat(inputValue);
    slider.value = numericValue;
    updateVariable(numericValue);
  } else {
    variable = null;
    slider.value = "";
    outputElement.textContent = "Invalid input";
  }
});

romanInput.addEventListener("input", function () {
  const romanInputValue = romanInput.value;
  const pattern =
    /[I{1,3}|V{1}|X{1,3}|L{1}|C{1,3}|D{1}|M{1,3}|i{1,3}|v{1}|x{1,3}|l{1}|c{1,3}|d{1}|m{1,3}|]/;

  if (pattern.test(romanInputValue)) {
    const romanValue = romanInputValue;
    romanUpdateVariable(romanValue);
  } else {
    variable = null;
    romanOutputElement.textContent = "Invalid input";
  }
});

function updateVariable(value) {
  variable = value;
  outputElement.textContent = convertToRoman(variable);
}

function romanUpdateVariable(value) {
  variable = value;
  romanOutputElement.textContent = convertToArabic(variable);
  if (romanOutputElement.textContent == "NaN") {
    romanOutputElement.textContent = "Invalid input";
  }
}


function copyToClipboard() {
  const text = outputElement.textContent;

  navigator.clipboard.writeText(text).catch((error) => {
    window.alert("Error copying text to clipboard:");
  });
}

function AtoR() {
  document.getElementById("subContainerAtoR").style.display = "block";
  document.getElementById("subContainerRtoA").style.display = "none";
  document.getElementById("button-AtoR").className = "button-active";
  document.getElementById("button-RtoA").className = "button";
}

function RtoA() {
  document.getElementById("subContainerAtoR").style.display = "none";
  document.getElementById("subContainerRtoA").style.display = "block";
  document.getElementById("button-AtoR").className = "button";
  document.getElementById("button-RtoA").className = "button-active";
}

function convertToRoman(num) {
  let numArray = num.toString().split("");
  let answerArray = [];

  // vv check number of digits in query and execute converters (rightmost number is first)

  switch (numArray.length) {
    case 1:
      firstDigitConverter();
      break;

    case 2:
      firstDigitConverter();
      secondDigitConverter();
      break;

    case 3:
      firstDigitConverter();
      secondDigitConverter();
      thirdDigitConverter();
      break;

    case 4:
      firstDigitConverter();
      secondDigitConverter();
      thirdDigitConverter();
      fourthDigitConverter();
      break;

    default:
      console.log("Out of scope: five or more numbers");
      break;
  }

  function firstDigitConverter() {
    switch (numArray[numArray.length - 1]) {
      case "1":
        answerArray.unshift("I");
        break;

      case "2":
        answerArray.unshift("II");
        break;

      case "3":
        answerArray.unshift("III");
        break;

      case "4":
        answerArray.unshift("IV");
        break;

      case "5":
        answerArray.unshift("V");
        break;

      case "6":
        answerArray.unshift("VI");
        break;

      case "7":
        answerArray.unshift("VII");
        break;

      case "8":
        answerArray.unshift("VIII");
        break;

      case "9":
        answerArray.unshift("IX");
        break;

      default:
        break;
    }
  }

  function secondDigitConverter() {
    switch (numArray[numArray.length - 2]) {
      case "1":
        answerArray.unshift("X");
        break;

      case "2":
        answerArray.unshift("XX");
        break;

      case "3":
        answerArray.unshift("XXX");
        break;

      case "4":
        answerArray.unshift("XL");
        break;

      case "5":
        answerArray.unshift("L");
        break;

      case "6":
        answerArray.unshift("LX");
        break;

      case "7":
        answerArray.unshift("LXX");
        break;

      case "8":
        answerArray.unshift("LXXX");
        break;

      case "9":
        answerArray.unshift("XC");
        break;

      default:
        break;
    }
  }

  function thirdDigitConverter() {
    switch (numArray[numArray.length - 3]) {
      case "1":
        answerArray.unshift("C");
        break;

      case "2":
        answerArray.unshift("CC");
        break;

      case "3":
        answerArray.unshift("CCC");
        break;

      case "4":
        answerArray.unshift("CD");
        break;

      case "5":
        answerArray.unshift("D");
        break;

      case "6":
        answerArray.unshift("DC");
        break;

      case "7":
        answerArray.unshift("DCC");
        break;

      case "8":
        answerArray.unshift("DCCC");
        break;

      case "9":
        answerArray.unshift("CM");
        break;

      default:
        break;
    }
  }

  function fourthDigitConverter() {
    switch (numArray[numArray.length - 4]) {
      case "1":
        answerArray.unshift("M");
        break;

      case "2":
        answerArray.unshift("MM");
        break;

      case "3":
        answerArray.unshift("MMM");
        break;

      case "4":
        answerArray.unshift("MV\u0305");
        break;

      case "5":
        answerArray.unshift("V\u0305");
        break;

      case "6":
        answerArray.unshift("V\u0305M");
        break;

      case "7":
        answerArray.unshift("V\u0305MM");
        break;

      case "8":
        answerArray.unshift("V\u0305MMM");
        break;

      case "9":
        answerArray.unshift("MX\u0305");
        break;

      default:
        break;
    }
  }

  return answerArray.join("");
}

/* **************** */

function convertToArabic(input) {
  const romans = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  return [...input.toUpperCase()].reduce(
    (previousValue, currentValue, currentIndex, array) =>
      romans[array[currentIndex + 1]] > romans[currentValue]
        ? previousValue - romans[currentValue]
        : previousValue + romans[currentValue],
    0
  );
}
