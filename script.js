// constants
const player1Marker = '🦧'
const player2Marker = '🐒'
const gameState = Object.freeze({
	gameRestarting: 0,
	player1Turn: 1,
	player2Turn: 2,
	gameOver: 3,
})
const winSound = new Audio('assets/monke.ogg')
const placeMarkerSound = new Audio('assets/plop.ogg')

// variables
let currentGameState
let player1Score = 0
let player2Score = 0

// dom elements
const player1ScoreElement = document.getElementById('player-1-score')
const player2ScoreElement = document.getElementById('player-2-score')
const cells = document.getElementsByClassName('cell')
const clearButton = document.getElementById('clear-btn')

const clearBoard = () => {
	for (cell of cells) {
		cell.innerHTML = ''
		cell.style.color = 'black'
		cell.style.animation = ''
	}
}

const _checkPlayerWin = (marker) => {
	// check rows
	for (let row = 0; row < 3; row++) {
		if (
			cells[row * 3 + 0].innerHTML == marker &&
			cells[row * 3 + 1].innerHTML == marker &&
			cells[row * 3 + 2].innerHTML == marker
		) {
			setAsWinningCell(cells[row * 3 + 0])
			setAsWinningCell(cells[row * 3 + 1])
			setAsWinningCell(cells[row * 3 + 2])

			return true
		}
	}

	// check columns
	for (let column = 0; column < 3; column++) {
		if (
			cells[0 + column].innerHTML == marker &&
			cells[3 + column].innerHTML == marker &&
			cells[6 + column].innerHTML == marker
		) {
			setAsWinningCell(cells[0 + column])
			setAsWinningCell(cells[3 + column])
			setAsWinningCell(cells[6 + column])

			return true
		}
	}

	// check diagonals
	if (
		cells[0].innerHTML == marker &&
		cells[4].innerHTML == marker &&
		cells[8].innerHTML == marker
	) {
		setAsWinningCell(cells[0])
		setAsWinningCell(cells[4])
		setAsWinningCell(cells[8])

		return true
	}
	if (
		cells[2].innerHTML == marker &&
		cells[4].innerHTML == marker &&
		cells[6].innerHTML == marker
	) {
		setAsWinningCell(cells[2])
		setAsWinningCell(cells[4])
		setAsWinningCell(cells[6])

		return true
	}

	return false
}

const setAsWinningCell = (cell) => {
	cell.style.color = 'green'
	cell.style.animation = 'win-animation 1s infinite'
}

const setScore = (scoreElement, score) => {
	scoreElement.innerHTML = score
}

const checkWin = () => {
	if (_checkPlayerWin(player1Marker)) {
		player1Score++
		setScore(player1ScoreElement, player1Score)
		setGameState(gameState.gameOver)
		winSound.play()
	} else if (_checkPlayerWin(player2Marker)) {
		player2Score++
		setScore(player2ScoreElement, player2Score)
		setGameState(gameState.gameOver)
		winSound.play()
	}
}

const setGameState = (state) => {
	currentGameState = state
	switch (state) {
		case gameState.gameRestarting:
			clearBoard()
			setGameState(gameState.player1Turn)
			break

		case gameState.player1Turn:
			checkWin()
			break

		case gameState.player2Turn:
			checkWin()
			break

		case gameState.gameOver:
			break

		default:
			break
	}
}

clearButton.addEventListener('click', () => {
	setGameState(gameState.gameRestarting)
})

for (cell of cells) {
	cell.addEventListener('click', (e) => {
		if (e.target.innerHTML.length != 0) {
			return
		}
		if (currentGameState == gameState.player1Turn) {
			e.target.innerHTML = player1Marker
			e.target.style.animation = 'place-marker 150ms'
			placeMarkerSound.play()
			setGameState(gameState.player2Turn)
		} else if (currentGameState == gameState.player2Turn) {
			e.target.innerHTML = player2Marker
			e.target.style.animation = 'place-marker 150ms'
			placeMarkerSound.play()
			setGameState(gameState.player1Turn)
		}
	})
}

// set scores to 0 and clear board at beginning
setScore(player1ScoreElement, player1Score)
setScore(player2ScoreElement, player2Score)
setGameState(gameState.gameRestarting)
