const { shell,app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('xy96', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('xy96')
}

let win
let deeplinkingUrl

function createWindow() {    
    console.log("creating windos")
    const startUrl = __dirname + '/index.html'
        win = new BrowserWindow({        
            width: 800,        
            height: 800,        
            webPreferences: {            
                nodeIntegration: true,      
                preload: path.join(__dirname, 'preload.js'),  
                contextIsolation: true
            }    
        });    
            win.loadFile(startUrl);    
            app.on('window-all-closed', () => {
                        if (process.platform !== 'darwin') {            
                            app.quit()        
                        }    });
                    }

app.whenReady().then(createWindow);app.on('window-all-closed', () => {    
    if (process.platform !== 'darwin') {        
        app.quit()    
    }});


const gotTheLock = app.requestSingleInstanceLock()
    
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    console.log('second instance attempted')
    console.log(commandLine,"coomand line")
    // Someone tried to run a second instance, we should focus our window.
    // Keep only command line / deep linked arguments
    deeplinkingUrl = commandLine
    if(deeplinkingUrl){
    console.log(deeplinkingUrl[3],'deeplink url')
    win.webContents.send('token-data', deeplinkingUrl);
    }
    else{
    console.log(commandLine,"coomand line")
    }
    
    if (win) {
      if (win.isMinimized()) win.restore()
        win.focus()
    }
  })
}

app.on('open-url', (event, url) => {
    event.preventDefault();
    const token = url
    console.log("url fucking clicked fucking hell fuck you")

    if (win) {
      win.webContents.send('token-data', token);
    }
  })

app.on('activate', () => {    
    if (BrowserWindow.getAllWindows().length === 0) {        
        createWindow()    
    }});