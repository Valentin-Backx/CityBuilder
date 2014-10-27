var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);

		// Load our textures
		var self = this;
		this.gameTextures = {};

		var defaultRoad = new IgeTexture('./assets/roadTiles/roadEW.png');

		this.gameTextures.roadTiles = 
		{
			0 : defaultRoad,
			170 : new IgeTexture('./assets/roadTiles/crossroad.png'),
			42 : new IgeTexture('./assets/roadTiles/crossroadESW.png'),
			138 : new IgeTexture('./assets/roadTiles/crossroadNES.png'),
			162 : new IgeTexture('./assets/roadTiles/crossroadNEW.png'),
			168 : new IgeTexture('./assets/roadTiles/crossroadNSW.png'),
			2 : new IgeTexture('./assets/roadTiles/endE.png'),
			128 : new IgeTexture('./assets/roadTiles/endN.png'),
			8 : new IgeTexture('./assets/roadTiles/endS.png'),
			32 : new IgeTexture('./assets/roadTiles/endW.png'),
			250 : new IgeTexture('./assets/roadTiles/exitE.png'),
			190 : new IgeTexture('./assets/roadTiles/exitN.png'),
			235 : new IgeTexture('./assets/roadTiles/exitS.png'),
			175 : new IgeTexture('./assets/roadTiles/exitW.png'),
			248 : new IgeTexture('./assets/roadTiles/lotE.png'),
			224 : new IgeTexture('./assets/roadTiles/lotES.png'),
			62 : new IgeTexture('./assets/roadTiles/lotN.png'),
			56 : new IgeTexture('./assets/roadTiles/lotNE.png'),
			14 : new IgeTexture('./assets/roadTiles/lotNW.png'),
			227 : new IgeTexture('./assets/roadTiles/lotS.png'),
			131 : new IgeTexture('./assets/roadTiles/lotSW.png'),
			143 : new IgeTexture('./assets/roadTiles/lotW.png'),
			255 : new IgeTexture('./assets/roadTiles/road.png'),
			10 : new IgeTexture('./assets/roadTiles/roadES.png'),
			34 : defaultRoad,
			130 : new IgeTexture('./assets/roadTiles/roadNE.png'),
			136 : new IgeTexture('./assets/roadTiles/roadNS.png'),
			160 : new IgeTexture('./assets/roadTiles/roadNW.png'),
			40 : new IgeTexture('./assets/roadTiles/roadSW.png'),
			
		}
		this.gameTextures.outside  = new IgeCellSheet('./assets/iso-64x64-outside.png',10,14);

		this.gameTextures.grass = new IgeCellSheet('./assets/grassSheet.png',4,1);

		this.gameTextures.grassTile = new IgeCellSheet('./assets/grassTile.png',1,1);

		// Load a game texture here
		//this.gameTextures.myTexture = new IgeTexture('./assets/somePathToImage.png');
		
		///////////////////////////////////////////////////////////////////////////////
		// *** PLEASE READ - BLANK PROJECT RUNNING DETAILS ***
		///////////////////////////////////////////////////////////////////////////////
		// The engine will wait for your textures to load before it starts because
		// of the code below waiting for an "on('texturesLoaded')" before executing.
		// The problem is there are no textures loaded because this is a blank project
		// so if you run this from the index.html the loading symbol will spin forever.
		// I've added an example line (line 11) to show how to load at least one
		// texture into memory but you'll have to provide an image file for it :)
		///////////////////////////////////////////////////////////////////////////////

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
			// Create the HTML canvas
			ige.createFrontBuffer(true);

			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					// Add base scene data
					ige.addGraph('IgeBaseScene');
					// ige.viewportDepth(true);
					// ige.$('vp1').depth(0);

					// CREATE SOME ENTITIES AND WHOTNOT HERE
					var baseScene = ige.$('baseScene');

					self.objectLayer = new IgeScene2d()
						.id('objectLayer')
						.isometricMounts(true)
						.mount(baseScene)
						.depth(0);

					// console.log(TileMap);
					self.tileMap = new TileMap()
						.id('tileMap')
						.mount(self.objectLayer);
						// .highlightOccupied(true);
						// .drawBounds(false);

					self.tileMap.addTexture(self.gameTextures.grassTile);

					// self.tileMap.paintBackground();

					self.cameraControls = new CameraControls();
					self.roadTool = new RoadTool();
					self.roadTool.init().active = true;
					self.currentTool = self.roadTool;

					self.eventDispatcher = new EventDispatcher(self.tileMap);

					self.roadNetwork = new RoadNetwork();
					
					/*=================== UI STUFF =======================*/

					ige.ui.style( '.toolsSelection' ,{
						'bottom' 			: '5%',
						'width'  			: '90%',
						'borderRadius' 		: 5,
						'height' 			: '20%',
						'backgroundColor' 	: '#44AA11',
						'borderColor' 		: '#44AA11',
						'borderWidth' 		: 4
					});

					var uiScene = new IgeScene2d()
						.id('uiScene')
						.ignoreCamera(true)
						.mount(baseScene)
						.depth(10)
						.opacity(0.5);

					// self.uiViewPort = new IgeViewport()
					// 	.depth(10)
					// 	.scene(uiScene);

					// self.uiViewPort.mount(ige);

					self.toolsSelectionUI = new ToolsSelectionUI()
						.mount(uiScene);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }