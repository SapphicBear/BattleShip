function cacheDOM() {
    const outer = document.querySelectorAll("main > div");
    const boards = document.querySelectorAll(".board");
    let [playerArea, cpuArea] = outer;
    let [playerBoard, cpuBoard] = boards;
    return {playerArea, cpuArea, playerBoard, cpuBoard}; 
}
function renderBoard(size, player, dom) {
    // render boards based off the grids of the player provided.
    let max = size * size;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const grid = document.createElement("div");
            grid.className = `${player.board.grid[i][j]}-${player.name} grid-${i}${j}`;
            dom.appendChild(grid);
        }
    }
}
function removeBoard() {
    let grids = document.querySelectorAll(`[class*="grid"]`)
    if (grids.lenght !== 0) {
        grids.forEach((grid) =>{
            grid.remove();
        })
    }
}

export { cacheDOM, renderBoard, removeBoard }