export class Board {
    static gridSize = 10;
    static emptyMarker = 0;
    static shipMarker = 1;
    static missMarker = 2;
    static hitMarker = 3;

    constructor() {
        this.grid = [];
        for (let i = 0; i < Board.gridSize; i++) {
            this.grid.push(new Array(Board.gridSize).fill(Board.emptyMarker));
        }
    }
    getCoords(array) {
        // recieves coordinate array and splits them and checks if they are in bounds.
        if (array.length < 2) {
            throw new Error("getCoords error: array length issue");
        } 
        const [row, col] = array;
        
        if (row > 9 || col > 9 || row < 0 || col < 0) {
            throw new Error("getCoords error: coordinates out of bounds");
        }
        return {row, col};
    }
    checkGrid(array) {
        // Check grid for a ship based on the coordinantes, mark miss if none, mark hit if ship.
        const c = this.getCoords(array);
        if (this.grid[c.row][c.col] === Board.shipMarker) {
            this.grid[c.row][c.col] = Board.hitMarker;
            return true;
        } else {
            this.grid[c.row][c.col] = Board.missMarker;
            return false;
        }
        
    }
    setShip(array, size) {
        // set ship placement in grid Change to 1.
        if (size == 1) {
            const c = this.getCoords(array);
            if (this.grid[c.row][c.col] == Board.shipMarker) {
                return false;
            } else {
                this.grid[c.row][c.col] = Board.shipMarker;
                return true;
            }
        } else {
            for (let i = 0; i < size; i++) {
                let c = this.getCoords(array[i]);
                if (this.grid[c.row][c.col] == Board.shipMarker) {
                    return false;
                } else {
                    this.grid[c.row][c.col] = Board.shipMarker;
                    continue;
                }
            }
            return true;
        }
    }

}
let board = new Board();


// Create multiple boards for players and for keeping track of hits and misses