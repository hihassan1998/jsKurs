/**
 * Modul för logiken att återställa deltest som används i kmom10.js genom resetModule.js.
 * - Återställer logik för deltest.
 * @module kmom10/resetFunctions
 */

import * as tipsQuestions from './tipsQuestions.js'
import { gameState, scoreState, selectedOrder } from './memory.js'
/**
 * Återställer deltest 1 (Tipsfrågor quiz).
 * Den här funktionen döljer knappar, rensar innehållet i frågecontainern
 * och gömmer feedbackcontainern för att förbereda deltestet för en omstart.
 */
function resetDeltest1 () {
  // Reset logic for deltest1 (Tipsfrågor quiz)
  console.log('Resetting Deltest 1...')
  const nextButton = document.getElementById('next-button')
  nextButton.classList.add('hidden')
  tipsQuestions.questionContainer.innerHTML = ''
  tipsQuestions.feedbackContainer.classList.add('hidden')
}
/**
 * Återställer deltest 2 (fizzbuzz test).
 * Den här funktionen döljer knappar, rensar innehållet i frågecontainern
 * och gömmer feedbackcontainern för att förbereda deltestet för en omstart.
 */
function resetDeltest2 () {
  // Reset logic for deltest2 (FizzBuzz)
  console.log('Resetting Deltest 2...')
}
/**
 * Återställer deltest 3 (memory test).
 * Den här funktionen döljer föregåndeinehåll, rensar bilder från grid
 * och gömmer feedbackcontainern för att förbereda deltestet för en omstart.
 */
function resetDeltest3 () {
// Reset logic for deltest3
  const startMemoryTestButton = document.getElementById('start-memory-test')
  const scoreDisplay = document.getElementById('scoreDisplay')
  const memoryGrid = document.getElementById('memory-grid')
  const statusDisplay = document.getElementById('memory-status')

  startMemoryTestButton.classList.add('hidden')

  memoryGrid.innerHTML = ''
  statusDisplay.innerHTML = ''
  scoreDisplay.innerHTML = ''

  scoreState.score = 0
  scoreDisplay.classList.add('hidden')

  selectedOrder.length = 0
  console.log('User input array reset:', selectedOrder)

  gameState.gameOver = false

  console.log('Resetting Deltest 3...')
}

export {
  resetDeltest1,
  resetDeltest2,
  resetDeltest3
}
