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
var wrong = document.querySelector(".answer");
var correct = document.getElementById("correct_answer");
// var questionEl = 0; 
// var q1_title = document.questions1.title

var currentQuestionIndex = 0;

// currentQuestionIndex ++;
// currentQuestionIndex = currentQuestionIndex + 1;
// // also the same as
// currentQuestionIndex += 1;

console.log(quiz_content);
console.log(quiz_title);


function startQuiz() {
    var x = questions1[currentQuestionIndex].choices

    document.getElementById("timer").innerHTML = "Timer: " + time;
    interval = setInterval(countDown, 1000)
    quiz_title.textContent = questions1[currentQuestionIndex].title;
    quiz_q = "";
    quizButton.parentNode.removeChild(quizButton);
    quiz_instr.parentNode.removeChild(quiz_instr);

    for (i = 0; i < x.length; i++) {
        var newEl = document.createElement("button");
        var br = document.createElement("br");
        var hr = document.createElement("hr");
        newEl.setAttribute("class", "answer");
        // newEl.onclick = wrong_answer;
        newEl.innerHTML = x[i];
        quiz_content.appendChild(newEl);
        quiz_content.appendChild(br);
        quiz_content.appendChild(hr);

        if (x[i] === questions1[currentQuestionIndex].answer) {
            console.log("woohoo!!");
            newEl.setAttribute("id", "correct_answer");
            //newEl.onclick = correct_answer;
            newEl.addEventListener("click", correct_answer);
        } else {
            newEl.onclick = wrong_answer;
        }
    }

    document.getElementById("correct_answer").setAttribute("style", "color: red;");
}


function correct_answer() {
    currentQuestionIndex++;
    var choices = questions1[currentQuestionIndex].choices;
    var answer = document.querySelectorAll(".answer");
    time = time + 10;

    quiz_title.textContent = questions1[currentQuestionIndex].title;

    for (i = 0; i < answer.length; i++) {
        answer[i].innerHTML = choices[i];

        if (choices[i] === questions1[currentQuestionIndex].answer) {
            console.log("woohoo!!");
            answer[i].removeAttribute(onclick);
            answer[i].setAttribute("id", "correct_answer");
            answer[i].onclick = correct_answer;
            answer[i].setAttribute("style", "color: red;");
        } else {
            answer[i].removeAttribute(onclick);
            answer[i].removeAttribute("id");
            answer[i].removeAttribute("style");
            answer[i].onclick = wrong_answer;
        }
    }
}

function wrong_answer() {
    currentQuestionIndex++;
    var choices= questions1[currentQuestionIndex].choices;
    var answer = document.querySelectorAll(".answer");
    time = time - 15;

    quiz_title.textContent = questions1[currentQuestionIndex].title;

    for (i = 0; i < answer.length; i++) {
        answer[i].innerHTML = choices[i];

        if (choices[i] === questions1[currentQuestionIndex].answer) {
            console.log("woohoo!!");
            answer[i].removeAttribute(onclick);
            answer[i].setAttribute("id", "correct_answer");
            answer[i].onclick = correct_answer;
           
            answer[i].setAttribute("style", "color: red;");
        } else {
            answer[i].removeAttribute(onclick);
            answer[i].removeAttribute("id");
            answer[i].removeAttribute("style");
            answer[i].onclick = wrong_answer;
        }
    }
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



quizButton.addEventListener("click", startQuiz);

console.log(correct);




