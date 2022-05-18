process.env.NODE_ENV = 'development'

const electron = require('electron')
const url = require('url')
const path = require('path')
const {app, BrowserWindow, Menu, ipcMain, dialog} = electron

let mainWindow

const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit()
				}
			}
		]
	}
]
 
app.on('ready', function(){
	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(app.getAppPath(), 'preload.js')
		}
	})
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'mainWindow.html'),
		protocol: 'file:',
		slashes:true
	}))

	mainWindow.on('closed', function(){
		app.quit()
	})
	
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
	Menu.setApplicationMenu(mainMenu)
})

ipcMain.on('example', (event) => { console.log(event) })

if(process.env.NODE_ENV !== 'production'){
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu:[
			{
				role: 'reload'
			},
			{
				label: 'Toggle DevTools',
				accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			}
		]
	});
}