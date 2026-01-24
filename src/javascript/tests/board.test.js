import {Board} from "../board";

const board = new Board();
it("grid size is Board.gridSize (10)", () => {
    expect(board.grid.length).toBe(Board.gridSize);
});
it("internal grid size is also Board.gridSize (10)", () => {
    expect(board.grid[0].length).toBe(Board.gridSize);
});
