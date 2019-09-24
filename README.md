1 - get input from textarea
2 - create store and persistent data (JSON) => unfold
2.1 - save and retrieve one character
2.2 - set a timer to send the data every something?
2.3 - create a modal with spinner when loading
2.4 - get the data from the store into the main window:
-- mainWindow.webContents.send('inputChange', item)
-- In Main Window Script => (
    const {ipcRenderer} = require('elecron')
    ipcRenderer.on('inputChange', function(event, item) {
        console.log(item)
    })
    element.
)
3 - On Export => open window to set WHERE you want to record the file, auto-naming (character_name.json)
3.1 onExport => open a new window
3.2 if complicated to save a file => open window and DISPLAY the JSON, with a button to copy the content of the file

4 - character_dialogue inheritance???

- load_character window???

create simple chatbot =>
- + trigger
- - answer
