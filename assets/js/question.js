let questions = [
{
    num: 1,
    question: "Which of the following is not a primitive?",
    answers: ["boolean", "null", "bigint", "element"],
    answer: "element"
},
{
    num: 2,
    question: "Which method integrates the text of two strings into one?",
    answers: ["append()", "add()", "integrate()", "concat()"],
    answer: "concat()"
},
{
    num: 3,
    question: "Which of the following words is used to define a variable in JS?",
    answers: ["var", "let", "Both A and B", "None of the above"],
    answer: "Both and A and B"
},
{
    num: 4,
    question: "Upon encountering empty statments, what does the Javascript Interpreter do?",
    answers: ["Throws an error", "Ignores the statements", "Gives a warning", "None of the above"],
    answer: "Ignores the statements"
},
{
    num: 5,
    question: "What does the Javascript 'debugger' statment do?", 
    answers: ["It will debug all the errors in the program at runtime", "It acts as a breakpoint in a program", "It will debug error in the current statment if any", "All of the above"],
    answer: "It acts as a breakpoint in a program"
},
];

let score = 0;
let questionindex = 0;

let wrapper = document.querySelector(".wrapper");
let timer = document.querySelector(".startTimer");
let currentTime = document.querySelector(".currentTime");
let questionsDiv = document.querySelector(".questionsDiv");

let secondsLeft = 100;
let holdInterval = 0;
let penalty = 15;
let ulCreate = document.createElement("ul");

