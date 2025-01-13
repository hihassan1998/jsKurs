/**
 * Module for simpler helping funtions used in the kmom10.js.
 * - Memory game logic.
 * @module kmom10/memory.js
 */
import { IMAGE_PATHS, MEMORY_TEST_DURATION, MAX_IMAGE_OCCURRENCES } from './constant.js'

const selectedOrder = []
let correctOrder = []
const scoreState = {
  score: 0
}
/**
 * Startar minnestestet genom att visa bilder i slumpmässig ordning och sedan dölja dem.
 * Testpersonen ska sedan välja bilder i rätt ordning baserat på bildnamnen.
 * @param {HTMLElement} memoryGrid - Grid där bilderna ska visas.
 * @param {HTMLElement} imageNamesList - Lista med bildnamn som användaren ska välja från.
 * @param {HTMLElement} statusDisplay - Element för att visa statusmeddelanden under testet.
 */
function startMemoryTest (memoryGrid, imageNamesList, statusDisplay) {
  const images = generateRandomImages() // Generate a random order of images
  correctOrder = images.map(img => getImageNameFromPath(img.name)) // Store the names, not indices

  displayImages(memoryGrid, images)

  setTimeout(() => {
    const imgElements = memoryGrid.querySelectorAll('.memory-images')
    imgElements.forEach((img) => {
      img.classList.add('hidden-image')
    })
    memoryGrid.classList.add('hidden')
    displayImageNames(imageNamesList, images, memoryGrid, statusDisplay)
    statusDisplay.textContent = 'Välj frukter i rätt ordning!'
  }, MEMORY_TEST_DURATION)
}
const gameState = {
  gameOver: false
}
// let gameOver = false
gameState.gameOver = false
/**
 * Hanterar spelarens gissningar och kontrollerar om de är korrekta i relation till den rätta ordningen.
 * Funktionen lägger till den valda bilden i spelarens ordning och kontrollerar om gissningen matchar rätt ordning. Om gissningen är korrekt avslöjas den motsvarande bilden och spelarens poäng ökar
 * Om alla bilder har valts korrekt avslutas spelet, annars avslutas spelet vid fel gissning.
 * @param {string} name - Namnet på den valda bilden som spelaren klickade på.
 * @param {HTMLElement} memoryGrid - Rutnätselementet där bilderna ska avslöjas.
 * @param {HTMLElement} statusDisplay - Elementet där spelets statusmeddelanden (t.ex. testets resultat) visas.
 * @param {Array} images - Lista över bildobjekt som innehåller bildens sökväg och ID.
 */
function handleGuess (name, memoryGrid, statusDisplay, images) {
  if (gameState.gameOver) {
    console.log('disableSelectableButton')
    return
  }

  selectedOrder.push(name)

  // Count how many times this name has been selected
  const nameOccurrences = selectedOrder.filter(n => n === name).length
  // console.log('User selected order:', selectedOrder)
  // console.log('Correct order:', correctOrder)
  // console.log(`Name occurrences for ${name}:`, nameOccurrences)

  // Check if the user selected the correct name
  const currentIndex = selectedOrder.length - 1
  const scoreBtn = document.getElementById('scoreBtn')

  // If the selected name matches the name in the correct order at the current index
  if (selectedOrder[currentIndex] === correctOrder[currentIndex]) {
    // Find all images with the correct name
    const matchingImages = images.filter(img => getImageNameFromPath(img.name) === name)

    // Ensure the correct occurrence is revealed
    const selectedImage = matchingImages[nameOccurrences - 1]

    // Ensure the image exists before reveal
    if (selectedImage) {
      revealImage(memoryGrid, selectedImage.id, selectedImage.name) // Reveal image if the order is correct
      scoreState.score++ // Increase score for correct guess
      updateMemoryScore(scoreState.score)
    }

    // If correct order, end the game
    if (selectedOrder.length === correctOrder.length) {
      statusDisplay.textContent = `Test över! Poäng: ${scoreState.score}`
      gameState.gameOver = true

      scoreBtn.classList.remove('hidden')
    }
  } else {
    // If the selected name does not match the correct name, stop the game
    statusDisplay.textContent = `Fel! Test över. Poäng: ${scoreState.score}`
    gameState.gameOver = true
    scoreBtn.classList.remove('hidden')
  }
}

/**
 * Genererar en slumpmässig uppsättning bilder med maximalt tre förekomster per bild.
 * Funktionen skapar en lista med bilder från en fördefinierad uppsättning bildvägar.
 * Varje bild kan förekomma högst tre gånger.
 * @returns {Array} En array med bildobjekt som innehåller namn och id för varje bild.
 */
function generateRandomImages () {
  const images = []
  while (images.length < 9) {
    const randomIndex = Math.floor(Math.random() * IMAGE_PATHS.length)
    const imageName = IMAGE_PATHS[randomIndex]

    const occurrences = images.filter((img) => img.name === imageName).length
    if (occurrences < MAX_IMAGE_OCCURRENCES) {
      images.push({ name: imageName, id: images.length })
    }
  }
  return images
}

/**
 * Visar bilder på rutnätet.
 * Funktionen skapar och lägger till varje bild i ett rutnätsobjekt. Varje bild
 * får en unik indexdata och en bildkälla som sätts till bildens sökväg.
 * Bilderna visas initialt enligt den angivna ordningen.
 * @param {HTMLElement} grid - Elementet som representerar rutnätet där bilderna ska visas.
 * @param {Array} images - En lista med bildobjekt som innehåller bildens sökväg.
 */
function displayImages (grid, images) {
  grid.classList.remove('hidden')
  images.forEach((img, index) => {
    const gridItem = document.createElement('div')

    gridItem.classList.add('memory-grid-item')
    gridItem.dataset.index = index // Store the index in the container

    const imgElement = document.createElement('img')
    imgElement.src = img.name
    imgElement.alt = `Image ${index + 1}`
    imgElement.classList.add('memory-images')

    gridItem.appendChild(imgElement)
    grid.appendChild(gridItem) // Add the grid item to the grid
  })
}
/**
 * Visar de unika bildnamnen i en lista.
 * Funktionen skapar en lista med de unika bildnamnen och blandar dessa innan de visas. När användaren klickar på ett namn, kontrolleras om det valda namnet  är korrekt i förhållande till det ordningsföljd som definieras i spelet.
 * @param {HTMLElement} list - Elementet som representerar listan där namn visas.
 * @param {Array} images - En lista med bildobjekt som innehåller bildens sökväg.
 * @param {HTMLElement} memoryGrid - Rutnätselementet där bilderna ska avslöjas.
 * @param {HTMLElement} statusDisplay - Elementet som visar statusmeddelanden (t.ex. korrekt/felaktig gissning).
 */
function displayImageNames (list, images, memoryGrid, statusDisplay) {
  // Extract unique image names from the images array
  const uniqueImages = Array.from(new Set(images.map(img => getImageNameFromPath(img.name))))

  // Shuffle the unique names
  const shuffledNames = simpleShuffle(uniqueImages)

  // Clear the list and update its styling
  list.innerHTML = ''
  list.classList.remove('hidden')
  list.classList.add('flex-col')

  // Create list items for the shuffled names
  shuffledNames.forEach(shuffledName => {
    const li = document.createElement('li')
    li.classList.add('pictureName')
    li.textContent = shuffledName // Only show the unique name, no index

    // Attach the name to the dataset to allow checking the correct order later
    li.dataset.name = shuffledName

    li.addEventListener('click', () => {
      handleGuess(shuffledName, memoryGrid, statusDisplay, images)
    })

    list.appendChild(li)
  })
  // console.log('Shuffled names:', shuffledNames)
}

/**
 * Visar en bild på rätt plats i rutnätet.
 * Funktionen skapar ett nytt bildelement och lägger till det i rätt rutnätscell
 * baserat på indexet. Bilden görs synlig genom att klassen 'hidden-image' tas bort och en 'revealed-image' klass används för att styra synlighet och storlek.
 * @param {HTMLElement} grid - Elementet som representerar rutnätet där bilderna ska visas.
 * @param {number} index - Indexet för den cell där bilden ska visas i rutnätet.
 * @param {string} imageSrc - Sökvägen till bilden som ska visas.
 */
function revealImage (grid, index, imageSrc) {
  const gridItem = grid.querySelector(`[data-index="${index}"]`)

  grid.classList.remove('hidden')
  if (gridItem) {
    const imgElement = document.createElement('img')
    imgElement.classList.add('hidden-image')
    imgElement.src = imageSrc
    imgElement.alt = `Revealed Image ${index + 1}`

    imgElement.classList.add('revealed-image')
    // imgElement.classList.remove('hidden')

    gridItem.innerHTML = ''
    gridItem.appendChild(imgElement)

    // console.log(`Revealed image ${imageSrc} at grid index ${index}`)
  }
}

/**
 * Blandar om elementen i en array på ett slumpmässigt sätt.
 * Funktionen skapar en kopia av den ursprungliga arrayen och blandar elementen genom att byta plats på dem med slumpmässiga index.
 * @param {Array} array - En array med de element som ska blandas.
 * @returns {Array} Den blandade arrayen.
 */
function simpleShuffle (array) {
  const shuffled = [...array]
  for (let i = 0; i < shuffled.length; i++) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
  }
  return shuffled
}
/**
 * Hämtar bildens namn från en filväg.
 * Funktionen extraherar filnamnet från en given sökväg och tar bort filändelsen.
 * @param {string} path - Sökvägen till bildfilen.
 * @returns {string} Namnet på bilden utan filändelsen.
 */
function getImageNameFromPath (path) {
  // Extract the filename from the path and remove the file extension
  return path.split('/').pop().split('.')[0]
}
let memoryScore = 0

/**
 * Updates the score for the Memory game.
 * This function sets the value of the global Memory variable to the given score.
 * @param {number} score - The new global score to set for the Memory game.
 */
function updateMemoryScore (score) {
  memoryScore = score
}

// Export the score and the update function
export { memoryScore, updateMemoryScore, selectedOrder, gameState, scoreState, startMemoryTest, handleGuess }
