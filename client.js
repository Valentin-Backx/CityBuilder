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

		this.gameTextures.highlightTile = new IgeTexture('./assets/highlightTile.png');

		// this.gameTextures.grass = new IgeCellSheet('./assets/grassSheet.png',4,1);

		// this.gameTextures.grassTile = new IgeTexture('./assets/roadTiles/grass.png');

		this.gameTextures.grassTile = new IgeTexture('./assets/grassTile.png');

		this.gameTextures.buildings = 
		{
			'burgers' : new IgeTexture('./assets/buildings/burgerShop1.png'),
			'residence_1' : new IgeTexture('./assets/buildings/residence_universitaire1.png')
		}

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

					self.gameTextures.grassTile.resize(40, 20);
					self.backgroundScene = new IgeScene2d()
						.id('backgroundScene')
						.depth(0)
						.backgroundPattern(self.gameTextures.grassTile, 'repeat', true, true)
						.ignoreCamera(true) // We want the scene to remain static
						.mount(baseScene);


					self.objectLayer = new IgeScene2d()
						.id('objectLayer')
						.isometricMounts(true)
						.mount(baseScene)
						.depth(1);

					// console.log(TileMap);
					self.tileMap = new TileMap()
						.id('tileMap')
						.mount(self.objectLayer);
						// .highlightOccupied(true);
						// .drawBounds(false);

					self.tileMap.addTexture(self.gameTextures.grassTile);

					// self.tileMap.paintBackground();

					//INITIALIZE EVENT BROKER
					InitEventBroker();

					self.cameraControls = new CameraControls();


					self.eventDispatcher = new EventDispatcher(self.tileMap);

					self.roadNetwork = new RoadNetwork();
					
					/*=================== UI STUFF =======================*/
					//HUD

					ige.ui.style('#topHud',{
						'top'				: 10,
						'width'				: '90%',
						// 'left'				: 5,
						'height'			: '10%',
						'backgroundColor'	: '#445599',
						'borderWidth'		: 4,
						'borderRadius'		: 5,
						'borderColor'		: '#AA4411'
					})

					ige.ui.style('#timeDisplayUI',{
						'top'				: '2%',
						'width'				: 300,
						'height'			:  75,
						'left'				:  15,
						'font'				: '30px Open Sans',
						'color'				: '#000000',
						// 'backgroundColor'	: '#eeeeee',
					});


					//TOOLS
					ige.ui.style( '.toolsSelection' ,{ //for now it is just 'road tool selection'
						'bottom' 			: '2%',
						'width'  			: '95%',
						'borderRadius' 		: 5,
						'height' 			: '20%',
						'backgroundColor' 	: '#445599',
						'borderColor' 		: '#445599',
						'borderWidth' 		: 4
					});

					ige.ui.style('.tool',{
						'margin'			: 5,
						'width'				: 100,
						'height'			: 100,
						'borderRadius'		: 5,
						'borderColor'		: '#AA4411',
						'backgroundColor'	: '#AA4411'
					});


					ige.ui.style('.tool:hover',{
						'backgroundColor'	: '#881100'
					});


					//ROAD TOOL
					ige.ui.style('.roadTool',{
						'top'				: 15,
						'left'				: 15
					});



					//BUILDING TOOLS
					ige.ui.style('.building',{ //for now just 'burger tool selection'
						'top'				: 15,
						'left'				: 130 	
					});

					ige.ui.style('.residence_tool',{
						'top'				: 15,
						'left'				: 245
					});

					ige.ui.style('')


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


					self.tools = 
					{
						'roadTool' : new RoadTool(),
						'placeBuildingTool' : new PlaceBuildingTool()
					};

					self.currentTool = self.tools.roadTool.activate(true);

					self.roadToolUi = new IgeUiElement()
										.id('roadToolUI')
										.styleClass('roadTool')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.roadTiles[0],'no-repeat',false,false)
										.mouseUp(function(event,control)
											{
												control.stopPropagation();
												ige.input.stopPropagation();
												self.toggleTool(self.tools.roadTool);
											});

					self.burgerToolUI = new IgeUiElement()
										.id('burgerToolUI')
										.styleClass('building')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.buildings.burgers,'no-repeat',false,false)
										.mouseUp(function(event,control)
										{
											control.stopPropagation();
											ige.input.stopPropagation();
											self.currentBuilding = 'burger';
											self.toggleTool(self.tools.placeBuildingTool);
										});

					self.residenceToolUI = new IgeUiElement()
										.id('residenceToolUI')
										.styleClass('residence_tool')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.buildings.residence_1,'no-repeat',false,false)
										.mouseUp(function(event,control)
										{
											control.stopPropagation();
											ige.input.stopPropagation();
											self.currentBuilding = 'residence';
											self.toggleTool(self.tools.placeBuildingTool);
										});

					self.topHud = new IgeUiElement()
										.id('topHud')
										.mount(uiScene);

					self.timeDisplay = new IgeUiLabel()
										.id('timeDisplayUI')
										// .value("MONDAY")
										.mount(self.topHud)
										.depth(15);


					self.toggleTool = function(newTool)
					{
						if(self.currentTool==newTool)
						{
							self.currentTool.activate(false);
							self.currentTool = null;
						}else{
							self.currentTool = newTool.activate(true);
						}
					}

					self.environnment = new Environnment();

					self.gameManager = new GameManager()
						.mount(baseScene);
				}
			});
		});
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }