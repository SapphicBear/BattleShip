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
            return false;
        } 
        const [row, col] = array;
        
        if (row > 9 || col > 9 || row < 0 || col < 0) {
            return false;
        }
        return {row, col};
    }
    checkGrid(array) {
        // Check grid for a ship based on the coordinantes, mark miss if none, mark hit if ship.
        const c = this.getCoords(array);
        if (this.grid[c.row][c.col] === Board.shipMarker && this.grid[c.row][c.col] !== Board.missMarker && this.grid[c.row][c.col] !== Board.hitMarker) {
            this.grid[c.row][c.col] = Board.hitMarker;
            return true;
        } else if (this.grid[c.row][c.col] == Board.emptyMarker) {
            this.grid[c.row][c.col] = Board.missMarker;
            return false;
        } else {
            // make this impossible? 
            return false;
        }
    }
    setShip(array, size) {
        // set ship placement in grid Change to 1.
        if (size == 1) {
            const c = this.getCoords(array);
            if (!c) {
                return false;
            }
            if (this.grid[c.row][c.col] == Board.shipMarker) {
                return false;
            } else {
                this.grid[c.row][c.col] = Board.shipMarker;
                return true;
            }
        } else {
            let results = [];
            for (let i = 0; i < size; i++) {
                let c = this.getCoords(array[i]);
                if (!c) {
                return false;
            }
                if (this.grid[c.row][c.col] == Board.shipMarker) {
                    return false;
                } else {
                    results.push([c.row, c.col]) ;
                    continue;
                }
            }
            for (let i = 0; i < results.length; i++) {
                this.grid[results[i][0]][results[i][1]] = Board.shipMarker;
            }
            return true;
        }
    }

}


// Create multiple boards for players and for keeping track of hits and misses