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
        if (array.length < 2 || array.length > 2) {
            throw new Error("getCoords error: array length issue");
        } 
        const [row, col] = array;
        if (this.board[row] > 9 || this.board[col] > 9) {
            throw new Error("getCoords error: coordinates out of bounds");
        }
        return {row, col};
    }
    checkGrid(array) {
        // Check grid for a ship based on the coordinantes, mark miss if none, mark hit if ship.
        const [row, col] = this.getCoords(array);
        if (this.grid[row][col] === Board.shipMarker) {
            this.grid[row][col] = Board.hitMarker;
            return true;
        } else {
            this.grid[row][col] = Board.missMarker;
            return false;
        }
        
    }
    setShip(coordinates) {
        // set ship placement in grid Change to 1.
    }

}
let board = new Board();
board.checkGrid([2, 0]);
console.log(board.grid);

// Create multiple boards for players and for keeping track of hits and misses