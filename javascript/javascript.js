//This is where all my global variables are declared;
var time = 15 * questions1.length;
var quizButton = document.querySelector("#quiz_start");
var interval;
var quiz_content = document.querySelector(".quiz_content");
var quiz_title = document.querySelector("#quiz_title");
var quiz_instr = document.getElementById("quiz_instr");
var answer = document.querySelectorAll(".answer");
var currentQuestionIndex = 0;

//This is the event listener for the start quiz button
quizButton.addEventListener("click", startQuiz);

//This is the function that is run when the start quiz button is clicked
function startQuiz() {
    //set the array of choices from the questions object for the current index equal to x
    var qChoices = questions1[currentQuestionIndex].choices

    //This code deals with the display and starting of the timer
    document.getElementById("timer").innerHTML = "Timer: " + time;
    interval = setInterval(countDown, 1000)
    //This code replaces the header content with the question title
    quiz_title.textContent = questions1[currentQuestionIndex].title;
    //removes the start quiz button and sets content to empty string
    quizButton.parentNode.removeChild(quizButton);
    quiz_instr.textContent = " ";

    //This for loop is run to create buttons for the choices of x
    for (i = 0; i < qChoices.length; i++) {
        var buttonEl = document.createElement("button");
        var br = document.createElement("br");
        var hr = document.createElement("hr");
        buttonEl.setAttribute("class", "answer");
        buttonEl.innerHTML = qChoices[i];
        quiz_content.appendChild(buttonEl);
        quiz_content.appendChild(br);
        quiz_content.appendChild(hr);

        if (qChoices[i] === questions1[currentQuestionIndex].answer) {
            buttonEl.setAttribute("id", "correct_answer");
            buttonEl.addEventListener("click", correct_answer);
        } else {
            buttonEl.addEventListener("click", wrong_answer);
        }
    }
}

//This function runs if the correct answer is clicked on
function correct_answer() {
    currentQuestionIndex++;

    //Deals with formatting the page based on the correct answer
    quiz_title.textContent = questions1[currentQuestionIndex].title;
    quiz_instr.textContent = "Nice, that one was correct!";
    quiz_instr.setAttribute("style", "border-top: 3px solid black;");
    quiz_instr.setAttribute("style", "color: green;");
    quiz_content.appendChild(quiz_instr);

    RightAnswerCheck();
}

//This function runs if a wrong answer is clicked on
function wrong_answer() {
    currentQuestionIndex++;

    time = time - 15;

    quiz_title.textContent = questions1[currentQuestionIndex].title;
    quiz_instr.textContent = "Ouch, that one was wrong!";
    quiz_instr.setAttribute("style", "border-top: 3px solid black;");
    quiz_instr.setAttribute("style", "color: red;");
    quiz_content.appendChild(quiz_instr);

    RightAnswerCheck();
}

//This function runs the timer interval
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

//This function runs everytime an answer is clicked on and does different operations depending on if the answer has the correct_answer class or not.
function RightAnswerCheck() {
        var qChoices = questions1[currentQuestionIndex].choices;
        var answer = document.querySelectorAll(".answer");

        //This loops finds all the answer buttons which were set to array answer and changes the innner content of the button to the choices in the next question of object
        for (i = 0; i < answer.length; i++) {
        answer[i].innerHTML = qChoices[i];      
        //this if statement only runs if the answer button being created is the correct answer
        if (qChoices[i] === questions1[currentQuestionIndex].answer) {
            answer[i].removeEventListener("click", wrong_answer);
            answer[i].removeAttribute("id");
            answer[i].setAttribute("id", "correct_answer");
            answer[i].addEventListener("click", correct_answer);
        //My questions object has an element with just end in the choices.  This part of statement is meant to end the quiz and direct to high score page.
        } else if (qChoices[i] === "end") {
            // var endScore = document.createElement("p");
            // endScore.textContent = "final score is: " + time;
            var endScore = time;
            localStorage.setItem("endScore", JSON.stringify(endScore));
            clearInterval(interval);
            window.location.href = "/highScore.html";
            
        } //This part of statement runs for all that is left.  Which in this case is all the wrong answers.
        else {
            answer[i].removeEventListener("click", correct_answer);
            answer[i].removeAttribute("id");
            answer[i].removeAttribute("style");
            answer[i].addEventListener("click", wrong_answer);
        }
    }
}

