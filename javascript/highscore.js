//This is where all my global variables are declared
var userInput = document.querySelector("#user-text");
var scoreForm = document.querySelector("#score-form");
var highScoreList = document.querySelector("#highScore-list");
var highScoreCount = document.querySelector("#highScore-count");
var finalScore = document.querySelector("#final_score");
var clearButton = document.querySelector("#clear");
var scoresArr = [];
var currentHighScore = JSON.parse(localStorage.getItem("endScore"));

//This line of code displays the final score from the quiz in the header
finalScore.textContent = "Final Score is: " + currentHighScore;
init();

// When user high score is submitted...
scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var userText = { initials: userInput.value.trim(), score: currentHighScore }

    // Return from function early if submitted userText is blank
    if (userText === "") {
        return;
    }
    console.log(userText);
    // Add new userText to score array, clear the input
    scoresArr.push(userText);
    userInput.value = "";

    // Store updated user input high scores in localStorage, re-render the list
    storeScores();
    renderScores();
});


//This function runs the initial set=up for the high score page.  It gets the scores Arr from localstorage and pulls them up into list if they exist
function init() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    var storedScores = JSON.parse(localStorage.getItem("scoresArr"));

    // If scores were retrieved from localStorage, update the scores array to it
    if (storedScores !== null) {
        scoresArr = storedScores;
    }

    // Render scores to the DOM
    renderScores();
}

//This function renders the highscores to the html page.
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

//this function stores the highscore in object scoresArr in localStorage
function storeScores() {
     // Stringify and set "scoresArr" key in localStorage to scoresArr
    localStorage.setItem("scoresArr", JSON.stringify(scoresArr));

}

//This code runs the event listener for the clear button
scoreForm.addEventListener("click", function () {
    if (event.target.matches("button") === true) {
        console.log(localStorage);
        localStorage.removeItem("scoresArr");
        highScoreList.innerHTML = "";
        highScoreCount = 0;
    }
});


