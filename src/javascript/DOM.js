function cacheDOM() {
    const DOM = document.querySelectorAll("main > div")
    let [playerArea, cpuArea] = DOM;
    return {playerArea, cpuArea};
}
function renderBoards(player) {
    // render boards based off the grids of the player provided.
}

export { cacheDOM, renderBoards }