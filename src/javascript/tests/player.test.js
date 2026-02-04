import { CPU, Player } from "../player";
import { Battleship } from "../ship";

it("CPU init should return an object with 10 items", () => {
    let cpu = new CPU();
    cpu.initializeBoard();
   
});
it("test human player setting ship", () => {
    const player = new Player("Human");
    expect(player.placeShip(new Battleship(player.getUserCoord([[0,2],[1,2],[2,2]])))).toBe(true);
});
it("test moving ship after placement", () => {
    const player = new Player("player");
    let coords = [[0,1],[0,2],[0,3]];
    let newCoords = [[2,0], [2,1],[2,2]];
    let ship = new Battleship(player.getCoords(coords));
    player.placeShip(ship);
    console.log(player.previewBoard)
    ship.location = newCoords;
    player.finalPlace();
    console.log(player.board)
});