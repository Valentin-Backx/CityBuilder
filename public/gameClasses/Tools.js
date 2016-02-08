var getBuildingPlaceHolder = function(x,y)
{
	return new IgeEntity()
				.isometric(true)
				.drawBounds(true)
				.mount(ige.client.tileMap)
				.tileWidth(1)
				.tileHeight(1)
				// .backgroundPattern(ige.client.gameTextures.highlightTile,'no-repeat',false,true)
				.texture(ige.client.gameTextures.highlightTile)
				.translateToTile(x,y,0)
				.depth(0)
				.highlight(true)
				.bounds3d(
					ige.client.tileMap.tileWidth()* 2 ,
					ige.client.tileMap.tileHeight(),
					0
				)
				.translateBy(
					-ige.client.tileMap.tileWidth() ,
				-ige.client.tileMap.tileHeight() * (3 / 2),
					0
				);
}