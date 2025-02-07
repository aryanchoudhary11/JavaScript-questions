let remainingChances = 10;
let randomNumber = parseInt(Math.random() * 100 + 1);
const remainingNum = document.querySelector("#remainingNumber");
remainingNum.innerHTML = `${remainingChances}`;
const input = document.querySelector(".input-box");
const prev = document.querySelector(".prevGuess");
const submit = document.querySelector(".btn");
const resultDiv = document.querySelector(".result");

const newBtn = document.createElement("button");

submit.addEventListener("click", function () {
  const guess = parseInt(input.value);
  validateGuess(guess);
});

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter Valid number");
  } else if (guess < 1 || guess > 100) {
    alert("Please enter number greater than 1 and below 100");
  } else {
    prev.innerHTML += `${guess}, `;
    remainingChances--;
    remainingNum.innerHTML = `${remainingChances}`;
    checkCount(remainingChances, guess);
  }
}

function checkCount(remainingChances, guess) {
  if (guess === randomNumber) {
    resultDiv.innerHTML = `Congratulations! You guesses it right`;
    resetGame();
  } else if (remainingChances > 0) {
    if (guess > randomNumber) {
      resultDiv.innerHTML = "<h2>Higher than actual number</h2>";
    } else {
      resultDiv.innerHTML = "<h2>Lower than actual number</h2>";
    }
  } else {
    endgame();
  }
}

function endgame() {
  resultDiv.innerHTML = `<h2>Game Over! Correct number is ${randomNumber}`;
  input.value = "";
  input.setAttribute("disabled", "");
  submit.style.display = "none";
  const newBtn = document.createElement("button");
  newBtn.textContent = "Play Again";
  resultDiv.appendChild(newBtn);
  newBtn.addEventListener("click", resetGame);
}

function resetGame() {
  remainingChances = 10;
  prev.innerHTML = "";
  remainingNum.innerHTML = `${remainingChances}`;
  input.removeAttribute("disabled");
  submit.style.display = "inline";
  randomNumber = parseInt(Math.random() * 100 + 1);
}
