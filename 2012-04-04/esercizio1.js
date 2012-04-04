var pointsContorno = [ [0,0], [0,2], [1,2], [1,22], [9,22], [9,17], [39,17], [39,16], [51,16], [51,6], [52,6], [52,4], [36,4], [36,1], [39,1], [39,0], [0,0] ];
var contorno1 = POLYLINE(pointsContorno);

var pool = POLYLINE( [ [47,16], [47,5], [51,5], [51,16], [47,16] ] );

var contorno = STRUCT( [pool, contorno1] );

/* 
v1: vertice in alto a sinistra
v2: vertice in basso a destra
 */
var buildInternalGrid = function(v1,v2) {
	var x1 = v1[0];
	var y1 = v1[1];
	var x2 = v2[0];
	var y2 = v2[1];

	var righe = [];
	var colonne = [];

	// colonne
	for (i = x1; i < x2 +1 ; i++) {
		var polyC = POLYLINE( [ [i,y1], [i,y2] ] );
		colonne.push( polyC );
	}

	// righe
	for(j = y2; j < y1 +1; j++) {
		var polyR = POLYLINE( [ [x1,j], [x2,j] ] );
		righe.push( polyR );
	}

	var structRighe = STRUCT( righe );
	var structColonne = STRUCT( colonne );
	return STRUCT( [structRighe, structColonne] );
}

// d: distanza tra le colonne (dimensione di uno scalino)
var buildStairs = function(v1,v2,d) {
	var x1 = v1[0];
	var y1 = v1[1];
	var x2 = v2[0];
	var y2 = v2[1];

	var scale = [];

	for (i = x1; i < x2 ; i = i+d) {
		var rect = buildRectangleByVertex([i,y1],[i,y2]);
		scale.push( rect );
	}
	return STRUCT( scale );
}

var buildRectangleByVertex = function(v1,v2) {
	var x1 = v1[0];
	var y1 = v1[1];
	var x2 = v2[0];
	var y2 = v2[1];

	return POLYLINE( [v1, [x2,y1], v2, [x1,y2], v1 ] );
}

var buildRectangleByMeasure = function(v1,width,heigth) {
	var x2 = v1[0] + width;
	var y2 = v1[1] - heigth;

	var v2 = [x2,y2];

	return buildRectangleByVertex(v1,v2); 
}

var grid1 = buildInternalGrid( [1,22], [9,17] );
var grid2 = buildInternalGrid( [1,17], [39,10] );
var grid3 = buildInternalGrid( [21,17], [36,0] );
var grid3 = buildInternalGrid( [21,17], [36,0] );
var grid4 = buildInternalGrid( [0,1], [21,0] );
var grid5 = buildInternalGrid( [36,1], [39,0] );
var grid6 = buildInternalGrid( [39,16], [47,4] );
var grid7 = buildInternalGrid( [47,5], [52,4] );
var grid8 = buildInternalGrid( [51,6], [52,5] );
var grid9 = buildInternalGrid( [0,2], [1,1] );
var grid10 = buildInternalGrid( [36,10], [39,4] );

var internalGrid = STRUCT( [grid1, grid2, grid3, grid4, grid5, grid6, grid7, grid8, grid9, grid10] );

var scale = buildStairs([36.2,4],[39,1],0.33);

var wall1 = buildRectangleByMeasure([1,1],8,0.2);
var wall2 = buildRectangleByMeasure([0.8,22.2],0.2,21.4);
var wall3 = buildRectangleByMeasure([0.8,22.2],8.4,0.2);
var wall4 = buildRectangleByMeasure([9,22.2],0.2,5.4);
var wall5 = buildRectangleByMeasure([7.5,15.2],19,0.2);
var wall6 = buildRectangleByMeasure([25.2,7.4],8.6,0.2);
var wall7 = buildRectangleByMeasure([37.8,16.2],13.4,0.2);
var wall8 = buildRectangleByMeasure([51,16.2],0.2,11.4);
var wall9 = buildRectangleByMeasure([41.4,5],9.8,0.2);
var wall10 = buildRectangleByMeasure([37.2,11.6],5.4,0.2);
var wall11 = buildRectangleByMeasure([0.8,17],6.4,0.2);
var wall12 = buildRectangleByMeasure([7.8,17],1.4,0.2);

var thickWalls = STRUCT( [wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, 
					 wall10, wall11, wall12 ] );
var thinWalls

var walls = STRUCT( [thickWalls, thinWalls] );


var piantina = STRUCT( [internalGrid, scale, contorno, walls] );
/*
COLOR( [255,0,0] )( contorno );
COLOR( [0,255,0] )( pool );
COLOR( [0,0,0] )( scale );
COLOR([0,0,0])(internalGrid);
*/
COLOR([0,0,0])(walls);

//DRAW(piantina);
DRAW(walls);
