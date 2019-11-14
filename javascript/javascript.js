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
// var q1_title = document.questions1.title

console.log(quiz_content);
console.log(quiz_title);



function startQuiz() {
    document.getElementById("timer").innerHTML = "Timer: " + time;
    interval = setInterval(countDown, 1000)
    quiz_title.textContent = questions1[0].title;
    quiz_q = "";
    quizButton.parentNode.removeChild(quizButton);
    quiz_instr.parentNode.removeChild(quiz_instr);
    var x = questions1[0].choices
    console.log(x);
    for (i=0; i < x.length; i++) {
        var newEl = document.createElement("button");
        var br = document.createElement("br");
        var hr = document.createElement("hr");
        newEl.setAttribute("class", "answer");
        newEl.innerHTML = x[i];
        quiz_content.appendChild(newEl);
        quiz_content.appendChild(br);
        quiz_content.appendChild(hr);
    }
}

function countDown(){
    document.getElementById("timer").innerHTML = "Timer: " + time;

        if (time >= 0) {
        // Get timer to countdown continously
        time--;
        }
        // If the count down is finished, write some text
        else {
        clearInterval(time);
        document.getElementById("timer").innerHTML = "EXPIRED";
        }
    
}

quizButton.addEventListener("click", startQuiz);
    
    

