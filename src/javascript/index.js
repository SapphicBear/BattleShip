import { Board } from "./board.js";
import { Player, CPU } from "./player.js";
import { Carrier, Cruiser, Battleship, Scout } from "./ship.js";
import "../styles.css";

console.log("Success! Javascript connected!");

const DOM = {

};

class Game {
    constructor() {
        this.isRunning = false;
        this.player = null;
        this.cpu = null;
        this.currentPlayer = null;
        this.winner = null; 
    }
    userInput() {
        let input = parseInt(prompt("Enter coordinates of attack! "));
        if (input == NaN) {
            return false;
        } else {
            return input.split("")
        }
    }
    initialize() {
        this.player = new Player(prompt("Please enter your name: "));
        this.cpu = new CPU();
        this.cpu.initializeBoard();
        this.player.initializeBoard();
        this.isRunning = true;
        this.currentPlayer = this.player; // human player goes first everytime
    }
    handler() {        
        while (this.isRunning) {
            let playerCount = this.player.checkShips();
            let cpuCount = this.cpu.checkShips();
            if (playerCount === Player.maxShips || cpuCount === CPU.maxShips) {
                this.isRunning = false;
                this.gameOver();
                // gameover handler
                break;
            }
            // Listeners for board start
            // DOM draw field / update field
            if (this.currentPlayer == this.player) {
                let coords = this.player.getCoords(this.userInput());
                let result = this.cpu.board.checkGrid(coords);
                if (result) {
                    let foundShip = this.cpu.searchForShip([coords]);
                    foundShip.takeHit();
                    // change DOM to make hit
                }
                this.currentPlayer = this.cpu;
                continue;
            } else {
                let coords = this.cpu.getCoords();
                let result = this.player.board.checkGrid(coords);
                if (result) {
                    let foundShip = this.player.searchForShip([coords]);
                    foundShip.takeHit();
                    // change dom to keep track of hit
                }
                this.currentPlayer = this.player;
                continue;
            }
        }
    }
    gameOver() {
        // runs when one player reaches the max ships sunk
        if (this.player.sunkCount == Player.maxShips) {
            this.winner = this.cpu;
        } else {
            this.winner = this.player;
        }
        console.log(`The winner is: ${this.winner}! Congrats!`);
    }
};