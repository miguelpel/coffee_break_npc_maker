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

    getCharacterByName(characterName) {
        return this.characters[characterName]
    }

    getCharacters() {
        // get all the characters
        this.characters = this.get('characters') || {}
        return this
    }

    getAllCharacterNames() {
        const nameArr = [];
        console.log(Object.keys(this.characters))
        Object.keys(this.characters).forEach(charName => nameArr.push(charName))
        return nameArr;
    }

    deleteCharacter(characterName) {
        delete this.characters[characterName]
        return this.set('characters', this.characters);
    }
}

module.exports = DataStore