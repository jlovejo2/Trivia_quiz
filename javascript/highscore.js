var userInput = document.querySelector("#user-text");
var scoreForm = document.querySelector("#score-form");
var highScoreList = document.querySelector("#highScore-list");
var highScoreCount = document.querySelector("#highScore-count");
var finalScore = document.querySelector("#final_score");

var scoresArr = [];

var currentHighScore = JSON.parse(localStorage.getItem("endScore"));
finalScore.textContent = "Final Score is: " + currentHighScore;

init();

function renderScores() {
    // Clear highScoreList element and update highScoreCount
    highScoreList.innerHTML = "";
    highScoreCount.textContent = scoresArr.length;

    // Render a new li for each score
    for (i of scoresArr) {

        var li = document.createElement("li");
        li.textContent = i.initials + ": " + i.score;
        li.setAttribute("data-index", i);
        highScoreList.appendChild(li);
    }
}

function init() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    var storedScores = JSON.parse(localStorage.getItem("scoresArr"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedScores !== null) {
        scoresArr = storedScores;
    }

    // Render todos to the DOM
    renderScores();
}

function storeTodos() {
    // var newScore = { initials: scoresArr, score: currentHighScore };
    // // pushes newSCore object into the array scoresArr.
    // scoresArr.push(newScore);
    // // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("scoresArr", JSON.stringify(scoresArr));

}

// When form is submitted...
scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var todoText = { initials: userInput.value.trim(), score: currentHighScore}

    // Return from function early if submitted todoText is blank
    if (todoText === "") {
        return;
    }
    console.log(todoText);
    // Add new todoText to score array, clear the input
    scoresArr.push(todoText);
    userInput.value = "";

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderScores();
});




