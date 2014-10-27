var RoadTool = function()
{
	this.active = false;

	this.drawing = false;

	this.startPoint = null;
	this.startTile = null; 

	this.tilesDrawing = [];

	this.pathFinder = new IgePathFinder();
}

RoadTool.prototype.init = function() {

	var self = this;

	return this;
};

RoadTool.prototype.clicCall = function(tileX,tileY,event) {

	// console.log(tileX," ",tileY);

	if(this.active)
	{
		if(this.drawing)
		{
			this.placeRoad();
			this.clearPath();
			this.drawing = false;
			ige.client.roadNetwork.updateNetwork();
			// this.active = false; //a virer (debug)
		}else{
			this.startTile = ige.client.tileMap.mouseToTile();
			this.startPoint = ige.client.tileMap.mouseToTile();
			this.drawing = true;
		}
	}
};

RoadTool.prototype.moveEvent = function(tileX,tileY,event) {


	if(!this.drawing) return;
	this.updatePath(event);	
};

RoadTool.prototype.activate = function(bool) {
	this.active = bool;
};


RoadTool.prototype.updatePath = function(event) {

	var currentTile = ige.client.tileMap.mouseToTile();

	if(this.currentPath)
	{
		this.clearPath();
	}

	// console.log(this.pathFinder);

	this.currentPath = this.pathFinder.aStar(
		ige.client.tileMap,
		this.startPoint,
		currentTile,
		this.validRoadTile
	);

	for (var i = this.currentPath.length - 1; i >= 0; i--) {
		// console.log(this.currentPath[i]);
		ige.client.tileMap.occupyTile( 
			this.currentPath[i].x,
			this.currentPath[i].y,
			1,
			1,
			new IgeEntity()
		);
	};
};

RoadTool.prototype.placeRoad = function() {
	for (var i = this.currentPath.length - 1; i >= 0; i--) {
		ige.client.roadNetwork.addRoute(this.currentPath[i]);
	};
};

RoadTool.prototype.clearPath = function() {
	var self = this;
	for(var i = this.currentPath.length - 1; i >= 0; i--) {
		ige.client.tileMap.unOccupyTile(
			 self.currentPath[i].x, 
			 self.currentPath[i].y,
			 1,
			 1
		 );
	};	
};

RoadTool.prototype.validRoadTile = function(tile) {
	return true;
};
