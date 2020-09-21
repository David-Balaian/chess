import React, { useState, useEffect } from 'react';
import './App.css';
import Pawn_White from "./ChessPeices/Pawn_White.png"
import Horse_White from "./ChessPeices/Horse_White.png"
import Bishop_White from "./ChessPeices/Bishop_White.png"
import Rook_White from "./ChessPeices/Rook_White.png"
import Queen_White from "./ChessPeices/Queen_White.png"
import King_White from "./ChessPeices/King_White.png"
import Pawn_Black from "./ChessPeices/Pawn_Black.png"
import Horse_Black from "./ChessPeices/Horse_Black.png"
import Bishop_Black from "./ChessPeices/Bishop_Black.png"
import Rook_Black from "./ChessPeices/Rook_Black.png"
import Queen_Black from "./ChessPeices/Queen_Black.png"
import King_Black from "./ChessPeices/King_Black.png"
import { getSteps, locateAttackingFigure, locateKing } from './Components/Functions';
import {Button} from '@material-ui/core';



function App() {
  const [initial, setInitial] = useState([]);
  const [boardArr, setBoardArr] = useState([]);
  const [currentFigure, setCurrentFigure] = useState(false);
  const [player, setPlayer] = useState("White")
  const [WhiteKing, setWhiteKing] = useState({ i: 7, j: 4, canRotateLeft: true, canRotateRight: true, isCheck: false });
  const [BlackKing, setBlackKing] = useState({ i: 0, j: 4, canRotateLeft: true, canRotateRight: true, isCheck: false });
  const [initialBoard, setInitialBoard] = useState([]);
  const [deg, setDeg] = useState(0);
  const [figuresdeg, setFiguresdeg] =useState(0);
  const [index, setIndex] =useState(1);
  const [history, setHistory] = useState([]);
  const [styleFigures, setStyleFigures] = useState({width: "400px", border: "1px solid black", padding: 0, margin: 0, display: "none",})
  const [pos, setPos] = useState();

  useEffect(() => {
    let board = {};
    for (let i = 0; i < 8; i++) {
      board[i] = {};
      for (let j = 0; j < 8; j++) {
        let style = { opacity: "1", height: "50px", width: "50px", border: "1px solid black", backgroundSize: "contain", boxSizing: "border-box", padding: 0, margin: 0 }
        i % 2 === 0 ? j % 2 === 0 ? Object.assign(style, { backgroundColor: "wheat" }) : Object.assign(style, { backgroundColor: "#5c3317", }) : j % 2 === 0 ? Object.assign(style, { backgroundColor: "#5c3317" }) : Object.assign(style, { backgroundColor: "wheat" })
        let figure = "";
        if (i === 1) {
          style.backgroundImage = `url(${Pawn_Black})`
          figure = "Pawn_Black";
        } else if (i === 6) {
          style.backgroundImage = `url(${Pawn_White})`
          figure = "Pawn_White";
        } else if (i === 0) {
          if (j === 0 || j === 7) {
            style.backgroundImage = `url(${Rook_Black})`;
            figure = "Rook_Black";
          }
          else if (j === 1 || j === 6) {
            style.backgroundImage = `url(${Horse_Black})`;
            figure = "Horse_Black";
          } else if (j === 2 || j === 5) {
            style.backgroundImage = `url(${Bishop_Black})`
            figure = "Bishop_Black";
          }
          else if (j === 3) {
            style.backgroundImage = `url(${Queen_Black})`
            figure = "Queen_Black";
          }
          else if (j === 4) {
            style.backgroundImage = `url(${King_Black})`
            figure = "King_Black";
          }
        } else if (i === 7) {
          if (j === 0 || j === 7) {
            style.backgroundImage = `url(${Rook_White})`;
            figure = "Rook_White";
          }
          else if (j === 1 || j === 6) {
            style.backgroundImage = `url(${Horse_White})`;
            figure = "Horse_White";
          }
          else if (j === 2 || j === 5) {
            style.backgroundImage = `url(${Bishop_White})`
            figure = "Bishop_White";
          } else
            if (j === 3) {
              style.backgroundImage = `url(${Queen_White})`
              figure = "Queen_White";
            }
            else if (j === 4) {
              style.backgroundImage = `url(${King_White})`
              figure = "King_White";
            }
        }

        board[i][j] = { style: style, i, j, figure }
      }
    }
    setHistory([board]);
    setBoardArr(board);
    setInitial(board);
    setInitialBoard(board)
  }, [])


  function changeColor(color, arrOfCoords) {
    let itemJ, style;
    let newBoard = JSON.parse(JSON.stringify(initial));
    if (Array.isArray(arrOfCoords[0])) {
      for (let k = 0; k < arrOfCoords.length; k++) {
        for (let z = 0; z < arrOfCoords[k].length; z++) {
          style = JSON.parse(JSON.stringify(newBoard[arrOfCoords[k][z].i][arrOfCoords[k][z].j].style))
          style.backgroundColor = color;
          itemJ = Object.assign(newBoard[arrOfCoords[k][z].i][arrOfCoords[k][z].j], { style })
        }
      }
    } else {
      for (let k = 0; k < arrOfCoords.length; k++) {
        style = JSON.parse(JSON.stringify(newBoard[arrOfCoords[k].i][arrOfCoords[k].j].style))
        style.backgroundColor = color;
        itemJ = Object.assign(newBoard[arrOfCoords[k].i][arrOfCoords[k].j], { style })
      }
    }
    return (Object.assign({}, newBoard));
  }




  function boxClick(itemJ) {
    if(index!==1){
      return
    }
    let { i, j, figure } = itemJ;


    if ((BlackKing.isCheck && figure.includes("Black") || (WhiteKing.isCheck && figure.includes("White"))) && itemJ.style.backgroundColor !== "green") {
      let direction = BlackKing.isCheck ? BlackKing.direction : WhiteKing.direction
      if (figure) {
        setCurrentFigure(itemJ)
      }

      let arrInCheck = getSteps(figure, i, j, boardArr, WhiteKing, BlackKing, player)


      if (figure.includes("King")) {
        arrInCheck = arrInCheck.map((item) => {
          for (let i = 0; i < direction.length; i++) {
            if (item.i === direction[i].i && item.j === direction[i].j && !boardArr[item.i][item.j].figure) {
              return null;
            }
          }
          return item

        }).filter(item => item)
      } else {

        arrInCheck = arrInCheck.reduce((newArr, item) => {
          
          if (Array.isArray(item)) {

            item.forEach((it) => {
              for (let i = 0; i < direction.length; i++) {
                if (it.i === direction[i].i && it.j === direction[i].j) {
                  newArr.push(it)
                }
              }
            })
            return newArr

          } else {
            for (let i = 0; i < direction.length; i++) {
              if (item.i === direction[i].i && item.j === direction[i].j) {
                newArr.push(item)
              }
            }
            return newArr
          }
        }, [])

      }

      arrInCheck.push({ i, j })
      let newBoard = changeColor("green", arrInCheck);
      setBoardArr(newBoard)
      return

    }


    if (!figure && itemJ.style.backgroundColor !== "green") {
      return
    } 
    
    
    else if (itemJ.style.backgroundColor === "green") {
      let newBoard = JSON.parse(JSON.stringify(initial));
      let item = JSON.parse(JSON.stringify(newBoard[i][j]))
      item.style.backgroundImage = currentFigure.style.backgroundImage;
      item.figure = currentFigure.figure
      newBoard[currentFigure.i][currentFigure.j].style.backgroundImage = "";
      newBoard[currentFigure.i][currentFigure.j].figure = "";
      itemJ = Object.assign(newBoard[i][j], { style: item.style, figure: item.figure })
      
      if ((WhiteKing.canRotateLeft||WhiteKing.canRotateRight) && currentFigure.figure === "King_White" && (currentFigure.i !== i || currentFigure.j !== j)) {
        if (i === 7 && j === 6) {
          newBoard[7][5].style.backgroundImage = newBoard[7][7].style.backgroundImage
          newBoard[7][5].figure = "Rook_White"
          newBoard[7][7].style.backgroundImage = ""
          newBoard[7][7].figure = ""
          setWhiteKing(Object.assign({}, WhiteKing, { canRotateRight: false }));

        } else if (i === 7 && j === 2) {
          newBoard[7][3].style.backgroundImage = newBoard[7][0].style.backgroundImage;
          newBoard[7][3].figure = "Rook_White";
          newBoard[7][0].style.backgroundImage = "";
          newBoard[7][0].figure = "";
        setWhiteKing(Object.assign({}, WhiteKing, { canRotateLeft: false }));
        }
      }
      
      if ((BlackKing.canRotateLeft||BlackKing.canRotateRight) && currentFigure.figure === "King_Black" && (currentFigure.i !== i || currentFigure.j !== j)) {
        if (i === 0 && j === 6) {
          newBoard[0][5].style.backgroundImage = newBoard[0][7].style.backgroundImage
          newBoard[0][5].figure = "Rook_Black";
          newBoard[0][7].style.backgroundImage = "";
          newBoard[0][7].figure = "";
        setBlackKing(Object.assign({}, WhiteKing, { canRotateRight: false }))
        } else if (i === 0 && j === 2) {
          newBoard[0][3].style.backgroundImage = newBoard[0][0].style.backgroundImage
          newBoard[0][3].figure = "Rook_Black";
          newBoard[0][0].style.backgroundImage = "";
          newBoard[0][0].figure = "";
        setBlackKing(Object.assign({}, WhiteKing, { canRotateLeft: false }))
        }
      }
      
      if((WhiteKing.canRotateLeft||WhiteKing.canRotateRight) && currentFigure.figure.includes("Rook_White")){
        if(currentFigure.i === 7 && currentFigure.j === 0){
          setWhiteKing(Object.assign({}, WhiteKing, { canRotateLeft: false }))
        }else if(currentFigure.i === 7 && currentFigure.j === 7){
          setWhiteKing(Object.assign({}, WhiteKing, { canRotateRight: false }))
        }
      }else if((BlackKing.canRotateLeft||BlackKing.canRotateRight) && currentFigure.figure.includes("Rook_Black")){
        if(currentFigure.i === 0 && currentFigure.j === 0){
          setBlackKing(Object.assign({}, BlackKing, { canRotateLeft: false }))
        }else if(currentFigure.i === 0 && currentFigure.j === 7){
          setBlackKing(Object.assign({}, BlackKing, { canRotateRight: false }))
        }
      }
      if(currentFigure.figure==="Pawn_White" && i===0){
        setStyleFigures(Object.assign({},styleFigures,{display:"flex"}))
        return
      }
      let arrOfCoordsforCheck = getSteps(currentFigure.figure, i, j, boardArr, WhiteKing, BlackKing, player)

      arrOfCoordsforCheck = arrOfCoordsforCheck.filter(item => {
        if (Array.isArray(item)) {
          item = item.map(nestedItem => {
            if (player === "White") {
              if (boardArr[nestedItem.i][nestedItem.j].figure.includes("King_Black")) {
                return { direction: item, i: nestedItem.i, j: nestedItem.j }
              } else {
                return null
              }
            }
            if (player === "Black") {
              if (boardArr[nestedItem.i][nestedItem.j].figure.includes("King_White")) {
                return { direction: item, i: nestedItem.i, j: nestedItem.j }
              } else {
                return null
              }
            }
          })

          item = item.filter(nestedItem => {
            return nestedItem
          })
          if (item.length) {
            return true
          } else {
            return false
          }
        } else {
          if (player === "White") {
            if (boardArr[item.i] && boardArr[item.i][item.j] && boardArr[item.i][item.j].figure.includes("King_Black")) {
              return { direction: item, i: item.i, j: item.j }
            } else if (item.i===i&&item.j===j) {
              return true
            }
          }
          if (player === "Black") {
            if (boardArr[item.i][item.j].figure.includes("King_White")) {
              return { direction: item, i: item.i, j: item.j }
            } else if (item.i===i&&item.j===j) {
              return true
            }
          }
        }
      })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
      let KingPos;

      if (Array.isArray(arrOfCoordsforCheck[0])) {
        arrOfCoordsforCheck = [...arrOfCoordsforCheck[0]]
        arrOfCoordsforCheck.forEach(item => {
          if (newBoard[item.i][item.j].figure.includes("King")) {
            KingPos = { i: item.i, j: item.j };
          }
        })
      } else {
        arrOfCoordsforCheck.forEach(item => {
          if (newBoard[item.i][item.j].figure.includes("King")) {
            KingPos = { i: item.i, j: item.j };
          }
        })
      }
      if (!currentFigure.figure.includes("King")) {
        if (arrOfCoordsforCheck.length > 0 && KingPos) {
          player === "White" ? setBlackKing(Object.assign({}, BlackKing, { i: KingPos.i, j: KingPos.j, canRotate: false, isCheck: true, direction: arrOfCoordsforCheck })) : setWhiteKing(Object.assign({}, WhiteKing, { i: KingPos.i, j: KingPos.j, canRotate: false, isCheck: true, direction: arrOfCoordsforCheck }))
          newBoard[KingPos.i][KingPos.j].style.backgroundColor = "red";
        }
      }
      if (WhiteKing.isCheck && !(currentFigure.i === i && currentFigure.j === j)) {
        newBoard[WhiteKing.i][WhiteKing.j].style.backgroundColor = initialBoard[WhiteKing.i][WhiteKing.j].style.backgroundColor;
        setWhiteKing(Object.assign({}, WhiteKing, { isCheck: false }))
      }
      if (BlackKing.isCheck && !(currentFigure.i === i && currentFigure.j === j)) {
        newBoard[BlackKing.i][BlackKing.j].style.backgroundColor = initialBoard[BlackKing.i][BlackKing.j].style.backgroundColor;
        setBlackKing(Object.assign({}, BlackKing, { isCheck: false }))
      }

      setBoardArr(Object.assign({}, newBoard))
      setInitial(Object.assign({}, newBoard))
      if (currentFigure.i === i && currentFigure.j === j) { return }
      let copyHistory = JSON.parse(JSON.stringify(history));
      copyHistory.push(newBoard)
      setHistory(copyHistory)
      if(player === "White") {

        setPlayer("Black")
      }else{
        setPlayer("White")
      }
      setDeg(deg+180)
      return
    } 
    
    
    else if (figure && itemJ.style.backgroundColor !== "green") {
      if(figure.includes("King")){
        console.log(WhiteKing, "white")
        console.log(BlackKing, "Black")
      }
      if (!figure.includes(player)) {
        return
      }
      setCurrentFigure(itemJ);
    }
    let directionKingsAttack=false;
    let attackDirectionCoords = undefined;
    let reverseAttackCoords = undefined;

    let arrOfCoords = getSteps(figure, i, j, boardArr, WhiteKing, BlackKing, player)

     directionKingsAttack = locateKing(i, j, boardArr)
    if(directionKingsAttack){
      attackDirectionCoords = locateAttackingFigure(i, j, boardArr, directionKingsAttack)
    }
    if(attackDirectionCoords){
      arrOfCoords = arrOfCoords.filter(item=>{
        if(Array.isArray(item)){

          let arr =[];
          item = item.filter(it=>{
            for(let z = 0; z<attackDirectionCoords.length; z++){
              return ((it.i === attackDirectionCoords[z].i) && (it.j === attackDirectionCoords[z].j))
              
            }
          })
          return item.length
        }else{
        for(let z = 0; z<attackDirectionCoords.length; z++){
          return (item.i === attackDirectionCoords[z].i) && (item.j === attackDirectionCoords[z].j)
        }
      }
      })
      let toKingI = i-directionKingsAttack.deltaI;
      let toKingJ = j-directionKingsAttack.deltaJ;
      while(!(boardArr[toKingI] && boardArr[toKingI][toKingJ].figure.includes(`King_${player}`))){
        if(Array.isArray(arrOfCoords[0])){
        arrOfCoords[0].push({i: toKingI, j: toKingJ})
        }else{
          break
        }
        toKingI -= directionKingsAttack.deltaI;
        toKingJ -= directionKingsAttack.deltaJ;
      }
      arrOfCoords.push({i,j})
    }

    let newBoard = changeColor("green", arrOfCoords);
    setBoardArr(newBoard)


  }

  function selectFigure(e, figureName){
    setStyleFigures(Object.assign({},styleFigures,{display:"none"}))

      let itemJ = {style:{opacity: "1",
        height: "50px",
        width: "50px",
        border: "1px solid black",
        backgroundSize: "contain",
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
        backgroundImage: e.target.style.backgroundImage,
        backgroundColor: "green"},
        i:0,
        j:pos.j,
        figure:"",
      }
      setCurrentFigure(Object.assign({}, itemJ,{i: 1, j: currentFigure.j ,figure: figureName}))

      
      boxClick(itemJ)
 
  }


  let board = Object.values(boardArr);
  let historyBoard=history[history.length-index] && Object.values(history[history.length-index])
  return (
    <div style={{ height: "100vh", width: "100%", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <span style={{ padding: 20 }}>{`${player}'s turn`}</span>
      <div style={styleFigures}>
      { player === "White" ? 
      <>
      <div  onClick={(e)=>{selectFigure(e,`Queen_White`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Queen_White})`}}></div>
      <div  onClick={(e)=>{selectFigure(e,`Rook_White`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Rook_White})`}}></div>
      <div  onClick={(e)=>{selectFigure(e,`Bishop_White`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Bishop_White})`}}></div>
      <div  onClick={(e)=>{selectFigure(e,`Horse_White`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Horse_White})`}}></div>
      </>
      :
      <>
      <div  onClick={(e)=>{selectFigure(e,`Queen_Black`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Queen_Black})`}}></div>
      <div  onClick={(e)=>{selectFigure(e,`Rook_Black`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Rook_Black})`}}></div>
      <div  onClick={(e)=>{selectFigure(e,`Bishop_Black`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Bishop_Black})`}}></div>
      <div  onClick={(e)=>{selectFigure(e,`Horse_Black`)}} style={{height:50, width: 50,backgroundSize: "contain", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${Horse_Black})`}}></div>
      </>
      }
        
      </div>
      {
        index===1 ?
        <div style={{ transform: `rotateZ(${deg}deg)`, height: "400px", width: "400px", border: "1px solid black", padding: 0, margin: 0, display: "flex", flexWrap: "wrap" }}>
        {
          board.map((itemI,i) => {
            itemI = Object.values(itemI)
            return itemI.map((itemJ,j) => {
           
              return<div style={{transform: `rotateZ(${deg}deg)`}}>  
              <div style={itemJ.style}  onClick={() => { boxClick(itemJ); setPos({i:itemJ.i,j:itemJ.j}) }}></div>
              </div>
            })
          })}
      </div>
          :
      <div style={{ transform: `rotateZ(${deg}deg)`, height: "400px", width: "400px", border: "1px solid black", padding: 0, margin: 0, display: "flex", flexWrap: "wrap" }}>
        {
          historyBoard && historyBoard.map((itemI) => {
            itemI = Object.values(itemI)
            return itemI.map((itemJ) => {
              
              return<div style={{transform: `rotateZ(${deg}deg)`}}>  
              <div style={itemJ.style}  onClick={() => { boxClick(itemJ) }}></div>
              </div>
            })
          })}
      </div>}
      <div style={{width: "450px", display: "flex", justifyContent: "center", }}>
        <Button variant="outlined" onClick={()=>{history.length-index > 0 ? setIndex(index+1) : setIndex(index) }}> Previous Step </Button>
        <Button variant="outlined" onClick={()=>{ setDeg(deg+180); setFiguresdeg(true) }}> Rotate </Button>
        <Button variant="outlined" onClick={()=>{history.length-index < history.length-1 ?  setIndex(index-1) : setIndex(index)}}> Next Step </Button>
        <Button variant="outlined" onClick={()=>{ setIndex(1) }}> Last </Button>
      </div>

    </div>
  );
}

export default App;
