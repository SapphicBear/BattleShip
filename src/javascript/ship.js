class Ship {
    isSunk = false;
    constructor(size, location) {
        this.size = size;
        this.location = location;
        this.health = this.size;
    }
    takeHit() {
        if (this.health <= 1) {
            this.isSunk = true;
        } else {
            this.health -= 1;
        }
        return true;
    }
}
class Carrier extends Ship {
    constructor(location) {
        super(4, location);
    }
}

class Battleship extends Ship {
    constructor(location) {
        super(3, location);
    }
}

class Cruiser extends Ship {
    constructor(location) {
        super(2, location);
    }
}

class Scout extends Ship {
    constructor(location) {
        super(1, location);
    }
}

export { Ship, Carrier, Battleship, Cruiser, Scout }
// basic ship class will be the base for all other types of ships. Hierarchy of ship classes
// have traits like "size" (depends on the subclass), functions like "isSunk", "hit" 