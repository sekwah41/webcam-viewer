
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.disableHardwareAcceleration();

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        maximizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        frame: false
    })

    mainWindow.loadFile('index.html')
}

ipcMain.on('videoSize', (event, msg) => {
    console.log(msg)
    mainWindow.setSize(msg.width, msg.height);
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {

        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
