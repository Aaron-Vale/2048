$(document).ready(function() {
  buildBoard()
  addEventListeners()
  addRandomSquare()
  addRandomSquare()
})

//Global Vars
let gameBoard = []

class Square {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.value = null
    this.next = null
  }
}

function buildBoard() {
  for (let y = 3; y >= 0; y--) {
    for (let x = 0; x <= 3; x++) {
      gameBoard.push(new Square(x,y))
    }
  }
  const squares = document.getElementsByClassName('square')
  for (let i = 0; i < squares.length; i++) {
    squares[i].dataset.x = gameBoard[i].x
    squares[i].dataset.y = gameBoard[i].y
    squares[i].dataset.boardIndex = i
    squares[i].dataset.value = null
  }
}

function addEventListeners() {
  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        moveLeft()
        break;

        case 38: // up
        moveUp()
        break;

        case 39: // right
        moveRight()
        break;

        case 40: // down
        moveDown()
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
}

function getSquare(x, y) {
  const filter = gameBoard.filter(function(element) {
    return element.x === x && element.y === y
  })
  return filter[0]
}

function addRandomSquare() {
  const emptyArray = findEmptyIndexes()
  const randomNum1 = Math.floor(Math.random() * emptyArray.length)
  const index = emptyArray[randomNum1]
  const square = gameBoard[index]
  const randomNum = randomNumberAdd()
  square.value = randomNum
  square.next = randomNum

  const boardSquares = document.getElementsByClassName('square')
  boardSquares[index].dataset.boardIndex = randomNum
  boardSquares[index].innerText = randomNum
}

function randomNumberAdd() {
  let numToAdd
  const randomNum = Math.random()
  if (randomNum < 0.5) {
    numToAdd = 2
  } else {
    numToAdd = 4
  }
  return numToAdd
}

function findEmptyIndexes() {
  let empties = []
  for (let i = 0; i < gameBoard.length; i++) {
    if (!gameBoard[i].value) {
      empties.push(i)
    }
  }
  return empties
}

function redrawBoard() {
  const boardSquares = document.getElementsByClassName('square')
  for (let i = 0; i < gameBoard.length; i++) {
    boardSquares[i].innerText = gameBoard[i].next
    gameBoard[i].value = gameBoard[i].next
  }
}

function moveLeft() {
    for (let y = 3; y >= 0; y--) {
       for (let x = 1; x <= 3; x++) {
        let current = getSquare(x,y)
        let left = getSquare(x - 1, y)
        let left2 = getSquare(x - 2, y)
        let left3 = getSquare(x - 3, y)
        if (left.value && !left2 && !left3 && left.value === current.value) {
          left.next = current.value * 2
          current.next = null
        } else if (left.value && left2 && !left3 && left2.value === left.value) {
          left2.next = left.value * 2
          left.next = current.value
        } else if (left.value && left2 && !left3 && left.value === current.value && left2.value !== left.value) {
          left.next = current.value * 2
          left2.next = left2.value
          current.next = null
        } else if (left.value && left2 && left3 && left.value === current.value) {
          left.next = current.value * 2
          current.next = null
        } else if (!left.value && current.value) {
          left.next = current.value
          current.next = null
        }  else {
          current.next = current.value
        }
      }
    }
    redrawBoard()
  addRandomSquare()
}

function moveRight() {

}

function moveUp() {

}

function moveDown() {

}
