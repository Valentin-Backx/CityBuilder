var Burgers = Building.extend({
	
	classId : 'Burgers',

	buildingType : 'food',

	foodQuality : 0.2, // 0 to 1 	
	cost : 350,
	income : 0,
	altitude : 35,

	init : function()
	{

		Building.prototype.init.call(this);

		this.toolUiElement = ige.client.burgerToolUI;

		var self = this;

		this.sprite = ige.client.gameTextures.buildings.burgers;
		EB.subscribe('NEW_STUDY_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);
		EB.subscribe('NEW_RESIDENTIAL_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);
		EB.subscribe('NEW_DRINKING_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);


	},	

	size:
	{
		'w' : 2,
		'h' : 2,
		'offsetX' : 20,
		'offsetY' : 19
	},

	draw : function()
	{
		var width = 2 * ige.client.tileMap._tileWidth * this.size.w;
		var ratio =   2 * ige.client.tileMap._tileWidth * this.size.w / this.sprite._sizeX;

		this.image = new IgeEntity()
			.bounds3d
				(
					width,
					this.sprite._sizeY * ratio,
					50
				)
			.mount(this)
			.translateBy(4,-1,0);
			
		this.image.texture(this.sprite)
		
		return this;
	},

	update : function()
	{


		Building.prototype.update.call(this);
	},

	seekPoIs : function()
	{
		this.closestStudy = this.getClosestStudy();	
		this.closestResidence = this.getClosestResidential();
		this.closestDrinking = this.getClosestDrinking();
	},

	place : function(tileX,tileY)
	{
		Building.prototype.place.call(this,tileX,tileY);
		EB.broadcast('NEW_FOOD_BUILDING',this);
	},

	newDayCallback : function(newDay)
	{
		Building.prototype.newDayCallback.call(this);
		if(newDay=="Saturday")
		{
			ige.client.gameManager.contribution(this.income);
			this.income = 0;
		}
	},

	unsubscribeFromEvents : function()
	{
		EB.unsubscribeFromEvents('NEW_STUDY_BUILDING',this);
		EB.unsubscribeFromEvents('NEW_RESIDENTIAL_BUILDING',this);
		EB.unsubscribeFromEvents('NEW_DRINKING_BUILDING',this);

		Building.prototype.unsubscribeFromEvents.call(this);
	}

});