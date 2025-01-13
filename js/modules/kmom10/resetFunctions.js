import * as tipsQuestions from './tipsQuestions.js'
/**
 * Återställer deltest 1 (Tipsfrågor quiz).
 * Den här funktionen döljer knappar, rensar innehållet i frågecontainern
 * och gömmer feedbackcontainern för att förbereda deltestet för en omstart.
 */
function resetDeltest1 () {
  // Reset logic for deltest1 (Tipsfrågor quiz)
  console.log('Resetting Deltest 1...')
  // Reset your score, questions, UI elements for deltest1 here
  const nextButton = document.getElementById('next-button')
  nextButton.classList.add('hidden')
  tipsQuestions.questionContainer.innerHTML = ''
  tipsQuestions.feedbackContainer.classList.add('hidden')
}

function resetDeltest2 () {
  // Reset logic for deltest2 (FizzBuzz)
  console.log('Resetting Deltest 2...')
  // Reset your score, questions, UI elements for deltest2 here
}
function resetDeltest3 () {
// Reset logic for deltest3 (Oppt)
  console.log('Resetting Deltest 3...')
// Reset your score, questions, UI elements for deltest3 here
}

export {
  resetDeltest1,
  resetDeltest2,
  resetDeltest3
}
