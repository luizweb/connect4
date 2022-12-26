const startScreen = document.getElementById("startScreen")
const gameScreen = document.getElementById("gameScreen")
const gameScore = document.getElementById("gameScore")
const yellowPlayer = document.getElementById("yellowPlayer")
const bluePlayer = document.getElementById("bluePlayer")
const iptYellowPlayer = document.getElementById("iptYellowPlayer")
const iptBluePlayer = document.getElementById("iptBluePlayer")


const game = new Connect4();


// adicionar o event listener no botão 'START'
btnStart.addEventListener("click", ()=>{
    
    

    // start scren desapareça
    startScreen.classList.add("hide"); // adiciona uma classe para uma tag

    // mostrar o gamescore
    //gameScreen.className = "show"; // define o nome da classe para ua tag
    gameScore.classList.remove("hide")
    gameScreen.classList.remove("hide")


    // pegando os dados dos campos html e colocando na classe e no html
    game.yellowPlayer = iptYellowPlayer.value;
    yellowPlayer.innerText = game.yellowPlayer;
    
    game.bluePlayer = iptBluePlayer.value;
    bluePlayer.innerText = game.bluePlayer;

    game.renderBoard();
    game.setScore();
});