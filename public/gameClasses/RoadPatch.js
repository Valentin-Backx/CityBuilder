var RoadPatch = IgeEntity.extend({
	classId : 'RoadPatch',

	init : function()
	{
		// this.texture = myTexture;

		IgeEntity.prototype.init.call(this);

		var tileMap = ige.client.tileMap;
		var tileDiagonal = Math.sqrt(ige.client.tileMap._tileWidth * ige.client.tileMap._tileWidth * 2);

		var tileVerticalRatio =  tileDiagonal / 50;
		var tileHorizontalRatio = tileDiagonal / ige.client.gameTextures.roadTiles._sizeX;


		this

			.isometric(true)
			.isometricMounts(true)
			.drawBounds(true)
			.bounds3d(ige.client.tileMap._tileWidth,ige.client.tileMap._tileHeight,14);


	}

});

RoadPatch.prototype.applyTexture = function(texture) {
	
	this.texture = texture;
	var tileMap = ige.client.tileMap;

	if(this.image)
	{
		this.image.destroy();
	}

	this.image = new IgeEntity()
			.texture(texture)
			.bounds3d(
				2 * tileMap._tileWidth,// 80, 2 x tileWidth...????
				this.texture._sizeY / (50 / tileMap._tileHeight)  ,// 40, 1 x tileHeight.....
				0// 15 / (50 / tileMap._tileHeight)
			)
			.translateTo(0,0,0)
			.mount(this);

	// console.log(this.texture);
};

RoadPatch.prototype.setTileCoords = function(x,y) {
	this.x = x;
	this.y = y;
	return this;
};