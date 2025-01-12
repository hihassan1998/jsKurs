// memoryTest.js
import { IMAGE_PATHS, MEMORY_TEST_DURATION, MAX_IMAGE_OCCURRENCES } from './constant.js'

const selectedOrder = []
let correctOrder = []
let score = 0

/**
 * Starts the memory test by displaying images for a limited time.
 */
function startMemoryTest (memoryGrid, imageNamesList, statusDisplay, nextTestLink) {
  // Generate a random set of images
  const images = generateRandomImages()
  correctOrder = images.map((img) => img.name)

  // Display images for MEMORY_TEST_DURATION
  displayImages(memoryGrid, images)
  setTimeout(() => {
    memoryGrid.innerHTML = '' // Clear images after the duration
    displayImageNames(imageNamesList, images)
    statusDisplay.textContent = 'Välj bilder i rätt ordning!'
  }, MEMORY_TEST_DURATION)
}

/**
 * Handles user guesses by checking their selected order against the correct order.
 */
function handleGuess (index, memoryGrid, statusDisplay, nextTestLink) {
  const selectedImage = correctOrder[selectedOrder.length]
  selectedOrder.push(index)

  // Check if the guess is correct
  if (correctOrder[selectedOrder.length - 1] === selectedImage) {
    revealImage(memoryGrid, index, selectedImage)
    score++

    if (selectedOrder.length === correctOrder.length) {
      statusDisplay.textContent = `Test över! Poäng: ${score}`
      nextTestLink.classList.remove('hidden')
    }
  } else {
    statusDisplay.textContent = `Fel! Test över. Poäng: ${score}`
    nextTestLink.classList.remove('hidden')
  }
}

/**
 * Generates a random set of images.
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
 * Displays the images in a grid.
 */
function displayImages (grid, images) {
  grid.classList.remove('hidden')
  images.forEach((img, index) => {
    const imgElement = document.createElement('img')
    imgElement.src = img.name
    imgElement.alt = `Image ${index + 1}`
    imgElement.classList.add('memory-images')
    grid.appendChild(imgElement)
  })
}

/**
 * Displays the list of image names for the user to guess.
 */
function displayImageNames (list, images) {
  list.innerHTML = ''
  list.classList.remove('hidden')
  images.forEach((img, index) => {
    const li = document.createElement('li')
    li.textContent = img.name
    li.dataset.index = index
    li.addEventListener('click', () => handleGuess(index))
    list.appendChild(li)
  })
}

/**
 * Reveals an image in the grid based on the user's guess.
 */
function revealImage (grid, index, imageName) {
  const imgElement = document.createElement('img')
  imgElement.src = imageName
  imgElement.alt = `Revealed Image ${index + 1}`
  grid.appendChild(imgElement)
}

// Export the startMemoryTest function
export { startMemoryTest, handleGuess }
