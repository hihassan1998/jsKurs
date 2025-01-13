/**
 * Modulen innehåller hjälpfunktioner för kmom10.js.
 * - Kollar svar och räknar poäng.
 * - Visar slutpoäng och låter användaren starta om testet.
 * @module kmom10/functions
 */
import {
  deltest1,
  deltest2,
  deltest3
} from '../../kmom10.js'
import { startFizzBuzz, displayFizzBuzzQuestion } from './fizzBuzz.js'
// const deltest1 = document.getElementById('deltest1')
// const deltest2 = document.getElementById('deltest2')
// const deltest3 = document.getElementById('deltest3')
const testMenu = document.getElementById('test-menu')
const questionElement = document.getElementById('fizzbuzz-question')

/**
 * Visar startmenyn och dess alternativ.
 */
function showStartMenu () {
  // Hide all deltest divs and show the start menu
  deltest1.classList.add('hidden')
  deltest2.classList.add('hidden')
  deltest3.classList.add('hidden')
  document.querySelector('.test-menu').classList.remove('hidden')
}

/**
 * Visar det valda deltestet genom att dölja de andra deltesterna.
 * @param {HTMLElement} targetDeltest - Det deltest som ska visas (kan vara deltest1, deltest2 eller deltest3).
 */
function showDeltest (targetDeltest) {
  // Hide all deltest divs
  deltest1.classList.add('hidden')
  deltest2.classList.add('hidden')
  deltest3.classList.add('hidden')

  // Show the selected deltest
  targetDeltest.classList.remove('hidden')
  targetDeltest.classList.add('active-tst')
  console.log(`Active test set to: ${targetDeltest.id}`)
  testMenu.classList.add('hidden')
}

/**
 * Startar deltest 2.
 */
function startFizzBuzzForDeltest2 () {
  const startValue = Math.floor(Math.random() * 10) + 1
  startFizzBuzz(startValue)
  displayFizzBuzzQuestion(questionElement, document.getElementById('answerButtonsContainer'))
  showDeltest(deltest2)
}
/**
 * Visar spelarens poäng och procent i DOM:en.
 * @param {number} score - Spelarens poäng.
 * Funktionen beräknar procent baserat på maxpoäng 36 och uppdaterar
 * elementet med ID 'scoreDisplay' med poäng och procent.
 */
function displayScore (score) {
  const scoreDisplay = document.getElementById('scoreDisplay')
  const percent = (score / 36) * 100
  scoreDisplay.innerHTML = `Total Score:<br> ${score} / 36 <br> Total Percentage:<br>${percent.toFixed(2)}%`
}

export {
  showStartMenu,
  showDeltest,
  startFizzBuzzForDeltest2,
  displayScore
}
