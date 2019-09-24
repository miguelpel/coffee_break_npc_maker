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
    ipcRenderer.send('loadChar')
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

function tryAutoSave() {
    ipcRenderer.send('try and save')
}

function displayMessage(message, nature) {
    // set the color of the message, according to the nature of it => warning, info, error???
    // set the message,
    // set it visible???
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