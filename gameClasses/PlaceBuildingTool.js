var PlaceBuildingTool = function()
{
	this.active = false;

	this.buildingPLaceHolders = [];

}

PlaceBuildingTool.prototype.clicCall = function(tileX,tileY,event) {
	if(!this.active) return;


	if(this.isSpotValid(tileX,tileY))
	{
		this.currentBuilding
			.mount(ige.client.tileMap)
			.tileWidth(this.currentBuilding.size.w)
			.tileHeight(this.currentBuilding.size.h)
			.translateToTile(tileX,tileY)
			.translateBy(this.currentBuilding.size.offsetX,this.currentBuilding.size.offsetY,0)
			.occupyTile(tileX,tileY,this.currentBuilding.size.w,this.currentBuilding.size.h)
			.draw()
			.place();

	}else
	{
		console.log("spot invalide");
		return;
	}

	ige.client.gameManager.newBuilding(this.currentBuilding);

	this.currentBuilding = null;
	
	this.desactivate();
};

PlaceBuildingTool.prototype.isSpotValid = function(x,y) {

	var valid = true;

	for (var i = 0 ;i < this.currentBuilding.size.w;i++) {
		for (var j = 0; j < this.currentBuilding.size.h;j++) {
			valid = valid && !ige.client.tileMap.isTileOccupied(x+i,y+j);
		};
	};

	return CheckTilesOccupied(x,y,this.currentBuilding.size.w,this.currentBuilding.size.h);

	return !ige.client.tileMap.isTileOccupied(
		x,
		y,
		this.currentBuilding.size.w,
		this.currentBuilding.size.h
	);
};

PlaceBuildingTool.prototype.desactivate = function() {
	
	this.clearPlaceholders();

	this.active = false;
	
	if(this.currentBuilding) this.currentBuilding.destroy(); //destroying building, if it was not placed

	this.currentBuilding = null;

	ige.client.burgerToolUI.applyStyle({'backgroundColor'	: '#AA4411'});

	ige.client.currentTool = null;
};

PlaceBuildingTool.prototype.activate = function(bool) {
	this.active = bool;

	if(bool)
	{
		ige.client.burgerToolUI.applyStyle({'backgroundColor'	: '#881100'});
		
		this.currentBuilding = this.getCurrentBuilding();

	}
	else
		this.desactivate();

	return this;
};

PlaceBuildingTool.prototype.moveEvent = function(tileX,tileY,event) {
	if(this.active)
	{
		this.clearPlaceholders();

		for (var i = 0 ;i < this.currentBuilding.size.w; i++) {
			for (var j = 0 ; j < this.currentBuilding.size.h;j++) {
				this.buildingPLaceHolders.push(getBuildingPlaceHolder(tileX + i, tileY + j));
			};
		};
	}
};

PlaceBuildingTool.prototype.getCurrentBuilding = function() {
	switch(ige.client.currentBuilding)
	{
		case 'burger':
			return new Burgers();
			break;
		case 'residence':
			return new ResidenceUniversitaire();
			break;
	}
};

PlaceBuildingTool.prototype.clearPlaceholders = function() {
	for (var i = this.buildingPLaceHolders.length - 1; i >= 0; i--) {
		this.buildingPLaceHolders[i].destroy();
	};
};

PlaceBuildingTool.prototype.debugPlace = function(x,y) {
	
	this.currentBuilding = new Burgers();
	this.currentBuilding
			.mount(ige.client.tileMap)
			.tileWidth(this.currentBuilding.size.w)
			.tileHeight(this.currentBuilding.size.h)
			.translateBy(this.currentBuilding.size.offsetX,this.currentBuilding.size.offsetY,0)
			.occupyTile()
			.translateToTile(x,y,0)
			.translateBy(this.currentBuilding.size.offsetX,this.currentBuilding.size.offsetY,0)
			.draw()
};
