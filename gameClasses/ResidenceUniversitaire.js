var ResidenceUniversitaire = Building.extend({
	classId : 'ResidenceUniversitaire',

	buildingType : 'residence',
	
	occupation : 0,
	capacity : 100,
	currentAttractivity : 1, //maximum




	init : function()
	{

		Building.prototype.init.call(this);
		
		this.toolUiElement = ige.client.residenceToolUI;

		var self = this;

		EB.subscribe('NEW_ROAD',function()
		{

			this.roadEntry = this.touchingRoad();

			this.roadNetworkChanged = true;

		},self);


		this.sprite = ige.client.gameTextures.buildings.residence_1;

		EB.subscribe('NEXT_DAY',this.newDayCallback,this);
		
		EB.subscribe('NEW_STUDY_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);
		
		EB.subscribe('NEW_FOOD_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);
		EB.subscribe('NEW_DRINKING_BUILDING',function()
		{
			this.pointsOfInterestChanged = true;
		},self);

		this.unitAttractivity = 1 / this.capacity; //amount of attractivity required to attract 1 resident in this building
		this.maxMigration = 3;
	},

	size:
	{
		'w' : 2,
		'h' : 4,
		'offsetX' : 13,
		'offsetY' : 56
	},

	draw : function()
	{
		// var width = 2 * ige.client.tileMap._tileWidth * this.size.w;
		// var ratio =   2 * ige.client.tileMap._tileWidth * this.size.w / this.sprite._sizeX;

		var widthRatio = 5.9;
		var heightRatio = 5.5;

		var width = ige.client.tileMap._tileWidth * widthRatio;
		var height = ige.client.tileMap._tileHeight * heightRatio;

		this.image = new IgeEntity()
			.size3d
				(
					width,
					height,
					100
				)
			.mount(this)
			.translateBy(2,-12,0);
			
		this.image.texture(this.sprite);
		
		return this;
	},

	update : function()
	{
		if(this.roadNetworkChanged)
		{

			this.seekPoIs();			
			this.roadNetworkChanged = false;			
		}else if(this.pointsOfInterestChanged)
		{
			this.seekPoIs();
			this.pointsOfInterestChanged = false;
		}

		Building.prototype.update.call(this);
	},

	seekPoIs : function()
	{
		this.closestStudy = this.getClosestStudy();	
		this.closestFood = this.getClosestFood();
		this.closestDrinking = this.getClosestDrinking();		
	},

	newDayCallback : function(newDay)
	{
		this.currentAttractivity = this.calculateAttractivity();
		this.manageImmigration();
	},

	calculateAttractivity : function()
	{
		var foodSatisfaction = this.calculateFoodSatisfaction();
		var drinkingSatisfaction = this.calculateDrinkingSatisf();
		var studySatisfaction = this.calculateStudySatisf();

		this.currentAttractivity = ( foodSatisfaction + drinkingSatisfaction + studySatisfaction) / 3;

		var netAttractivity =  Math.round(this.currentAttractivity * this.capacity);

		var difference = netAttractivity - this.occupation;

		// debugger;

		var shift = difference >= this.maxMigration ? this.maxMigration : difference;
		shift = difference <= - this.maxMigration ? - this.maxMigration : shift;

		this.shiftOccupation(shift);

	},

	shiftOccupation : function(migration)
	{
		var migrationFinal = 0;

		if(migration+this.occupation > this.capacity)
		{
			migrationFinal = migration+this.occupation - this.capacity;
			this.occupation = this.capacity;

		}else if(migration + this.occupation < 0)
		{
			migrationFinal = - this.occupation;
			this.occupation = 0;
		}else
		{
			migrationFinal = migration;
			this.occupation+=migration;
		}

		this.startPopulateEffect(migrationFinal);
	},

	startPopulateEffect : function(amount)
	{
		if(amount == 0) return;

		while(amount!=0){

			new MigrationEffect(amount>0)
				// .translateTo(this.worldPosition().x + 10,this.worldPosition().y - 33,this.worldPosition().z)
				.mount(this)
				.translateBy(-9,-78,0)
				.depth(25)
				.applyTexture();

			amount += amount>0?-1:1;
		}

	},

	calculateDrinkingSatisf : function ()
	{
		if(!this.closestDrinking) return 0;
		return  1 - this.closestDrinking.length / this.maxDeplacement + this.closestDrinking.building.drinkingQuality;			
	},

	calculateFoodSatisfaction : function()
	{
		//1 roadblock away = 1, maxInfluenceRadius = 0.01
		// add food quality for this building
		if(!this.closestFood) return 0;
		// return distanceScore = (0.01 * this.closestFood.length) / this.closestFood.building.maxInfluenceRadius;

		// return Lerp(0,1,this.closestFood.length / this.closestFood.building.maxInfluenceRadius);

		return  1 - this.closestFood.length / this.maxDeplacement + this.closestFood.building.foodQuality;
	},

	calculateStudySatisf : function()
	{
		if(!this.closestStudy) return 0;
		return  1 - this.closestStudy.length / this.maxDeplacement + this.closestStudy.building.studyQuality;	
	},

	manageImmigration : function()
	{
		if(this.currentAttractivity * this.capacity > this.occupation&&this.capacity>this.occupation)
		{
			this.immigrateStudents();
		}
	},

	immigrateStudents : function()
	{
		this.occupation++;
	},

	place : function()
	{
		Building.prototype.place.call(this);
		EB.broadcast('NEW_RESIDENTIAL_BUILDING',this);
	}
});