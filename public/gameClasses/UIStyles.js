
/*=================== UI STUFF =======================*/
//HUD

var UIStyles = IgeClass.extend({
	classId : 'UIStyles',

	init : function()
	{
		ige.ui.style('#timeDisplayUI',{
			'top'				: '2%',
			'width'				: 300,
			'height'			:  75,
			'left'				:  15,
			'font'				: '30px Open Sans',
			'color'				: '#000000',
			// 'backgroundColor'	: '#eeeeee',
		});

		ige.ui.style('#budget-display',{
			'top'				: "2%",
			'right'				: 0,
			'font'				: '30px Open Sans',
			'color'				: '#000000',
			'height'			: 75,
			'width'				: 300
		});


		//TOOLS
		ige.ui.style( '.toolsSelection' ,{ //for now it is just 'road tool selection'
			'bottom' 			: '2%',
			'width'  			: '95%',
			'borderRadius' 		: 5,
			'height' 			: '20%',
			'backgroundColor' 	: '#445599',
			'borderColor' 		: '#445599',
			'borderWidth' 		: 4
		});

		ige.ui.style('.tool',{
			'margin'			: 5,
			'width'				: 100,
			'height'			: 100,
			'borderRadius'		: 5,
			'borderColor'		: '#AA4411',
			'backgroundColor'	: '#AA4411'
		});


		ige.ui.style('.tool:hover',{
			'backgroundColor'	: '#881100'
		});

		ige.ui.style('.activeTool',{
			'backgroundColor'	: '#8811BB'
		});

		ige.ui.style('.inActiveTool',{
			'backgroundColor'	: '#AA4411'		
		});

		//ROAD TOOL
		ige.ui.style('.roadTool',{
			'top'				: 15,
			'left'				: 15
		});



		//BUILDING TOOLS
		ige.ui.style('.building',{ //for now just 'burger tool selection'
			'top'				: 15,
			'left'				: 130 	
		});

		ige.ui.style('.residence_tool',{
			'top'				: 15,
			'left'				: 245
		});

		ige.ui.style('#college-tool-ui',{
			'top'				: 15,
			'left'				: 360
		});

		ige.ui.style('#bulldozerToolUI',{
			'right'				: 15
		});

		ige.ui.style('#bar-tool-ui',{
			'left'				: 475
		});


		/*=====================TOP HUD==========================*/
		ige.ui.style('#topHud',{
			'top'				: 10,
			'width'				: '90%',
			// 'left'				: 5,
			'height'			: '10%',
			'backgroundColor'	: '#445599',
			'borderWidth'		: 4,
			'borderRadius'		: 5,
			'borderColor'		: '#AA4411'
		});

		ige.ui.style('#clock',{
			'top'				: 15,
			'left'				: "48%",
			'font'				: '30px Open Sans',
			'color'				: '#000000',
			'width'				: 300
		});

		/*==============SPEED CONTROLS========================*/

		ige.ui.style('#speed-control-ui',{
			'top'				: "20%",
			'left'				: "35%",
			'width'				: 150,
			'height'			: "90%"
			// 'borderColor'		: '#AA4411',
			// 'borderRadius'		: 5,
			// 'borderWidth'		: 4
		});


		ige.ui.style('.speed-control-button',{
			'width'				: 40,
			'top'				: "5%",
			'height'			: 40
		});

		ige.ui.style('#speed-1-control',{
			'left'				: "7%"
		});
		ige.ui.style('#speed-2-control',{
			'left'				: "37%"
		});
		ige.ui.style('#speed-3-control',{
			'left'				: "67%"
		});							
	}

});
