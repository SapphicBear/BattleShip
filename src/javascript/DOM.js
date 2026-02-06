function cacheDOM() {
    const outer = document.querySelectorAll("main > div");
    const boards = document.querySelectorAll(".board");
    const scores = document.querySelectorAll(".score");
    let [playerArea, cpuArea] = outer;
    let [playerBoard, cpuBoard] = boards;
    let [playerScore, cpuScore] = scores;
    return {playerArea, cpuArea, playerBoard, cpuBoard, playerScore, cpuScore}; 
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

function printScores(input1, input2, dom) {
    if (document.querySelectorAll(".score-text")) {
        document.querySelectorAll(".score-text").forEach((score) => {
            score.remove();
            score.textContent = "";
        })
    }
    let playerh4 = document.createElement("h4");
    playerh4.textContent = `Ships sunk: ${input1}`;
    let cpuh4 = document.createElement("h4");
    cpuh4.textContent = `Ships sunk: ${input2}`;
    playerh4.className = "score-text";
    cpuh4.className = "score-text";
    dom.playerScore.appendChild(playerh4);
    dom.cpuScore.appendChild(cpuh4);
}

function printLog(input) {
    let prevLi = document.querySelectorAll(".log-item");
    if (prevLi.length > 6) {
        prevLi[0].remove();
    }
    let log = document.querySelector(".log");
    let li = document.createElement("li");
    li.className = "log-item";
    li.textContent = input;
    log.appendChild(li);
}
function clearLog() {
    let log = document.querySelectorAll(".log-item");
    log.forEach((item) => {
        item.remove();
    });
}

export { cacheDOM, renderBoard, removeBoard, printScores, printLog, clearLog }