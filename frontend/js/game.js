const question = document.getElementById('question');
// Turn node collection into array
const choices = Array.from( document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progress-bar-fill');
const scoreText = document.getElementById('score')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('../questions.json')
.then( res => {
    return res.json();
}).then( loadQuestions => {
    questions.loadQuestions;
    startGame();
})
.catch( err => {
    console.error(err);
})

  const CORRECT_BONUS = 10;
  const MAX_QUESTIONS = 3;

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
  }

  getNewQuestion = () => {
    if(availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('../pages/end.html');
    }

    questionCounter++;
    progressText.innerHTML = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  }

  choices.forEach( choice => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);

        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1500)
    })
  })

  incrementScore = num => {
    score +=num;
    scoreText.innerHTML = score;
  }

  startGame();