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

const questionContainer = document.getElementById('question-container')
const scoreContainer = document.getElementById('score-container')
const scoreValue = document.getElementById('score-value')
// const restartButton = document.getElementById('restart-button')

/**
 * Loads questions from the JSON file.
 */
export async function loadQuestions () {
  const response = await fetch('./data/questions.json')
  const data = await response.json()
  questions = data.questions
  currentQuestionIndex = 0 // Reset to the first question
  score = 0 // Reset score
  displayQuestion()
}

/**
 * Displays the current question and its options.
 */
function displayQuestion () {
  const question = questions[currentQuestionIndex]
  questionContainer.innerHTML = `
    <h3>${question.question}</h3>
    ${question.options.map((option) => `
      <button class="option-button" onclick="checkAnswer('${option}')">${option}</button>
    `).join('')}
  `
}

/**
 * Checks if the selected answer is correct and updates the score.
 * Displays the next question or shows the final score if all questions are answered.
 * @param {string} selectedOption - The selected answer option.
 */
export function checkAnswer (selectedOption) {
  const correctAnswer = questions[currentQuestionIndex].answer
  if (selectedOption === correctAnswer) {
    score++
  }
  currentQuestionIndex++

  if (currentQuestionIndex < questions.length) {
    displayQuestion()
  } else {
    showScore()
  }
}

/**
 * Shows the final score.
 */
function showScore () {
  questionContainer.classList.add('hidden')
  scoreContainer.classList.remove('hidden')
  scoreValue.textContent = score
}

/**
 * Allows restarting the quiz.
 */
export function restartQuiz () {
  loadQuestions()
}
