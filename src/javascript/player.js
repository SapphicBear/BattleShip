import {Board} from "./board.js"
import { Battleship, Carrier, Cruiser, Scout } from "./ship.js";
export class Player {
    static maxShips = 10;
    static maxScouts = 4;
    static maxCruisers = 3;
    static maxBattleships = 2;
    static maxCarriers = 1;
    
    ships = {};
    isCPU = false;
    board = new Board();
    previewBoard;
    totalShips = Object.keys(this.ships).length;
    sunk = new Set();

    constructor(name) {
        this.name = name;
    }
    getUserCoord(array) {
        if (array.length > 2) {
            let coords = [];
            let firstPlace = array[0];
            coords.push(firstPlace)
            array.forEach((item) => {
                if (item[0] == firstPlace[0] + 1 || item[0] == firstPlace[0] - 1 || item[1] == firstPlace[1] + 1 || item[1] == firstPlace[1] - 1) {
                    coords.push(item);
                    firstPlace = item;
                } else {
                    return false;
                }
            });
            return coords;
        } else {
            if (array[0] > 9 || array[1] > 9 || array[0] < 0 || array[1] < 0) {
                return false;
            } else {
                return array;
            }
        }
    }

    placeShip(ship) {
        // check if the player has placed the max amount of ships
        this.previewBoard = new Board();
        if (this.totalShips >= Player.maxShips) {
            return false;
        }
        this.ships[ship.name] = ship;
        this.previewBoard.setShip(ship.location, ship.size);

        return true;
    }

    finalPlace() {
        let ships = Object.values(this.ships);
        for (let i = 0; i < ships.length; i++) {
            this.board.setShip(ships[i].location, ships[i].size)
        }
        return true;
    }


    getMoveMult() {
        return Math.floor(Math.random() * 20);
    }
    getCoords() {
        // return two numbers between 0 and 9 and save to coordinates
        const row = Math.floor(Math.random() * Board.gridSize - 1);
        const col = Math.floor(Math.random() * Board.gridSize - 1);
        return [row, col];
    }
    getShipCoords(size) {
        if (size == 1) {
            return this.getCoords();
        } else {
            let initialCoord = this.getCoords();
            let coords = [];
            coords.push(initialCoord);
            let direction = 0; // 0 is up and down, 1 is left to right
            let moveMult = this.getMoveMult();
            let randomNum = Math.floor(Math.random() * 10);
                if (moveMult % 2 == 0) {
                    direction = 0;
                } else {
                    direction = 1;
                }
                let [row, col] = initialCoord;
                if (direction == 0) {
                    for (let i = 0; i < size - 1; i++) {
                        if (randomNum <= 5) {
                            coords.push([row + 1, col]);
                            row += 1;
                        } else {
                            coords.push([row - 1, col]);
                            row -= 1;        
                        }
                    } 
                } else if (direction == 1) {
                    for (let i = 0; i < size - 1; i++) {
                        if (randomNum <= 5) {
                            coords.push([row, col + 1]);
                            col += 1;
                        } else {
                            coords.push([row, col - 1]);
                            col -= 1;
                        }
                    }
                }
                return coords;
        }
    }

    initializeBoard() {
        let count = 0;
        while (count < Player.maxShips) {
            while (true) {
            let coords = this.getShipCoords(4);
            let carrier = this.board.setShip(coords, 4);
            if (carrier == true) {
                this.ships.carrier = new Carrier(coords);
                count++;
                break;
            } else {
                continue;
            }
        }   
            for (let i = 0; i < Player.maxBattleships;) {
                let coords = this.getShipCoords(3);
                let battleship = this.board.setShip(coords, 3);
                if (battleship == true) {
                    count++;
                    i++;
                    this.ships[`Battleship${i}`] = new Battleship(coords);
                } else {
                    continue;
                }
            }

            for (let i = 0; i < Player.maxCruisers;) {
                let coords = this.getShipCoords(2);
                let cruiser = this.board.setShip(coords, 2);
                if (cruiser == true) {
                    this.ships[`Cruiser${i}`] = new Cruiser(coords)
                    count++; 
                    i++;
                } else {
                    continue;
                }
            }
            for (let i = 0; i < Player.maxScouts;) {
                let coords = this.getShipCoords(1);
                let scout = this.board.setShip(coords, 1);
                if (scout == true) {
                    this.ships[`Scout${i}`] = new Scout([coords])
                    count++;
                    i++;
                } else {
                    continue;
                }
            }
        }
        return true;
    }

    searchForShip(coords) {
        let ships = Object.values(this.ships);
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].location.length > 1) {
                for (let j = 0; j < ships[i].location.length; j++) {
                let ship = ships[i].location[j];
                if (ship[0] == coords[0] && ship[1] == coords[1]) {
                    return ships[i];
                } else {
                    continue;
                }
                }
            } else {
                let ship = ships[i].location;
                console.log(ship)
                if (ship[0][0] == coords[0] && ship[0][1] == coords[1]) {
                    console.log(ships[i].location)
                    return ships[i];
                } else {
                    continue;
                }
             }
        }
        return false;
    }

    checkShips() { // zzz
        // search through the instance of "this.ships" for "isSunk" being "true", and counts them. Returns the number
        let ships = Object.values(this.ships);
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].isSunk == true) {
                this.sunk.add(ships[i]);
            } else {
                continue;
            }
        }
        return this.sunk.size;
    }

}

export class CPU extends Player {
    constructor(name = "CPU") {
        super(name);
        this.isCPU = true;
    }

    getMoveMult() {
        return Math.floor(Math.random() * 20);
    }

    getCoords() {
        // return two numbers between 0 and 9 and save to coordinates
        const row = Math.floor(Math.random() * (Board.gridSize - 1));
        const col = Math.floor(Math.random() * (Board.gridSize - 1));
        return [row, col];
    }

    getShipCoords(size) {
        if (size == 1) {
            return this.getCoords();
        } else {
            let initialCoord = this.getCoords();
            let coords = [];
            coords.push(initialCoord);
            let direction = 0; // 0 is up and down, 1 is left to right
            let moveMult = this.getMoveMult();
            let randomNum = Math.floor(Math.random() * 10);
                if (moveMult % 2 == 0) {
                    direction = 0;
                } else {
                    direction = 1;
                }
                let [row, col] = initialCoord;
                if (direction == 0) {
                    for (let i = 0; i < size - 1; i++) {
                        if (randomNum <= 5) {
                            coords.push([row + 1, col]);
                            row += 1;
                        } else {
                            coords.push([row - 1, col]);
                            row -= 1;        
                        }
                    } 
                } else if (direction == 1) {
                    for (let i = 0; i < size - 1; i++) {
                        if (randomNum <= 5) {
                            coords.push([row, col + 1]);
                            col += 1;
                        } else {
                            coords.push([row, col - 1]);
                            col -= 1;
                        }
                    }
                }
                return coords;
        }
    }
}
// Create a CPU player and a human player, track scores and have individual boards
// to track if the player is marked as a cpu or not
// we need possibly to make a subclass, and put computational stuff in that one that is specifically for the CPU player.
// 