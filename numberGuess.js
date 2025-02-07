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
    resultDiv.innerHTML = ""; // Clear only before setting new content
    const congratsMsg = document.createElement("h1");
    congratsMsg.textContent = "Congratulations! You guessed it right 🎉";
    resultDiv.appendChild(congratsMsg);
    endgame();
  } else if (remainingChances > 0) {
    resultDiv.innerHTML = ""; // Clear previous message
    const hintMsg = document.createElement("h2");
    hintMsg.textContent =
      guess > randomNumber
        ? "Higher than actual number"
        : "Lower than actual number";
    resultDiv.appendChild(hintMsg);
  } else {
    resultDiv.innerHTML = ""; // Clear previous message
    const gameOverMsg = document.createElement("h2");
    gameOverMsg.textContent = `Game Over! The correct number was ${randomNumber}`;
    resultDiv.appendChild(gameOverMsg);
    endgame();
  }
}

function endgame() {
  input.value = "";
  input.setAttribute("disabled", "");
  submit.style.display = "none";
  newBtn.textContent = "Play Again";
  newBtn.style.display = "block";
  resultDiv.appendChild(newBtn);
  newBtn.addEventListener("click", resetGame);
}

function resetGame() {
  remainingChances = 10;
  prev.innerHTML = "";
  resultDiv.innerHTML = "";
  newBtn.style.display = "none";
  remainingNum.innerHTML = `${remainingChances}`;
  input.removeAttribute("disabled");
  submit.style.display = "inline";
  randomNumber = parseInt(Math.random() * 100 + 1);
}
