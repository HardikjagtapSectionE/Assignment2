const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
        answer: 2, // Index of the correct answer in the choices array (starting from 0)
        code: "" // Add code block URL if needed
    },
    {
        question: "Choose the correct HTML tag for the largest heading",
        choices: ["<heading>", "<h6>", "<head>", "<h1>"],
        answer: 4,
        code: ""
    },
    {
        question: "What does CSS stand for?",
        choices: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: 2,
        code: ""
    },
    {
        question: "How can you make a numbered list?",
        choices: ["<ol>", "<ul>", "<dl>", "<list>"],
        answer: 1,
        code: ""
    },
    {
        question: "What is the correct HTML tag for inserting a line break?",
        choices: ["<br>", "<hr>", "<break>", "<lb>"],
        answer: 1,
        code: ""
    },
    // Add more questions in similar format
];

const question = document.getElementById("question");
const codeBlock = document.getElementById("code-block");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    if (currentQuestion.code) {
        codeBlock.src = currentQuestion.code;
    }

    choices.forEach((choice, index) => {
        const choiceText = currentQuestion.choices[index];
        choice.dataset.number = index + 1;
        choice.innerText = choiceText;
        choice.parentElement.disabled = choiceText === "";
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

clickAnswer = () => {
    choices.forEach(choice => {
        choice.addEventListener("click", e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = parseInt(selectedChoice.dataset.number);

            const classToApply = selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";
            if (classToApply === "correct") {
                incrementScore();
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });
};

incrementScore = () => {
    score += 10; // Increment the score by a fixed value
    scoreText.innerText = score;
};

startGame();
clickAnswer();
