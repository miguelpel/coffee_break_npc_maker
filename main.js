'use strict'

const electron = require('electron');
const path = require('path');
const { app, BrowserWindow } = electron;

const { webContents, ipcMain } = require('electron');

const DataStore = require('./dataStore.js');
const Character = require('./Character');

let mainWindow;
let store;
let current_character // to keep the current character;

// const state = {
//   currentCharacter: undefined,
//   loading: false
// }

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

const tryAndSave = () => {
  console.log('saving character', current_character)
  // check if the character's name is available and not undefined
  if (!current_character || !current_character.name) {
    console.log('undefined character!')
    mainWindow.webContents.send('display message', {nature: 'error', message: "There's no Character set"})
    return false;
  }
  // const charName = current_character.name
  store.saveCharacter(current_character)
  mainWindow.webContents.send('display message', {nature: 'info', message: "Character Saved"})
}

const setCharacterByName = (name) => {
  console.log(name)
  // print name here
  current_character = store.getCharacterByName(name) // works, but only get the name
  mainWindow.webContents.send('display character', current_character)
  // print the whole character
  // displayCurrentCharacterScript()
}

// catch 'inputChange'
ipcMain.on('inputChange', function(event, item) {
  if (!current_character) {
    mainWindow.webContents.send('display message', {nature: 'error', message: "failed to change character: no character set"})
    // look if there's a name in name input.
    // if yes, check the name of the character,
    // and create it
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

ipcMain.on('loadAllChars', function(event) {
  console.log('load character')
  const charNames = store.getAllCharacterNames(); // works
  mainWindow.webContents.send('display characters names', charNames)
})   

ipcMain.on('createChar', function(event) {
  console.log('create character')
  current_character = new Character();
})

ipcMain.on('exportChar', function(event) {
  console.log('export character')
})

ipcMain.on('saveChar', function(event) {
  tryAndSave()
})

ipcMain.on('try and save', tryAndSave)

ipcMain.on('loadChar', function(event, item) {
  setCharacterByName(item)
  // load the character and set the current character to this guy.
  // set the inputs
  // REFRESH!!!
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