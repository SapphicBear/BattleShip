import { Player, CPU } from "./player.js";
export class Game {
    constructor() {
        this.player = new Player(prompt("Please enter your name: "));
        this.cpu = new CPU();
        this.isRunning = false;
        this.currentPlayer = null;
        this.winner = null; 

        this.initialize();
        
    }
    userInput() {
        let input = prompt("Enter coordinates of attack! ");
        let coords = input.split(",")
        return coords;
    }
    initialize() {
        this.cpu.initializeBoard();
        this.player.initializeBoard();
        this.isRunning = true;
        this.currentPlayer = this.player; // human player goes first everytime
        this.handler();
    }
    handler() {        
        while (this.isRunning) {
            // first check ship sunk
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
                let coords = this.player.getUserCoord(this.userInput());
                if (coords == false) {
                    throw new Error("ERROR with player.getUserCoords");
                }
                console.log(coords)
                let result = this.cpu.board.checkGrid(coords);
                if (result == true) {
                    let foundShip = this.cpu.searchForShip([coords]);
                    foundShip.takeHit();
                    // change DOM to make hit
                }
                this.currentPlayer = this.cpu;
                continue;
            } else {
                let coords = this.cpu.getCoords();
                let result = this.player.board.checkGrid(coords);
                if (result == true) {
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