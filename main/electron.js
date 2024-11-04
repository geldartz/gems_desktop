import { app, BrowserWindow, globalShortcut  } from 'electron';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
// const { readFile, writeFile } = require('fs').promises;


const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, '../public/logo/ems-small-logo.png'),
    webPreferences: {
     // preload: path.join(process.cwd(), 'main/preload.js'),
     contextIsolation: false, // You might want to set this to true in production
     nodeIntegration: false,
     enableRemoteModule: true,
     allowRunningInsecureContent: true,
    },
  });
  mainWindow.setBackgroundColor('#56cc5b10');
    globalShortcut.register('f5', function() {
        console.log('f5 is pressed')
        mainWindow.reload()
    });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173'); 
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html')); // Production build
  }
}

app.whenReady().then(createWindow);

// ipcMain.handle('save-face-data', async (event, data) => {
//   try {
//     const dataPath = path.join(__dirname, 'faceData.json');
//     let existingData = [];

//     try {
//       existingData = JSON.parse(await readFile(dataPath, 'utf8'));
//     } catch {
//       console.log("Creating a new face data file.");
//     }

//     existingData.push(data);
//     await writeFile(dataPath, JSON.stringify(existingData, null, 2));
//     return { success: true, message: 'Face data saved!' };
//   } catch (error) {
//     console.error('Error saving face data:', error);
//     return { success: false, message: 'Failed to save face data.' };
//   }
// });

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
