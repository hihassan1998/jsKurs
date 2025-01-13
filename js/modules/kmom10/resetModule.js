import {
  resetDeltest1, resetDeltest2, resetDeltest3
} from './resetFunctions.js'
import {
  deltest1, deltest2, deltest3
} from '../../kmom10.js'
import * as tipsQuestions from './tipsQuestions.js'
import { displayFizzBuzzQuestion, startFizzBuzz } from './fizzBuzz.js'
import { showDeltest } from './functions.js'
import { startMemoryTest } from './memory.js'

// Global reset function for kmo10.js
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
      // Deltest 3 - Memory

      console.log('Deltest 3 is active. Restarting Deltest 3 and resetting.')
      const memoryGrid = document.getElementById('memory-grid')
      const statusDisplay = document.getElementById('memory-status')
      const imageNamesList = document.getElementById('image-names')
      const nextTestLink = document.getElementById('next-test-link')

      resetDeltest3()
      showDeltest(deltest3)
      memoryGrid.classList.add('hidden')
      startMemoryTest(memoryGrid, imageNamesList, statusDisplay, nextTestLink)
    } else {
      console.log('No active deltest to restart and reset.')
    }
  } else {
    console.log('No active deltest found.')
  }
}
