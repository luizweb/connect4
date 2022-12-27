const startScreen = document.getElementById("startScreen")
const gameScreen = document.getElementById("gameScreen")
const gameScore = document.getElementById("gameScore")
const yellowPlayer = document.getElementById("yellowPlayer")
const bluePlayer = document.getElementById("bluePlayer")
const iptYellowPlayer = document.getElementById("iptYellowPlayer")
const iptBluePlayer = document.getElementById("iptBluePlayer")
const btnStart = document.getElementById("btnStart")
const btnPlayAgain = document.getElementById("btnPlayAgain")
const btnExit = document.getElementById("btnExit")


const game = new Connect4();

btnStart.addEventListener("click", ()=>{   
    
    let audio = new Audio('../assets/newgame.wav');
    audio.play();

    
    startScreen.classList.add("hide"); 
    gameScore.classList.remove("hide")
    gameScreen.classList.remove("hide")
    btnPlayAgain.classList.remove("hide")
    btnExit.classList.remove("hide")


   
    if (iptYellowPlayer.value.length !== 0){
        game.yellowPlayer = iptYellowPlayer.value;
        yellowPlayer.innerText = game.yellowPlayer;
    }else {
        game.yellowPlayer = "yellow player";
        yellowPlayer.innerText = game.yellowPlayer;
    }

    if (iptBluePlayer.value.length !== 0){
        game.bluePlayer = iptBluePlayer.value;
        bluePlayer.innerText = game.bluePlayer;
    }else {
        game.bluePlayer = "blue player";
        bluePlayer.innerText = game.bluePlayer;
    }
    
    

    game.renderBoard();
    game.setScore();
});


btnPlayAgain.addEventListener("click", ()=>{

    let audio = new Audio('../assets/newgame.wav');
    audio.play();

    document.getElementById("board").innerHTML = '';
    document.getElementById("columnEntry").innerHTML = '';
    document.getElementById("yellowBoardPieces").innerHTML = '';
    document.getElementById("blueBoardPieces").innerHTML = '';
    document.getElementById("winner").innerText = '';

    document.getElementById("yellowBoardPieces").classList.remove("hide")
    document.getElementById("blueBoardPieces").classList.remove("hide")
    yellowPlayer.classList.remove("hide")
    bluePlayer.classList.remove("hide")

    game.currPlayer = game.playerYellow;
    game.moveNumber = 0;
    game.board = [];
    game.gameOver = false;    
    game.renderBoard();
    game.setScore();
});