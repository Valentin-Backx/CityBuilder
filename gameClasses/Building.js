var Building = IgeEntity.extend({

	classId : 'Building',
	init : function()
	{

		IgeEntity.prototype.init.call(this);

		this
			.isometric(true)
			.isometricMounts(true)
			.drawBounds(true)
			.size3d(ige.client.tileMap._tileWidth * this.size.w,ige.client.tileMap._tileHeight * this.size.h,20);


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
	},

	getClosestBuilding : function(buildingsArray)
	{
		var debug = this.classId() == 'ResidenceUniversitaire';

		if(buildingsArray.length == 0 || !this.roadEntry) return null;


		var closest;
		
		for (var i = buildingsArray.length - 1; i >= 0; i--) {
			// if(debug) debugger;
			
			if(buildingsArray[i]==this) continue;


			var currentRoadEntry = buildingsArray[i].roadEntry;

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
					'length'	: path.length
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
	}
});