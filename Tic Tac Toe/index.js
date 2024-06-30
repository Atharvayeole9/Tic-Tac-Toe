
//constants
let turn = "red";
let lastPainttime = 0;
let time = 9;
let gameover = "false";
let pause = "false";

// data
function Square(id) {
    return { id: id }    // i could also write color:color instead of color . enhanced object literals.
}

function SquareRow(RowId) {
    const SquareRow = [];
    const abcd = ['a', 'b', 'c'];
    abcd.forEach((element, index) => {
        SquareRow.push(Square(element + RowId));   //green
    });
    return SquareRow;
}

function initboard(){
    console.log("initboard");
    const board = [];
    for(let i=1; i<=3; i++){
        board.push(SquareRow(i));
    }
    return board;
}

//render
const root_div = document.getElementById("board");

 function initBoardRender(data) {
    console.log("initboardRender");
    data.forEach(element => {
        const rowDiv = document.createElement("div")
        rowDiv.classList.add("rowDiv")
        element.forEach(square => {
            const squareDiv = document.createElement("div")
            squareDiv.classList.add("square")
            squareDiv.id = square.id
            rowDiv.appendChild(squareDiv)
        });
        console.log(rowDiv);
        root_div.appendChild(rowDiv)
    });
    //console.log(globalstate);
}

// ui
const globalstate = initboard();
console.log("start");
initBoardRender(globalstate);
timergradient();
Globalevent();
window.requestAnimationFrame(main);

//events
function Globalevent(){
    root_div.addEventListener("click",clickEvent);
    const button = document.getElementById("resetbutton");
    button.addEventListener("click",reset);
}

//animation function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPainttime)/1000 <1){
        return;
    }
    lastPainttime=ctime;

    timergradient();
    displayWin();
    displayturn();

    if(pause=="false"){
        time--;
        if(time>=0){
            const tensspan = document.getElementById("tens");
            const unitsspan = document.getElementById("units");
            tensspan.innerHTML = (time-time%10)/10;
            unitsspan.innerHTML = time%10;
        }
        else{
            timelost();
        }
    }
}

//functions
function clickEvent(e){
    //console.log("clickEvent");
    //console.log(e.target.localName);
    if(e.target.localName==="div" && pause=="false"){
        //console.log("iamhere");
        if(turn=="red" &&  e.target.innerHTML == ""){
            e.target.innerHTML = "X";
            e.target.style.color = "orangered"
            turn = "blue"
            time = 9;
        }
        else if(turn=="blue" &&  e.target.innerHTML == ""){
            e.target.innerHTML = "O";
            e.target.style.color = "blue"
            turn = "red"
            time = 9;
        }
    }
}

function reset(){
    const reqdiv = document.getElementById("result");
    reqdiv.innerHTML = "";
    const abcd = ['a', 'b', 'c'];
    abcd.forEach((element) => {
        for(let i=1; i<=3; i++){
            const reqdiv = document.getElementById(element + i);
            reqdiv.innerHTML = ""
        }
    })
    turn="red";
    pause = "false";
    time=9;
}

function checkWin(){
    const symbol = ['X','O'];
    const abcd = ['a', 'b', 'c'];
    let value = 'a';
    symbol.forEach((element) => {
        abcd.forEach((element1) => {
            let win=0;
            for(let i=1; i<=3; i++){
                const reqdiv = document.getElementById(element1 + i);
                if(reqdiv.innerHTML == element){
                    win++;
                }
            }
            if(win==3){
                //console.log("displaywin1");
                value = element;
            }
        })
    });
    symbol.forEach((element) => {
        for(let i=1; i<=3; i++){
            let win=0;
            abcd.forEach((element1) => {
                const reqdiv = document.getElementById(element1 + i);
                if(reqdiv.innerHTML == element){
                    win++;
                }
            })
            if(win==3){
                console.log(element);
                value = element;
            }
        }
    });
    symbol.forEach((element) => {
        let win=0;
        abcd.forEach((element1,index) => {
            const reqdiv = document.getElementById(element1 + Number(Number(index)+1));
            if(reqdiv.innerHTML == element){
                win++;
            }
        })
        if(win==3){
            value = element;
        }
    });
    symbol.forEach((element) => {
        let win=0;
        abcd.forEach((element1,index) => {
            const reqdiv = document.getElementById(element1 + Number(3-Number(index)));
            if(reqdiv.innerHTML == element){
                win++;
            }
        })
        if(win==3){
            value = element;
        }
    });
   return value;
}

function displayWin(){
    if(checkWin()!='a'){
        console.log("displayWin");
        autopause();
        const reqdiv = document.getElementById("result");
        let colour = '';
        if(checkWin()=='X'){
            colour = "Red";
        }
        else{
            colour = "Blue";
        }
        reqdiv.innerHTML= colour + " won";
    }
       
}

function autopause(){
    pause="true";
    console.log(pause);
}

function timelost(){
    autopause();
    if(turn=="red"){
        const reqdiv = document.getElementById("result");
        reqdiv.innerHTML = "Blue won";
    }
    else{
        const reqdiv = document.getElementById("result");
        reqdiv.innerHTML = "Red won";
    }
}

function displayturn(){
    if(turn=="red"){
        const reqdiv = document.getElementById("turn");
        reqdiv.innerHTML = "TURN : Red ";
        reqdiv.style.color = "red";
    }
    else{
        const reqdiv = document.getElementById("turn");
        reqdiv.innerHTML = "TURN : Blue ";
        reqdiv.style.color = "blue";
    }
}

function timergradient(){
    if(turn == "red"){
        const reqdiv = document.getElementById("timer");
        reqdiv.style.backgroundImage = "linear-gradient(red,black)"
    }
    else{
        const reqdiv = document.getElementById("timer");
        reqdiv.style.backgroundImage = "linear-gradient(blue,rgba(46, 44, 44, 0.133))"
    }
}

