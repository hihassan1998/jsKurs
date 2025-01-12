/**
 * Module for simpler helping funtions used in the kmom10.js.
 * - Checks answers and calculates score.
 * - Shows the final score and allows restarting the test.
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
 * Displays the start menu and its options.
 */
function showStartMenu () {
  // Hide all deltest divs and show the start menu
  deltest1.classList.add('hidden')
  deltest2.classList.add('hidden')
  deltest3.classList.add('hidden')
  document.querySelector('.test-menu').classList.remove('hidden')
}

/**
 * Displays the specified deltest by hiding other deltest divs and making the target deltest visible.
 * @param {HTMLElement} targetDeltest - The target deltest to be shown (one of deltest1, deltest2, or deltest3).
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
 * This function handle starting deltest 2.
 */
function startFizzBuzzForDeltest2 () {
  const startValue = Math.floor(Math.random() * 10) + 1
  startFizzBuzz(startValue)
  displayFizzBuzzQuestion(questionElement, document.getElementById('answerButtonsContainer'))
  showDeltest(deltest2)
}

export {
  showStartMenu,
  showDeltest,
  startFizzBuzzForDeltest2
}
