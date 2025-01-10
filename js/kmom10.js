/**
 * Huvudskript för Deltest 1, 2, eller (3,4,5).
 * - Hanterar spelets logik och uppdaterar UI.
 * - Använder moduler för att visa och uppdatera deltestarna.
 * @namespace kmom10
 * @property {module:kmom10/tipsQuestions} tipsQuestions Hanterar logiken för att tipsQuestions del 1.
 * @property {module:kmom10/fizzBuzz} fizzBuzz Tillhandahåller funktionalitet för att hantera ordlistan.
 */

import * as tipsQuestions from './modules/kmom10/tipsQuestions.js'
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button')
  const testMenu = document.getElementById('test-menu')
  const startMenu = document.getElementById('start-menu')
  const backButton = document.getElementById('back-button')
  const buttons = document.querySelectorAll('.test-button')
  const deltests = document.querySelectorAll('.deltest')

  const restartButton = document.getElementById('restart-button')
  // Show test menu on Start button click
  startButton.addEventListener('click', () => {
    startMenu.classList.add('hidden')
    testMenu.classList.remove('hidden')
  })
  // document.querySelectorAll('.test-button').forEach(button => {
  //   button.addEventListener('click', () => {
  //     const target = button.getAttribute('data-target')
  //     deltests.forEach(deltest => deltest.classList.remove('active-tst'))
  //     const activeDeltest = document.getElementById(target)
  //     if (activeDeltest) {
  //       activeDeltest.classList.add('active-tst')
  //       testMenu.classList.add('hidden')
  //       if (target === 'deltest1') {
  //         tipsQuestions.loadQuestions() // Load the questions for Tipsfrågor
  //       }
  //     }
  //   })
  // })

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
          tipsQuestions.loadQuestions()  // Load the questions for Tipsfrågor
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
})
