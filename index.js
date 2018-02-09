$(document).ready(function() {
  buildBoard()
  addEventListeners()
  addRandomSquare()
  addRandomSquare()
  changeColors()

  // Initialize touch controls

   $(".square").swipe( {
     swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
       if (direction === 'up') {
         moveUp()
       }
       if (direction === 'down') {
         moveDown()
       }
       if (direction === 'left') {
         moveLeft()
       }
       if (direction === 'right') {
         moveRight()
       }
     }
   })
})

//Global Vars
let gameBoard = []

class Square {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.value = 0
    this.next = 0
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
    if (gameBoard[i].next === 0) {
      boardSquares[i].innerText = null
    }
    gameBoard[i].value = gameBoard[i].next
  }
}

function moveLeft() {
  let illegalMoveCtr = 0
  for (let y = 3; y >= 0; y--) {
      const left0 = getSquare(0, y)
      const left1 = getSquare(1, y)
      const left2 = getSquare(2, y)
      const left3 = getSquare(3, y)
      let arr = [left0.value, left1.value, left2.value, left3.value]
      arr2 = arr.filter((v) => v != 0)
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i + 1] === arr2[i]) {
          arr2[i] *= 2
          arr2[i + 1] = 0
         }
      }
      arr3 = arr2.filter((v) => v != 0)
      left0.next = arr3[0] || 0
      left1.next = arr3[1] || 0
      left2.next = arr3[2] || 0
      left3.next = arr3[3] || 0

      for (let i = arr3.length; i < arr.length; i++) {
        arr3.push(0)
      }
      if (arr.toString() == arr3.toString()) {
        illegalMoveCtr++
      }
  }
  if (illegalMoveCtr === 4) {
    return
  }
  redrawBoard()
  addRandomSquare()
  checkForWinner()
  changeColors()
}

function moveRight() {
  let illegalMoveCtr = 0
  for (let y = 3; y >= 0; y--) {
      const right0 = getSquare(0, y)
      const right1 = getSquare(1, y)
      const right2 = getSquare(2, y)
      const right3 = getSquare(3, y)
      let arr = [right0.value, right1.value, right2.value, right3.value]
      arr2 = arr.filter((v) => v != 0)
      for (let i = arr2.length; i < arr.length; i++) {
        arr2.unshift(0)
      }
      for (let i = arr2.length; i > 0; i--) {
        if (arr2[i - 1] === arr2[i]) {
          arr2[i] *= 2
          arr2[i - 1] = 0
         }
      }

      arr2 = arr2.filter((v) => v != 0)
      for (let i = arr2.length; i < arr.length; i++) {
        arr2.unshift(0)
      }

      right0.next = arr2[0] || 0
      right1.next = arr2[1] || 0
      right2.next = arr2[2] || 0
      right3.next = arr2[3] || 0


      if (arr.toString() == arr2.toString()) {
        illegalMoveCtr++
      }
  }
  if (illegalMoveCtr === 4) {
    return
  }
  redrawBoard()
  addRandomSquare()
  checkForWinner()
  changeColors()
}

function moveUp() {
  let illegalMoveCtr = 0
  for (let x = 0; x <= 3; x++) {
      const up0 = getSquare(x, 0)
      const up1 = getSquare(x, 1)
      const up2 = getSquare(x, 2)
      const up3 = getSquare(x, 3)
      let arr = [up0.value, up1.value, up2.value, up3.value]
      arr2 = arr.filter((v) => v != 0)
      for (let i = arr2.length; i < arr.length; i++) {
        arr2.unshift(0)
      }
      for (let i = arr2.length; i > 0; i--) {
        if (arr2[i - 1] === arr2[i]) {
          arr2[i] *= 2
          arr2[i - 1] = 0
         }
      }

      arr2 = arr.filter((v) => v != 0)
      for (let i = arr2.length; i < arr.length; i++) {
        arr2.unshift(0)
      }

      up0.next = arr2[0] || 0
      up1.next = arr2[1] || 0
      up2.next = arr2[2] || 0
      up3.next = arr2[3] || 0


      if (arr.toString() == arr2.toString()) {
        illegalMoveCtr++
      }
  }
  if (illegalMoveCtr === 4) {
    return
  }
  redrawBoard()
  addRandomSquare()
  checkForWinner()
  changeColors()
}

function moveDown() {
  let illegalMoveCtr = 0
  for (let x = 0; x <= 3; x++) {
      const down0 = getSquare(x, 0)
      const down1 = getSquare(x, 1)
      const down2 = getSquare(x, 2)
      const down3 = getSquare(x, 3)
      let arr = [down0.value, down1.value, down2.value, down3.value]
      arr2 = arr.filter((v) => v != 0)
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i + 1] === arr2[i]) {
          arr2[i] *= 2
          arr2[i + 1] = 0
         }
      }
      arr3 = arr2.filter((v) => v != 0)
      down0.next = arr3[0] || 0
      down1.next = arr3[1] || 0
      down2.next = arr3[2] || 0
      down3.next = arr3[3] || 0

      for (let i = arr3.length; i < arr.length; i++) {
        arr3.push(0)
      }
      if (arr.toString() == arr3.toString()) {
        illegalMoveCtr++
      }
  }
  if (illegalMoveCtr === 4) {
    return
  }
  redrawBoard()
  addRandomSquare()
  checkForWinner()
  changeColors()
}

function checkForWinner() {
  const boardSquares = document.getElementsByClassName('square')
  for (let i = 0; i < boardSquares.length; i++) {
    if (boardSquares[i].innerText === 2048) {
      alert('WINNER!!!!')
    }
  }
}

function changeColors() {
  const boardSquares = document.getElementsByClassName('square')
  $('.square').each(function() {
    $(this).removeClass('two').removeClass('four').removeClass('eight').removeClass('sixteen').removeClass('thirtytwo').removeClass('sixtyfour').removeClass('onetwentyeight').removeClass('twofiftysix').removeClass('fivetwelve').removeClass('onethousandtwentyfour').removeClass('twentyfortyeight')

    if ($(this)[0].innerText === '2') {
      $(this).addClass('two')
    }
    if ($(this)[0].innerText === '4') {
      $(this).addClass('four')
    }
    if ($(this)[0].innerText === '8') {
      $(this).addClass('eight')
    }
    if ($(this)[0].innerText === '16') {
      $(this).addClass('sixteen')
    }
    if ($(this)[0].innerText === '32') {
      $(this).addClass('thirtytwo')
    }
    if ($(this)[0].innerText === '64') {
      $(this).addClass('sixtyfour')
    }
    if ($(this)[0].innerText === '128') {
      $(this).addClass('onetwentyeight')
    }
    if ($(this)[0].innerText === '256') {
      $(this).addClass('twofiftysix')
    }
    if ($(this)[0].innerText === '512') {
      $(this).addClass('fivetwelve')
    }
    if ($(this)[0].innerText === '1024') {
      $(this).addClass('onethousandtwentyfour')
    }
    if ($(this)[0].innerText === '2048') {
      $(this).addClass('twentyfortyeight')
    }
  })
}
