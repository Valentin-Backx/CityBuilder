var EventDispatcher = function(tileMap)
{
	var movePoint = new IgePoint(0,0,0).toIso();

	tileMap.mouseUp(function(tileX,tileY,event){
		// console.log("tileX "+tileX+" tileY "+tileY);
		switch(event.button)
		{
			case 2:
				ige.client.cameraControls.clicCall(tileX,tileY,event);
				break;
			case 0:
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