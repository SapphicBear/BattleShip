import * as DOM from "./DOM.js";
import { Game } from "./Game.js";
import "../styles.css";
import { Player, CPU } from "./player.js";
import { listeners } from "./listeners.js"

console.log("Success! Javascript connected!");
const cachedDOM = DOM.cacheDOM();
const game = new Game();
game.initialize(DOM, cachedDOM, listeners);

function gameHandler() {
    while (game.isRunning == true) {
        // first check ship sunk
        let playerCount = game.player.checkShips();
        let cpuCount = game.cpu.checkShips();
        if (playerCount == Player.maxShips || cpuCount == CPU.maxShips) {
            game.isRunning = false;
            game.gameOver();
            // gameover handler
        } else {
            game.handler(DOM, cachedDOM, listeners);
        }
    }
}
