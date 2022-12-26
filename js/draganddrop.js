// **********************************************
// DRAG AND DROP

const dragdropYellow = document.querySelector('.dragdrop-yellow');

const entries = document.querySelectorAll('.entry'); 

// Fill listeners
dragdropYellow.addEventListener('dragstart', dragStart);
dragdropYellow.addEventListener('dragend', dragEnd);
 

// Loop through empty boxes and add listeners
for (const entry of entries) {
    entry.addEventListener('dragover', dragOver);
    entry.addEventListener('dragenter', dragEnter);
    entry.addEventListener('dragleave', dragLeave);
    entry.addEventListener('drop', dragDrop);
}

 

// Drag and Drop Functions

function dragStart(){
    //console.log(this.id)
    this.className += ' hold';
    
    setTimeout(() => (this.className = 'invisible'), 0);
    //console.log(this)
}

function dragEnd() {
    //this.className = 'dragdrop-yellow'; 
    let newYellowPiece = document.createElement("div");
    newYellowPiece.id = "yellowPiece";     
    newYellowPiece.draggable = true;           
    newYellowPiece.classList.add("dragdrop-yellow");  
    document.getElementById("yellowBoardPieces").append(newYellowPiece);

}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    this.className = 'entry';

}

function dragDrop() {
    this.className = 'entry';
    this.append(dragdropYellow);

    console.log(`Coluna jogada: ${this.id}`);
    game.setPiece(this.id);
}
