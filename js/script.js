let h1 = document.querySelector("h1");
let time = 10;


let timer = setInterval(function () {
    time--;
    h1.innerText = "Time Left: " + time;
    if (time === 0) {
        endgame();
    }
}, 1000);

function endgame() {
    clearInterval(timer);
    alert("Times Up");
    let messageParagraph = document.querySelector("#message");
    messageParagraph.innerText = "Game Over";
    messageParagraph.style.display = "initial"
}

// question.wrap.innerHTML =
//     "<div>" + "<h3>" + question[0].questionText + "</h3>" + "</div>"