import { Player, CPU } from "./player.js";

export class Game {
    constructor() {
        this.player = new Player(prompt("Please enter your name: "));
        this.cpu = new CPU();
        this.isRunning = false;
        this.currentPlayer = null;
        this.winner = null; 
        
    }
    userInput(input) {
        let coords = input.split("")
        return coords;
    }
    initialize() {
        this.cpu.initializeBoard();
        this.player.initializeBoard();
        this.currentPlayer = this.player; // human player goes first everytime
        // this.isRunning = true;
        
    }
    playerTurn(input) {
        let coords = this.player.getUserCoord(input);
            if (coords == false) {
                throw new Error("ERROR with player.getUserCoords");
            }
            let result = this.cpu.board.checkGrid(coords);
            if (result == true) {
                let foundShip = this.cpu.searchForShip(coords); // ZZZ edit
                foundShip.takeHit();
                this.currentPlayer = this.cpu;
                return `HIT: Player hit ship at location: ${+coords[1] + 1}, ${+coords[0] + 1}!`
                // change DOM to make hit
            } else {
                this.currentPlayer = this.cpu;
                return "Miss!";
            }
            
    }
    cpuTurn() {
        let coords = this.cpu.getCoords();
            let result = this.player.board.checkGrid(coords);
            if (result == true) {
                let foundShip = this.player.searchForShip(coords);
                foundShip.takeHit();
                this.currentPlayer = this.player;
                return `HIT: CPU hit ship at location: ${+coords[1] + 1}, ${+coords[0] + 1}!`
                
            } else {
                this.currentPlayer = this.player;
                return "Miss!";
            }
            
    }
    gameOver() {
        // runs when one player reaches the max ships sunk
        if (this.player.sunkCount == Player.maxShips) {
            this.winner = this.cpu;
        } else {
            this.winner = this.player;
        }
        this.isRunning = false;
        return `The winner is: ${this.winner.name}! Congrats!`;
    }
};