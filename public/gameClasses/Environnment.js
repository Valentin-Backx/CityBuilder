var Environnment = function()
{
		var tileMap = ige.client.tileMap;

		var grassTexture = ige.client.gameTextures.grassTile;

		this.grassTileEntities = [];
		this.grassImagesEntities = [];

		// for (var i = tileMap.size.w - 1; i >= 0; i--) {
		// 	for (var j = tileMap.size.h - 1; j >= 0; j--) {

		// 		var grassTile = new IgeEntity()
		// 					.isometric(true)
		// 					.size3d(ige.client.tileMap._tileWidth,ige.client.tileMap._tileHeight,20)
		// 					.drawBounds(true)

		// 					.mount(ige.client.tileMap)
		// 					.tileWidth(1)
		// 					.tileHeight(1)
		// 					.translateToTile(i,j,0)
		// 					.depth(1);

		// 		this.grassTileEntities.push(grassTile);

		// 		var tex = new IgeEntity()
		// 			.texture(grassTexture)
		// 			.size3d(
		// 				2 * tileMap._tileWidth,// 80, 2 x tileWidth...????
		// 				grassTexture._sizeY / (50 / tileMap._tileHeight)  ,// 40, 1 x tileHeight.....
		// 				15 / (50 / tileMap._tileHeight)
		// 			)
		// 			.translateTo(0,17,0)
		// 			.mount(grassTile)
		// 			.depth(1);

		// 		this.grassImagesEntities.push(tex);
		// 	};
		// };

};