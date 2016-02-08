var GameManager = IgeEntity.extend({

	classId : 'GameManager',

	currentTime : 0, //currentTime is in minutes

	currentSpeed : 1,

	speeds : [10,50,150],

	init : function()
	{
		IgeEntity.prototype.init.call(this);

		EB.subscribe('BUILDING_DESTROYED',this.onBuildingDestroyed,this);

		this.previousDate = new Date();

		this.modifySpeed(this.currentSpeed);//used to initialize the active speed icon
	},

	budget : 100000,

	startTime : new Date(),

	days : ['Monday','Tuesday','Wednesday','Thirsday','Friday','Saturday','Sunday'],

	currentDay :'Monday',

	residentialBuildings : [],
	foodBuildings : [],
	schoolBuildings : [],
	drinkingBuildings : [],

	update : function()
	{
		IgeEntity.prototype.update.call(this);
		this.advanceTime();
		this.displayBudget();
		this.displayClock();
	},

	advanceTime : function()
	{

		var currentDate = new Date();
		var diffTime = (currentDate - this.previousDate) / 1000;  //number of seconds since last update

		var previousTime = this.currentTime;

		var day = this.currentDay;

		if((this.currentTime + diffTime * this.speeds[this.currentSpeed]) / (24 * 60) > 1)
		{
			day = this.days[ (this.days.indexOf(day) + 1) % 7  ]
		}

		this.currentTime = (this.currentTime + diffTime * this.speeds[this.currentSpeed]) % (24 * 60);



		
		if(((this.currentTime / 60) | 0) != ((previousTime / 60) | 0) )
		{
			EB.broadcast('NEW_HOUR',((this.currentTime / 60) | 0));
		}



		this.previousDate = currentDate;

		// if(!ige.client.DEBUG)
		// {
		// 	day = this.days[Math.floor(((new Date() - this.startTime) / 180000) % 7)];			
		// }else
		// {
		// 	day = this.days[Math.floor(((new Date() - this.startTime) / 1000) % 7)];
		// }

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
		}else if(building.buildingType=='study')
		{
			this.schoolBuildings.push( building);
		}else
		{
			// console.log("nope");
			this.others.push(building);
		}
		this.budget -= building.cost;
	},

	canAffordBuilding : function(building)
	{
		return this.budget >= building.cost;
	},

	canAffordRoad : function(cost)
	{
		return this.budget >= cost;
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
	},
	displayBudget : function()
	{
		ige.client.budgetDisplay.value("$ "+this.budget)
	},

	displayClock : function()
	{
		ige.client.clockDisplay.value(((this.currentTime / 60) | 0)+':'+((this.currentTime % 60) | 0))
	},

	contribution : function(amount)
	{
		this.budget+=amount;
	},

	withdrawRoadCost : function(cost)
	{
		this.budget -= cost;
	},

	modifySpeed : function(speed)
	{
		ige.client.speed1Control.cell(2);
		ige.client.speed2Control.cell(2);
		ige.client.speed3Control.cell(2);

		this.currentSpeed = speed;
		
		switch(speed)
		{
			case 0:
				ige.client.speed1Control.cell(1);
			break;
			case 1:
			ige.client.speed2Control.cell(1);
			break;
			case 2:
			ige.client.speed3Control.cell(1);
			break;
		}
	}
});