if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/piggame/' }).then(function(reg) {
        if(reg.installing) {
            console.log('Service worker installing');
        } else if(reg.waiting) {
            console.log('Service worker installed');
        } else if(reg.active) {
            console.log('Service worker active');
        }

    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}

window.addEventListener('load', function(){
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
        disableGame(random);
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

    function disableGame(random) {
        dice.classList.add("rotate-center");
        btnRoll.disabled = true;
        btnHold.disabled = true;
        dice.classList.remove("hide");
        var timeout = setTimeout(function() {
            dice.src = "dice-"+random+".png";
            if(random == 1) {
                changePlayer();
            } else  {
                var currentRound = document.querySelector("#round-"+activePlayer)
                roundScore += random;
                currentRound.textContent = roundScore
            }
            btnRoll.disabled = false;
            btnHold.disabled = false;
            dice.classList.remove("rotate-center");
        }, 300);
    }
});

function preloadImage (url) {
    try {
        var _img = new Image();
        _img.src = url;
    } catch (e) { }
}

preloadImage("dice-1.png");
preloadImage("dice-2.png");
preloadImage("dice-3.png");
preloadImage("dice-4.png");
preloadImage("dice-5.png");
preloadImage("dice-6.png");

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

