var Burgers = Building.extend({
	
	classId : 'Burgers',

	buildingType : 'food',
	
	init : function()
	{

		Building.prototype.init.call(this);

		this.sprite = ige.client.gameTextures.buildings.burgers;

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
		Building.prototype.update.call(this);
	}

});