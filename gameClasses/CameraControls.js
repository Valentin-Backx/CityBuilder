var CameraControls = function(){

	this.clicCall = function(tileX,tileY,event)
	{
		ige._currentViewport.camera.translateToPoint(ige.client.tileMap.mousePosWorld());
	};


};
