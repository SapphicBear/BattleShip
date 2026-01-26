import { CPU, Player } from "../player";
import { Battleship } from "../ship";

it("CPU init should return an object with 10 items", () => {
    let cpu = new CPU();
    cpu.initializeBoard();
    expect(Object.keys(cpu.ships).length).toBe(10);
});
it("test human player setting ship", () => {
    const player = new Player("Human");
    expect(player.placeShip(new Battleship(player.getCoord([[0,2],[1,2],[2,2]])))).toBe(true);
});