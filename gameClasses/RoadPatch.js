var RoadPatch = IgeEntity.extend({
	classId : 'RoadPatch',

	init : function(myTexture)
	{
		this.texture = myTexture;

		IgeEntity.prototype.init.call(this);

		var tileMap = ige.client.tileMap;
		var tileDiagonal = Math.sqrt(ige.client.tileMap._tileWidth * ige.client.tileMap._tileWidth * 2);

		var tileVerticalRatio =  tileDiagonal / 50;
		var tileHorizontalRatio = tileDiagonal / ige.client.gameTextures.roadTiles._sizeX;


		this

			.isometric(true)
			.size3d(ige.client.tileMap._tileWidth,ige.client.tileMap._tileHeight,20)
			.drawBounds(true)
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
			.size3d(
				2 * tileMap._tileWidth,// 80, 2 x tileWidth...????
				this.texture._sizeY / (50 / tileMap._tileHeight)  ,// 40, 1 x tileHeight.....
				15 / (50 / tileMap._tileHeight)
			)
			.translateTo(0,17,0)
			.mount(this);

	// console.log(this.texture);


};