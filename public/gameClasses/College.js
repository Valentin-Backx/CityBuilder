var College = Building.extend({

	cost : 4000,
	classId : 'collegeBuilding',

	buildingType : 'study',
	teachingQuality : 0.4,
	upKeepCost : 150,

	altitude : 60,

	init : function()
	{
		Building.prototype.init.call(this);

		this.toolUiElement = ige.client.collegeToolUi;

		var self = this;


		this.sprite = ige.client.gameTextures.buildings.college;

		EB.subscribe('NEW_FOOD_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);
		EB.subscribe('NEW_DRINKING_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);

		//supposedly, students know where they live, and they're going home at the end of the day, not to whichever residential building is the closest
		// EB.subscribe('NEW_RESIDENTIAL_BUILDING',function()
		// {
		// 	this.pointsOfInterestChanged = true;
		// },self);
	},

	size:
	{
		'w' : 4,
		'h' : 6,
		'offsetX' : 61,
		'offsetY' : 100
	},

	draw : function()
	{
		// var width = 2 * ige.client.tileMap._tileWidth * this.size.w;
		// var ratio =   2 * ige.client.tileMap._tileWidth * this.size.w / this.sprite._sizeX;

		var widthRatio = 11;
		var heightRatio = 7.5;

		var width = ige.client.tileMap._tileWidth * widthRatio;
		var height = ige.client.tileMap._tileHeight * heightRatio;

		this.image = new IgeEntity()
			.bounds3d
				(
					width,
					height,
					100
				)
			.mount(this)
			.translateBy(-4,-1,0);
			
		this.image.texture(this.sprite);
		
		return this;
	},

	update : function()
	{
		Building.prototype.update.call(this);
	},

	seekPoIs : function()
	{
		this.closestFood = this.getClosestFood();
		this.closestDrinking = this.getClosestDrinking();
	},

	newDayCallback : function(newDay)
	{
		Building.prototype.newDayCallback.call(this);
	
		if(newDay=="Saturday")
		{
			ige.client.gameManager.contribution(-this.upKeepCost)	
		}
	},

	place : function(tileX,tileY)
	{
		Building.prototype.place.call(this,tileX,tileY);
		EB.broadcast('NEW_STUDY_BUILDING',this);
	},

	unsubscribeFromEvents : function()
	{
		EB.unsubscribeFromEvents('NEW_DRINKING_BUILDING',this);
		EB.unsubscribeFromEvents('NEW_FOOD_BUILDING',this);

		Building.prototype.unsubscribeFromEvents.call(this);
	}


});