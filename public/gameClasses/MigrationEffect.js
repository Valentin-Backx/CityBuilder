var MigrationEffect = IgeEntity.extend({

	classId : 'migrationEffect',

	maxAltitude : -75,

	speed : 0.80,

	pos : true,

	frameCounter : 0,

	movementAmplitude : 15,

	currentLateralOffset : 0,

	init : function(pos)
	{
		IgeEntity.prototype.init.call(this);

		this.pos = pos;

	},

	update : function()
	{
		if(!this.startPos)
		{
			this.startPos = this.worldPosition();
		}

		IgeEntity.prototype.update.call(this);

		if(this.frameCounter==0)
		{
			this.currentLateralOffset = Math.random() *2 -1;
			this.currentLateralOffset = this.currentLateralOffset>0?1:-1;
		}


		this.translateBy(this.currentLateralOffset * this.speed,-this.speed,0);


		if(   this.worldPosition().y - this.startPos.y < this.maxAltitude)
		{
			this.destroy();
		}

		this.frameCounter = (this.frameCounter + 1) % this.movementAmplitude;
	},

	applyTexture : function()
	{
		var texture = this.pos? ige.client.gameTextures.positiveMigration:ige.client.gameTextures.negativeMigration;

		this.image = new IgeEntity()
					.texture(texture)
					.bounds3d(30,50,10)
					.mount(this);
	}
});