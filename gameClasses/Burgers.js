var Burgers = Building.extend({
	
	classId : 'Burgers',

	buildingType : 'food',

	foodQuality : 0.2, // 0 to 1 
	maxInfluenceRadius : 25,	
	init : function()
	{

		Building.prototype.init.call(this);

		this.toolUiElement = ige.client.burgerToolUI;

		var self = this;

		EB.subscribe('NEW_ROAD',function()
		{
			this.roadEntry = this.touchingRoad();

			this.roadNetworkChanged = true;

		},self);

		this.sprite = ige.client.gameTextures.buildings.burgers;
		EB.subscribe('NEW_STUDY_BUILDING',function()
		{
			this.closestStudy = this.getClosestStudy();
		},self);
		EB.subscribe('NEW_RESIDENTIAL_BUILDING',function()
		{
			this.closestResidence = this.getClosestResidential();
		},self);
		EB.subscribe('NEW_DRINKING_BUILDING',function()
		{
			this.closestDrinking = this.getClosestDrinking();
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
			.size3d
				(
					width,
					this.sprite._sizeY * ratio,
					50
				)
			.mount(this)
			.translateBy(2,-12,0);
			
		this.image.texture(this.sprite)
		
		return this;
	},

	update : function()
	{
		if(this.roadNetworkChanged)
		{

			this.closestStudy = this.getClosestStudy();	
			this.closestResidence = this.getClosestResidential();
			this.closestDrinking = this.getClosestDrinking();
			this.roadNetworkChanged = false;			
		}

		Building.prototype.update.call(this);
	},

	place : function()
	{
		Building.prototype.place.call(this);
		EB.broadcast('NEW_FOOD_BUILDING',this);
	}

});