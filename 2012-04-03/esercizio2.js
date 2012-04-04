//ALTEZZA MURI 6.75 + BASE

var thickness = 2;
var wallThickness = 3;

/*
20cm grossi
10cm muri piccoli
5 cm vetrate
*/

var floor1 = SIMPLEX_GRID([ [39],[1], [thickness] ]);
var floor2 = SIMPLEX_GRID([ [1],[2], [thickness] ]);
var floor3 = SIMPLEX_GRID([ [-1,8],[-17,5], [thickness] ]);
var floor4 = SIMPLEX_GRID([ [-1,38],[-10,7], [thickness] ]);
var floor5 = SIMPLEX_GRID([ [-1,38],[-10,7], [thickness] ]);
var floor6 = SIMPLEX_GRID([ [-21,26],[-4,6], [thickness] ]);
var floor7 = SIMPLEX_GRID([ [-39,8],[-10,6], [thickness] ]);
var floor8 = SIMPLEX_GRID([ [-21,15.2],[-1,3], [thickness] ]);
var floor9 = SIMPLEX_GRID([ [-47,5],[-4,1], [thickness] ]);
var floor10 = SIMPLEX_GRID([ [-51,1],[-5,1], [thickness] ]);

var floor = STRUCT( [floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8, floor9,
					 floor10] );


var wall1 = SIMPLEX_GRID([ [-0.8,7.2],[-0.8,0.2], [-thickness, wallThickness] ]);
var wall2_1 = SIMPLEX_GRID([ [-0.8,0.2],[-0.8,1.2], [-thickness, wallThickness] ]);
var wall2_2 = SIMPLEX_GRID([ [-0.8,0.2],[-2,20.2], [thickness, wallThickness] ]);
var wall3 = SIMPLEX_GRID([ [-1,8.2], [-22,0.2], [thickness, wallThickness] ]);
var wall4 = SIMPLEX_GRID([ [-9,0.2], [-16.8,5.4], [thickness, wallThickness] ]);
var wall5 = SIMPLEX_GRID([ [-7.5,19], [-15.2,0.2], [-thickness, wallThickness] ]);
var wall6 = SIMPLEX_GRID([ [-25.2,8.5], [-7.4,0.2], [-thickness, wallThickness] ]);
var wall7_1 = SIMPLEX_GRID([ [-37.8,1.2], [-16,0.2], [-thickness, wallThickness] ]);
var wall7_2 = SIMPLEX_GRID([ [-39,12], [-16,0.2], [thickness, wallThickness] ]);
var wall8_1 = SIMPLEX_GRID([ [-51,0.2], [-6,10.2], [thickness, wallThickness] ]);
var wall8_2 = SIMPLEX_GRID([ [-51,0.2], [-4.8,1.2], [-thickness, wallThickness] ]);
var wall9 = SIMPLEX_GRID([ [-41.4,9.8], [-4.8,0.2], [-thickness, wallThickness] ]);
var wall10 = SIMPLEX_GRID([ [-37.2,5.4], [-11.4,0.2], [-thickness, wallThickness] ]);

var walls = STRUCT( [wall1, wall2_1, wall2_2, wall3, wall4, wall5, wall6, wall7_1, wall7_2, wall8_1, wall8_2, wall9,
					 wall10] );

var thinWall1 = SIMPLEX_GRID( [ [-44.7,0.05], [-6.8,7.4], [-thickness, wallThickness] ] );
var thinWall2 = SIMPLEX_GRID( [ [-38.75,0.05], [-5,6.4], [-thickness, wallThickness] ] );
var thinWall3 = SIMPLEX_GRID( [ [-42.55,0.05], [-5,6.4], [-thickness, wallThickness] ] );
var thinWall4 = SIMPLEX_GRID( [ [-30,11.4], [-4.95,0.05], [-thickness, wallThickness] ] );
var thinWall5 = SIMPLEX_GRID( [ [-1,6], [-16.95,0.05], [-thickness, wallThickness] ] );
var thinWall6 = SIMPLEX_GRID( [ [-8,1], [-16.95,0.05], [-thickness, wallThickness] ] );

var thinWalls = STRUCT( [thinWall1, thinWall2, thinWall3, thinWall4, thinWall5, thinWall6] );


// point: vertice in basso a sinistra del rettangolo
var buildStep = function (point,width,height,thickness) {
	var x = point[0];
	var y = point[1];

	return SIMPLEX_GRID( [ [-x,width], [-y,height], [thickness] ] );
}

// 
var buildStairs = function(p1,n,width,height,thickness) {
	var scalini = [];
	var j = 1;

	for (i=n; i>0; i--) {
		var pX = p1[0] + width*i;
		var pY = p1[1];

		var p = [pX, pY];

		var scalino = buildStep(p,width,height,thickness*j);
		scalini.push(scalino);

		j++;
	}
	return STRUCT( scalini );
}

var stepWidth = 0.4;
var stepHeight = 4;
var stepThickness = 0.25;
var p1 = [35.2,1];

var stairs = buildStairs(p1,7,stepWidth,stepHeight,stepThickness);

var building = STRUCT( [floor, stairs, walls, thinWalls] );

DRAW(building);