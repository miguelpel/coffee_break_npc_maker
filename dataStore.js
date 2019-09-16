const Store = require('electron-store');

class DataStore extends Store {
    constructor (settings) {
        super(settings)
        this.characters = this.get('characters') || {} // ???
    }

    saveAllCharacters() {
        this.set('characters', this.characters);
        return this;
    }

    saveCharacter(character) {
        this.characters[character.name] = character;
        return this.set('characters', this.characters);
    }

    checkIfCharacterNameAvailable(characterName) { // TO CHECK
        return this.characters[characterName] === 'undefined'
    }

    getCharacter(characterName) {
        return this.characters[characterName]
    }

    getCharacters() {
        // get all the characters
        this.characters = this.get('characters') || {}
        return this
    }

    deleteCharacter(characterName) {
        delete this.characters[characterName]
        return this.set('characters', this.characters);
    }
}

module.exports = DataStore