var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		//'./gameClasses/MyCustomClassFile.js',
		
		/* Standard game scripts */
		'./client.js',
		'./index.js',
		'./gameClasses/TileMap.js',
		'./gameClasses/CameraControls.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }