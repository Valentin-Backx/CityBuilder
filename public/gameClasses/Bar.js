var Bar = Building.extend({
	classId : 'bar',

	funQuality : 0.4,

	altitude : 25,

	init : function()
	{
		this.toolUiElement = ige.client.residenceToolUI;

		var self = this;

		this.sprite = ige.client.gameTextures.buildings.bar;


		Building.prototype.init.call(this);
	},

	size:
	{
		'w' : 3,
		'h' : 2,
		'offsetX' : 41,
		'offsetY' : 21
	},

	update : function()
	{
		Building.prototype.update.call(this);
	},

	seekPoIs : function()
	{
	},

	newDayCallback : function(newDay)
	{
		Building.prototype.newDayCallback.call(this);
	},

	draw : function()
	{
		// var width = 2 * ige.client.tileMap._tileWidth * this.size.w;
		// var ratio =   2 * ige.client.tileMap._tileWidth * this.size.w / this.sprite._sizeX;

		var widthRatio = 5;
		var heightRatio = 3.6;

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
			.translateBy(1,-8,0);
			
		this.image.texture(this.sprite);
		
		return this;
	},

	unsubscribeFromEvents : function()
	{

		EB.unsubscribeFromEvents('NEW_STUDY_BUILDING',this);
		EB.unsubscribeFromEvents('NEW_FOOD_BUILDING',this);
		EB.unsubscribeFromEvents('NEW_DRINKING_BUILDING',this);

		Building.prototype.unsubscribeFromEvents.call(this);

	},

	place : function(tileX,tileY)
	{
		Building.prototype.place.call(this,tileX,tileY);
		EB.broadcast('NEW_DRINKING_BUILDING',this);
	}

});