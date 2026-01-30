import { Board } from "./board.js";
import { Player, CPU } from "./player.js";
import { Carrier, Cruiser, Battleship, Scout } from "./ship.js";
import "../styles.css";

console.log("Success! Javascript connected!");

const DOM = {

};

const game = {
    userInput() {
        let input = parseInt(prompt("Enter coordinates of attack! "));
        if (input == NaN) {
            return false;
        } else {
            return input.split("")
        }
    },
    initialize() {
        const player = new Player(prompt("Please enter your name: "));
        const cpu = new CPU();
        cpu.initializeBoard();
    },
    handler() {

    },
};