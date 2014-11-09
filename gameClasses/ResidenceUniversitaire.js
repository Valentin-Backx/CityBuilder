var ResidenceUniversitaire = Building.extend({
	classId : 'ResidenceUniversitaire',

	buildingType : 'residence',
	
	occupation : 0,
	capacity : 100,
	currentAttractivity : 1, //maximum

	init : function()
	{
		Building.prototype.init.call(this);
		this.sprite = ige.client.gameTextures.buildings.residence_1;

		EB.subscribe('NEXT_DAY',this.newDayCallback,this);
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
			
		this.image.texture(this.sprite)
		
		return this;
	},

	update : function()
	{
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
		var drinkingSatisfaction = this.calculateDrinkingSatisf();
		var studySatisfaction = this.calculateStudySatisf();

	},

	calculateDrinkingSatisf : function()
	{
		
	},

	calculateFoodSatisfaction : function()
	{

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
	}
});