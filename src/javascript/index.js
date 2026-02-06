import * as DOM from "./DOM.js";
import { Game } from "./Game.js";
import "../styles.css";
import { Player, CPU } from "./player.js";
import { listeners } from "./listeners.js"

function drawSiteDefault() {
    let default1 = new Player("default");
    let default2 = new CPU();
    DOM.renderBoard(10, default1, cachedDOM.playerBoard);
    DOM.renderBoard(10, default2, cachedDOM.cpuBoard);
    cachedDOM.cpuBoard.classList.add("inactive");
    cachedDOM.playerBoard.classList.add("inactive");
}
// when game starts:

function startGame() {
    cachedDOM.cpuBoard.classList.remove("inactive");
    cachedDOM.playerBoard.classList.remove("inactive");
    DOM.removeBoard();
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

//
console.log("Success! Javascript connected!");
const cachedDOM = DOM.cacheDOM();
drawSiteDefault();
// let game = startGame();