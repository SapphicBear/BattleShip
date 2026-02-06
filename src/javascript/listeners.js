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
    startButton(handler) {
        let button = document.getElementById("start-button");
        button.addEventListener("click", () => {
            handler();
        })
    }
};

export {listeners};