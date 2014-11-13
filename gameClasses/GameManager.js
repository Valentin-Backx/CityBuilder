var GameManager = IgeEntity.extend({


	classId : 'GameManager',


	init : function()
	{
		IgeEntity.prototype.init.call(this);

		EB.subscribe('BUILDING_DESTROYED',this.onBuildingDestroyed,this);
	},

	budget : 100000,

	startTime : new Date(),

	days : ['Monday','Tuesday','Wednesday','Thirsday','Friday','Saturday','Sunday'],

	currentDay :'monday',

	residentialBuildings : [],
	foodBuildings : [],
	schoolBuildings : [],
	drinkingBuildings : [],

	update : function()
	{
		IgeEntity.prototype.update.call(this);
		this.advanceTime();
	},

	advanceTime : function()
	{
		var day;
		if(!ige.client.DEBUG)
		{
			day = this.days[Math.floor(((new Date() - this.startTime) / 180000) % 7)];			
		}else
		{
			day = this.days[Math.floor(((new Date() - this.startTime) / 1000) % 7)];
		}

		if(day != this.currentDay)
		{

			EB.broadcast('NEXT_DAY',day);
		}

		this.currentDay = day;
		ige.client.timeDisplay.value(this.currentDay);
	},
	others : [],

	newBuilding : function(building)
	{
		if(building.buildingType=="residence")
		{
			// console.log("residence");
			this.residentialBuildings.push(building);
		}else if(building.buildingType=="food")
		{
			// console.log("food");
			this.foodBuildings.push(building);
		}else
		{
			// console.log("nope");
			this.others.push(building);
		}
	},

	onBuildingDestroyed : function(building)
	{
		for (var i = this.residentialBuildings.length - 1; i >= 0; i--) {
			if(this.residentialBuildings[i] == building)
			{
				this.residentialBuildings.splice(i,1);
				EB.broadcast('NEW_RESIDENTIAL_BUILDING');
				return;
			}
		};

		for (var i = this.foodBuildings.length - 1; i >= 0; i--) {
			if(this.foodBuildings[i]==building)
			{
				this.foodBuildings.splice(i,1);
				EB.broadcast('NEW_FOOD_BUILDING');
				return;
			}
		};

		for (var i = this.schoolBuildings.length - 1; i >= 0; i--) {
			if(this.schoolBuildings[i]==building)
			{
				this.schoolBuildings.splice(i,1);
				EB.broadcast('NEW_STUDY_BUILDING');
				return;
			}
		};

		for (var i = this.drinkingBuildings.length - 1; i >= 0; i--) {
			if(this.drinkingBuildings[i]==building)
			{
				this.drinkingBuildings.splice(i, 1);
				EB.broadcast('NEW_DRINKING_BUILDING');
				return;
			}
		};
	}
});