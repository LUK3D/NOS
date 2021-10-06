"use strict";

import { app, protocol, BrowserWindow,ipcMain ,dialog} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

 
async function createWindow() {
  // Create the browser window.
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    webPreferences: {
      //devTools:false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  });



  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("./index.html");
    // win.loadURL("app://./index.html");

    
  localStorage.exepath = process.env.PORTABLE_EXECUTABLE_DIR.toString();
  localStorage.devpath = process.env.WEBPACK_DEV_SERVER_URL.toString();
    

  }

  win.on('closed', () => {
    win = null
  })

}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools

  
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();

 /*  openFolder() */

 BrowserWindow.getFocusedWindow().webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  /* if(input.code == 'NumpadAdd' && input.control == true)
  zoomIn();
  if(input.key == '-' && input.control == true)
  zoomOut(); */
  // win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})


});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}


ipcMain.on('selectFolder',(event, args)=>{
  
 
  const { dialog } = require('electron')
 let path =  dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
 
    event.reply('selectFolder-result',result.filePaths.toString() );

  }).catch(err => {
    console.log(err)
  })


  
})



ipcMain.on('minimizar',()=>{
  BrowserWindow.getFocusedWindow().minimize()
  
})

ipcMain.on('maximizar',()=>{
  if(BrowserWindow.getFocusedWindow().isMaximized()){

    BrowserWindow.getFocusedWindow().unmaximize()
    return
  }
  BrowserWindow.getFocusedWindow().maximize()
  
})
ipcMain.on('fechar',()=>{
  BrowserWindow.getFocusedWindow().close()
  
})

ipcMain.on('startProject',(event, args)=>{
  createNodeWIndow()
  
})
ipcMain.on('settings',(event, args)=>{
  createSetingsWindow()
  
})


async function createNodeWIndow(){

    let nodeEditorWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame:false,
      show:false,
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      }
    });



    
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await nodeEditorWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
      if (!process.env.IS_TEST) nodeEditorWindow.webContents.openDevTools();
    } else {
      createProtocol("app");
      // Load the index.html when not in development
      nodeEditorWindow.loadURL("app://./index.html");
   
    }
    nodeEditorWindow.title = "Node Editor";
     
    nodeEditorWindow.on('closed', () => {
      win = null
    })


}



async function createSetingsWindow(){
  let pai = BrowserWindow.getFocusedWindow();
    let settingsWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame:false,
      show:true,
      modal:true,
      parent:pai,
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
      }
    });

    

    
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await settingsWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
      if (!process.env.IS_TEST) settingsWindow.webContents.openDevTools();
    } else {
      createProtocol("app");
      // Load the index.html when not in development
      settingsWindow.loadURL("app://./index.html");
      
    }

   /*  window.location = "/settings" */
    settingsWindow.title = "Definicoes";
    // window.location.href = "/settings";

    localStorage.url = "/settings"
    settingsWindow.on('closed', () => {
      settingsWindow = null
    })

}
   
/* Chamar Funcao para carregar plugins */
ipcMain.on('loadPlugin',()=>{
  let file = dialog.showOpenDialogSync()
  loadPlugin(file);
});


ipcMain.on('run',(event, code)=>{
  const { exec } = require("child_process");
  exec("python "+code, (error, data, getter) => {
    if(error){
      console.log("error",error.message);
      return;
    }
    if(getter){
      console.log("data",data);
      return;
    }
    console.log("data",data);

  });
});

function loadPlugin(file){

  BrowserWindow.getFocusedWindow().webContents.send('addPlugin',(file));
  console.log('Carregou');
   
}
 

/* ZOOM IN */
/* 
ipcMain.on('zoomIn',()=>{
  let contents = BrowserWindow.getFocusedWindow.webContents;

  contents.on()
}) */


function zoomIn () {  
  // webFrame.setZoomFactor(webFrame.getZoomFactor+10);
  // webContents.setZoomFactor( webContents.getZoomFactor+10)
}
function zoomOut () {  
  // webContents.setZoomFactor( webContents.getZoomFactor-10)


}

