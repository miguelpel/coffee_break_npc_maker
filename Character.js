class Character {
    constructor(name=undefined) {
        this.name = name;
        this.quirks = undefined;
        this.script = undefined;
    }

    setName(name) {
        this.name = name
    }

    setQuirk() // it's not parsed !!!

    exportCharacter() {
        // takes all the character things, parse them, and returns the object
    }
}