const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
	'electron',
	{
		example: () => ipcRenderer.send("example")
	}
)

ipcRenderer.on('example',(example) => {
	console.log("ipcRenderer.on:example")
})
