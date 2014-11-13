var BulldozerTool = function()
{
	this.active = false;
}

BulldozerTool.prototype.activate = function(toggle) {
	this.active = toggle;
	if(toggle)
		ige.client.roadToolUi.styleClass('activeTool');
	else
	{
		ige.client.roadToolUi.styleClass('inActiveTool');
	}	
};

BulldozerTool.prototype.clicCall = function(tileX,tileY,event) {
	
};