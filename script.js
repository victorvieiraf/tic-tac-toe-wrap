{
    var win_conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
        [0,5,7], //These last four conditions allows wrapping.
        [1,3,8], //Removing them will turn the game into
        [2,3,7], //normal tic-tac-toe.
        [1,5,6]  //
    ];

    var reds = [];
    var blues = [];
}

function reset(){
    document.body.style.backgroundImage = "url('background.png')";
    turn = 0; // 0=Red 1=Blue
    reds = [];
    blues = [];
    document.getElementById("container").innerHTML = setup();
    var winner = document.getElementById("winner");
    winner.innerText = "";
    winner.setAttribute("class","");
    
    addClick();
    
}

function setup(){
    var empty_game = "";
        for (var i = 0; i < 9; i++){
            var empty_obj = "";
            empty_obj += '<div class="box empty">'+i+'</div>'
            empty_game += empty_obj
        }
    return empty_game
    }

function addClick(){
    var boxes = document.getElementById("container").children;  
    for (let i = 0; i < 9; i++) {
        boxes[i].addEventListener("click",changecolor);
    }
}

function changecolor(){
    //changes color of an empty space
    if (this.getAttribute("class") == "box empty") {
        if (turn % 2 == 0) {
            this.setAttribute("class","box red")
            reds.push(this.innerText)
        }
        else {
            this.setAttribute("class","box blue")
            blues.push(this.innerText)
        }
        checkWinConditions();
        turn += 1;
    }
}

function checkWinConditions() {
    if (reds.length >= 3 || blues.length >= 3){
        for (var i = 0;i<win_conditions.length;i++){
            var win = win_conditions[i];
            var c1 = reds.includes(win[0]+"");
            var c2 = reds.includes(win[1]+"");
            var c3 = reds.includes(win[2]+"");
            if (c1 && c2 && c3){
                console.log("red wins");
                var boxes = document.getElementById("container");
                boxes.children[win[0]].setAttribute("class","box win");
                boxes.children[win[1]].setAttribute("class","box win");
                boxes.children[win[2]].setAttribute("class","box win");
                red_win();
                break
            }

            var c1 = blues.includes(win[0]+"");
            var c2 = blues.includes(win[1]+"");
            var c3 = blues.includes(win[2]+"");
            if (c1 && c2 && c3){
                console.log("blues wins");
                var boxes = document.getElementById("container");
                boxes.children[win[0]].setAttribute("class","box win");
                boxes.children[win[1]].setAttribute("class","box win");
                boxes.children[win[2]].setAttribute("class","box win");
                blue_win();
                break
            }
        }
    }

}

function red_win(){
    document.body.style.backgroundImage = "url('red_win.png')";
    var winner = document.getElementById("winner")
    winner.innerText = "Red wins"
    winner.setAttribute("class","red_win")
    disableBlocks();
}

function blue_win(){
    document.body.style.backgroundImage = "url('blue_win.png')";
    var winner = document.getElementById("winner")
    winner.innerText = "Blue wins"
    winner.setAttribute("class","blue_win")
    disableBlocks();
}

function disableBlocks() {
    var container = document.getElementById("container")
    for (var i = 0; i < 9; i++){
        var block = container.children[i];
        if (block.getAttribute("class") == "box empty") {

            console.log(block);
            block.setAttribute("class","box blocked");
        }
    }
}