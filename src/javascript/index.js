import * as DOM from "./DOM.js";
import { Game } from "./Game.js";
import "../styles.css";
import { Player, CPU } from "./player.js";
import { listeners } from "./listeners.js"

function drawSiteDefault() {
    DOM.removeBoard();
    let default1 = new Player("default");
    let default2 = new CPU();
    DOM.renderBoard(10, default1, cachedDOM.playerBoard);
    DOM.renderBoard(10, default2, cachedDOM.cpuBoard);
    cachedDOM.cpuBoard.classList.add("inactive");
    cachedDOM.playerBoard.classList.add("inactive");
    DOM.printLog("Start a new game!");
    DOM.printScores("", "", cachedDOM);
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
    DOM.printScores(0, 0, cachedDOM)
    loadListener();
    return game;
}
function gameDriver(input) {
    DOM.removeBoard();
    let playerTurn = game.playerTurn(input);
    let cpuTurn = game.cpuTurn();
    DOM.renderBoard(10, game.player, cachedDOM.playerBoard);
    DOM.renderBoard(10, game.cpu, cachedDOM.cpuBoard);
    DOM.printScores(game.cpu.checkShips(), game.player.checkShips(), cachedDOM);
    DOM.printLog(playerTurn);
    DOM.printLog(cpuTurn);
    
    let playerSunkShips = game.player.checkShips();
    let cpuSunkShips = game.cpu.checkShips();
    if (playerSunkShips === Player.maxShips || cpuSunkShips === CPU.maxShips) {
        DOM.printLog(game.gameOver());
        return;
    }
    
    loadListener();
}
function loadListener() {
    listeners.board((output) => {
        game.isRunning = true;
        let input = game.userInput(output);
        gameDriver(input);
    });
}

//
console.log("Success! Javascript connected!");
let game;
const cachedDOM = DOM.cacheDOM();
drawSiteDefault();
listeners.resetButton(() => {
    if (game && game.isRunning == false) {
        game.player.initializeBoard();
        DOM.removeBoard();
        DOM.renderBoard(10, game.player, cachedDOM.playerBoard);
        DOM.renderBoard(10, game.cpu, cachedDOM.cpuBoard);
    } else {
        return;
    }
    loadListener();

});
listeners.startButton(() => {
    game = startGame();
    DOM.clearLog();
});