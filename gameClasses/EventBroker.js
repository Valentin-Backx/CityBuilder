var EB;

InitEventBroker = function(){
	EB = new EventBroker();
};

var EventBroker = function()
{
	this.events = 
	{
		'NEXT_DAY' 					: [],
		'NEW_ROAD' 					: [],
		'NEW_FOOD_BUILDING'			: [],
		'NEW_DRINKING_BUILDING'		: [],
		'NEW_STUDY_BUILDING'		: [],
		'NEW_SENIOR_BUILDING'		: [],
		'NEW_RESIDENTIAL_BUILDING'	: [],
		'BUILDING_DESTROYED'		: []
	}
}

EventBroker.prototype.subscribe = function(event,callback,context) {
	this.events[event].push({'callback':callback,'context':context});
};

EventBroker.prototype.broadcast = function(event,args) {
	for (var i = this.events[event].length - 1; i >= 0; i--) {
		this.events[event][i].callback.call(this.events[event][i].context,args);
	};
};