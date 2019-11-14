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
var quizButton = document.querySelector(".quiz_start");
var interval; 
document.getElementById("timer").innerHTML = "Timer: " + time;


function startQuiz() {
    interval = setInterval(countDown, 1000)

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
    
    

