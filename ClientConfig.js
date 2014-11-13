var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		//'./gameClasses/MyCustomClassFile.js',
		
		/* Standard game scripts */
		'./client.js',
		'./index.js',
		'./gameClasses/TileMap.js',
		'./gameClasses/EventBroker.js',
		'./gameClasses/CameraControls.js',
		'./gameClasses/RoadsTool.js',
		'./gameClasses/EventDispatcher.js',
		'./gameClasses/RoadPatch.js',
		'./gameClasses/RoadNetwork.js',
		'./gameClasses/ToolsSelectionUI.js',
		'./gameClasses/Environnment.js',
		'./gameClasses/PlaceBuildingTool.js',
		'./gameClasses/Building.js',
		'./gameClasses/Burgers.js',
		'./gameClasses/Tools.js',
		'./gameClasses/CheckOccupation.js',
		'./gameClasses/GameManager.js',
		'./gameClasses/ResidenceUniversitaire.js',
		'./gameClasses/Utils.js',
		'./gameClasses/MigrationEffect.js',
		'./gameClasses/BulldozerTool.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }