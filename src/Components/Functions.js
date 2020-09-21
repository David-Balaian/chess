


export function bishopMoves(i, j, boardArr, player = boardArr[i][j].figure.split("_")[1]) {
  let arrOfCoords = [[], [], [], []];
  let colorOfCurrentFigure = player
  let loopI = i;
  let loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[0].push({ i: loopI, j: loopJ })
    loopI++;
    loopJ++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[0].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[1].push({ i: loopI, j: loopJ })
    loopI--;
    loopJ++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[1].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[2].push({ i: loopI, j: loopJ })
    loopI++;
    loopJ--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[2].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[3].push({ i: loopI, j: loopJ })
    loopI--;
    loopJ--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[3].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  return arrOfCoords;
}


export function rookMoves(i, j, boardArr, player = boardArr[i][j].figure.split("_")[1]) {
  let arrOfCoords = [[], [], [], []];
  let colorOfCurrentFigure = player
  let loopI = i;
  let loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[0].push({ i: loopI, j: loopJ })
    loopI++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[0].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[1].push({ i: loopI, j: loopJ })
    loopI--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[1].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[2].push({ i: loopI, j: loopJ })
    loopJ++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[2].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    arrOfCoords[3].push({ i: loopI, j: loopJ })
    loopJ--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      } else if (boardArr[loopI][loopJ].figure) {
        arrOfCoords[3].push({ i: loopI, j: loopJ })
        break;
      }
    }
  }
  return arrOfCoords;
}

export function HorseMoves(i, j, boardArr, player = boardArr[i][j].figure.split("_")[1]) {
  let colorOfCurrentFigure = player

  let arrOfCoords = [
    { i: i - 2, j: j + 1 },
    { i: i - 2, j: j - 1 },
    { i: i + 1, j: j + 2 },
    { i: i + 1, j: j - 2 },
    { i: i - 1, j: j - 2 },
    { i: i - 1, j: j + 2 },
    { i: i + 2, j: j + 1 },
    { i: i + 2, j: j - 1 },
  ]

  arrOfCoords = arrOfCoords.filter((item) => {
    return boardArr[item.i] && boardArr[item.i][item.j] && (boardArr[item.i][item.j].style.backgroundImage ? (boardArr[item.i][item.j].figure.includes(colorOfCurrentFigure) ? false : true) : true)
  })
  // arrOfCoords.push({i,j})
  return arrOfCoords
}




export function locateAttackingFigure(i, j, boardArr, directionKingsAttack, isReverse = false, player){
  let directionCoords=[];
  let {deltaI, deltaJ} = directionKingsAttack;
  let loopI = i+ deltaI;
  let loopJ = j+ deltaJ;
  let figuresToFind = directionKingsAttack.figureToFind.split(".")
  while(boardArr[loopI] && boardArr[loopI][loopJ]){
    for(let z=0; z<figuresToFind.length; z++){
      if(boardArr[loopI][loopJ].figure.includes(figuresToFind[z])){
        directionCoords.push({i:loopI,j:loopJ})
        return directionCoords;
      }
    }
    if(!boardArr[loopI][loopJ].figure){
      directionCoords.push({i:loopI,j:loopJ})
    }else {
      return undefined;
    }
    loopI+= deltaI;
    loopJ+= deltaJ;
    if(!(boardArr[loopI] && boardArr[loopI][loopJ])){
      return undefined;
    }
  }

}


export function locateKing(i, j, boardArr, player = boardArr[i][j].figure.split("_")[1]){
  let arrOfCoordsAsRook = [[],[],[],[]];
  let colorOfCurrentFigure = player
  let colorOfOpponentFigure = colorOfCurrentFigure === "White" ? "Black" : "White"
  let loopI = i;
  let loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopI++;
    loopJ++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: -1, deltaJ: -1, figureToFind: `Queen_${colorOfOpponentFigure}.Bishop_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopI--;
    loopJ--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: 1, deltaJ: 1, figureToFind: `Queen_${colorOfOpponentFigure}.Bishop_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }

  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopI--;
    loopJ++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: 1, deltaJ: -1, figureToFind: `Queen_${colorOfOpponentFigure}.Bishop_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopI++;
    loopJ--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: -1, deltaJ: 1, figureToFind: `Queen_${colorOfOpponentFigure}.Bishop_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }


  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopI++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: -1, deltaJ: 0, figureToFind: `Queen_${colorOfOpponentFigure}.Rook_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopI--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: 1, deltaJ: 0, figureToFind: `Queen_${colorOfOpponentFigure}.Rook_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }

  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopJ++;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: 0, deltaJ: -1, figureToFind: `Queen_${colorOfOpponentFigure}.Rook_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }
  loopI = i;
  loopJ = j;
  while (boardArr[loopI] && boardArr[loopI][loopJ]) {
    loopJ--;
    if (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(`King_${colorOfCurrentFigure}`)) {
        return {deltaI: 0, deltaJ: 1, figureToFind: `Queen_${colorOfOpponentFigure}.Rook_${colorOfOpponentFigure}`};
      }else if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure)) {
        break;
      }  
    }
  }
 
  return undefined;
}


export function getSteps(figure, i, j, boardArr, WhiteKing, BlackKing, player) {
  let figureI = i;
  let figureJ = j;
  let colorOfCurrentFigure = figure.split("_")[1]
  let arrOfCoords = [];
 
  if (figure === "Pawn_White") {
    if (i === 6) {
      arrOfCoords = [{ i: i - 1, j: j }, { i: i - 2, j: j }]
    } else {
      arrOfCoords = [{ i: i - 1, j: j }]
    }
    arrOfCoords = arrOfCoords.filter((item) => {
      return boardArr[item.i] && boardArr[item.i][item.j] && (boardArr[item.i][item.j].style.backgroundImage ? false : true)
    })
    arrOfCoords.push({ i: i, j: j })
    if (boardArr[i - 1] && boardArr[i - 1][j - 1] && boardArr[i - 1][j - 1].figure && !boardArr[i - 1][j - 1].figure.includes(colorOfCurrentFigure)) {
      arrOfCoords.push({ i: i - 1, j: j - 1 })
    }
    if (boardArr[i - 1] && boardArr[i - 1][j + 1] && boardArr[i - 1][j + 1].figure && !boardArr[i - 1][j + 1].figure.includes(colorOfCurrentFigure)) {
      arrOfCoords.push({ i: i - 1, j: j + 1 })
    }
    return arrOfCoords
  } else if (figure === "Pawn_Black") {
    if (i === 1) {
      arrOfCoords = [{ i: i + 1, j: j }, { i: i + 2, j: j }]
    } else {
      arrOfCoords = [{ i: i + 1, j: j }];
      // arrOfCoords = arrOfCoords.filter(item => !boardArr[item.i][item.j].style.backgroundImage)
    }
    arrOfCoords = arrOfCoords.filter((item) => {
      return boardArr[item.i] && boardArr[item.i][item.j] && (boardArr[item.i][item.j].style.backgroundImage ? false : true)
    })
    arrOfCoords.push({ i: i, j: j })
    if (boardArr[i + 1] && boardArr[i + 1][j - 1] && boardArr[i + 1][j - 1].figure && !boardArr[i + 1][j - 1].figure.includes(colorOfCurrentFigure)) {
      arrOfCoords.push({ i: i + 1, j: j - 1 })
    }
    if (boardArr[i + 1] && boardArr[i + 1][j + 1] && boardArr[i + 1][j + 1].figure && !boardArr[i + 1][j + 1].figure.includes(colorOfCurrentFigure)) {
      arrOfCoords.push({ i: i + 1, j: j + 1 })
    }
    return arrOfCoords;
  } else if (figure === "Horse_White" || figure === "Horse_Black") {

    arrOfCoords = HorseMoves(i, j, boardArr, player)
    arrOfCoords.push({ i: i, j: j })
    return arrOfCoords

  } else if (figure === "Bishop_White" || figure === "Bishop_Black") {

    arrOfCoords = bishopMoves(i, j, boardArr, player)
    return arrOfCoords

  } else if (figure === "Rook_White" || figure === "Rook_Black") {

    arrOfCoords = rookMoves(i, j, boardArr, player)
    return arrOfCoords

  } else if (figure === "Queen_White" || figure === "Queen_Black") {

    let arrOfCoordsRook = rookMoves(i, j, boardArr, player)
    arrOfCoords = bishopMoves(i, j, boardArr, player)
    arrOfCoords.push(...arrOfCoordsRook)
    arrOfCoords.filter((item) => {
      return boardArr[item.i] && boardArr[item.i][item.j] && (boardArr[item.i][item.j].style.backgroundImage ? (boardArr[item.i][item.j].figure.includes(colorOfCurrentFigure) ? false : true) : true)
    })
    return arrOfCoords

  } else if (figure === "King_White" || figure === "King_Black") {
    arrOfCoords = [
      { i: i + 1, j: j + 1 },
      { i: i + 1, j: j - 1 },
      { i: i - 1, j: j - 1 },
      { i: i - 1, j: j + 1 },
      { i: i, j: j + 1 },
      { i: i, j: j - 1 },
      { i: i + 1, j: j },
      { i: i - 1, j: j },
    ]
    arrOfCoords = arrOfCoords.filter((item) => {
      return boardArr[item.i] && boardArr[item.i][item.j] && (boardArr[item.i][item.j].style.backgroundImage ? (boardArr[item.i][item.j].figure.includes(colorOfCurrentFigure) ? false : true) : true)
    })




    let ignored = filterKingPos(arrOfCoords, boardArr, figure, player);
    arrOfCoords = arrOfCoords.filter(item => {
      for (let x = 0; x < ignored.length; x++) {
        if ((item.i === ignored[x].i) && (item.j === ignored[x].j)) {
          return false;
        }
      }
      return true

    })
    if ((figure === "King_White" && (WhiteKing.canRotateLeft||WhiteKing.canRotateRight))) {
      if (boardArr[7][7].figure === "Rook_White" && !boardArr[7][6].figure && !boardArr[7][5].figure && WhiteKing.canRotateRight) {
        arrOfCoords.push({ i: i, j: j + 2 })
      }
      if (boardArr[7][0].figure === "Rook_White" && !boardArr[7][2].figure && !boardArr[7][1].figure && !boardArr[7][3].figure && WhiteKing.canRotateLeft) {
        arrOfCoords.push({ i: i, j: j - 2 })
      }
    }
    if (figure === "King_Black" && (BlackKing.canRotateLeft||BlackKing.canRotateRight)) {
      if (boardArr[0][7].figure === "Rook_Black" && !boardArr[0][6].figure && !boardArr[0][5].figure && BlackKing.canRotateRight) {
        arrOfCoords.push({ i: i, j: j + 2 })
      }
      if (boardArr[0][0].figure === "Rook_Black" && !boardArr[0][2].figure && !boardArr[0][1].figure && !boardArr[0][3].figure && BlackKing.canRotateLeft) {
        arrOfCoords.push({ i: i, j: j - 2 })
      }
    }

    arrOfCoords.push({ i: i, j: j })

    return arrOfCoords
  }
}






















function filterKingPos(arr, boardArr, figure) {
  let ignoreCoords = [];


  for (let h = 0; h < arr.length; h++) {
    let i = arr[h].i;
    let j = arr[h].j;

    let colorOfCurrentFigure = figure.split("_")[1]
    let colorOfOpponentFigure = colorOfCurrentFigure === "White" ? "Black" : "White";



    let onUp = false;
    let onLeft = false;
    let onRight = false;
    let onRightUp = false;
    let onRightDown = false;
    let onLeftDown = false;
    let onLeftUp = false;
    let onDown = false;
    let loopI = i + 1;
    let loopJ = j;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes("Horse")) {
      }
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onDown = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Rook_${colorOfOpponentFigure}`))) {
        onDown = true;
        break;
      }
      loopI++;


    }
    loopI = i - 1;
    loopJ = j;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onUp = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Rook_${colorOfOpponentFigure}`))) {
        onUp = true;
        break;
      }else if(boardArr[loopI][loopJ].figure.includes(`${colorOfOpponentFigure}`)){
        break;
      }
      loopI--;

    }
    loopI = i;
    loopJ = j + 1;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onRight = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Rook_${colorOfOpponentFigure}`))) {
        onRight = true;
        break;
      }else if(boardArr[loopI][loopJ].figure.includes(`${colorOfOpponentFigure}`)){
        break;
      }
      loopJ++;

    }
    loopI = i;
    loopJ = j - 1;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onLeft = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Rook_${colorOfOpponentFigure}`))) {
        onLeft = true;
        break;
      }else if(boardArr[loopI][loopJ].figure.includes(`${colorOfOpponentFigure}`)){
        break;
      }
      loopJ--;
    }

    loopI = i + 1;
    loopJ = j + 1;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onRightDown = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Bishop_${colorOfOpponentFigure}`))) {
        onRightDown = true;
        break;
      } else if (boardArr[loopI][loopJ].figure.includes(colorOfOpponentFigure)) {
        onRightDown = false;
        break;
      }else if(boardArr[loopI][loopJ].figure.includes(`${colorOfOpponentFigure}`)){
        break;
      }
      loopI++;
      loopJ++;

    }
    loopI = i + 1;
    loopJ = j - 1;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onLeftDown = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Bishop_${colorOfOpponentFigure}`))) {
        onLeftDown = true;
        break;
      }else if(boardArr[loopI][loopJ].figure.includes(`${colorOfOpponentFigure}`)){
        break;
      }
      loopI++;
      loopJ--;
    }
    loopI = i - 1;
    loopJ = j - 1;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onLeftUp = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Bishop_${colorOfOpponentFigure}`))) {
        onLeftUp = true;
        break;
      }else if(boardArr[loopI][loopJ].figure.includes(`${colorOfOpponentFigure}`)){
        break;
      }
      loopI--
      loopJ--;

    }
    loopI = i - 1;
    loopJ = j + 1;
    while (boardArr[loopI] && boardArr[loopI][loopJ]) {
      if (boardArr[loopI][loopJ].figure.includes(colorOfCurrentFigure) && !boardArr[loopI][loopJ].figure.includes("King")) {
        onRightUp = false;
        break;
      }
      else if ((boardArr[loopI][loopJ].figure.includes(`Queen_${colorOfOpponentFigure}`)) || (boardArr[loopI][loopJ].figure.includes(`Bishop_${colorOfOpponentFigure}`))) {
        onRightUp = true;
        break;
      }else if(boardArr[loopI][loopJ].figure.includes(`${colorOfOpponentFigure}`)){
        break;
      }
      loopI--;
      loopJ++;
    }

    let arrOfCoords = [
      { i: i - 2, j: j + 1 },
      { i: i - 2, j: j - 1 },
      { i: i + 1, j: j + 2 },
      { i: i + 1, j: j - 2 },
      { i: i - 1, j: j - 2 },
      { i: i - 1, j: j + 2 },
      { i: i + 2, j: j + 1 },
      { i: i + 2, j: j - 1 },
    ]
    let checkarr = [];

    arrOfCoords.forEach(item => {
      if (boardArr[item.i] && boardArr[item.i][item.j] && boardArr[item.i][item.j].figure.includes(`Horse_${colorOfOpponentFigure}`)) {
        checkarr.push(true)
      } else {
        checkarr.push(false)
      }
    })
    let PawnAttackRight = false;
    let PawnAttackLeft = false;

    if (colorOfCurrentFigure === "White") {
      PawnAttackLeft = boardArr[i - 1] && boardArr[i - 1][j - 1] && boardArr[i - 1][j - 1].figure.includes("Pawn_Black") ? true : false;
      PawnAttackRight = boardArr[i - 1] && boardArr[i - 1][j + 1] && boardArr[i - 1][j + 1].figure.includes("Pawn_Black") ? true : false;
    } else if (colorOfCurrentFigure === "Black") {
      PawnAttackLeft = boardArr[i + 1] && boardArr[i + 1][j - 1] && boardArr[i + 1][j - 1].figure.includes("Pawn_White") ? true : false;
      PawnAttackRight = (boardArr[i + 1] && boardArr[i + 1][j + 1] && boardArr[i + 1][j + 1].figure.includes("Pawn_White")) ? true : false;
    }

    if (onLeft || onRight || onUp || onDown || onRightUp || onLeftUp || onLeftDown || onRightDown || checkarr.some(item => item)||PawnAttackLeft||PawnAttackRight) {
      ignoreCoords.push({ i, j })
    }
  }
  return ignoreCoords;
}
