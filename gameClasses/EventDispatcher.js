var EventDispatcher = function(tileMap)
{

	tileMap.mouseUp(function(tileX,tileY,event){
		switch(event.button)
		{
			case 2:
				ige.client.cameraControls.clicCall(tileX,tileY,event);
				break;
			case 0:
				ige.client.currentTool.clicCall(tileX,tileY,event);
				break;
		}
	});

	tileMap.mouseMove(function(tileX,tileY,event)
	{
		ige.client.currentTool.moveEvent(tileX,tileY,event);
	});

}