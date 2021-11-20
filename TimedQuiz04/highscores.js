var HighscoresEl = document.getElementById("Highscores")
var scores = JSON.parse(localStorage.getItem("Highscores"))

for(score of scores){
    var LI = document.createElement("li")
    LI.textContent = "Initials " +score.initials+"/"+score.score
    HighscoresEl.appendChild(LI)
}