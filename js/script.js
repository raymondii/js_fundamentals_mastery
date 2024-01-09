const HIDE_CLASS = "hide";
const SHOW_CLASS = "show";

const questions = [
    {
        questionText: "What does JS stand for?",
        choices: ["Just Sitting", "Just Saying", "Just Standing", "JavaScript"],
        correctAnswer: "JavaScript"
    },
    {
        questionText: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        questionText: "What is the result of the following expression: 10 % 3?",
        choices: ["3", "1", "0.333", "2"],
        correctAnswer: "1"
    },
    {
        questionText: "Which method is used to add an element to the end of an array in JavaScript?",
        choices: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: "push()"
    }
];

const choicesDiv = document.querySelector(".choices");
const startButton = document.querySelector("#start");
const startWrap = document.querySelector(".start-wrap");
const questionWrap = document.querySelector(".question-wrap");
const timeOutput = document.querySelector("#time-output");
const scoreWrap = document.querySelector(".score-wrap");
const saveButton = document.querySelector("#save-score");

let questionIndex = 0;
let time = 60;
let timer;
let clicked = false;

function endGame() {
    clearInterval(timer);
    questionWrap.classList.add(HIDE_CLASS);
    const scoreOutput = document.querySelector("#score-output");
    scoreOutput.innerText = "Score: " + time;
    scoreWrap.classList.remove(HIDE_CLASS);
}

function checkAnswer(eventObj) {
    eventObj.stopPropagation();
    if (clicked) return;

    const el = eventObj.target;
    const currentQuestionObj = questions[questionIndex];

    if (el.tagName === "BUTTON") {
        const userAnswer = el.innerText;
        const answerAlert = document.querySelector(".answer-alert");

        if (userAnswer === currentQuestionObj.correctAnswer) {
            answerAlert.innerText = "Correct";
        } else {
            answerAlert.innerText = "Wrong";
            time = Math.max(0, time - 15);
        }

        answerAlert.classList.add(SHOW_CLASS);
        clicked = true;

        setTimeout(function () {
            answerAlert.classList.remove(SHOW_CLASS);
            questionIndex++;
            if (questionIndex >= questions.length) {
                endGame();
            } else {
                displayQuestion();
                clicked = false;
            }
        }, 1500);
    }
}

function displayQuestion() {
    const currentQuestionObj = questions[questionIndex];

    const textEl = document.querySelector(".question-text");
    choicesDiv.innerHTML = "";
    textEl.innerText = currentQuestionObj.questionText;

    currentQuestionObj.choices.forEach(choice => {
        const choiceBtn = document.createElement("button");
        choiceBtn.innerText = choice;
        choicesDiv.append(choiceBtn);
    });
}

function startCountdown() {
    timeOutput.innerText = "Time Left: " + time;
    timer = setInterval(function () {
        time = Math.max(0, time - 1);
        timeOutput.innerText = "Time Left: " + time;
        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function saveScore() {
    const initialInput = document.querySelector("#initial-input");
    const initials = initialInput.value;
    const rawData = localStorage.getItem("highscores");
    const highscores = JSON.parse(rawData) || [];

    highscores.push({
        initials: initials,
        score: time
    });

    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location = "./highscores.html";
}

function startQuiz() {
    time = 60;
    questionIndex = 0;
    startWrap.classList.add(HIDE_CLASS);
    questionWrap.classList.remove(HIDE_CLASS);
    displayQuestion();
    startCountdown();
}

choicesDiv.addEventListener("click", checkAnswer);
startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", saveScore);
