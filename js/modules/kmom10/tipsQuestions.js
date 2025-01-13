/**
 * Modul för att hantera funktionaliteten för Tipsfrågor quiz.
 * - Laddar frågor från en JSON-fil.
 * - Visar frågor en i taget.
 * - Kollar svar och räknar poäng.
 * - Visar slutpoängen och möjliggör att starta om testet.
 * @module kmom10/tipsQuestions
 */

let questions = []
let currentQuestionIndex = 0
let score = 0
// let userAnswers = [] // Array to save user inputs

const questionContainer = document.getElementById('question-container')
const feedbackContainer = document.getElementById('feedback-container')
const scoreContainer = document.getElementById('score-container')

const scoreValue = document.getElementById('score-value')
const nextButton = document.getElementById('next-button')

/**
 * Laddar frågor från JSON-filen.
 */
async function loadQuestions () {
  const response = await fetch('./data/questions.json')
  const data = await response.json()
  questions = data.questions
  currentQuestionIndex = 0
  score = 0
  displayQuestion()
}

/**
 * Visar den aktuella frågan och dess alternativ.
 */
function displayQuestion () {
  feedbackContainer.classList.add('hidden')
  nextButton.classList.add('hidden')

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
      optionButtons.forEach((btn) => (btn.disabled = true))
      checkAnswer(button.textContent)
      nextButton.classList.remove('hidden')
    })
  })
  nextButton.classList.add('hidden')
}

/**
 * Visar feedback för den aktuella frågan.
 * @param {boolean} isCorrect - Om det valda svaret är korrekt.
 * @param {string} correctAnswer - Det rätta svaret.
 */
function showFeedback (isCorrect, correctAnswer) {
  feedbackContainer.classList.remove('hidden')
  feedbackContainer.textContent = isCorrect
    ? 'Correct! You earned 3 points.'
    : `Incorrect. The correct answer is: ${correctAnswer}`
  nextButton.classList.remove('hidden')
}
/**
 * Moves to the next question or shows the final score.
 */
function moveToNextQuestion () {
  feedbackContainer.classList.add('hidden')
  nextButton.classList.add('hidden')

  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    displayQuestion()
  } else {
    showScore()
  }
}
/**
 * Kollar om det valda svaret är rätt och uppdaterar poängen.
 * Sparar det valda svaret för senare granskning.
 * Visar nästa fråga eller visar slutpoängen om alla frågor är besvarade.
 * @param {string} selectedOption - Det valda svaret.
 */
function checkAnswer (selectedOption) {
  const question = questions[currentQuestionIndex]
  const correctAnswer = question.answer
  const isCorrect = selectedOption === correctAnswer

  if (isCorrect) {
    score += 3
    updateTipsScore(score)
  }
  // Display feedback
  showFeedback(isCorrect, correctAnswer)
}

/**
 * Visar slutpoängen och användarens svar.
 */
function showScore () {
  questionContainer.classList.add('hidden')
  feedbackContainer.classList.add('hidden')
  scoreContainer.classList.remove('hidden')

  const nextTestFrom1 = document.getElementById('next-test-link-1')

  const totalScoreP1 = questions.length * 3
  scoreValue.textContent = `${score}/${totalScoreP1}`
  nextButton.classList.add('hidden')
  nextTestFrom1.classList.remove('hidden')
}

/**
 * Möjliggör att starta om quizet.
 */
function restartQuiz () {
  currentQuestionIndex = 0
  score = 0
  tipsScore = 0 // for cheat code
  questionContainer.classList.remove('hidden')
  scoreContainer.classList.add('hidden')
  questionContainer.innerHTML = ''
  loadQuestions()
}

nextButton.addEventListener('click', moveToNextQuestion)
let tipsScore = 0

/**
 * Uppdaterar poängen för tipsfrågorna.
 * Denna funktion sätter värdet för den globala tipsfrågevariabeln till den nya poängen.
 * @param {number} score - Den nya poängen för tipsfrågorna.
 */
function updateTipsScore (score) {
  tipsScore = score
}

export { tipsScore, updateTipsScore }
export { displayQuestion, loadQuestions, checkAnswer, restartQuiz }
export {
  questionContainer,
  feedbackContainer
}
