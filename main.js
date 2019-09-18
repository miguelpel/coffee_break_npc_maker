'use strict'

const electron = require('electron')
const path = require('path')
const { app, BrowserWindow } = electron

const { webContents, ipcMain } = require('electron')

const DataStore = require('./dataStore.js') 

let mainWindow

let current_character // to keet the current character

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

  const store = new DataStore({name: 'characters'})

  // store.saveCharacter({name: 'Dave'}); WORKS
  // console.log(store.characters);

  console.log('store at address: ', app.getPath('userData'))

}

// catch 'inputChange'
ipcMain.on('inputChange', function(event, item) {
  // console.log(event)
  console.log(item)
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