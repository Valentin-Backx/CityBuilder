var ResidenceUniversitaire = Building.extend({
	classId : 'ResidenceUniversitaire',

	buildingType : 'residence',
	
	occupation : 0,
	capacity : 100,
	currentAttractivity : 1, //maximum

	maxInfluenceRadius : 20,

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
			this.closestStudy = this.getClosestStudy();
		},self);
		
		EB.subscribe('NEW_FOOD_BUILDING',function()
		{
			this.closestFood = this.getClosestFood();
		},self);
		EB.subscribe('NEW_DRINKING_BUILDING',function()
		{
			this.closestDrinking = this.getClosestDrinking();
		},self);
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

			this.closestStudy = this.getClosestStudy();	
			this.closestFood = this.getClosestFood();
			this.closestDrinking = this.getClosestDrinking();
			
			this.roadNetworkChanged = false;			
		}

		Building.prototype.update.call(this);
	},


	newDayCallback : function(newDay)
	{
		this.currentAttractivity = this.calculateAttractivity();
		this.manageImmigration();
	},

	calculateAttractivity : function()
	{
		var foodSatisfaction = this.calculateFoodSatisfaction();

		console.log(foodSatisfaction);

		var drinkingSatisfaction = this.calculateDrinkingSatisf();
		var studySatisfaction = this.calculateStudySatisf();

	},

	calculateDrinkingSatisf : function ()
	{
		
	},

	calculateFoodSatisfaction : function()
	{
		//1 roadblock away = 1, maxInfluenceRadius = 0.01
		// add food quality for this building
		if(!this.closestFood) return 0;
		return distanceScore = (0.01 * this.closestFood.length) / this.closestFood.building.maxInfluenceRadius;
	},

	calculateStudySatisf : function()
	{

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