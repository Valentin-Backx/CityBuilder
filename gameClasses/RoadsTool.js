var RoadTool = function()
{
	this.active = false;

	this.drawing = false;

	this.startPoint = null;
	this.startTile = null; 

	this.tilesDrawing = [];

	this.pathFinder = new IgePathFinder();
}


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
			this.clearTilesDrawing();
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
	this.drawing = false;
	return this;
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

	this.clearTilesDrawing();

	for (var i = this.currentPath.length - 1; i >= 0; i--) {
		
		this.tilesDrawing.push(
			getBuildingPlaceHolder(this.currentPath[i].x,this.currentPath[i].y)
		);
	};
};

RoadTool.prototype.clearTilesDrawing = function(){
	for (var i = this.tilesDrawing.length - 1; i >= 0; i--) {
		this.tilesDrawing[i].destroy();
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
	if(tile != null)
	{
		return tile.classId == "RoadPatch";
	}else{
		return true;	
	}
};
