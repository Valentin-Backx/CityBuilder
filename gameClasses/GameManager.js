var GameManager = IgeEntity.extend({


	classId : 'GameManager',


	init : function()
	{
		IgeEntity.prototype.init.call(this);
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

		var day = this.days[Math.floor(((new Date() - this.startTime) / 180000) % 7)];

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
	}
});