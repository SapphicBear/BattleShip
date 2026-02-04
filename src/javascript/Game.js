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
    initialize(dom, cache, listeners) {
        this.cpu.initializeBoard();
        this.player.initializeBoard();
        this.currentPlayer = this.player; // human player goes first everytime
        this.isRunning = true;
        // this.handler(dom, cache, listeners);
        
    }
    playerTurn(input) {
        let coords = this.player.getUserCoord(input);
            if (coords == false) {
                throw new Error("ERROR with player.getUserCoords");
            }
            console.log(coords)
            let result = this.cpu.board.checkGrid(coords);
            console.log(result)
            if (result == true) {
                let foundShip = this.cpu.searchForShip(coords); // ZZZ edit
                console.log(foundShip)
                foundShip.takeHit();
                // change DOM to make hit
            } else {
                console.log("Miss!");
            }
            this.currentPlayer = this.cpu;
    }
    cpuTurn() {
        let coords = this.cpu.getCoords();
            console.log(coords)
            let result = this.player.board.checkGrid(coords);
            console.log(result)
            if (result == true) {
                let foundShip = this.player.searchForShip(coords);
                console.log(foundShip)
                foundShip.takeHit();
                // change dom to keep track of hit
                
            }
            this.currentPlayer = this.player
    }
    handler(dom, cache, listeners) {
            dom.removeBoard();
            dom.renderBoard(10, this.player, cache.playerBoard);
            dom.renderBoard(10, this.cpu, cache.cpuBoard);

            if (this.currentPlayer == this.player) {
                 listeners.board((output) => {
                    this.playerTurn(this.userInput(output));
                 });
            } else {
                this.cpuTurn();
            }
            return;
    }
    gameOver() {
        // runs when one player reaches the max ships sunk
        if (this.player.sunkCount == Player.maxShips) {
            this.winner = this.cpu;
        } else {
            this.winner = this.player;
        }
        console.log(`The winner is: ${this.winner.name}! Congrats!`);
    }
};