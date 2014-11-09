function CheckTilesOccupied(x,y,w,h)
{
	var valid = true;

	for (var i = x; i < x+w; i++) {
		for (var j = y ; j < y + h; j++) {
				
			valid = valid && !ige.client.roadNetwork.isRoadAt({'x':i,'y':j})&&!ige.client.tileMap.isTileOccupied(i,j);

		};
	};

	return valid;
}