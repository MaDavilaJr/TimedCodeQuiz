var indexEl = document.getElementById("index")
var scores = JSON.parse(localStorage.getItem("index"))
var questions = [
    {
        title: '1. What does HTML stand for?',
        choices: ['Hyper Trainer Marking Language', 'Hyper Text Marketing Language', 'Hyper Text Markup Language', 'Hyper Text Markup Leveler'],
        answer: 'Hyper Text Markup Language'
    },
    {
        title: '2. Is this HTML code correct? <html><head><title>Title</title></head><h1>Header</h1><p>Paragraph</p></html>?',
        choices: ['Yes', 'No'],
        answer: 'No'
    },
    {
        title: '3. In Java, a method is a container that holds classes.',
        choices: ['True', 'False'],
        answer: 'False'
    },
    {
        title: '4. <h1>Text</h1> is the correct way of making a header in HTML.',
        choices: ['True', 'False'],
        answer: 'True'
    },
    {
        title: '5. Which of the following is the correct way of making a string in Java?',
        choices: ['String text = "text";', 'String "Text";', 'String text = "text"'],
        answer: 'String text = "text";'
    },
]
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var timerEl = document.querySelector('#time');
var questionEl = document.querySelector("#questions");
var choicesEl = document.querySelector('#choices');
var startBtn = document.querySelector('#start');
var submitBtn = document.querySelector('#submit');

startBtn.addEventListener("click", startQuiz)

function startQuiz(event) {
event.preventDefault();
var startScreen = document.querySelector('#startScreen')
startScreen.setAttribute('class', 'hide');

questionEl.removeAttribute('class', 'hide');

timerId = setInterval(clockTick, 1000);

timerEl.textContent = time;
getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.querySelector('#question-title');

    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = '';

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice');
        choiceBtn.setAttribute('value', choice)

        choiceBtn.textContent = i + 1 + ". " + choice

        choiceBtn.onclick = answerClick;

        choicesEl.appendChild(choiceBtn);
    })

}

function answerClick() {
    if(this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if(time < 0) {
            time=0;
        }

        timerEl.textContent = time;
    }

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length) {
        quizOver()
    } else {
        getQuestion();
    }
}

function quizOver() {
    event.preventDefault();
    clearInterval(timerId);
    var endScreen = document.querySelector('#endScreen');
    endScreen.removeAttribute('class', 'hide');
    var finalScore = document.querySelector('#final-score');
    finalScore.textContent = time;
    questionEl.setAttribute('class', 'hide')
}

document.addEventListener("click", function(event){
    event.preventDefault()
    if(event.target.id != "submit")return

    var initialsInput = document.getElementById("Initials")
    storeScore(initialsInput.value)

})


function storeScore(input) {
    var score = JSON.parse(localStorage.getItem("Highscores"))
    if(!score){
        localStorage.setItem("Highscores", JSON.stringify([
            {
                initials: input,
                score: time
            }
        ]))
        return
    }
    score.push({
        initials: input,
        score: time
    })
    localStorage.setItem("Highscores", JSON.stringify(score))
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if(time<=0) {
        //Add Quiz end function here
        quizOver();
    }
}


// Added highscore button accessibility
// click.addEventListener("highscores", function () {
//     if (HighscoresEl.style.display === "none") {
//         HighscoresEl.style.display = "block";
//     } else if (HighscoresEl.style.display === "block") {
//         HighscoresEl.style.display = "none";
//     } 
// });