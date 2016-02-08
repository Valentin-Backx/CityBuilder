var Walker = IgeEntity.extend({
	classId : 'walker',


	init : function(path,residence,school)
	{
		IgeEntity.prototype.init.call(this);

		this.residence = residence;
		this.school = school;

		this
			.isometric(true)
			.isometricMounts(true)
			.drawBounds(true)
			.bounds3d(20,20,20)
			.translateBy(0,0,150)
			.addComponent(IgePathComponent);

		this.applyTexture();

		this.path.drawPath(true);
		this.path.add(path);
		this.path.start();


	},

	update : function()
	{
		IgeEntity.prototype.update.call(this);


	},

	applyTexture : function()
	{

		this.image = new IgeEntity()
					.texture(ige.client.gameTextures.characters.chara_student)
					.cell(1)
					.bounds3d(60,60,60)
					.translateBy(1,1,130)
					.mount(this);

	}

});