/**
 * Huvudskript för Deltest 1, 2, eller (3,4,5).
 * - Hanterar spelets logik och uppdaterar UI.
 * - Använder moduler för att visa och uppdatera deltestarna.
 * @namespace kmom10
 * @property {module:kmom10/tipsQuestions} tipsQuestions Hanterar logiken för att tipsQuestions del 1.
 * @property {module:kmom10/fizzBuzz} fizzBuzz Tillhandahåller funktionalitet för att hantera ordlistan.
 */
import * as tipsQuestions from './modules/kmom10/tipsQuestions.js'
import { loadQuestions, tipsScore } from './modules/kmom10/tipsQuestions.js'
import { displayFizzBuzzQuestion, checkAnswer, startFizzBuzz, fizzBuzzScore } from './modules/kmom10/fizzBuzz.js'
import { showDeltest, showStartMenu, startFizzBuzzForDeltest2, displayScore } from './modules/kmom10/functions.js'
import { startMemoryTest, memoryScore } from './modules/kmom10/memory.js'

import '././modules/kmom10/resetModule.js'
// All the deltest divs
const deltest1 = document.getElementById('deltest1')
const deltest2 = document.getElementById('deltest2')
const deltest3 = document.getElementById('deltest3')

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button')
  const testMenu = document.getElementById('test-menu')
  const startMenu = document.getElementById('start-menu')
  const backButton = document.getElementById('back-button')
  const buttons = document.querySelectorAll('.test-button')
  const deltests = document.querySelectorAll('.deltest')
  const restartButton = document.getElementById('restart-button')

  const nextTestFrom1 = document.getElementById('next-test-link-1')
  const nextTestLink = document.getElementById('next-test-link')
  const questionElement = document.getElementById('fizzbuzz-question')
  const answerButtons = document.getElementById('answerButtonsContainer')
  let questionsLoaded = false

  // constants for deltest3
  const startMemoryTestButton = document.getElementById('start-memory-test')
  const memoryGrid = document.getElementById('memory-grid')
  const imageNamesList = document.getElementById('image-names')
  const statusDisplay = document.getElementById('memory-status')
  // const nextTestLink = document.getElementById('next-test-link-3');
  // Show test menu on Start button click
  startButton.addEventListener('click', () => {
    startMenu.classList.add('hidden')
    testMenu.classList.remove('hidden')
  })

  // Show the selected deltest and hide the test menu
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target')

      // Hide all deltests
      deltests.forEach(deltest => deltest.classList.remove('active-tst'))

      // Show the selected deltest
      const activeDeltest = document.getElementById(target)
      if (activeDeltest) {
        activeDeltest.classList.add('active-tst')
        testMenu.classList.add('hidden')
        console.log(`Active test set to: ${target}`) // Log the active test being set
        if (target === 'deltest1' && !questionsLoaded) {
          questionsLoaded = true
          tipsQuestions.loadQuestions() // Load the questions for Tipsfrågor
        }
      }
    })
  })
  const backButtons = document.querySelectorAll('.button-tst')
  // Back to main menu functionality
  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      showStartMenu()
    })
  })
  // Back button to return to the start menu
  backButton.addEventListener('click', () => {
    testMenu.classList.add('hidden')
    startMenu.classList.remove('hidden')
  })

  // Restart the quiz using the restart button
  restartButton.addEventListener('click', () => {
    const activeDeltest = document.querySelector('.deltest.active-tst')
    if (activeDeltest) {
      // Deltest1
      // Frågesport
      // 1
      if (deltest1.classList.contains('active-tst')) {
        console.log('Deltest 1 is active. Restarting Tipsfrågor quiz.')
        tipsQuestions.restartQuiz()
      } else if (deltest2.classList.contains('active-tst')
      ) {
        // Deltest2
        // Fizzbuzz
        // 2
        const startValue = Math.floor(Math.random() * 10) + 1
        startFizzBuzz(startValue)
        displayFizzBuzzQuestion(questionElement, answerButtons)
        console.log('Deltest 2 is active. Restarting Deltest 2.')

        // Deltest 3
        // Fizzbuzz
        // Oppt
      } else if (deltest3.classList.contains('active-tst')) {
        console.log('Deltest 3 is active. Restarting Deltest 3.')
        startMemoryTestButton.classList.add('hidden')
        showDeltest(deltest3)
      } else {
        console.log('No active deltest to restart.')
      }
    }
  })

  const tipsfrågorButton = document.querySelector('[data-target="deltest1"]')

  tipsfrågorButton.addEventListener('click', async () => {
    console.log('Tipsfrågor button clicked')

    if (!questionsLoaded) {
      await loadQuestions()
      questionsLoaded = true
    }
    showDeltest(deltest1)
  })

  // Show the corresponding deltest when the button is clicked
  const fizzbuzzButton = document.querySelector('[data-target="deltest2"]')
  // Event listener for FizzBuzz start button
  fizzbuzzButton.addEventListener('click', () => {
    console.log('FizzBuzz button clicked')
    startFizzBuzzForDeltest2()
  })

  // Answer button handling
  answerButtons.addEventListener('click', (event) => {
    if (event.target.classList.contains('fizzsbuzz-answer')) {
      const userAnswer = event.target.textContent
      console.log(`User selected answer: ${userAnswer}`) // Log the selected answer
      checkAnswer(userAnswer, questionElement, document.getElementById('answerButtonsContainer'), nextTestLink)
    }
  })

  // Switch to next deltest from 1
  nextTestFrom1.addEventListener('click', () => {
    const activeDeltest = document.querySelector('.deltest.active-tst')
    if (activeDeltest.id === 'deltest1') {
      // Switch to Deltest 2
      console.log('Deltest 1 completed. Moving to Deltest 2.')
      nextTestLink.classList.add('hidden')
      startFizzBuzzForDeltest2()
      showDeltest(deltest2)
    } else {
      console.log('No active deltest found.')
    }
  })
  // Switch to next deltest from 2
  // nextTestBtn - event listner
  nextTestLink.addEventListener('click', () => {
    console.log('Deltest 2 completed. Moving to Deltest 3.')
    deltest2.classList.remove('active-tst')
    // deltest3.classList.add('active-tst')
    showDeltest(deltest3)
    startMemoryTest(memoryGrid, imageNamesList, statusDisplay, nextTestLink)
  })
  // Start test eventlistner
  startMemoryTestButton.addEventListener('click', () => {
    startMemoryTestButton.classList.add('hidden')
    showDeltest(deltest3)
  })
  const deltest3Button = document.querySelector('[data-target="deltest3"]')
  deltest3Button.addEventListener('click', () => {
    startMemoryTestButton.classList.remove('hidden')
    // deltest2.classList.remove('active-tst')
    // deltest3.classList.add('active-tst')
    showDeltest(deltest3)
  })

  if (startMemoryTestButton) {
    startMemoryTestButton.addEventListener('click', () => {
      startMemoryTest(memoryGrid, imageNamesList, statusDisplay, nextTestLink)
    })
  } else {
    console.error('Start Memory Test button not found!')
  }
  const scoreBtn = document.getElementById('scoreBtn')
  const scoreDisplay = document.getElementById('scoreDisplay')
  scoreBtn.addEventListener('click', () => {
    scoreDisplay.classList.remove('hidden')
    const totalScore = tipsScore + fizzBuzzScore + memoryScore
    displayScore(totalScore)
  })
})

export {
  deltest1,
  deltest2,
  deltest3
}
