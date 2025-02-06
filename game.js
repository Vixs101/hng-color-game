const colorBox = document.querySelector('[data-testid="colorBox"]')
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]')
const gameStatus = document.querySelector('[data-testid="gameStatus"]')
const scoreElement = document.querySelector('[data-testid="score"]')
const newGameButton = document.querySelector('[data-testid="newGameButton"]')
const correctSound = document.getElementById("correctSound")
const wrongSound = document.getElementById("wrongSound")

let targetColor
let score = 0

function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

function generateSimilarColors(color) {
  const [r, g, b] = color.match(/\d+/g).map(Number)
  return Array.from({ length: 5 }, () => {
    const newR = Math.min(255, Math.max(0, r + Math.floor(Math.random() * 51) - 25))
    const newG = Math.min(255, Math.max(0, g + Math.floor(Math.random() * 51) - 25))
    const newB = Math.min(255, Math.max(0, b + Math.floor(Math.random() * 51) - 25))
    return `rgb(${newR}, ${newG}, ${newB})`
  })
}

function startNewGame() {
  targetColor = getRandomColor()
  colorBox.style.backgroundColor = targetColor

  const colors = [targetColor, ...generateSimilarColors(targetColor)]
  colors.sort(() => Math.random() - 0.5)

  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = colors[index]
    option.classList.remove("fade-out")
  })

  gameStatus.textContent = ""
  gameStatus.classList.remove("celebrate")
}

function playSound(sound) {
    sound.currentTime = 0 
    sound.play().catch((error) => console.error("Error playing sound:", error))
  }

function checkGuess(guessedColor) {
  if (guessedColor === targetColor) {
    score++
    scoreElement.textContent = score
    gameStatus.textContent = "Correct!"
    playSound(correctSound)
    gameStatus.classList.add("celebrate")
    correctSound.play()
    setTimeout(startNewGame, 1500)
  } else {
    gameStatus.textContent = "Wrong! Try again."
    playSound(wrongSound)
    const wrongOption = Array.from(colorOptions).find((option) => option.style.backgroundColor === guessedColor)
    wrongOption.classList.add("fade-out")
  }
}

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    checkGuess(option.style.backgroundColor)
  })
})

newGameButton.addEventListener("click", startNewGame)

startNewGame()

