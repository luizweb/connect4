

const rows = 6;
const columns = 7;

const arrGame = [];

for(let l=0; l < rows; l++){
    let arrRows = [];
    for(let c=0; c < columns; c++){
        arrRows.push(0);
    };
    arrGame.push(arrRows);
    arrRows = [];
};

// JOGADAS -----------------------------------------------
// 1 - ficha amarela
// 2 - ficha azul
function recebeFicha(coluna, ficha){ 
    
    let counter = 0

    for (let i=arrGame.length-1; i > -1 ; i--){
        if (arrGame[i][coluna] === 0){
            arrGame[i][coluna] = ficha; 
            counter++
            return;
        };       
   };

   if (counter === 0){
    console.log(`A coluna ${coluna} já está cheia. Não realizar a jogada.`)
   };
}


// jogando fichas amarelas
//recebeFicha(3,1);

// jogando fichas azuis
//recebeFicha(3,2);

// -------------------------------------------------------


// array do jogo
console.log("   0,1,2,3,4,5,6")
console.log("----------------")
arrGame.forEach((element, index)=>{    
    console.log(`${index}| ${element}`);
});
console.log("----------------")
console.log("                ")



function checkConnect4(row, column, sense, array){
    for(let i=0; i < array.length - 3; i++){ // array.length - 3 --> número de possibilidades

        if (array.slice(i,i+4).every(e => e === 1)){ // fichas amarelas
            if (sense === "h"){
                console.log(`l:${row} - c:${i} - fichas amarelas(1) ligaram 4 na horizontal!`);
            }
            if (sense === "v"){
                console.log(`c:${column} - l:${i} - fichas amarelas(1) ligaram 4 na vertical!`);
            }
            if (sense === "d1"){
                console.log(`c:${column} - l:${row} - fichas amarelas(1) ligaram 4 na diagonal (esq para dir)`);
            }
            if (sense === "d2"){
                console.log(`c:${column} - l:${row} - fichas amarelas(1) ligaram 4 na diagonal (dir para esq)`);
            }
        };
        
        if (array.slice(i,i+4).every(e => e === 2)){ // fichas azuis
            if (sense === "h"){
                console.log(`l:${row} - c:${i} - fichas azuis(2) ligaram 4 na horizontal!`);
            }
            if (sense === "v"){
                console.log(`c:${column} - l:${i} - fichas azuis(2) ligaram 4 na vertical!`);
            }
            if (sense === "d1"){
                console.log(`c:${column} - l:${row} - fichas azuis(2) ligaram 4 na diagonal!`);
            }
        };

    };
}



// verificação horizontal
for (let r=0; r < arrGame.length; r++){
    checkConnect4(r, 0, "h", arrGame[r]);    
};

// verificação vertical
let arrColumn = []
for(let c=0; c < columns; c++){
    for(let l=0; l < arrGame.length; l++){
        arrColumn.push(arrGame[l][c]); 
    };
    
    checkConnect4(0, c, "v", arrColumn); 
    arrColumn = [];
}

/*
// verificação diagonal neste sentido -> \
//[0][0],[1][1],[2][2],[3][3]    0
//[0][1],[1][2],[2][3],[3][4]
//[0][2],[1][3],[2][4],[3][5]
//[0][3],[1][4],[2][5],[3][6]

//[1][0],[2][1],[3][2],[4][3]    1
//[1][1],[2][2],[3][3],[4][4]
//[1][2],[2][3],[3][4],[4][5]
//[1][3],[2][4],[3][5],[4][6]

//[2][0],[3][1],[4][2],[5][3]    2
//[2][1],[3][2],[4][3],[5][4]
//[2][2],[3][3],[4][4],[5][5]
//[2][3],[3][4],[4][5],[5][6]
*/


for(let r=0; r < arrGame.length-3; r++){ // linhas -3 
    let line = r;
    for(let c=0; c < columns - 3;c++){ //colunas - 3
        let arrDiagonal = []
        for(let i=0; i < 4; i++){ // formar array de tamanho 4
            let column = i+c
            arrDiagonal.push(arrGame[line][column]);
            line++;
        };
        checkConnect4(r, c, "d1", arrDiagonal); 
        line = 0 + r; 
    };
};




// verificação diagonal neste sentido -> /
for(let r=0; r < arrGame.length - 3; r++){ // linhas -3 
    let line = r;
    
    for(let c=columns-1; c >= columns - (columns - 3);c--){ // tentativas possíveis colunas - 3
        let arrDiagonal = []
        for(let i=0; i < 4; i++){ // formar array de tamanho 4
            let column = c-i
            arrDiagonal.push(arrGame[line][column]);
            line++;
        }
        //console.log(`${c} - ${arrDiagonal}`);
        checkConnect4(r, c, "d2", arrDiagonal); 
        line = 0 + r; 
    }
};