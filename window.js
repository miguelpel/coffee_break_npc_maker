'use strict'

const { BrowserWindow } = require('electron');

const defaultProps = {
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
}

class Window extends BrowserWindow {
    constructor ({ file, ...windowSetting }) {
        // calls new BrowserWindow with these props
        super ({...defaultProps, ...windowSettings})
        this.loadFile(file)
        
        if(process.env.DEV) {
            // Open the DevTools.
            console.log("starting dev environment")
            this.webContents.openDevTools();
          }
        
        this.once('ready-to-show', () => {
            this.show()
        })

    }
}

module.exports = Window