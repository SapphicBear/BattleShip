import {Board} from "../board";

let board = new Board();
it("grid size is Board.gridSize (10)", () => {
    expect(board.grid.length).toBe(Board.gridSize);
});
it("internal grid size is also Board.gridSize (10)", () => {
    expect(board.grid[0].length).toBe(Board.gridSize);
});
it("test setting ship on grid", () => {
    expect(board.setShip([0,0], 1)).toBe(true);
});
it("test setting ship on a taken space is false", () => {
    board.grid[0][0] = 1;
    expect(board.setShip([0, 0], 1)).toBe(false);
});
it ("test size for setting ship in grid", () => {
    board.grid[0][0] = 0;
    expect(board.setShip([[0,0],[0,1],[0,2]], 3)).toBe(true);
});
it("test lateral placement", () => {
    board = new Board();
    expect(board.setShip([[0,0],[1,0],[2,0]], 3)).toBe(true);
});
it("test placement failure, showing that none of the grid points are pushed if one intersects", () => {
    expect(board.setShip([[1,1],[1,2], [1,0]], 3)).toBe(false);
    console.log(board.grid)
});