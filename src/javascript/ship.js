class Ship {
    isSunk = false;
    constructor(size, location, name) {
        this.size = size;
        this.name = `${name}`;
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
    setLocation(newLocation) {
        this.location = newLocation;
    }
}
class Carrier extends Ship {
    constructor(location, name = `Carrier`) {
        super(4, location, name);
    }
}

class Battleship extends Ship {
    constructor(location, name = `Battleship`) {
        super(3, location, name);
    }
}

class Cruiser extends Ship {
    constructor(location, name = `Crusier`) {
        super(2, location, name);
    }
}

class Scout extends Ship {
    constructor(location, name = `Scout`) {
        super(1, location, name);
    }
}

export { Ship, Carrier, Battleship, Cruiser, Scout }
// basic ship class will be the base for all other types of ships. Hierarchy of ship classes
// have traits like "size" (depends on the subclass), functions like "isSunk", "hit" 