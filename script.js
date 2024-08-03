const gameboard = (function (){
    const board = ["","","","","","","","",""];
    return { board };
})();

function createPlayer(sign) {
    let won = false;
    let round = 0;
    const getRound = () => round;
    const giveRound = () => ++round;

    return { sign, getRound, giveRound };
}

function displayRound() {
    let round = 1;
    const getRound = () => round;
    const giveRound = () => ++round;
    const reset = () => round = 1;

    return { getRound, giveRound, reset };
}

function getPlayer(player_x, player_o) {
    let player;
    if (player_x.getRound() === 0) {
        player = player_x;
    } else if (player_x.getRound() === player_o.getRound()) {
        player = player_x;
    } else {
        player = player_o;
    }
    return player;
}

function checkWinner(board, currentPlayer) {
    if ((board[0] !== "" && board[0] === board[1] && board[1] === board[2])
        || (board[3] !== "" && board[3] === board[4] && board[4] === board[5])
        || (board[6] !== "" && board[6] === board[7] && board[7] === board[8])
        || (board[0] !== "" && board[0] === board[3] && board[3] === board[6])
        || (board[1] !== "" && board[1] === board[4] && board[4] === board[7])
        || (board[2] !== "" && board[2] === board[5] && board[5] === board[8])
        || (board[0] !== "" && board[0] === board[4] && board[4] === board[8])
        || (board[2] !== "" && board[2] === board[4] && board[4] === board[6])) {
        return true;
    } else {
        return false;
    }
}

function playGame(play) {
    const player_x = createPlayer("x");
    const player_o = createPlayer("o");
    const board = gameboard.board;
    const round = displayRound();
    let player = getPlayer(player_x, player_o);
    let fields = document.querySelectorAll("td");
    let result = document.querySelector(".result");
    play.textContent = "Restart Game";

    function placeSign(event) {
        const field = event.target;
        if (board[field.dataset.id] === "") {
            board[field.dataset.id] = player.sign;
            document.querySelector(`[data-id="${field.dataset.id}"]`).textContent = player.sign;
            player.giveRound();
            round.giveRound();
            if (checkWinner(board, player)) {
                result.textContent = `Player ${player.sign} wins!`;
                endGame();
            } else if (round.getRound() > 9) {
                result.textContent = "It's a draw!";
                endGame();
            }
            player = getPlayer(player_x, player_o);
        }
    }

    function endGame() {
        fields.forEach(field => field.removeEventListener('click', placeSign));
        play.classList.toggle("inactive");
        play.addEventListener("click", restartGame, { once: true });
    }

    function restartGame() {
        fields.forEach(field => field.textContent = "");
        result.textContent = "";
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        round.reset();
        playGame(play);
    }

    fields.forEach(field => {
        field.addEventListener("click", placeSign);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    let play = document.createElement("button");
    let body = document.querySelector("body");
    play.classList.add("play");
    play.textContent = "Start Game";
    body.insertBefore(play, body.firstChild);
    play.addEventListener("click", () => {
        play.classList.toggle("inactive");
        playGame(play);
    })
});



// alles in event listener
// board mit tabellenzellen verbinden
// checken ob jemand gewonnen hat
// field aus prompt bestimmen
// placeSign aufrufen solange niemand gewonnen hat