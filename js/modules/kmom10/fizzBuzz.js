// fizzBuzz.js

let currentIndex = [] // To store the current FizzBuzz sequence
// let currentAnswer = null // Store the correct answer for the next number in the sequence
let score = 0 // Initialize score
let fizzBuzzSequence = []
/**
 * Generates the FizzBuzz sequence starting from a given value.
 * @param {number} start - The starting value for the FizzBuzz sequence.
 * @returns {Array} The generated FizzBuzz sequence.
 */
export function generateFizzBuzzSequence (start) {
  const sequence = []
  for (let i = start; i < start + 7; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      sequence.push('fizzbuzz')
    } else if (i % 3 === 0) {
      sequence.push('fizz')
    } else if (i % 5 === 0) {
      sequence.push('buzz')
    } else {
      sequence.push(i)
    }
  }
  return sequence
}

/**
 * Displays the current FizzBuzz sequence and the next question for the user.
 * @param {HTMLElement} questionElement - The HTML element where the question will be displayed.
 * @param {NodeList} answerButtonsContainer - The buttons where the answer choices will be displayed.
 */
export function displayFizzBuzzQuestion (questionElement, answerButtonsContainer) {
  const sequence = fizzBuzzSequence.slice(0, currentIndex).join(', ')
  questionElement.textContent = `${sequence}, ?`

  // Generate answer buttons
  const correctAnswer = fizzBuzzSequence[currentIndex]
  const answers = shuffleAnswers([correctAnswer, ...generateFakeAnswers(correctAnswer)])
  answerButtonsContainer.innerHTML = ''
  answers.forEach((answer) => {
    const button = document.createElement('button')
    button.className = 'fizzsbuzz-answer option-button'
    button.textContent = answer
    answerButtonsContainer.appendChild(button)
  })
}

/**
 * Shuffles an array of answers for randomness.
 * @param {string[]} answers - Array of answers to shuffle.
 * @returns {string[]} - Shuffled answers.
 */
function shuffleAnswers (answers) {
  return answers.sort(() => Math.random() - 0.5)
}

/**
 * Generates fake answers for the FizzBuzz question.
 * @param {string} correctAnswer - The correct answer for the current FizzBuzz question.
 * @returns {Array} - Array of fake answers along with the correct one.
 */
function generateFakeAnswers (correctAnswer) {
  const fakeAnswers = []
  while (fakeAnswers.length < 3) {
    const fakeAnswer = Math.floor(Math.random() * 20) + 1
    if (fakeAnswer !== correctAnswer && !fakeAnswers.includes(fakeAnswer)) {
      fakeAnswers.push(fakeAnswer)
    }
  }
  return fakeAnswers
}

/**
 * Checks the user's answer and updates the score or provides feedback.
 * @param {string|number} userAnswer - The user's selected answer.
 * @param {HTMLElement} questionElement - The question element where feedback is shown.
 * @param {NodeList} answerButtonsContainer - The container where the answer buttons are displayed.
 * @param {HTMLElement} nextTestLink - Link to the next test.
 */
export function checkAnswer (userAnswer, questionElement, answerButtonsContainer, nextTestLink) {
  const correctAnswer = fizzBuzzSequence[currentIndex]
  const feedbackContainer = document.getElementById('feedback')

  // Disable the answer buttons
  const answerButtons = answerButtonsContainer.querySelectorAll('button')
  answerButtons.forEach(button => {
    button.disabled = true
  })

  if (String(userAnswer) === String(correctAnswer)) {
    feedbackContainer.textContent = 'Correct! Well done.'
    score += 3
  } else {
    feedbackContainer.textContent = `Incorrect. The correct answer was: ${correctAnswer}.`
  }
  // Update the score and show feedback
  questionElement.textContent = `Your score: ${score}`
  updateFizzBuzzScore(score)
  // console.log(nextTestLink)
  feedbackContainer.classList.remove('hidden')

  setTimeout(() => {
    feedbackContainer.classList.add('hidden')
    answerButtonsContainer.innerHTML = ''
    const nextTestBtn = document.getElementById('next-test-link')
    // Prepare for the next question or finish
    currentIndex++
    if (currentIndex < fizzBuzzSequence.length) {
      displayFizzBuzzQuestion(questionElement, answerButtonsContainer)
    } else {
      // console.log(nextTestLink.classList)
      nextTestBtn.classList.remove('hidden')
    }
  }, 1000)
}
/**
 * Starts the FizzBuzz test with a new random sequence.
 * @param {number} startValue - Random starting value for the sequence.
 */
export function startFizzBuzz (startValue) {
  score = 0
  currentIndex = 3
  fizzBuzzSequence = generateFizzBuzzSequence(startValue)
  displayFizzBuzzQuestion(document.getElementById('fizzbuzz-question'), document.getElementById('answerButtonsContainer'))
}

let fizzBuzzScore = 0

/**
 * Updates the score for the FizzBuzz game.
 * This function sets the value of the global fizzBuzzScore variable to the given score.
 * @param {number} score - The new global score to set for the FizzBuzz game.
 */
function updateFizzBuzzScore (score) {
  fizzBuzzScore = score
}

// Export the score and the update function
export { fizzBuzzScore, updateFizzBuzzScore }
