var EventDispatcher = function(tileMap)
{
	this.eventConsumed = false;
	// var movePoint = new IgePoint(0,0,0).toIso();

	var self = this;
	tileMap.mouseUp(function(event,control){//tileX,tileY,event){
		


		var tilePos = tileMap.mouseToTile();

		var tileX = tilePos.x;
		var tileY = tilePos.y;

		// console.log(control);
		// debugger;

		if(self.eventConsumed)
		{
			self.eventConsumed = false;
			return;
		}

		switch(event.button)
		{
			case 2:
				ige.client.cameraControls.clicCall(tileX,tileY,event);
				break;
			case 0:
				// console.log(ige.client.currentTool)
				if(ige.client.currentTool)
				{
					ige.client.currentTool.clicCall(tileX,tileY,event);
				}
				break;
		}
	});

	ige._currentViewport.mouseMove(function()
	{
		var tile = tileMap.mouseToTile();
		
		if(ige.client.currentTool)
		{
			ige.client.currentTool.moveEvent(tile.x,tile.y);
		}
	});

}