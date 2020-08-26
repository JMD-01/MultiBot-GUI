const { app, BrowserWindow , ipcMain, globalShortcut} = require('electron');

let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    show: false,
    width: 900,
    height: 700,
    resizable: false,
    frame: false,
    transparent: true,
    backgroundColor: "#142428",
    webPreferences: {
        nodeIntegration: true,
        devTools: false,
        enableRemoteModule: true
    }
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(`file://${__dirname}/UI/GUI.html`);

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
  //MINIMIZE APP
  ipcMain.on('minimize', (event, arg) => {
    window.minimize();
  })
});
//EXIT APP
ipcMain.on('exit', (event, arg) => {
  app.exit();
})

ipcMain.on('message',(event,arg)=>{
  console.log(arg)
})
