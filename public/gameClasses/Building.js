var Building = IgeEntity.extend({

	classId : 'Building',

	maxDeplacement : 20,
	
	pointsOfInterestChanged : false,

	cost :0,

	init : function()
	{

		IgeEntity.prototype.init.call(this);

		var self = this;
		this
			.isometric(true)
			.isometricMounts(true)
			.drawBounds(true)
			.bounds3d(ige.client.tileMap._tileWidth * this.size.w,ige.client.tileMap._tileHeight * this.size.h,20)

			.mouseUp(function(event,control){
				if(ige.client.currentTool==ige.client.tools.bulldozerTool)
				{
					control.stopPropagation();
					EB.broadcast('BUILDING_CLICKED',this);

				}
			});

		EB.subscribe('NEXT_DAY',this.newDayCallback,this);

		EB.subscribe('NEW_ROAD',function()
		{

			this.roadEntry = this.touchingRoad();

			this.roadNetworkChanged = true;

		},self);

		EB.subscribe('NEW_HOUR',this.newHourCallback,self);

	},
	
	size : {
		'w' : 1,
		'h' : 1,
		'offsetX' : 1,
		'offsetY' : 1
	},
	closestFood : null,
	closestStudy : null,
	closestResidence : null,
	closestDrinking : null,

	roadNetworkChanged : false,

	toolUiElement : null,

	place : function(tileX,tileY)
	{
		this.roadEntry = this.touchingRoad();

		this.closestFood = this.getClosestFood();
		this.closestStudy = this.getClosestStudy();
		this.closestDrinking = this.getClosestDrinking();
		this.closestResidence = this.getClosestResidential();

		this.position = 
		{
			'x' : tileX,
			'y' : tileY
		}

		return this;
	},

	sizeToTiles : function()
	{
		this.tileWidth(this.size.w);
		this.tileHeight(this.size.h);
		return this;
	},

	touchingRoad : function()
	{
		return ige.client.roadNetwork.hasContactWithRect(this._occupiedRect);
	},

	update : function()
	{
		IgeEntity.prototype.update.call(this);

		if(this.roadNetworkChanged)
		{
			this.seekPoIs();

			this.roadNetworkChanged = false;			
		}else if(this.pointsOfInterestChanged)
		{
			this.seekPoIs();
			this.pointsOfInterestChanged = false;
		}		
	},

	getClosestBuilding : function(buildingsArray)
	{
		var debug = this.classId() == 'ResidenceUniversitaire';

		// if(debug) debugger;
		if(buildingsArray.length == 0 || !this.roadEntry) return null;


		var closest;
		
		for (var i = buildingsArray.length - 1; i >= 0; i--) {
			// if(debug) debugger;
			
			if(buildingsArray[i]==this) continue;


			var currentRoadEntry = buildingsArray[i].roadEntry;

			// if(debug) console.log(currentRoadEntry)
			if(closest)//il y a déjà un closest path
			{
				if(currentRoadEntry)//si le batiment actuel a une entry....
				{
					var length = ige.client.roadNetwork.getPath(this.roadEntry,currentRoadEntry).length;
					if(length < closest.length)//on teste si le path courant est plus court, si oui on remplace le closest path	
					{
						closest.building = buildingsArray[i];
						closest.length = length;
					}
				}
			}else if ( currentRoadEntry) //pas encore de closest path, on teste si le batiment actuel a un entry point
			{
				var path = ige.client.roadNetwork.getPath(this.roadEntry,currentRoadEntry);
				if(!path) continue;
				closest = {
					'building' 	: buildingsArray[i],
					'length'	: path.length,
					'path'		: path
				};
			};
		};
		return closest;
	},

	getClosestDrinking : function()
	{
		return this.getClosestBuilding(ige.client.gameManager.drinkingBuildings);
	},

	getClosestStudy : function()
	{
		return this.getClosestBuilding(ige.client.gameManager.schoolBuildings);
	},

	getClosestResidential : function()
	{
		return this.getClosestBuilding(ige.client.gameManager.residentialBuildings);
	},

	getClosestFood : function()
	{
		return this.getClosestBuilding(ige.client.gameManager.foodBuildings);
	},

	destroy : function()
	{
		EB.broadcast('BUILDING_DESTROYED',this);
		this.unsubscribeFromEvents();
		IgeEntity.prototype.destroy.call(this);
	},

	unsubscribeFromEvents : function()
	{
		EB.unsubscribeFromEvents('NEW_ROAD',this);
		EB.unsubscribeFromEvents('NEW_HOUR',this);
	},

	newDayCallback : function(newDay)
	{
	},

	newHourCallback : function(hour)
	{

	}
});