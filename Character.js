class Character {
    constructor(name=undefined) {
        this.name = name;
        this.quirks = {
            normal: {
                start: undefined,
                comma: undefined,
                end: undefined
            },
            aroused: {
                start: undefined,
                comma: undefined,
                end: undefined
            },
            trusting: {
                start: undefined,
                comma: undefined,
                end: undefined
            },
            angry:  {
                start: undefined,
                comma: undefined,
                end: undefined
            }
        };
        this.script = undefined;
    }

    setName(name) {
        this.name = name
    }

    setQuirk(quirk, place, value) {// it's not parsed yet
        this.quirks[quirk][place] = value
    }

    setScript(script) {
        this.script = script
    }
    
    exportCharacter() {
        // takes all the character things, parse them, and returns the object
    }
}

module.exports = Character