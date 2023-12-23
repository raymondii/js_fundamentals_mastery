let questions = [
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

let choicesDiv = document.querySelector(".choices");
let startbutton = document.querySelector("#start");
let startWrap = document.querySelector(".start-wrap");
let questionWrap = document.querySelector(".question-wrap");
let timeOutput = document.querySelector("#time-output");
let scoreWarp = document.querySelector(".score-wrap");
let savebutton = document.querySelector("#save-score");
let questionIndex = 0;
let time = 60;
let timer;
let clicked = false;

if (questionIndex === questionIndex) {
    console.log("End the Game");
}

function checkAnswer(eventObj) {
    eventObj.stopPropagation();
    if (clicked) {
        return;
    }

    let el = eventObj.target;
    let currentQuestionObj = questions[questionIndex];

    if (el.tagName === "BUTTON") {
        let userAnswer = el.innerText;
        let answerAlert = document.querySelector(".answer-alert")

        if (userAnswer === currentQuestionObj.correctAnswer) {
            answerAlert.innerText = "Correct";
            answerAlert.classList.add("show");
        } else {
            answerAlert.innerText = "Wrong";
            answerAlert.classList.add("Show");
            time = (time - 15) < 0 ? 0 : time - 15;
        }

        clicked = true;

        setTimeout(function() {
            answerAlert.classList.remove("show");
            questionIndex++
            if (questionIndex === questions.length) {
                endGame();
            } else {
                displayQuestion();
                clicked = false;
            }
        }, 1500)
    }


};

function displayQuestion() {
    let currentQuestionObj = questions[questionIndex];

    let textEl = document.querySelector(".question-text")
    choicesDiv.innerHTML = "";
    textEl.innerText = currentQuestionObj.questionText;
    for (let i = 0; i < currentQuestionObj.choices.length; i++) {
        let choiceBtn = document.createElement("button");
        choiceBtn.innerText = currentQuestionObj.choices[i];
        let choicesDiv = document.querySelector(".choices");
        choicesDiv.append(choiceBtn);
        

    }
}


function startCountdown() {
    timeOutput.innerText = "Time Left :" + time;
    timer = setInterval(function() {
        time = (time - 1) < 0 ? 0 : time - 1;
        timeOutput.innerText = "Time Left :" + time;
        if (time <= 0) {
            endGame();
        }
    }, 1000);

}

function saveScore() {
    let initialInput = document.querySelector("#initial-input");
    let initials = initialInput.value
    let rawData = localStorage.getItem("highscores");
    let highscores = JSON.parse(rawData) || [];
    
    highscores.push({
        initials: initials,
        score: time
    })
    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location = "./highscores.html";

}

function startQuiz() {
    time = 60;
    questionIndex = 0;
    startWrap.classList.add("hide");
    questionWrap.classList.remove("hide");
    displayQuestion();
    startCountdown();
}

function endGame() {
    clearInterval(timer);
    questionWrap.classList.add("hide");
    let scoreOutput = document.querySelector("#score-output");
    scoreOutput.innerText = "Score: " + time;
    scoreWarp.classList.remove("hide");
}

choicesDiv.addEventListener("click", checkAnswer);
startbutton.addEventListener("click", startQuiz)
savebutton.addEventListener("click", saveScore);