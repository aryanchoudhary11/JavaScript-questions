const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "ROme"],
        correct: 2,
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "10", "15"],
        correct: 1,
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correct: 2,
    }
];

let currentQuestion = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const progress = document.querySelector(".progress");

function loadQuestion(){
    const currentQuiz = quizData[currentQuestion];
    questionEl.innerText = currentQuiz.question;
    optionsEl.innerHTML = "";
    currentQuiz.options.forEach((Option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="answer" id="option${index}" value=${index}>
                        <label for="option${index}">${Option}</label>`;
        optionsEl.appendChild(li);
    });
    updateProgress();
}

function getSelected(){
    const options = document.querySelectorAll("input[name='answer']");
    let selected = null;
    options.forEach((option) => {
        if(option.checked){
            selected = parseInt(option.value);
        }
    });
    return selected;
}

function updateProgress(){
    const percentage = ((currentQuestion + 1)/quizData.length)*100;
    progress.style.width = `${percentage}%`;
}

nextBtn.addEventListener("click", () =>{
    const answer = getSelected();
    if(answer === null){
        alert("Please select an answer!");
        return;
    }
    if(answer === quizData[currentQuestion].correct){
        score++;
    }
    currentQuestion++;

    if(currentQuestion < quizData.length){
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult(){
    document.querySelector("#questions-container").classList.add("hidden");
    nextBtn.classList.add("hidden");
    resultEl.classList.remove("hidden");
    scoreEl.innerText = `${score}/${quizData.length}`;
}

restartBtn.addEventListener("click", ()=>{
    currentQuestion = 0;
    score = 0;
    document.querySelector("#questions-container").classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    resultEl.classList.add("hidden");
    loadQuestion();
});
loadQuestion();