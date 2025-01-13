import {
  resetDeltest1, resetDeltest2, resetDeltest3
} from './resetFunctions.js'
import {
  deltest1, deltest2, deltest3
} from '../../kmom10.js'
import * as tipsQuestions from './tipsQuestions.js'
import { displayFizzBuzzQuestion, startFizzBuzz } from './fizzBuzz.js'

// Global reset function available in window object
window.reset = function () {
  const activeDeltest = document.querySelector('.deltest.active-tst')

  if (activeDeltest) {
    // Deltest 1 - Tipsfrågor quiz
    if (deltest1.classList.contains('active-tst')) {
      console.log('Deltest 1 is active. Restarting Tipsfrågor quiz and resetting.')
      tipsQuestions.restartQuiz()

      resetDeltest1()
    } else if (deltest2.classList.contains('active-tst')) {
      // Deltest 2 - FizzBuzz
      console.log('Deltest 2 is active. Restarting Deltest 2 and resetting.')
      const questionElement = document.getElementById('fizzbuzz-question')
      const answerButtons = document.getElementById('answerButtonsContainer')
      const startValue = Math.floor(Math.random() * 10) + 1

      startFizzBuzz(startValue)
      displayFizzBuzzQuestion(questionElement, answerButtons)

      resetDeltest2()
    } else if (deltest3.classList.contains('active-tst')) {
      // Deltest 3 - Oppt
      console.log('Deltest 3 is active. Restarting Deltest 3 and resetting.')
      resetDeltest3() // Reset function for deltest3
    } else {
      console.log('No active deltest to restart and reset.')
    }
  } else {
    console.log('No active deltest found.')
  }
}
