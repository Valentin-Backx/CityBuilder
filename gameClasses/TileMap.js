var TileMap = IgeTileMap2d.extend({
	classId : 'TileMap',
	init : function(){
		IgeTileMap2d.prototype.init.call(this);

		var baseScene = ige.$('baseScene');

		this
			.depth(1)
			.drawGrid(60)
			.isometricMounts(true)
			.tileWidth(40)
			.tileHeight(40);
	}
});