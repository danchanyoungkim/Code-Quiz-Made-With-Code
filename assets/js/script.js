let viewScores = document.querySelector(".view-scores");
let viewStart = document.querySelector(".view-start");
let quizTimer = document.querySelector(".quiz-timer");
let heading1 = document.querySelector(".h1");
let enterName = document.querySelector(".enter-name");
let enterNameButton = document.querySelector(".enter-name-button");
let startPage = document.querySelector(".start-page");
let optionBoxes = document.querySelector(".option-boxes");
let scoresPage = document.querySelector(".scores-page");

let questionNumber = 0;
let quizSeconds = 100;
let finalScore;
// Array for multiple scores.
let multipleScores = [];

// Var for multiple choice answers.
let quizOptions = quiz[questionNumber].options;
let numberOfQuestions = quiz.length;

function startQuiz() {
    // Once quiz starts, some displays will not be shown.
    viewScores.setAttribute("style", "display: none;");
    enterName.setAttribute("style", "display: none;");
    scoresPage.setAttribute("style", "display: none;");
    startPage.setAttribute("style", "display: none;"); 
    optionBoxes.setAttribute("style", "justify-content: center");
    optionBoxes.innerHTML = "";
    // Brings the arrays from question.js.
    heading1.textContent = quiz[questionNumber].question;
    displayOptions();
    // Starts timer.
    countdownTimer();
}

function displayOptions() {
    // For loop to display questions.
    for (let i = 0; i < quizOptions.length; i++) {
        let optionButton = document.createElement("button");
        optionButton.setAttribute("class", "option-button");
        // Shows options on buttons.
        optionButton.textContent = quiz[questionNumber].options[i];
        optionBoxes.appendChild(optionButton);
    }
}

// Quiz timer once quiz starts.
function countdownTimer() {
    let timer = setInterval(function() {
        // Shows timer.
        quizTimer.textContent = quizSeconds;
        // Decrement of timer by the second.
        quizSeconds--;

        // Game ends once it hits 0 seconds.
        if (quizSeconds <= 0) {
            clearInterval(timer);
            // Displays timer at 0.
            quizTimer.textContent = "0";
            optionBoxes.innerHTML = "";
            questionNumber = 0;
            optionBoxes.setAttribute("display", "none");
            startPage.setAttribute("style", "display: block;");
            heading1.textContent = "Your score is: " +  quizSeconds;
            // Resets timer back to 100.
            quizSeconds = 100;
        } 
        // Stops timer once quiz is complete.
        else if (questionNumber === 5) {
            clearInterval(timer);
            // Resets score.
            questionNumber = 0;
            quizSeconds = 100;
        }
    }, 1000);
} 

// Alert for correct answers.
function correctAnswer() {
    let correct = document.createElement("div");
    optionBoxes.appendChild(correct);
    alert("Correct!");
}

// Alert for incorrect answers.
function incorrectAnswer() {
    let incorrect = document.createElement("div");
    optionBoxes.appendChild(incorrect);
    alert("Incorrect!");
}

// Event listener will react to answer chosen.
document.addEventListener("click", function(event) {
    if (event.target.matches('.option-button')) {
        event.preventDefault();
        /* 'If' if the answer is correct  
        'else if' if the answer is incorrect.*/
        if (event.target.textContent === quiz[questionNumber].answer) {
            // Once answer is submitted, it moves to the next question.
            questionNumber = questionNumber + 1;
            if (questionNumber <= (numberOfQuestions - 1)) {
                heading1.textContent = quiz[questionNumber].question;
                optionBoxes.innerHTML = "";
                displayOptions();
                correctAnswer();
            } else {
                // Once game ends, nothing is in the option.
                optionBoxes.innerHTML = "";
                correctAnswer();
                // Input for score.
                enterName.setAttribute("style", "display: block;");
                // This creates the ability to go back to start page.
                startPage.setAttribute("style", "display: block;");
                // This creates the ability to view scores after input.
                viewScores.setAttribute("style", "display: inline;");
                // This shows score of the latest quiz.
                heading1.textContent = "Your score is: " +  quizSeconds;
                finalScore = quizSeconds;
            }  
        } else if (event.target.textContent !== quiz[questionNumber].answer) {
            questionNumber = questionNumber + 1;
            quizSeconds -= 20;
            if (questionNumber <= (numberOfQuestions - 1)) {
                heading1.textContent = quiz[questionNumber].question;
                optionBoxes.innerHTML = "";
                displayOptions();
                incorrectAnswer();
            } else {
                // Same concept as above 'else'.
                optionBoxes.innerHTML = " ";
                incorrectAnswer();
                enterName.setAttribute("style", "display: block;");
                startPage.setAttribute("style", "display: block;");
                viewScores.setAttribute("style", "display: inline;");
                heading1.textContent = "Your score is: " +  quizSeconds;
                finalScore = quizSeconds;
            }        
        }
    }
});

// Function for saving score with name.
function enterInitials(event) {
    event.preventDefault();
    // Input to save first letters of first/last name.
    let input = document.querySelector(".input").value;
    // Integrates and retains the score and name.
    let userScores = {
        initials: input,
        score: finalScore
    };
    // Moves to the score into the score page.
    multipleScores.push(userScores);
    // Turns into a string.
    let multipleScoresString = JSON.stringify(multipleScores);
    // Local storage to keep stats.
    window.localStorage.setItem("scores", multipleScoresString);
    heading1.textContent = "Score input complete! Would you like to retake the quiz?";
    enterName.setAttribute("style", "display: none;");
    optionBoxes.innerHTML = "";
}

// When user clicks submit, enter their score
// and their initials to their local Storage
enterNameButton.addEventListener("click", enterInitials);

// Go back to start Menu
function viewStartPage() {
    viewStart.setAttribute("style", "display: none;")
    viewScores.setAttribute("style", "display: inline;")
    startPage.setAttribute("style", "display: block;");
    scoresPage.setAttribute("style", "display: none;");
    optionBoxes.setAttribute("style", "display: none");
    enterName.setAttribute("style", "display: none;");
    heading1.textContent = "JavaScript Coding Quiz";
}

// When user clicks submit, enter their score
// and their initials to their local Storage
enterNameButton.addEventListener("click", enterInitials);

function viewAllScores() {
    // Show the score menu with title
    scoresPage.innerHTML = " ";
    startPage.setAttribute("style", "display: none;");
    scoresPage.setAttribute("style", "display: block;");
    optionBoxes.setAttribute("style", "display: none");
    enterName.setAttribute("style", "display: none;");
    heading1.textContent = "View All Scores";
    viewStart.setAttribute("style", "display: inline;");
    viewScores.setAttribute("style", "display: none;");


    // Grab the high scores from user's local storage
    let highScoreList = window.localStorage.getItem("scores");
    
    // Convert the high scores from strings to an array of objects
    let highScoreObject = JSON.parse(highScoreList);

    // Cycle through the array and list each initial with 
    // corresponding score as an element
    for (let i=0;i <= multipleScores.length - 1;i++){
        let highScoreEntry = document.createElement("div");
        highScoreEntry.setAttribute("class", "alert alert-warning");
        highScoreEntry.innerHTML = "<span style='font-weight: bold;''>" +  highScoreObject[i].initials + ":</span> " + highScoreObject[i].score;
        scoresPage.appendChild(highScoreEntry);

    }
}
