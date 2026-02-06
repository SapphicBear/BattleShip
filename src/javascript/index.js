import * as DOM from "./DOM.js";
import { Game } from "./Game.js";
import "../styles.css";
import { Player, CPU } from "./player.js";
import { listeners } from "./listeners.js"

console.log("Success! Javascript connected!");
const cachedDOM = DOM.cacheDOM();
// when game starts:

function startGame() {
    let game = new Game();
    game.initialize();
    DOM.renderBoard(10, game.player, cachedDOM.playerBoard);
    DOM.renderBoard(10, game.cpu, cachedDOM.cpuBoard);
    loadListener();
    return game;
}
function gameDriver(input) {
    let playerSunkShips = game.player.checkShips();
    let cpuSunkShips = game.cpu.checkShips();
    if (playerSunkShips === Player.maxShips || cpuSunkShips === CPU.maxShips) {
        game.gameOver();
        return;
    }

    DOM.removeBoard();
    game.playerTurn(input);
    game.cpuTurn();
    DOM.renderBoard(10, game.player, cachedDOM.playerBoard);
    DOM.renderBoard(10, game.cpu, cachedDOM.cpuBoard);
    loadListener();
}
function loadListener() {
    listeners.board((output) => {
        let input = game.userInput(output);
        gameDriver(input);
    });
}
let game = startGame();