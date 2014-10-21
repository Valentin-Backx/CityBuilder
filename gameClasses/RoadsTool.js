var RoadTool = function()
{
	this.active = false;

	this.drawing = false;
	this.startTile = null; 

	this.tilesDrawing = [];

	ige.client.tileMap.mouseUp(function(tileX,tileY,event)
	{
		if(this.active&&event.button==0)
		{
			if(this.drawing)
			{
				var currentTile = ige.tileMap.pointToTile(ige.tileMap.mouseTilePoint());

				

			}else{
				this.startTile = ige.tileMap.pointToTile(ige.tileMap.mouseTilePoint());
				this.drawing = true;
			}
		}
	});
}

RoadTool.prototype.activate = function(bool) {
	this.active = bool;
};