const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

const {PythonShell} =require('python-shell');


const { ipcMain } = require('electron');

let win = null



function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }else{
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const temps = []

console.log("Called")
let pyshell = new PythonShell(
  path.join(__dirname, "/../scripts/calc.py"),
  {
    pythonOptions: ['-u']
    // pythonPath: "python",        
    // args: data,      
  }
);

lastPid = pyshell.childProcess.pid;
console.log("starting process with pid: ");
console.log(lastPid)

pyshell.on("error", function (err) {
  win.webContents.send('py-console-error', JSON.stringify(err))
  console.log(err.message);
});

pyshell.on("message", function (message){
  console.log(message)
  temps.push(message)
  win.webContents.send("std-out", JSON.stringify(message))
})


ipcMain.on('temp', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = JSON.stringify(temps) // returns a value to renderer process
})


