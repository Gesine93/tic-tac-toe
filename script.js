const gameboard = (function (){
    const board = ["","","","","","","","",""];
    return { board };
})();

function createPlayer(sign, name) {
    let round = 0;
    const getRound = () => round;
    const giveRound = () => ++round;

    return { sign, name, getRound, giveRound };
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
    let form = document.querySelector(".form");
    const player_x = createPlayer("x", "Player One");
    const player_o = createPlayer("o", "Player Two");
    const board = gameboard.board;
    const round = displayRound();
    let player = getPlayer(player_x, player_o);
    let fields = document.querySelectorAll("td");
    let result = document.querySelector("p");

    function placeSign(event) {
        const field = event.target;
        if (board[field.dataset.id] === "") {
            board[field.dataset.id] = player.sign;
            document.querySelector(`[data-id="${field.dataset.id}"]`).textContent = player.sign;
            player.giveRound();
            round.giveRound();
            if (checkWinner(board, player)) {
                result.textContent = `${player.name} wins!`;
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
        play.textContent = "Restart Game";
        form.classList.toggle("inactive");
        result.classList.toggle("inactive");
        play.addEventListener("click", restartGame, { once: true });
    }

    function restartGame() {
        fields.forEach(field => field.textContent = "");
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
    let play = document.querySelector("button");
    let form = document.querySelector(".form");
    let result = document.querySelector("p");
    play.textContent = "Start Game";
    play.addEventListener("click", () => {
        form.classList.toggle("inactive");
        result.classList.toggle("inactive");
        playGame(play);
    })
});



// alles in event listener
// board mit tabellenzellen verbinden
// checken ob jemand gewonnen hat
// field aus prompt bestimmen
// placeSign aufrufen solange niemand gewonnen hat