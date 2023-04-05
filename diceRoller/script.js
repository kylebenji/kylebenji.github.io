//buttons
const btnRoll = document.querySelector(".roll");
const btnExpound = document.querySelector(".expound");
const btnHide = document.querySelector(".hide");

//elements
const input = document.querySelector(".dice");
const printout = document.querySelector(".printout");
const print = document.querySelector(".print");
const details = document.querySelector(".details");

//constants
const oneDieReg = RegExp(/\d{1,2}d\d{1,3}/, "gd");
const equationRegEx = RegExp(/[^0-9/*+()-]/);

function handleDie(dice) {
  let diceNumSize = parseOneDie(dice);
  // console.log(diceNumSize);
  return rollOneSizeDie(diceNumSize);
}

function parseOneDie(rollInput) {
  dIndex = rollInput.indexOf("d");
  return [
    Number(rollInput.substring(0, dIndex)),
    Number(rollInput.substring(dIndex + 1, rollInput.length)),
  ];
}

function rollOneSizeDie(diceNumSize) {
  let rollsActual = [];
  let sum = 0;
  let dieSize = diceNumSize[1];
  let roll = 0;
  for (let i = 0; i < diceNumSize[0]; i++) {
    roll = Math.trunc(Math.random() * dieSize) + 1;
    sum += roll;
    rollsActual.push(`${roll} (d${dieSize})`);
  }
  return [sum, rollsActual];
}

function replaceDice(rollIn) {
  //loop through input, replace dice with their actual values so we can evaluate as a mathematical expression
  let strMatchhAll = rollIn.matchAll(oneDieReg);
  let rollsActual = [];
  for (const match of strMatchhAll) {
    let [roll, dice] = handleDie(match[0]);
    rollsActual = [...rollsActual, ...dice];
    rollIn = rollIn.replace(match[0], roll);
  }
  return [rollIn, rollsActual];
}

function rollDice(rollIn) {
  //send to function to replace dice with values in string pass back the actual rolls so we can display them later
  let [repStr, rollsActual] = replaceDice(rollIn);
  //evaluate string as a mathematical expression so we can get roll sum
  let roll = "";
  if (!equationRegEx.test(repStr)) {
    //adding some initial protection for this eval(), this should prevent special characters and letters that are not math
    roll = eval(repStr);
  } else {
    roll = "invalid expression";
  } //if any errors, fire an error warning
  return [roll, rollsActual];
}

function printRolls(rollsActual) {
  let out = `You rolled a ${rollsActual[0]}!!`;
  printout.classList.remove("hidden");
  print.textContent = out;
  printDetails(rollsActual);
}

function printDetails(rollsActual) {
  let out = `You rolled a ${rollsActual[1][0]}`;
  console.log(rollsActual);
  for (let i = 1; i < rollsActual[1].length - 1; i++) {
    out += ", " + rollsActual[1][i];
  }
  if (rollsActual[1].length > 1)
    out += ", and a " + rollsActual[1][rollsActual[1].length - 1];
  details.textContent = out;
}

btnRoll.addEventListener("click", function () {
  let rollInput = input.value.replace(/\s+/g, ""); //get value from input and trim whitespace
  printout.classList.add("hidden");
  details.classList.add("hidden");
  btnHide.classList.add("hidden");
  let rollsActual = rollDice(rollInput);
  printRolls(rollsActual);
});

btnExpound.addEventListener("click", function () {
  btnHide.classList.remove("hidden");
  details.classList.remove("hidden");
});

btnHide.addEventListener("click", function () {
  details.classList.add("hidden");
  btnHide.classList.add("hidden");
});
