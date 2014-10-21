var CameraControls = function(){
	
	ige.client.tileMap.mouseUp(function(tileX,tileY,event)
	{
		if(event.button==2)
			ige._currentViewport.camera.translateToPoint(this.mousePosWorld());
	});


};
