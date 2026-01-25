import * as ships from "../ship";

it("Test size of battleship, 3", () => {
    const battleship = new ships.Battleship();
    expect(battleship.size).toBe(3);
});
it("Test size of carrier, 4", () => {
    const carrier = new ships.Carrier();
    expect(carrier.size).toBe(4);
});
it("test hit functionality", () => {
    const scout = new ships.Scout();
    scout.takeHit();
    expect(scout.isSunk).toBe(true);
});
it("test hit function with more health", () => {
    const carrier = new ships.Carrier();
    carrier.takeHit();
    expect(carrier.health).toBe(3);
});