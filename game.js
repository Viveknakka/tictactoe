    let cells = document.querySelectorAll(".cell");
    let resetbtn=document.querySelector("#reset");
    let newbtn=document.querySelector("#new");
    let winnerText=document.querySelector("#winner");
    let turnO = true; // true represents X, false represents O
    let buffer =[];
    let temp=[];
    let undobtn=document.getElementById("undo");
    let redobtn=document.getElementById("redo");
    let count=0;
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
        count=-1;
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
        count=0;
        enableCells();
        buffer= [];
        temo= [];
        //winnerText.innerText="";
        winnerText.style.display="none";
        //console.log("newgame clicked");
    }
    let reset=()=>{
        enableCells();
    }
    let draw=()=>{
        winnerText.innerHTML="Draw match...";
        winnerText.style.display="block";
    }
    let undo = () => {
        if (buffer.length === 0 || count === -1)
            return;
        let obj = buffer.pop();
        let index = obj.index;
        let cell = cells[index];
        if (cell.innerText === "")
            return;
        count--;
        turnO = !turnO;
        cell.disabled = false;
        cell.innerText = "";
        temp.push(obj);
    };
    
    let redo = () => {
        if (temp.length === 0 || count ===-1)
            return;
        let obj = temp.pop();
        let index = obj.index;
        let text = obj.text;
        let cell = cells[index];
        if (cell.innerText !== "")
            return;
        count++;
        turnO = !turnO;
        cell.disabled = true;
        cell.innerText = text;
        buffer.push(obj);
    };
    
    const checkWinner = () => {
        let flag=false;
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
                flag=true;
            
            // window.location.reload();
            

            } else if (O === 3) {
            // alert("O wins the Game");
                disableCells();
                showWinner("O");
            flag=true;
                //window.location.reload();
            
            } 
        
        }
        if(flag == false){
            if(count === 9)
            draw();
        }
    };

    //console.log(newbtn)
    newbtn.onclick=newgame;
    resetbtn.addEventListener("click",newgame);
    undobtn.onclick=undo;
    redobtn.addEventListener("click",redo);
    cells.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.innerText = turnO && btn.innerHTML=="" ? "X" : "O";
            turnO = !turnO;
            btn.disabled = true;
            const index = Array.from(cells).indexOf(btn);
        // const pos=index;

        //console.log("index"+index);
        let obj={
            text:btn.innerText,
            index:index
        };
        //console.log(obj);
            buffer.push(obj);
        //console.log(array);
            count++;
           // console.log("buffer:"+buffer+"\ntemp"+temp);
            //console.log("\nbufferlengh:"+buffer.length+"\ntemplengh:"+temp.length);
            checkWinner(); // to check winner after every step
            
        });
    });
