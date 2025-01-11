/**
 * Huvudskript för Deltest 1, 2, eller (3,4,5).
 * - Hanterar spelets logik och uppdaterar UI.
 * - Använder moduler för att visa och uppdatera deltestarna.
 * @namespace kmom10
 * @property {module:kmom10/tipsQuestions} tipsQuestions Hanterar logiken för att tipsQuestions del 1.
 * @property {module:kmom10/fizzBuzz} fizzBuzz Tillhandahåller funktionalitet för att hantera ordlistan.
 */
import * as tipsQuestions from './modules/kmom10/tipsQuestions.js'
import { loadQuestions } from './modules/kmom10/tipsQuestions.js'

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
  // const backToMenu1 = document.getElementById('backToMenu1')

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
        if (target === 'deltest1') {
          // console.log('Del test 1 started')
          testMenu.classList.add('hidden')

          tipsQuestions.loadQuestions() // Load the questions for Tipsfrågor
        }
      }
    })
  })

  // Back button to return to the start menu
  backButton.addEventListener('click', () => {
    testMenu.classList.add('hidden')
    startMenu.classList.remove('hidden')
  })
  // Restart the quiz using the restart button
  restartButton.addEventListener('click', () => {
    tipsQuestions.restartQuiz()
  })

  const tipsfrågorButton = document.querySelector('[data-target="deltest1"]')
  const fizzbuzzButton = document.querySelector('[data-target="deltest2"]')
  const deltest3Button = document.querySelector('[data-target="deltest3"]')

  // Start and back buttons
  const backButtons = document.querySelectorAll('.button-tst')
  // Show the corresponding deltest when the button is clicked
  tipsfrågorButton.addEventListener('click', async () => {
    console.log('Tipsfrågor button clicked')
    await loadQuestions() // Fetch data when the Tipsfrågor button is clicked
    showDeltest(deltest1)
  })

  fizzbuzzButton.addEventListener('click', () => {
    showDeltest(deltest2)
  })

  deltest3Button.addEventListener('click', () => {
    showDeltest(deltest3)
  })

  // Back to main menu functionality
  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      showStartMenu()
    })
  })

  /**
   * Displays the current question and its options.
   * @param targetDeltest Target Deltest.
   */
  function showDeltest (targetDeltest) {
    // Hide all deltest divs
    deltest1.classList.add('hidden')
    deltest2.classList.add('hidden')
    deltest3.classList.add('hidden')

    // Show the selected deltest
    targetDeltest.classList.remove('hidden')
    targetDeltest.classList.add('active-tst') // Make the selected test visible
    document.querySelector('.test-menu').classList.add('hidden') // Hide the test-menu
  }
  /**
   * Displays the start menu and its options.
   */
  function showStartMenu () {
    // Hide all deltest divs and show the start menu
    deltest1.classList.add('hidden')
    deltest2.classList.add('hidden')
    deltest3.classList.add('hidden')
    document.querySelector('.test-menu').classList.remove('hidden') // Show the test-menu again
  }
})
