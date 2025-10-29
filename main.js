const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const fs = require('node:fs');
const https = require('node:https');
const setupLogger = require('./logger');
const process = require('process');

// --- Logger Setup ---
let logDir = `${process.cwd()}/logs`;
if(process.platform == "darwin"){
  logDir = path.join(app.getPath('home'), 'electron/logs');
}

const logger = setupLogger(logDir);
// --- End Logger Setup ---

// --- Load Configuration ---
const defaultConfig = { url: 'http://127.0.0.1:8080' };
const configPath = app.isPackaged
  ? path.join(process.resourcesPath, 'config.json')
  : path.join(__dirname, 'config.json');

let config = defaultConfig;
try {
  const configFile = fs.readFileSync(configPath, 'utf-8');
  config = { ...defaultConfig, ...JSON.parse(configFile) };
  logger.info('Configuration loaded successfully.');
} catch (error) {
  logger.error(`Failed to load config file from ${configPath}. Using default.`, error);
  config = defaultConfig;
}
// --- End Configuration ---

// --- Icon Handling ---
let isIconReady = false;
const iconName = path.join(__dirname, 'iconForDragAndDrop.png');

// Check if icon exists, if not, download it.
if (fs.existsSync(iconName)) {
  isIconReady = true;
  logger.info('Icon found.');
} else {
  logger.info('Icon not found, downloading...');
  const iconFile = fs.createWriteStream(iconName);
  https.get('https://img.icons8.com/ios/452/drag-and-drop.png', (response) => {
    response.pipe(iconFile);
    iconFile.on('finish', () => {
      isIconReady = true;
      logger.info('Icon downloaded and ready.');
    });
  }).on('error', (err) => {
    logger.error('Failed to download icon:', err.message);
  });
}
// --- End Icon Handling ---

function createWindow() {
  logger.info('Creating main window.');
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load URL from config file
  win.loadURL(config.url);
}

// 네이티브 드래그앤드롭 시작 요청 처리
ipcMain.on('ondragstart', (event, filePath) => {
  if (!isIconReady) {
    logger.warn('Drag and drop attempted before icon was ready.');
    return; // Prevent drag if icon is not ready
  }
  logger.info(`Drag started for file: ${filePath}`);
  filePath = "\\\\192.168.0.157\\test_storage\\tcast\\video\\M20251022000001.mxf"; 
  if(process.platform == "darwin"){
    filePath = "/Volumes/TEST_STORAGE/tcast/video/M20251022000001.mxf"
  }
  logger.info(filePath);
  event.sender.startDrag({
    file: filePath,
    icon: iconName
  });
});

app.on('window-all-closed', () => {
  logger.info('All windows closed, quitting app.');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    logger.info('App activated, creating new window.');
    createWindow();
  }
});

app.whenReady().then(() => {
  logger.info('App is ready.');
  createWindow();
});
