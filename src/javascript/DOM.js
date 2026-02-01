export const DOM = {
    cacheDOM() {
        const DOM = document.querySelectorAll("main > div")
        let [playerArea, cpuArea] = DOM;
        return {playerArea, cpuArea};
    }
}