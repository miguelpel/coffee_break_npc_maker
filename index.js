const {ipcRenderer} = require('electron');

/////////////// GET HTML ELEMENTS

const inputsIds = []
inputsIds.push("character_name")
document.querySelectorAll('textarea').forEach(area => inputsIds.push(area.id))

const createButton = document.getElementById('create_button');
const loadButton = document.getElementById('load_button');
const exportButton = document.getElementById('export_button');
const saveButton = document.getElementById('save_button');
const warningElement = document.getElementById('warning_message')


let timer; // this is for auto-save

/////////////// FUNCTIONS

function onInputChange(e) { // get triggered ONLY when you exit the input field
    e.preventDefault()
    const value = e.target.value
    const inputId = e.target.id
    console.log(e.target.id)
    console.log(e.target.value)
    ipcRenderer.send('inputChange', {value, inputId})
}

function onFocus(e) {
    console.log('focus')
}

function onLoadButtonPressed(e) {
    ipcRenderer.send('loadAllChars')
}

function onCreateButtonPressed(e) {
    ipcRenderer.send('createChar')
}

function onExportButtonPressed(e) {
    ipcRenderer.send('exportChar')
}

function onSaveButtonPressed(e) {
    ipcRenderer.send('saveChar')
}

function onCharacterNamePressed(name) {
    ipcRenderer.send('loadChar', name)
    deleteCharactersNames()
}

function tryAutoSave() {
    ipcRenderer.send('try and save')
}

function displayMessage(message, nature = 'warning') {
    const color = nature === 'warning' ? '#ff9214' : nature === 'error' ? '#ff1414' : '#00d100';
    warningElement.style.color = color;
    warningElement.style.borderColor = color;
    warningElement.textContent = message;
    warningElement.style.display = 'block';
}

function loadCharacters(names) {
    const ul = document.createElement('ul')
    ul.id = 'character list'
    const contDiv = document.getElementById('character_buttons')
    names.forEach((name, i) => {
        const li = document.createElement('li')
        li.innerText = name
        if (i + 1 !== names.length) {
            li.style.borderBottom = '1px solid #cccccc';
        }
        // add event listener => onClick => load THIS character ("by name")
        li.addEventListener('click', (e) => onCharacterNamePressed(name))
        ul.appendChild(li)
    })
    contDiv.appendChild(ul)
}

function deleteCharactersNames() {
    const ul = document.getElementById('character list')
    ul.parentNode.removeChild(ul);
}

/////////////// ADDING EVENT LISTENERS

inputsIds.forEach(inputId => {
    const inputElm = document.getElementById(inputId)
    inputElm.addEventListener('change', onInputChange)
})

createButton.addEventListener('click', onCreateButtonPressed)
loadButton.addEventListener('click', onLoadButtonPressed)
exportButton.addEventListener('click', onExportButtonPressed)
saveButton.addEventListener('click', onSaveButtonPressed)

timer = setInterval(tryAutoSave, 1000)

/////////////// MESSAGES FROM MAIN

ipcRenderer.on('display message', function(event, item) {
    displayMessage(item.message, item.nature)
})

ipcRenderer.on('display characters names', function(event, item) {
    loadCharacters(item)
})

/////////////// TEST FOR THE DIV WITH CHARS NAMES