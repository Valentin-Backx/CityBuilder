var RoadNetwork = IgeEntity.extend({
	classId : 'RoadNetwork',
	init : function()
	{
		IgeEntity.prototype.init.call(this);
	},

	roads : [],
	addRoute : function(pathElement)
	{
		if(!this.roads[pathElement.y])
		{
			this.roads[pathElement.y] = [];	
		}
		if(!this.roads[pathElement.y][pathElement.x])
		{
			this.roads[pathElement.y][pathElement.x] = new RoadPatch()
				.mount(ige.client.tileMap)
				.tileWidth(1)
				.tileHeight(1)
				.translateToTile(pathElement.x,pathElement.y,0);
			}

		// newRP.applyTexture(this.getTexture({'x' : pathElement.x, 'y' : pathElement.y}));
	},

	updateNetwork : function()
	{
		for (var i = this.roads.length - 1; i >= 0; i--) {
			if(this.roads[i])
			{
				for (var j = this.roads[i].length - 1; j >= 0; j--) {
					if(this.roads[i][j])
					{
						try
						{
							this.roads[i][j].applyTexture(this.getTexture({'x':j,'y':i}));	
						}catch(error)
						{
							// console.log(error);
							// console.log(this.roads[i][j].texture);
						}
					}
				};
			}
		};

		
	},

	logRoutes : function()
	{

		for (var i =0;  i <  this.roads.length; i++) {
				console.log(this.roads[i]);
		};
	},

	getTexture : function(tileCoords)
	{
		var weight = this.getRoadTileWeight(tileCoords);

		var scores = this.getMatchesScores(weight);

		var currentCandidate = scores[0];

		if(tileCoords.x == 0 && tileCoords.y == 1)
		{
			console.log(scores);
		}

		while(!this.hasMatchingRoadTiles(tileCoords,currentCandidate.texture))
		{
			scores.splice(0,1);
			currentCandidate = scores[0];
		}

		return ige.client.gameTextures.roadTiles[currentCandidate.texture];
	},

	getMatchesScores : function(weight)
	{
		var res = []
		for(var textureWeight in ige.client.gameTextures.roadTiles)
		{
			var currentMatchNumber = this.getMatchNumber(weight,textureWeight);

			res.push(
				{
					'texture' : textureWeight,
					'score' : currentMatchNumber
				}
			);
		}

		res.sort(function(a,b)
		{
			if(a.score > b.score) return -1;
			if(a.score < b.score) return 1;
			return 0;
		});

		return res;
	},

	getMatchNumber : function(weightToMatch,candidate)
	{
		candidate = parseInt(candidate);

		var result= weightToMatch & candidate;

		return result;
	},

	getTextureBackup : function(tileCoords)
	{
		var weight = this.getRoadTileWeight(tileCoords);

		if(weight in ige.client.gameTextures.roadTiles)
		{
			// console.log("first: "+weight);
			return ige.client.gameTextures.roadTiles[weight];	
		} 

		var currentWeight = weight;

		for(var power = 7;power >= 0; power--)
		{

			if(
				//this.isRoadAt({ 'x' : tileCoords.x + this.powerCadran[power].x,'y' : tileCoords.y + this.powerCadran[power].y}) ||
				Math.pow(2,power) > currentWeight
			)
			{
				continue;
			}

			currentWeight -= Math.pow(2,power);
			// if(currentWeight in ige.client.gameTextures.roadTiles&& !this.hasMatchingRoadTiles(tileCoords,currentWeight))
			// {
			// 	console.log("took out power: "+power)
			// 	console.log(currentWeight);
			// }
			if(currentWeight in ige.client.gameTextures.roadTiles&&this.hasMatchingRoadTiles(tileCoords,currentWeight))
			{
				// console.log("last: "+currentWeight);
				return ige.client.gameTextures.roadTiles[currentWeight];
			}
		}
		// console.log(weight);
		console.log("nope...");
		// console.log(this.getRoadTileWeight(tileCoords),this.getRoadTileWeight(tileCoords) in ige.client.gameTextures.roadTiles);

	},

	getRoadTileWeight : function(tileCoords)
	{
		var w = 0
			+ (this.isRoadAt({'x' : tileCoords.x - 1, 'y' : tileCoords.y - 1})?1:0)
			+ (this.isRoadAt({'x' : tileCoords.x    , 'y' : tileCoords.y - 1})?2:0)
			+ (this.isRoadAt({'x' : tileCoords.x + 1, 'y' : tileCoords.y - 1})?4:0)
			+ (this.isRoadAt({'x' : tileCoords.x - 1, 'y' : tileCoords.y})?128:0)
			+ (this.isRoadAt({'x' : tileCoords.x +1 , 'y' : tileCoords.y})?8:0)
			+ (this.isRoadAt({'x' : tileCoords.x - 1, 'y' : tileCoords.y + 1})?64:0)
			+ (this.isRoadAt({'x' : tileCoords.x , 'y' : tileCoords.y + 1})?32:0)
			+ (this.isRoadAt({'x' : tileCoords.x  + 1   , 'y' : tileCoords.y + 1})?16:0);

		// console.log("x: ",tileCoords.x," y: ",tileCoords.y," w: ",w/*," 4: "+this.isRoadAt({'x' : tileCoords.x  + 1   , 'y' : tileCoords.y + 1})*/);


		// console.log("4: "+)
		return w;
	},

	isRoadAt : function(tileCoords)
	{
		// console.log(this.roads[tileCoords.x] && this.roads[tileCoords.x][tileCoords.y]);
		// debugger;
		return this.roads[tileCoords.y] && this.roads[tileCoords.y][tileCoords.x];
	},

	powerCadran : [
		{'x' : -1,'y' : -1},
		{'x' : 0,'y' : -1},
		{'x' : 1,'y' : -1},
		{'x' : 1,'y' : 0},
		{'x' : 1,'y' : 1},
		{'x' : 0,'y' : 1},
		{'x' : -1,'y' : 1},
		{'x' : -1,'y' : 0}
	],

	hasMatchingRoadTiles : function(tileCoords,weight)
	{
		var pows = this.retriveTwoPowers(weight);

		// console.log(weight+" "+pows);

		for (var i = pows.length - 1; i >= 0; i--) {
			if(!this.isRoadAt({'x':tileCoords.x + this.powerCadran[pows[i]].x,'y' : tileCoords.y + this.powerCadran[pows[i]].y}))
			{
				return false;
			}
		};

		return true;
	},

	retriveTwoPowers : function(weight)
	{
		var res  = [];

		for (var i = 7; i >= 0; i--) {
			var currentPow = Math.pow(2, i);
			if(currentPow<=weight)
			{
				res.push(i);
				weight -= currentPow;
			}
		}

		return res;
	}
});