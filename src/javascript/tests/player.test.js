import { CPU, Player } from "../player";
import { Battleship } from "../ship";

it("CPU init should return true", () => {
    let cpu = new CPU();
    expect(cpu.initializeBoard()).toBe(true);
    
});
it("test human player setting ship", () => {
    const player = new Player("Human");
    expect(player.placeShip(new Battleship(player.getUserCoord([[0,2],[1,2],[2,2]])))).toBe(true);
});
it("getMoveMult should return a number between 0 and 19", () => {
    let cpu = new CPU();
    expect(cpu.getMoveMult()).toBeLessThanOrEqual(20);
});
it("getCoords should return array, both numbers should be between 0 and 9", () => {
    let cpu = new CPU();
    let coords = cpu.getCoords();
    expect(coords[0]).toBeLessThanOrEqual(9);
    expect(coords[1]).toBeLessThanOrEqual(9);
});
it("getUserCoord should return false when the number is outside of 0 and 9", () => {
    let player = new Player("player");
    let arr = [11, 20];
    expect(player.getUserCoord(arr)).toBe(false);
});