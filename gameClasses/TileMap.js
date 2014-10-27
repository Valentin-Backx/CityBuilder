var TileMap = IgeTextureMap.extend({
	classId : 'TileMap',
	init : function(){
		IgeTextureMap.prototype.init.call(this);

		var baseScene = ige.$('baseScene');

		this
			.depth(1)
			.drawGrid(60)
			.isometricMounts(true)
			.tileWidth(40)
			.tileHeight(40)
			.highlightOccupied(true);
	}
});

TileMap.prototype.paintBackground = function(){
	for (var i =  63 ; i >= 0; i--) {
		for (var j = 63; j >= 0; j--) {
			this.paintTile(i,j,0,1);
		};
	};
};