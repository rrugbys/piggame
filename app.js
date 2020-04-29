
var btnRoll = document.querySelector(".btn-roll");
var btnHold = document.querySelector(".btn-hold");
var btnNew = document.querySelector(".btn-new");
var dice = document.querySelector("#dice");
var player0 = document.querySelector("#player-0");
var player1 = document.querySelector("#player-1");
var activePlayer = 0;
var roundScore = 0;
var score = [0,0];


btnNew.addEventListener("click", function() {
    btnRoll.classList.remove("hide");
    btnHold.classList.remove("hide");
    dice.classList.remove("hide");
    document.querySelector("#player-"+activePlayer).classList.add("active");
});

btnRoll.addEventListener("click", function () {
    var random = Math.ceil(Math.random()*6);
    dice.src = "dice-"+random+".png";
    dice.classList.remove("hide");
    if(random == 1) {
        changePlayer();
    } else  {
        var currentRound = document.querySelector("#round-"+activePlayer)
        roundScore += random;
        currentRound.textContent = roundScore
    }
});


btnHold.addEventListener("click", function () {
    score[activePlayer] += roundScore;
    if(score[activePlayer] >= 100) {
        alert("Player "+(activePlayer+1)+" won !");
        resetGame();
    } else {
        document.querySelector("#score-"+activePlayer).textContent = score[activePlayer];
        dice.classList.add("hide");
        changePlayer();
    }
});


function changePlayer() {
    document.querySelector("#round-"+activePlayer).textContent = 0;
    activePlayer = activePlayer === 0 ? 1:0;
    player0.classList.toggle("active");
    player1.classList.toggle("active");
    roundScore = 0;
}

function resetGame() {
    score = [0,0];
    activePlayer = 0;
    roundScore = 0;
    btnRoll.classList.add("hide");
    btnHold.classList.add("hide");
    dice.classList.add("hide");
    player0.classList.remove("active");
    player1.classList.remove("active");
    document.querySelector("#round-0").textContent = '0';
    document.querySelector("#round-1").textContent = '0';
    document.querySelector("#score-0").textContent = '0';
    document.querySelector("#score-1").textContent = '0';
}
