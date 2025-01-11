/**
 * Module for handling the Tipsfrågor quiz functionality.
 * - Loads questions from a JSON file.
 * - Displays questions one by one.
 * - Checks answers and calculates score.
 * - Shows the final score and allows restarting the test.
 * @module kmom10/tipsQuestions
 */

let questions = []
let currentQuestionIndex = 0
let score = 0
// let userAnswers = [] // Array to save user inputs

const questionContainer = document.getElementById('question-container')
const scoreContainer = document.getElementById('score-container')
const scoreValue = document.getElementById('score-value')
const feedbackContainer = document.getElementById('feedback-container')
const nextButton = document.getElementById('next-button')

/**
 * Loads questions from the JSON file.
 */
async function loadQuestions () {
  const response = await fetch('./data/questions.json')
  const data = await response.json()
  questions = data.questions
  currentQuestionIndex = 0 // Reset to the first question
  score = 0 // Reset score
  // userAnswers = [] // Reset user answers
  displayQuestion()
}

/**
 * Displays the current question and its options.
 */
function displayQuestion () {
  feedbackContainer.classList.remove('hidden')

  const question = questions[currentQuestionIndex]
  questionContainer.innerHTML = `
    <br>
    <h3>${question.question}</h3>
    <br>
    ${question.options
      .map(
        (option) => `
      <button class="option-button">${option}</button>
    `
      )
      .join('')}
  `

  // Attach event listeners after the buttons are created
  const optionButtons = document.querySelectorAll('.option-button')
  optionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      checkAnswer(button.textContent) // Get the button text and check answer
    })
  })
}

/**
 * Shows feedback for the current question.
 * @param {boolean} isCorrect - Whether the selected answer is correct.
 * @param {string} correctAnswer - The correct answer.
 */
function showFeedback (isCorrect, correctAnswer) {
  feedbackContainer.classList.remove('hidden')
  feedbackContainer.textContent = isCorrect
    ? 'Correct! You earned 3 points.'
    : `Incorrect. The correct answer is: ${correctAnswer}`
  nextButton.classList.remove('hidden')
  nextButton.addEventListener('click', moveToNextQuestion)
}
/**
 * Moves to the next question or shows the final score.
 */
function moveToNextQuestion () {
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    displayQuestion()
  } else {
    showScore()
  }
}
/**
 * Checks if the selected answer is correct and updates the score.
 * Saves the selected answer for later review.
 * Displays the next question or shows the final score if all questions are answered.
 * @param {string} selectedOption - The selected answer option.
 */
function checkAnswer (selectedOption) {
  const question = questions[currentQuestionIndex]
  const correctAnswer = question.answer
  const isCorrect = selectedOption === correctAnswer

  if (isCorrect) {
    score += 3
  }
  // Display feedback
  showFeedback(isCorrect, correctAnswer)

  currentQuestionIndex++

  if (currentQuestionIndex < questions.length) {
    displayQuestion()
  } else {
    showScore()
  }
}

/**
 * Shows the final score and user's answers.
 */
function showScore () {
  questionContainer.classList.add('hidden')
  feedbackContainer.classList.add('hidden')
  scoreContainer.classList.remove('hidden')
  const totalScoreP1 = questions.length * 3
  scoreValue.textContent = `${score}/${totalScoreP1}`
  nextButton.classList.add('hidden')
}

/**
 * Allows restarting the quiz.
 */
function restartQuiz () {
  currentQuestionIndex = 0 // Start from the first question
  score = 0 // Reset the score

  // Reset the UI elements
  questionContainer.classList.remove('hidden') // Show the question container
  scoreContainer.classList.add('hidden') // Hide the score container

  // Reload questions and display the first one
  loadQuestions()
}

export { displayQuestion, loadQuestions, checkAnswer, restartQuiz }

// fixes:
// await for pressing the nextbutton 
// then go to nect questions
//  user gets to see correct anser 
//  and wrong on that page