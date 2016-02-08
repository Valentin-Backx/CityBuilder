

var Client = IgeClass.extend({
	classId: 'Client',

	DEBUG :true,

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
			'burgers' 		: new IgeTexture('./assets/buildings/burgerShop1.png'),
			'residence_1' 	: new IgeTexture('./assets/buildings/residence_universitaire1.png'),
			'college'		: new IgeTexture('./assets/buildings/college.png'),
			'bar'			: new IgeTexture('./assets/buildings/bar.png')
		}

		this.gameTextures.tools = 
		{
			'bulldozer' : new IgeTexture('./assets/bulldozer.png')
		}

		this.gameTextures.positiveMigration = new IgeTexture('./assets/pos_migration.png');
		this.gameTextures.negativeMigration = new IgeTexture('./assets/neg_migration.png');

		this.gameTextures.icons = 
		{
			'speed_atlas' : new IgeCellSheet('./assets/icons/speed_atlas.png',2,1),
			'active_speed' :new IgeTexture('./assets/icons/active_speed_button.png'),
			'inactive_speed' : new IgeTexture('./assets/icons/inactive_speed_button.png')
		}

		this.gameTextures.characters =
		{
			'chara_student'    : new IgeCellSheet('./assets/walk.png',8,8)
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

		// ige.on('classesLoaded',function()
		// {
		// 	console.log("yay");
		// });

		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {

			// while(!BulldozerTool)
			// {
				
			// }
			// Create the HTML canvas
			ige.createFrontBuffer(true);

			// Start the engine
			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {

					self.uiStylesCustom = new UIStyles(); 

					// Add base scene data
					ige.addGraph('IgeBaseScene');

					// CREATE SOME ENTITIES AND WHOTNOT HERE
					var baseScene = ige.$('baseScene');

					// ige.$('vp1').drawBounds(true);

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
						.drawBounds(true)
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
					

					var uiScene = new IgeScene2d()
						.id('uiScene')
						.ignoreCamera(true)
						.mount(baseScene)
						.depth(10)
						.opacity(0.5)
						.mouseUp(function(event,control)
						{
							// console.log("ui clicked");
						});

					// self.uiViewPort = new IgeViewport()
					// 	.depth(10)
					// 	.scene(uiScene);

					// self.uiViewPort.mount(ige);

					self.toolsSelectionUI = new ToolsSelectionUI()
						.mount(uiScene);



					self.roadToolUi = new IgeUiElement()
										.id('roadToolUI')
										.styleClass('roadTool')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.roadTiles[0],'no-repeat',false,false)
										.mouseUp(function(event,control)
											{
												self.eventDispatcher.eventConsumed = true;
												control.stopPropagation();
												ige.input.stopPropagation();
												self.toggleTool(self.tools.roadTool);
												self.eventDispatcher.eventConsumed = false;
											});

					self.burgerToolUI = new IgeUiElement()
										.id('burgerToolUI')
										.styleClass('building')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.buildings.burgers,'no-repeat',false,false)
										.mouseUp(function(event,control)
										{
											self.eventDispatcher.eventConsumed = true;	
											control.stopPropagation();
											ige.input.stopPropagation();
											self.currentBuilding = 'burger';
											self.toggleTool(self.tools.placeBuildingTool);
												self.eventDispatcher.eventConsumed = false;
										});

					self.residenceToolUI = new IgeUiElement()
										.id('residenceToolUI')
										.styleClass('residence_tool')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.buildings.residence_1,'no-repeat',false,false)
										.mouseUp(function(event,control)
										{
											self.eventDispatcher.eventConsumed = true;
											control.stopPropagation();
											ige.input.stopPropagation();
											self.currentBuilding = 'residence';
											self.toggleTool(self.tools.placeBuildingTool);
											self.eventDispatcher.eventConsumed = false;
										});

					self.collegeToolUi = new IgeUiElement()
										.id('college-tool-ui')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.buildings.college,'no-repeat',false,false)
										.mouseUp(function(event,control)
										{

											self.eventDispatcher.eventConsumed = true;	
											control.stopPropagation();
											ige.input.stopPropagation();
											self.currentBuilding = 'college';
											self.toggleTool(self.tools.placeBuildingTool);
												self.eventDispatcher.eventConsumed = false;
										});

					self.bulldozerToolUI = new IgeUiElement()
										.id('bulldozerToolUI')
										.styleClass('tool')
										.mount(self.toolsSelectionUI)
										.backgroundPattern(self.gameTextures.tools.bulldozer,'no-repeat',false,false)
										.mouseUp(function(event,control)
										{
											self.eventDispatcher.eventConsumed = true;
											control.stopPropagation();
											ige.input.stopPropagation();
											self.toggleTool(self.tools.bulldozerTool);
												self.eventDispatcher.eventConsumed = false;										
										});

					self.barToolUI = new IgeUiElement()
									.id('bar-tool-ui')
									.styleClass('tool')
									.mount(self.toolsSelectionUI)
									.backgroundPattern(self.gameTextures.buildings.bar,'no-repeat',false,false)
									.mouseUp(function(event,control)
									{
										self.eventDispatcher.eventConsumed = true;
										control.stopPropagation();
										ige.input.stopPropagation();
										self.currentBuilding = 'bar';
										self.toggleTool(self.tools.placeBuildingTool);
												self.eventDispatcher.eventConsumed = false;
									});



					self.topHud = new IgeUiElement()
										.id('topHud')
										.mount(uiScene);

					self.timeDisplay = new IgeUiLabel()
										.id('timeDisplayUI')
										// .value("MONDAY")
										.mount(self.topHud)
										.depth(15);

					self.budgetDisplay = new IgeUiLabel()
										.id('budget-display')
										.mount(self.topHud)
										.depth(15)

					self.clockDisplay = new IgeUiLabel()
										.id("clock")
										.mount(self.topHud)
										.depth(15);



					self.speedControls = new IgeUiElement()
										.id('speed-control-ui')
										.mount(self.topHud)
										.depth(11);



					self.speed1Control = new IgeUiElement()
										.id('speed-1-control')
										.styleClass('speed-control-button')
										.texture(ige.client.gameTextures.icons.speed_atlas)
										.cell(2)
										.mount(self.speedControls)

										.depth(15)
										.mouseUp(function(event,control)
										{
											self.eventDispatcher.eventConsumed = true;
											control.stopPropagation();
											ige.input.stopPropagation();
											ige.client.gameManager.modifySpeed(0);
												self.eventDispatcher.eventConsumed = false;
										});

					self.speed2Control = new IgeUiElement()
										.id('speed-2-control')
										.styleClass('speed-control-button')
										.texture(ige.client.gameTextures.icons.speed_atlas)
										.cell(2)
										.mount(self.speedControls)
										.depth(15)
										.mouseUp(function(event,control)
										{
											self.eventDispatcher.eventConsumed = true;
											control.stopPropagation();
											ige.input.stopPropagation();
											ige.client.gameManager.modifySpeed(1);
												self.eventDispatcher.eventConsumed = false;
										});

					self.speed3Control = new IgeUiElement()
										.id('speed-3-control')
										.styleClass('speed-control-button')
										.texture(ige.client.gameTextures.icons.speed_atlas)
										.cell(2)
										.mount(self.speedControls)
										.depth(15)
										.mouseUp(function(event,control)
										{
											self.eventDispatcher.eventConsumed = true;
											control.stopPropagation();
											ige.input.stopPropagation();
											ige.client.gameManager.modifySpeed(2);
											self.eventDispatcher.eventConsumed = false;
										});

					self.tools = 
					{
						'roadTool' 				: new RoadTool(),
						'placeBuildingTool' 	: new PlaceBuildingTool(),
						'bulldozerTool' 		: new BulldozerTool()
					};

					self.currentTool = self.tools.roadTool.activate(true);


					self.toggleTool = function(newTool)
					{
						if(self.currentTool==newTool)
						{
							self.currentTool.activate(false);
							self.currentTool = null;
						}else{
							if(self.currentTool)
								self.currentTool.activate(false);
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