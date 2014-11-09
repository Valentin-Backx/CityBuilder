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

		var self = this;
		EB.subscribe('NEW_ROAD',function()
		{
			this.roadEntry = this.touchingRoad();

			console.log(this.roadEntry);
		},self);
	},
	
	size : {
		'w' : 1,
		'h' : 1,
		'offsetX' : 1,
		'offsetY' : 1
	},

	place : function(tileX,tileY)
	{
		this.roadEntry = this.touchingRoad();

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
	}
});