const firstNumber = document.getElementById("number1");
const secondNumber = document.getElementById("number2");
const userInput = document.getElementById("answer");
const message = document.getElementById("message");
const correctAnswers = document.getElementById("correct");
const incorrectAnswers = document.getElementById("incorrect");
const balloon = document.getElementById("balloon");
const timer = document.getElementById("timer");

let firstNum, secondNum, answer, userAns, correct, incorrect, balloonSize, easy, timeVar;
let win = false;
let timeSeconds = 10;
let timeLeft = timeSeconds;
let timerVar;

function checkTime() {
    if (win == true) {
        clearInterval(timerVar);
    }
    if (timeLeft <= 0) {
        timer.innerHTML = timeLeft;
        message.style.color = "red";
        message.innerHTML = "Incorrect";
        incorrect++;
        incorrectAnswers.innerHTML = "Incorrect: " + incorrect; 
        userInput.value = "";
        timeLeft = timeSeconds;
        if (easy) {
            answer = newEasyNum();
        } else {
            answer = newHardNum();
        }
    }
    else {
        timer.innerHTML = timeLeft;
    }
    timeLeft -= 1;
}

function clearTime() {
    clearInterval(timerVar);
}


function setBallonSize(newSize){
    balloonSize = newSize;
    balloon.style.width = balloonSize + "px";
}

function reset() {
    balloon.src = "balloon.jpeg";
    setBallonSize(50);
    correct = 0;
    incorrect = 0;
    timeLeft = timeSeconds;
    correctAnswers.innerHTML = "Correct: " + correct;
    incorrectAnswers.innerHTML = "Incorrect: " + incorrect;
    message.innerHTML = "&nbsp";
    timer.innerHTML = "&nbsp";
    userInput.value = "";
    win = false;
    userInput.addEventListener("keydown", checkAnswer);
    clearTime();
    timerVar = setInterval(checkTime, 1000);
}

function easyMode() {
    answer = newEasyNum();
    easy = true;
    reset();
}

function hardMode() {
    answer = newHardNum();
    easy = false;
    reset();
}

function newEasyNum() {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let sum = num1 + num2;
    firstNumber.innerHTML = num1;
    secondNumber.innerHTML = num2;
    return sum;
}
function newHardNum() {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    let sum = num1 + num2;
    firstNumber.innerHTML = num1;
    secondNumber.innerHTML = num2;
    return sum;
}

function checkAnswer(event) {
    if (event.keyCode == 13) {
        userAns = userInput.value;
        if (answer == userAns) {
            timeLeft = timeSeconds;
            message.style.color ="green";
            message.innerHTML = "Correct";
            setBallonSize(balloonSize + 20);
            correct++;
            correctAnswers.innerHTML = "Correct: " + correct;
            if (balloonSize >= 250) {
                balloon.src = "winner.jpg";
                balloon.style.width = "100%";
                userInput.removeEventListener('keydown', checkAnswer);
                win = true;
                return;
            }
            userInput.value = "";
        }
        else {
            timeLeft = timeSeconds;
            message.style.color = "red";
            message.innerHTML = "Incorrect";
            incorrect++;
            incorrectAnswers.innerHTML = "Incorrect: " + incorrect; 
            userInput.value = "";
        }

        if (easy) {
            answer = newEasyNum();
        } else {
            answer = newHardNum();
        }
    }
}


