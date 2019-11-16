// psuedo code:
// -first page has information with two links
//         1 - link to high scores page
//         2 - button to start quiz
//         3 - time reads 0 in upper right corner
// -2 - clicking start quiz roles immediately into questions
//     -timer: goes to start time and begins counting down by one second
//     -title is displayed as Header
//     -then choice options are displayed as buttons in a ul?
//     -clicking right answer progresses to next questions
//     -clicking wrong answer docks 15 seconds and progresses to next question

var time = 100;
var quizButton = document.querySelector("#quiz_start");
var interval;
var quiz_content = document.querySelector(".quiz_content");
var quiz_title = document.querySelector("#quiz_title");
var quiz_instr = document.getElementById("quiz_instr");
var answer = document.querySelectorAll(".answer");
// var questionEl = 0; 
// var q1_title = document.questions1.title

var currentQuestionIndex = 0;


quizButton.addEventListener("click", startQuiz);
// quiz_content.addEventListener("click",);

function startQuiz() {
    var x = questions1[currentQuestionIndex].choices

    document.getElementById("timer").innerHTML = "Timer: " + time;
    interval = setInterval(countDown, 1000)
    quiz_title.textContent = questions1[currentQuestionIndex].title;
    quizButton.parentNode.removeChild(quizButton);
    quiz_instr.textContent = " ";

    for (i = 0; i < x.length; i++) {
        var buttonEl = document.createElement("button");
        var br = document.createElement("br");
        var hr = document.createElement("hr");
        buttonEl.setAttribute("class", "answer");
        buttonEl.innerHTML = x[i];
        quiz_content.appendChild(buttonEl);
        quiz_content.appendChild(br);
        quiz_content.appendChild(hr);

        if (x[i] === questions1[currentQuestionIndex].answer) {
            console.log("woohoo!!");
            buttonEl.setAttribute("id", "correct_answer");
            buttonEl.addEventListener("click", correct_answer);
        } else {
            buttonEl.onclick = wrong_answer;
        }
    }
    document.getElementById("correct_answer").setAttribute("style", "color: red;");
}

function correct_answer() {
    currentQuestionIndex++;

    // time = time + 10;

    quiz_title.textContent = questions1[currentQuestionIndex].title;
    quiz_instr.textContent = "Nice, that one was correct!";
    quiz_instr.setAttribute("style", "border-top: 3px solid black;");
    quiz_instr.setAttribute("style", "color: red;");
    quiz_content.appendChild(quiz_instr);

    RightAnswerCheck();
}

function wrong_answer() {
    currentQuestionIndex++;

    time = time - 15;

    quiz_title.textContent = questions1[currentQuestionIndex].title;
    quiz_instr.textContent = "Ouch, that one was wrong!";
    quiz_instr.setAttribute("style", "border-top: 3px solid black;");
    quiz_content.appendChild(quiz_instr);

    RightAnswerCheck();
}

function countDown() {

    if (time >= 0) {
        // Get timer to countdown continously
        time--;
    }
    // If the count down is finished, write some text
    else {
        clearInterval(time);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }

    document.getElementById("timer").innerHTML = "Timer: " + time;
}

function deleteButtons() {
    for (i = 0; i < answer.length; i++) {
        answer.parentNode.removeChild(answer);
    }
    console.log("howdy");
}

function RightAnswerCheck() {
    var qChoices = questions1[currentQuestionIndex].choices;
    var answer = document.querySelectorAll(".answer");

    for (i = 0; i < answer.length; i++) {
        answer[i].innerHTML = qChoices[i];
        answer[i].removeEventListener("click",correct_answer);
        answer[i].removeEventListener("click",wrong_answer);

        if (qChoices[i] === questions1[currentQuestionIndex].answer) {
            answer[i].setAttribute("id", "correct_answer");
            answer[i].addEventListener("click", correct_answer);
            answer[i].setAttribute("style", "color: red;");

        } else if (qChoices[i] === "end") {
            // var endScore = document.createElement("p");
            // endScore.textContent = "final score is: " + time;
            var endScore = time;
            localStorage.setItem("endScore", JSON.stringify(endScore));
            clearInterval(interval);
            window.location.href = "highscore.html";
            
        }
        else {
            answer[i].removeAttribute("id");
            answer[i].removeAttribute("style");
            answer[i].addEventListener("click", wrong_answer);
        }
    }
}

