const gameboard = (function (){
    const board = ["","","","","","","","",""];
    return { board };
})();

function createPlayer(sign) {
    let won = false;
    let round = 0;
    const getWon = () => won;
    const giveWin = () => won = true;
    const getRound = () => round;
    const giveRound = () => ++round;

    return { sign, getWon, giveWin, getRound, giveRound };
}

function displayRound() {
    let round = 1;
    const getRound = () => round;
    const giveRound = () => ++round;

    return { getRound, giveRound };
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
        currentPlayer.giveWin();
        return true;
    } else {
        return false;
    }
}

function playGame() {
    const player_x = createPlayer("x");
    const player_o = createPlayer("o");
    const board = gameboard.board;
    const round = displayRound();
    let player = getPlayer(player_x, player_o);
    let fields = document.querySelectorAll("td");
    fields.forEach(function(field) {
        field.addEventListener("click", () => {
            if (board[field.dataset.id] === "") {
                board[field.dataset.id] = player.sign;
                document.querySelector(`[data-id="${field.dataset.id}"]`).textContent = player.sign;
                player.giveRound();
                round.giveRound();
                if (checkWinner(board, player)) {
                    console.log(`Player ${player.sign} wins!`);
                } else if (round.getRound() > 9) {
                    console.log("It's a draw!");
                }
                player = getPlayer(player_x, player_o);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    playGame();
});



// alles in event listener
// board mit tabellenzellen verbinden
// checken ob jemand gewonnen hat
// field aus prompt bestimmen
// placeSign aufrufen solange niemand gewonnen hat