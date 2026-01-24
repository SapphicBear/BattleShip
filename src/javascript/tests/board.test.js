import {Board} from "../board";

const board = new Board();
it("grid size is Board.gridSize (10)", () => {
    expect(board.grid.length).toBe(Board.gridSize);
});
it("internal grid size is also Board.gridSize (10)", () => {
    expect(board.grid[0].length).toBe(Board.gridSize);
});
it("test setting ship on grid", () => {
    expect(board.setShip([0,0])).toBe(true);
});
it("test setting ship on a taken space is false", () => {
    board.grid[0][0] = 1;
    expect(board.setShip([0, 0])).toBe(false);
});