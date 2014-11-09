var getBuildingPlaceHolder = function(x,y)
{
		return	new IgeEntity()
				.isometric(true)
				.drawBounds(true)
				.mount(ige.client.tileMap)
				.tileWidth(1)
				.tileHeight(1)
				.backgroundPattern(ige.client.gameTextures.highlightTile,'no-repeat',false,true)
				.translateToTile(x,y,0)
				.depth(0)
				.highlight(true)
}