const listeners = {
    board(handler) {
        let cpuBoard = document.querySelectorAll(".cpu.board > *");
        cpuBoard.forEach((square) => {
            square.addEventListener("click", () => {
                let output = square.className.split("-")[2];
                handler(output);
            });
        });
    },
};

export {listeners};