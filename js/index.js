const startScreen = document.getElementById("startScreen")
const gameScreen = document.getElementById("gameScreen")
const gameScore = document.getElementById("gameScore")
const yellowPlayer = document.getElementById("yellowPlayer")
const bluePlayer = document.getElementById("bluePlayer")
const iptYellowPlayer = document.getElementById("iptYellowPlayer")
const iptBluePlayer = document.getElementById("iptBluePlayer")
const btnPlayAgain = document.getElementById("btnPlayAgain")
const btnExit = document.getElementById("btnExit")

const game = new Connect4();


// adicionar o event listener no botão 'START'
btnStart.addEventListener("click", ()=>{
    
    

    // start scren desapareça
    startScreen.classList.add("hide"); // adiciona uma classe para uma tag

    // mostrar o gamescore
    //gameScreen.className = "show"; // define o nome da classe para ua tag
    gameScore.classList.remove("hide")
    gameScreen.classList.remove("hide")
    btnPlayAgain.classList.remove("hide")
    btnExit.classList.remove("hide")


    // pegando os dados dos campos html e colocando na classe e no html
    game.yellowPlayer = iptYellowPlayer.value;
    yellowPlayer.innerText = game.yellowPlayer;
    
    game.bluePlayer = iptBluePlayer.value;
    bluePlayer.innerText = game.bluePlayer;

    game.renderBoard();
    game.setScore();
});


btnPlayAgain.addEventListener("click", ()=>{
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
})