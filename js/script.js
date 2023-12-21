let startBtn = document.querySelector("#start");
let startWrap = document.querySelector(".start-wrap");
let quesitonWrap = document.querySelector(".question-wrap");
let timeOutput = document.querySelector("#time-output");

let questionIndex = 0;
let time = 60;
let timer;

/* ToDO 
- make displayQuestion function
- make endGame function
- make check answer function
*/

function startQuiz() {
    startWrap.classList.add("hide");
    quesitonWrap.classList.remove("hide");

    displayQuestion();
    startCountdown();
}

function displayQuestion() {

}

function startCountdown() {
    timeOutput.innerText = "Time Left: " + time;
    timer = setInterval(function() {
        time--;
        timeOutput.innerText = "Time Left: " + (time >= 0 ? time : 0);
        if (time <=0) {
            endgame();
        }
    }, 1000);
}

startBtn.addEventListener("click", startQuiz);