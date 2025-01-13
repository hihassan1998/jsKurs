/**
 * Modulen innehåller logiken för FizzBuzz som används i kmom10.js.
 * - Logik för memory-spel.
 * @module kmom10/fizzBuzz
 */
let currentIndex = [] // To store the current FizzBuzz sequence
let score = 0 // Initialize score
let fizzBuzzSequence = []
/**
 * Skapar en FizzBuzz-sekvens från ett startvärde.
 * @param {number} start - Startvärdet för FizzBuzz-sekvensen.
 * @returns {Array} Den genererade FizzBuzz-sekvensen.
 */
function generateFizzBuzzSequence (start) {
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
 * Visar den aktuella FizzBuzz-sekvensen och nästa fråga för användaren.
 * @param {HTMLElement} questionElement - HTML-elementet där frågan ska visas.
 * @param {NodeList} answerButtonsContainer - Knappcontainer där svarsalternativen visas.
 */
function displayFizzBuzzQuestion (questionElement, answerButtonsContainer) {
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
 * Blandar ett svarsalternativ för att göra det slumpmässigt.
 * @param {string[]} answers - Array av svar att blanda.
 * @returns {string[]} Blandade svar.
 */
function shuffleAnswers (answers) {
  return answers.sort(() => Math.random() - 0.5)
}

/**
 * Genererar falska svar för FizzBuzz-frågan.
 * @param {string} correctAnswer - Det rätta svaret för FizzBuzz-frågan.
 * @returns {Array} Array med falska svar samt det rätta.
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
 * Kollar användarens svar och uppdaterar poängen eller ger feedback.
 * @param {string|number} userAnswer - Användarens valda svar.
 * @param {HTMLElement} questionElement - Frågeelementet där feedback visas.
 * @param {NodeList} answerButtonsContainer - Behållaren för svarsknapparna.
 */
function checkAnswer (userAnswer, questionElement, answerButtonsContainer) {
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

  questionElement.textContent = `Your score: ${score}`
  updateFizzBuzzScore(score)
  feedbackContainer.classList.remove('hidden')

  setTimeout(() => {
    feedbackContainer.classList.add('hidden')
    answerButtonsContainer.innerHTML = ''
    const nextTestBtn = document.getElementById('next-test-link')

    const startValue = Math.floor(Math.random() * 10) + 1
    fizzBuzzSequence = generateFizzBuzzSequence(startValue)
    // the next question or finish
    currentIndex++
    if (currentIndex < fizzBuzzSequence.length) {
      displayFizzBuzzQuestion(questionElement, answerButtonsContainer)
    } else {
      nextTestBtn.classList.remove('hidden')
    }
  }, 1000)
}
/**
 * Startar FizzBuzz-testet med en ny slumpmässig sekvens.
 * @param {number} startValue - Slumpmässigt startvärde för sekvensen.
 */
function startFizzBuzz (startValue) {
  score = 0
  currentIndex = 3
  fizzBuzzSequence = generateFizzBuzzSequence(startValue)
  displayFizzBuzzQuestion(document.getElementById('fizzbuzz-question'), document.getElementById('answerButtonsContainer'))
}

let fizzBuzzScore = 0
/**
 * Uppdaterar poängen för FizzBuzz-spelet.
 * Den här funktionen sätter värdet för den globala fizzBuzzScore-variabeln till den angivna poängen.
 * @param {number} score - Den nya globala poängen för FizzBuzz-spelet.
 */
function updateFizzBuzzScore (score) {
  fizzBuzzScore = score
}

export { generateFizzBuzzSequence, startFizzBuzz, displayFizzBuzzQuestion, fizzBuzzScore, checkAnswer, updateFizzBuzzScore }
