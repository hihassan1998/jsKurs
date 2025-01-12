// memoryTest.js
import { IMAGE_PATHS, MEMORY_TEST_DURATION, MAX_IMAGE_OCCURRENCES } from './constant.js'

const selectedOrder = []
let correctOrder = []
let score = 0

function startMemoryTest(memoryGrid, imageNamesList, statusDisplay, nextTestLink) {
  const images = generateRandomImages() // Generate a random order of images
  correctOrder = images.map((img, index) => index) // Store the order of indices, not names

  displayImages(memoryGrid, images)

  setTimeout(() => {
    const imgElements = memoryGrid.querySelectorAll('.memory-images')
    imgElements.forEach((img) => {
      img.classList.add('hidden-image') // Add the hidden class to hide images
    })

    memoryGrid.classList.add('hidden')
    displayImageNames(imageNamesList, images, memoryGrid, statusDisplay, nextTestLink)
    statusDisplay.textContent = 'Välj bilder i rätt ordning!'
  }, MEMORY_TEST_DURATION)
}

function handleGuess(index, memoryGrid, statusDisplay, nextTestLink, images) {
  selectedOrder.push(index) // Add the clicked image's index to selectedOrder

  console.log('User selected order:', selectedOrder) // Log user selected order
  console.log('Correct order:', correctOrder) // Log correct order

  // Compare the selected order with the correct order of indices
  if (selectedOrder[selectedOrder.length - 1] === correctOrder[selectedOrder.length - 1]) {
    revealImage(memoryGrid, index, images[index].name) // Reveal image if the order is correct
    score++ // Increase score for correct guess

    // If all images have been selected in the correct order, end the game
    if (selectedOrder.length === correctOrder.length) {
      statusDisplay.textContent = `Test över! Poäng: ${score}`
      nextTestLink.classList.remove('hidden') // Show next test link
    }
  } else {
    statusDisplay.textContent = `Fel! Test över. Poäng: ${score}`
    nextTestLink.classList.remove('hidden') // Show next test link
  }
}

/**
 * Generates a random set of images.
 */
function generateRandomImages() {
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
function displayImages(grid, images) {
  grid.classList.remove('hidden')
  images.forEach((img, index) => {
    // Create a container for each image
    const gridItem = document.createElement('div')

    // gridItem.classList.add('memory-grid-item') // Optional: For styling
    gridItem.classList.add('memory-grid-item') // Optional: For styling
    gridItem.dataset.index = index // Store the index in the container

    const imgElement = document.createElement('img')
    imgElement.src = img.name
    imgElement.alt = `Image ${index + 1}`
    imgElement.classList.add('memory-images') // Display images initially

    // imgElement.style.visibility = 'visible'; // Make it visible right away

    gridItem.appendChild(imgElement)
    grid.appendChild(gridItem) // Add the grid item to the grid
  })
}
/**
 * Displays the list of image names for the user to guess.
 */
function displayImageNames(list, images, memoryGrid, statusDisplay, nextTestLink) {
  list.innerHTML = ''
  list.classList.remove('hidden')
  list.classList.add('flex-col')

  images.forEach((img, index) => {
    const li = document.createElement('li')
    li.textContent = img.name
    li.dataset.index = index

    li.addEventListener('click', () => handleGuess(index, memoryGrid, statusDisplay, nextTestLink, images))
    list.appendChild(li)
  })
}

/**
 * Reveals an image in the grid based on the user's guess.
 */
function revealImage (grid, index, imageSrc) {
  const gridItem = grid.querySelector(`[data-index="${index}"]`)

  grid.classList.remove('hidden')
  if (gridItem) {
    const imgElement = document.createElement('img')
    imgElement.classList.add('hidden-image')
    imgElement.src = imageSrc // Set the source of the image
    imgElement.alt = `Revealed Image ${index + 1}`

    // Add the 'revealed-image' class to control visibility and size
    imgElement.classList.add('revealed-image')
    // imgElement.classList.remove('hidden')

    // Clear any existing content and add the revealed image
    gridItem.innerHTML = ''
    gridItem.appendChild(imgElement)

    console.log(`Revealed image ${imageSrc} at grid index ${index}`)
  }
}

// Export the startMemoryTest function
export { startMemoryTest, handleGuess }
