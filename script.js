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

    return { getRound, giveRound }
}

function placeSign(player, field, board, round) {
    board[field] = player.sign;
    player.giveRound();
    round.giveRound();
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

function getField(board) {
    let field;
    while (true) {
        field = parseInt(prompt("In which field do you want to place your sign?"));
        if (board[field] === "") {
            return field;
        } else {
            alert("Field already taken, please choose another field.");
        }
    }
}

function playGame() {
    const player_x = createPlayer("x");
    const player_o = createPlayer("o");
    const board = gameboard.board;
    const round = displayRound();
    let player;
    let field;

    while (round.getRound() <= 9) {
        player = getPlayer(player_x, player_o);
        field = getField(board);
        placeSign(player, field, board, round);

        if (checkWinner(board, player)) {
            alert(`Player ${player.sign} wins!`);
            break;
        }

        if (round.getRound() > 9) {
            alert("It's a draw!");
            break;
        }
    }
}

playGame();



// checken ob jemand gewonnen hat
// field aus prompt bestimmen
// placeSign aufrufen solange niemand gewonnen hat