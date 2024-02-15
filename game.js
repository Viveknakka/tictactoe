let cells = document.querySelectorAll(".cell");
let turnO = true; // true represents X, false represents O
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

cells.forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.innerText = turnO ? "X" : "O";
        turnO = !turnO;
        btn.disabled = true;
        checkWinner(); // to check winner after every step
    });
});

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
            alert("X wins the Game");
            window.location.reload();
        

        } else if (O === 3) {
            alert("O wins the Game");
            window.location.reload();
          
        } 
    }
};
const newgame=()=>{
    //window.location.reload();
}
let reset=document.querySelector("#reset-btn");
console.log(reset);
reset.onclick=newgame();
let newbtn=document.querySelector("#new-btn");
newbtn.addEventListener("click",newgame());
