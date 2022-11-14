class Connect4 {
    constructor(){
        this.playerBlue = "B";
        this.playerYellow = "Y";
        this.currPlayer = this.playerBlue;

        this.boardRows = 6;
        this.boardColumns = 7;
        this.board = [];

        this.gameOver = false;
    }

    renderBoard(){
        for (let c = 0; c < this.boardColumns; c++) {
            let entry = document.createElement("div");
            entry.id = "c" + c.toString();                
            entry.classList.add("entry");
            
            //TODO:
            entry.addEventListener("click", ()=>this.setPiece(entry.id));
            document.getElementById("columnEntry").append(entry);
            
            //TODO: mostra o numero da coluna
            document.getElementById(entry.id).innerText = entry.id;
        }
        
        
        for (let r = 0; r < this.boardRows; r++) {
            let row = [];
            for (let c = 0; c < this.boardColumns; c++) {
                row.push(' ');
                
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();                
                tile.classList.add("tile");
                
                //TODO: mudar de click para drag and drop na coluna
                //tile.addEventListener("click", setPiece);
                document.getElementById("board").append(tile);
                
                //TODO: mostra o id de cada entrada
                document.getElementById(tile.id).innerText = tile.id
            }
            //console.log(row)
            this.board.push(row);
        }
    }

    setPiece(columnId){
        
        if (this.gameOver) {
            return;
        }
        
        let c = columnId[1];

        let rowCounter = 0

        for (let r=6-1; r > -1 ; r--){
            
            let tile = document.getElementById(r.toString() + "-" + c.toString());            
            
            if (tile.className === "tile"){
                this.board[r][c] = this.currPlayer;
                console.log(this.board);
                if (this.currPlayer === this.playerBlue) {
                    tile.classList.add("blue-piece");
                    this.currPlayer = this.playerYellow;
                    this.setScore()
                }
                else {
                    tile.classList.add("yellow-piece");
                    this.currPlayer = this.playerBlue;
                    this.setScore()
                }
                rowCounter++
                
                this.checkWinner();
                return;
            };  
                
       };
    
       //TODO: coluna cheia
       if (rowCounter === 0){
        console.log(`A coluna ${c} já está cheia. Não realizar a jogada.`);
        return;
       };
       
       

    }

    checkWinner() {
        // horizontal
        for (let r = 0; r < this.boardRows; r++) {
            for (let c = 0; c < this.boardColumns - 3; c++){
               if (this.board[r][c] != ' ') {
                    if (this.board[r][c] == this.board[r][c+1] && this.board[r][c+1] == this.board[r][c+2] && this.board[r][c+2] == this.board[r][c+3]) {
                        this.setWinner(r, c);
                        return;
                   }
               }
            }
        }
   
       // vertical
       for (let c = 0; c < this.boardColumns; c++) {
           for (let r = 0; r < this.boardRows - 3; r++) {
               if (this.board[r][c] != ' ') {
                   if (this.board[r][c] == this.board[r+1][c] && this.board[r+1][c] == this.board[r+2][c] && this.board[r+2][c] == this.board[r+3][c]) {
                        this.setWinner(r, c);
                        return;
                   }
               }
           }
       }
   
       // anti diagonal
       for (let r = 0; r < this.boardRows - 3; r++) {
           for (let c = 0; c < this.boardColumns - 3; c++) {
               if (this.board[r][c] != ' ') {
                   if (this.board[r][c] == this.board[r+1][c+1] && this.board[r+1][c+1] == this.board[r+2][c+2] && this.board[r+2][c+2] == this.board[r+3][c+3]) {
                        this.setWinner(r, c);
                        return;
                   }
               }
           }
       }
   
       // diagonal
       for (let r = 3; r < this.boardRows; r++) {
           for (let c = 0; c < this.boardColumns - 3; c++) {
               if (this.board[r][c] != ' ') {
                   if (this.board[r][c] == this.board[r-1][c+1] && this.board[r-1][c+1] == this.board[r-2][c+2] && this.board[r-2][c+2] == this.board[r-3][c+3]) {
                        this.setWinner(r, c);
                        return;
                   }
               }
           }
       }
   }
   
    setWinner(r, c) {
       let winner = document.getElementById("winner");
       if (this.board[r][c] == this.playerBlue) {
           winner.innerText = "Blue Wins";             
       } else {
           winner.innerText = "Yellow Wins";
       }
       
       //TODO: game over
       this.gameOver = true;
    }

    setScore(){
        document.getElementById("currentPlayer").innerText = this.currPlayer;
    }

}