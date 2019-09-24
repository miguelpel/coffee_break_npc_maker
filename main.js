'use strict'

const electron = require('electron');
const path = require('path');
const { app, BrowserWindow } = electron;

const { webContents, ipcMain } = require('electron');

const DataStore = require('./dataStore.js');
const Character = require('./Character');

let mainWindow;
let store;
let current_character // to keet the current character;

const state = {
  currentCharacter: undefined,
  loading: false
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')

  if(process.env.DEV) {
    console.log("starting dev environment")
    mainWindow.webContents.openDevTools()
  }

  mainWindow.webContents.on('dom-ready', () => {
        console.log("dom ready")
  });

    mainWindow.on('closed', () => {
    mainWindow = null
  });

  store = new DataStore({name: 'characters'})

  // store.saveCharacter({name: 'Dave'}); WORKS
  // console.log(store.characters);

  console.log('store at address: ', app.getPath('userData'))

}

// catch 'inputChange'
ipcMain.on('inputChange', function(event, item) {
  if (!current_character) {
    console.log('failed to change character: no character set')
    return false;
  }
  // HERE needs to populate this guy.
  console.log("input change: ", item)
  switch(item.inputId) {
    case "character_name":
      console.log('case character_name')
      current_character.setName(item.value);
      break;
    case "script_input":
      console.log('case script_input')
      current_character.setScript(item.value);
      break;
    default:
      console.log("default")
      console.log(item.inputId)
      // seperate the item.inputId into => quirk, and place
      const test = item.inputId.match(/[A-Za-z0-9]+/g)
      const quirk = test[0];
      const place = test[1];
      console.log('test: ', test);
      current_character.setQuirk(quirk, place, item.value) // to test !
      console.log(current_character);
  }
})

ipcMain.on('loadChar', function(event) {
  console.log('load character')
  const charNames = store.getAllCharacterNames(); // works
  console.log('charNames', charNames)
  // send the names along to the index.js
  // create a div with ul / li to display the characters => scrollable? Search?
  // onClick => send another message to here, with the name of the character.
  // load the character and set the current character to this guy.
  // REFRESH!!!
})

ipcMain.on('createChar', function(event) {
  console.log('create character')
  current_character = new Character();
})

ipcMain.on('exportChar', function(event) {
  console.log('export character')
})

ipcMain.on('saveChar', function(event) {
  console.log('saving character', current_character)
  // check if the character's name is available and not undefined
  if (!current_character || !current_character.name) {
    console.log('undefined character!')
    return false;
  }
  const charName = current_character.name
  store.saveCharacter({name: charName})
  console.log("character saved")
})

ipcMain.on('try and save', function() {
  console.log('try and save') // works
  // if there's no character set, dispay warning.
  // else, hide warning, save character, display message that the character is saved.
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})