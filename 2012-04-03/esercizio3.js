
var thickness = 2;
var wallThickness = 3;



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
COLOR( [179/255, 175/255, 156/255] ) (floor);


var poolDown1 = SIMPLEX_GRID([ [-1, 20], [-1, 9], [(thickness-0.5)] ]);
var poolUp1 = SIMPLEX_GRID([ [-1, 20], [-1, 9], [(thickness-0.49)] ]);

var poolDown2 = SIMPLEX_GRID([ [-47, 4], [-5, 11], [(thickness-0.5)] ]);
var poolUp2 = SIMPLEX_GRID([ [-47, 4], [-5, 11], [(thickness-0.49)] ]);

COLOR([ 0/255, 116/255, 120/255])(poolUp1);
COLOR([ 0/255, 116/255, 120/255])(poolUp2);


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

COLOR([130/255, 123/255, 99/255])(walls);


var thinWall1 = SIMPLEX_GRID( [ [-44.7,0.05], [-6.8,7.4], [-thickness, wallThickness] ] );
var thinWall2 = SIMPLEX_GRID( [ [-38.75,0.05], [-5,6.4], [-thickness, wallThickness] ] );
var thinWall3 = SIMPLEX_GRID( [ [-42.55,0.05], [-5,6.4], [-thickness, wallThickness] ] );
var thinWall4 = SIMPLEX_GRID( [ [-30,11.4], [-4.95,0.05], [-thickness, wallThickness] ] );
var thinWall5 = SIMPLEX_GRID( [ [-1,6], [-16.95,0.05], [-thickness, wallThickness] ] );
var thinWall6 = SIMPLEX_GRID( [ [-8,1], [-16.95,0.05], [-thickness, wallThickness] ] );
var thinWall7 = SIMPLEX_GRID( [ [-31,0.05], [-7.4,6.4], [-thickness, wallThickness] ] );
var thinWall8 = SIMPLEX_GRID( [ [-32,0.05], [-7.4,6.4], [-thickness, wallThickness] ] );
var thinWall9 = SIMPLEX_GRID( [ [-30,10], [-13.8,0.05], [-thickness, wallThickness] ] );

var thinWalls = STRUCT( [thinWall1, thinWall2, thinWall3, thinWall4, thinWall5, thinWall6, thinWall7, thinWall8, thinWall9 ] );
COLOR([150/255, 157/255, 161/255])(thinWalls)

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

COLOR( [179/255, 175/255, 156/255] ) (stairs);

var widthColumn = 0.40;
var column1 = SIMPLEX_GRID( [ [-(26 - widthColumn/2),widthColumn], [-(14 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );
var column2 = SIMPLEX_GRID( [ [-(26 - widthColumn/2),widthColumn], [-(7 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );
var column3 = SIMPLEX_GRID( [ [-(32.2 - widthColumn/2),widthColumn], [-(14 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );
var column4 = SIMPLEX_GRID( [ [-(32.2 - widthColumn/2),widthColumn], [-(7 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );
var column5 = SIMPLEX_GRID( [ [-(38.6 - widthColumn/2),widthColumn], [-(14 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );
var column6 = SIMPLEX_GRID( [ [-(38.6 - widthColumn/2),widthColumn], [-(7 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );
var column7 = SIMPLEX_GRID( [ [-(45 - widthColumn/2),widthColumn], [-(14 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );
var column8 = SIMPLEX_GRID( [ [-(45 - widthColumn/2),widthColumn], [-(7 - widthColumn/2), widthColumn], [-thickness,wallThickness] ] );

var columns = STRUCT( [column1, column2, column3, column4, column5, column6, column7, column8] );
COLOR([166/255, 171/255, 181/255])(columns);




var roofThickness = 0.5;
var roof1 = SIMPLEX_GRID( [ [-24,23], [-4, 13], [-thickness -wallThickness, roofThickness] ] );
var roof2 = SIMPLEX_GRID( [ [-0.2,9.6], [-13.2, 9.8], [-thickness -wallThickness, roofThickness] ] );
var roof3 = SIMPLEX_GRID( [ [-24,23], [-4, 13], [-thickness -wallThickness -roofThickness, 0.5] ] );

var roof = STRUCT( [roof1, roof2] );

COLOR( [241/255, 238/255, 226/255] )(roof1);
COLOR( [241/255, 238/255, 226/255] )(roof2);
COLOR( [38/255, 38/255, 39/255] )(roof3);


// v1: vertice in alto a sinistra
var bench4Supports = function (v1, width) {
	
	var x = v1[0];
	var y = v1[1];

	var benchSupports = [];

	benchSupports.push( SIMPLEX_GRID( [ [-x -0.1, 0.1], [-(y-0.2), 0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [-x -0.1, 0.1], [-(y-0.4), 0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [- (x +width -0.1) ,0.1], [-(y-0.2),0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [- (x +width -0.1) ,0.1], [-(y-0.4),0.1], [0.4] ] ) );

	return STRUCT( benchSupports );
}

var bench6Supports = function (v1, width) {

	var x = v1[0];
	var y = v1[1];
	var benchSupports = [];

	benchSupports.push( SIMPLEX_GRID( [ [-x -0.1, 0.1], [-(y-0.2), 0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [-x -0.1, 0.1], [-(y-0.4), 0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [- (x +width -0.1) ,0.1], [-(y-0.2),0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [- (x +width -0.1) ,0.1], [-(y-0.4),0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [-x -0.2, 0.1], [-(y-0.2), 0.1], [0.4] ] ) );
	benchSupports.push( SIMPLEX_GRID( [ [-x -0.2, 0.1], [-(y-0.4), 0.1], [0.4] ] ) );

	return STRUCT( benchSupports );
}

var benchSupports1 = bench6Supports([7.35,14.8], 2.6);
var benchSupports2 = bench4Supports([10.2,14.8], 2.6);
var benchSupports3 = bench4Supports([12.3,14.8], 2.6);
var benchSupports4 = bench4Supports([14.4,14.8], 2.6);
var benchSupports5 = bench4Supports([16.5,14.8], 2.6);
var benchSupports6 = bench4Supports([18.6,14.8], 2.6); 
var benchSupports7 = bench6Supports([20.7,14.8], 2.6);

var bench1 = SIMPLEX_GRID( [ [-7.8,15.2], [-14.2,0.6], [-0.4,0.1] ] );

var bench = STRUCT( [benchSupports1, benchSupports2, benchSupports3, benchSupports4, benchSupports5,
					 benchSupports6, benchSupports7, bench1 ] );
COLOR([ [179/255, 175/255, 156/255] ])(bench);



var building = STRUCT( [floor, stairs, walls, thinWalls, columns, roof, bench] );

DRAW(building);