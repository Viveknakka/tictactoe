let cells = document.querySelectorAll(".cell");
let resetbtn=document.querySelector("#reset");
let newbtn=document.querySelector("#new");
let winnerText=document.querySelector("#winner");
let turnO = true; // true represents X, false represents O
let array =[" "];
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let showWinner=(winner)=>{
    winnerText.style.display="block";
    winnerText.innerHTML=`Congratulations winner is ${winner}`;
}
let disableCells=()=>{
    for(let cell of cells){
        cell.disabled=true;
    }
}
let enableCells=()=>{
    for(let cell of cells){
        cell.disabled=false;
        cell.innerText="";
    }
}
let newgame=()=>{
    turnO=true;
    enableCells();
    winnerText.style.display="none";
    //console.log("newgame clicked");
}
let reset=()=>{
    enableCells();
}

const checkWinner = () => {
    for (let i = 0; i < winPatterns.length; i++) {
        let X = 0, O = 0;
        for (let j = 0; j < 3; j++) {
            let index = winPatterns[i][j];
            let txt = cells[index].innerText;

            if (txt === "X") {
                X++;
            } else if (txt === "O") {
                O++;
            }
        }
        //console.log("X=" + X + " , O=" + O);

        if (X === 3) {
           // alert("X wins the Game");
            disableCells();
            showWinner("X");
           
           // window.location.reload();
        

        } else if (O === 3) {
           // alert("O wins the Game");
            disableCells();
            showWinner("O");
          
            //window.location.reload();
          
        } 
    }
};



console.log(newbtn)
newbtn.onclick=newgame;
resetbtn.addEventListener("click",newgame);
cells.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.innerText = turnO && btn.innerHTML=="" ? "X" : "O";
        turnO = !turnO;
        btn.disabled = true;
        const index = Array.from(cells).indexOf(btn);
        const pos=index+1;
       // console.log("index"+index);
        array.push("X")
        checkWinner(); // to check winner after every step
    });
});
