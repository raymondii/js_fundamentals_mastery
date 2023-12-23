let highscoreOutput = document.querySelector(".highscores-output")

function outputHighscores() {
    let rawData = localStorage.getItem("highscores");
    let highscores = JSON.parse(rawData);

    for (let i = 0; i < highscores.length; i++) {
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        let scoreObj = highscores[i];

        h3.innerText = "Initials: " + scoreObj.initials;
        p.innerText = "score: " + scoreObj.score;
        div.append(h3, p);
        highscoreOutput.append(div);
    }
}

outputHighscores();