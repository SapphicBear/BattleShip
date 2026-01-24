import { CPU, Player } from "../player";

it("CPU init should return an object with 10 items", () => {
    let cpu = new CPU();
    cpu.initializeBoard();
    expect(Object.keys(cpu.ships).length).toBe(10);
});
