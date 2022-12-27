class Connect4 {
    
    constructor(){
        this.playerBlue = "B";
        this.playerYellow = "Y";
        this.currPlayer = this.playerYellow;

        this.yellowPlayer = "";
        this.bluePlayer = "";

        this.moveNumber = 0;

        this.boardRows = 6;
        this.boardColumns = 7;
        this.board = [];

        this.gameOver = false;
    }

    renderBoard(){
        
        //colunas de entrada das peças
        for (let c = 0; c < this.boardColumns; c++) {
            let entry = document.createElement("div");
            entry.id = "c" + c.toString();                
            entry.classList.add("entry");
            // add drag and drop listeners
            entry.addEventListener('dragover', this.dragOver);
            entry.addEventListener('dragenter', this.dragEnter);
            entry.addEventListener('dragleave', this.dragLeave);
            entry.addEventListener('drop', this.dragDrop);
            
            //mudança de click para drag and drop na coluna
            //entry.addEventListener("click", ()=>this.setMove(entry.id));
            document.getElementById("columnEntry").append(entry);
            
            //TODO: mostra o numero da coluna
            //document.getElementById(entry.id).innerText = entry.id;
        }
        
        // set first player piece
        this.setPiece(this.currPlayer); 
            

        //montagem do tabuleiro        
        //linhas
        for (let r = 0; r < this.boardRows; r++) {
            let row = [];
            
            //colunas
            for (let c = 0; c < this.boardColumns; c++) {
                row.push(' ');
                
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();                
                tile.classList.add("tile");
                
                //mudança de click para drag and drop na coluna
                //tile.addEventListener("click", setMove);
                document.getElementById("board").append(tile);
                
                //TODO: mostra o id de cada entrada
                //document.getElementById(tile.id).innerText = tile.id
            }
            //console.log(row)
            this.board.push(row);
        }
    }

    setPiece(color){        
        if (color === this.playerYellow){
            let newYellowPiece = document.createElement("div");
            newYellowPiece.id = "yellowPiece";     
            newYellowPiece.draggable = true;           
            newYellowPiece.classList.add("dragdrop-yellow");  
            newYellowPiece.addEventListener('dragstart', this.dragStart);
            newYellowPiece.addEventListener('dragend', this.dragEnd);
            document.getElementById("yellowBoardPieces").append(newYellowPiece);
        }
        
        if (color === this.playerBlue){
            let newBluePiece = document.createElement("div");
            newBluePiece.id = "bluePiece";     
            newBluePiece.draggable = true;           
            newBluePiece.classList.add("dragdrop-blue");  
            newBluePiece.addEventListener('dragstart', this.dragStart);
            newBluePiece.addEventListener('dragend', this.dragEnd);
            document.getElementById("blueBoardPieces").append(newBluePiece);
        }        
    }
    
    dragStart(){
        console.log(this.id)
        this.className += ' hold';
        
        setTimeout(() => (this.className = 'invisible'), 0);
    }

    dragEnd() {                
        if ((this.id === "yellowPiece") && (document.getElementById("yellowBoardPieces").childElementCount === 1)){
            this.className = 'dragdrop-yellow';
        }
        if ((this.id === "bluePiece") && (document.getElementById("blueBoardPieces").childElementCount === 1)){
            
            this.className = 'dragdrop-blue';
        }        
    }

    dragOver(e) {
        e.preventDefault();
    }

    dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
    }

    dragLeave() {
        this.className = 'entry';    
    }

    dragDrop() {
        this.className = 'entry';
            
        console.log(`Coluna jogada: ${this.id}`);
        game.setMove(this.id);
    }




    
    setMove(columnId){
        
        if (this.gameOver) {
            return;
        }

        let audio = new Audio('../assets/piecedrop.wav');
        audio.play();

        this.moveNumber+=1;
        
        let c = columnId[1]; // retirando do 'c' do nome da coluna (c3 -> 3)
              
        for (let r=6-1; r > -1 ; r--){
            
            let tile = document.getElementById(r.toString() + "-" + c.toString());  
                      
            
            if (tile.className === "tile"){
                this.board[r][c] = this.currPlayer;
                
                // mostra o array do tabuleiro no console
                console.log(this.board);
                
                // posiciona a peça jogada e altera o jogador
                if (this.currPlayer === this.playerBlue) {                                   

                    this.setDropingPieceEffect(r,c,"blue-piece");

                    //tile.classList.add("blue-piece");
                    this.currPlayer = this.playerYellow;
                    this.setScore()
                }
                else {
                    
                    this.setDropingPieceEffect(r,c,"yellow-piece");
                    
                    //tile.classList.add("yellow-piece");
                    this.currPlayer = this.playerBlue;
                    this.setScore()
                }
                
                
                // verifica se a coluna está cheia
                if (r === 0){
                    console.log(`A coluna ${c} já está cheia!`);
                    const columnEntry = document.getElementById("c"+c.toString());                 

                    const fullEntry = document.createElement("div");
                    fullEntry.id = "c" + c.toString();   
                    fullEntry.className = "full";
                    fullEntry.style.cursor = "no-drop"                
                    

                    const parentDiv = columnEntry.parentNode;                  
                    parentDiv.replaceChild(fullEntry, columnEntry);
                    
                }

                this.checkWinner();
                return;
            };  
                
       };
       

    }

    setDropingPieceEffect(r, c, color){
        let count = 0
        const velocity = 50

        const nIntervId = setInterval(()=>{

            for (let i=0; i<r; i++){
                let dropingTile = document.getElementById(i.toString() + "-" + c.toString());
                dropingTile.classList.remove(color)
            }
            document.getElementById(count.toString() + "-" + c.toString()).classList.add(color)
            count+=1;            
            if (count === (r+1)){
                clearInterval(nIntervId)
            }            
        },velocity);   
        
    }

    checkWinner() {
        
        if (this.moveNumber === (this.boardRows * this.boardColumns)){
            //console.log("JOGO EMPATOU");
            this.setWinner(0, 0);            
        }
        
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
       
        //play sound
        let audio = new Audio('../assets/gamewin.wav');
        audio.play();
        
        document.getElementById("yellowBoardPieces").classList.add("hide");
        document.getElementById("blueBoardPieces").classList.add("hide");
        document.getElementById("yellowPlayer").classList.add("hide");
        document.getElementById("bluePlayer").classList.add("hide");
       
        let winner = document.getElementById("winner");
        if (this.board[r][c] == this.playerBlue) {
            winner.innerText = this.bluePlayer + " | Blue Wins! ";             
        } else {
            winner.innerText = this.yellowPlayer + " | Yellow Wins! ";
        }

        if ((r === 0) && (c === 0)){
            winner.innerText = "The game tied!";
        }
         
        //TODO: game over
        this.gameOver = true;
    }

    
    setScore(){
        // número de jogadas
        document.getElementById("moveNumber").innerText = 'Moves: ' + this.moveNumber;
        
        
        // mudança de jogador
        if (this.currPlayer === this.playerBlue){
            document.getElementById("blueBoardPieces").classList.add("turn")
            document.getElementById("yellowBoardPieces").classList.remove("turn")
                        
            this.setPiece(this.playerYellow);
            
            document.getElementById("yellowBoardPieces").lastChild.draggable = false
            document.getElementById("blueBoardPieces").lastChild.draggable = true
            
            
            document.getElementById("yellowBoardPieces").lastChild.style.cursor = "no-drop"
            document.getElementById("blueBoardPieces").lastChild.style.cursor = "pointer"
                  
        }

        if (this.currPlayer === this.playerYellow){
            document.getElementById("yellowBoardPieces").classList.add("turn")
            document.getElementById("blueBoardPieces").classList.remove("turn")
           
            this.setPiece(this.playerBlue); 

            document.getElementById("blueBoardPieces").lastChild.draggable = false
            document.getElementById("yellowBoardPieces").lastChild.draggable = true

            document.getElementById("blueBoardPieces").lastChild.style.cursor = "no-drop"
            document.getElementById("yellowBoardPieces").lastChild.style.cursor = "pointer"

        }

        

    }



}