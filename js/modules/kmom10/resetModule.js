import {
  resetDeltest1, resetDeltest2, resetDeltest3
} from './resetFunctions.js'
import {
  deltest1, deltest2, deltest3
} from '../../kmom10.js'
import * as tipsQuestions from './tipsQuestions.js'
import { displayFizzBuzzQuestion, startFizzBuzz } from './fizzBuzz.js'
import { showDeltest } from './functions.js'
import { startMemoryTest, selectedOrder, gameState, scoreState } from './memory.js'

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
      // Deltest 3 - Memory
      const startMemoryTestButton = document.getElementById('start-memory-test')
      const memoryGrid = document.getElementById('memory-grid')
      const imageNamesList = document.getElementById('image-names')
      const statusDisplay = document.getElementById('memory-status')
      const nextTestLink = document.getElementById('next-test-link')
      const scoreDisplay = document.getElementById('scoreDisplay')
      console.log('Deltest 3 is active. Restarting Deltest 3 and resetting.')

      startMemoryTestButton.classList.add('hidden')

      memoryGrid.innerHTML = ''
      statusDisplay.innerHTML = ''
      scoreDisplay.innerHTML = ''

      scoreState.score = 0
      scoreDisplay.classList.add('hidden')

      selectedOrder.length = 0
      console.log('User input array reset:', selectedOrder)

      gameState.gameOver = false

      showDeltest(deltest3)
      memoryGrid.classList.add('hidden')
      startMemoryTest(memoryGrid, imageNamesList, statusDisplay, nextTestLink)

      resetDeltest3()
    } else {
      console.log('No active deltest to restart and reset.')
    }
  } else {
    console.log('No active deltest found.')
  }
}
