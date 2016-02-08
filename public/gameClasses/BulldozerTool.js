var BulldozerTool = IgeEntity.extend({
	classId : 'bulldozer_tool',

	init : function()
	{

		this.active = false;

		EB.subscribe('BUILDING_CLICKED',this.onBuildingClicked,this);
	},

	activate : function(toggle)
	{
		this.active = toggle;
		if(toggle)
			ige.client.bulldozerToolUI.styleClass('activeTool');
		else
		{
			ige.client.bulldozerToolUI.styleClass('inActiveTool');
		}	

		return this;		
	},








	clicCall : function(tileX,tileY,event) {
		console.log("clicked");
	},

	moveEvent : function(event) {
		
	},

	onBuildingClicked : function(building) {

		if(!this.active)
		{
			return;
		}
		ige.client.tileMap.unOccupyTile(building.position.x,building.position.y ,building.size.w,building.size.h);

		building.destroy();

		// for (var i = building.position.x; i < building.position.x + building.size.w;i++) {
		// 	for (var j = building.position.y; j < building.position.y + building.size.h;j++) {
		// 		ige.
		// 	};
		// };
	}


});