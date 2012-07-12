/*------------------------------   VARIABLES   ------------------------------*/

// COLOURS
var DARK_WOOD = [133/255,94/255,66/255];
var GLASS = [164/255, 211/255, 238/255, 0.8];
var MARBLE = [250/255,250/255,250/255];
//var MARBLE = [230/255,228/255,216/255];

//-------------------------------------------------------------------------------

// STAIRS
wStep = 13;
hStep = 0.25;
tStep = 0.6;
d = 2*tStep; // distanza tra gruppi di stairs
numberOfSteps = 3;
heightSteps = numberOfSteps*hStep;
tSteps = tStep*numberOfSteps;
p0 = [0,0,0];

lFS = heightSteps+hStep; // width fianco scala
aFS = 4*heightSteps+hStep  // height fianco scala

stairsTotalWidth = 2*lFS + wStep;
tStairs = 4*(tSteps+d)+tStep;
hStairs = 4*heightSteps+hStep;


//-------------------------------------------------------------------------------

// COLONNADE
var colonnadeDepth = 6;
var colonnadeWidth = 15;

//-------------------------------------------------------------------------------
// WALLS
/*
e: external, c: central, b: back
m: medium, l: low
*/

// heights
var lWallHeight = hStairs;
var mWallHeight = 3.5*lWallHeight;
var hWallHeight = mWallHeight;  // PER ORA, DA VERIFICARE!!!!-------------------------------------------------------------------------
var totalWallHeight = lWallHeight + mWallHeight + hWallHeight;

// wall thickness
var wallsThickness = 1;

//widths
var eW = cW = 11;
var b1WallWidth = b2WallWidth = 7;

// depths
var eD = cD = b1 = 7;
var b2D = 9;

// windows
var windowWidth = 1.5;
var bigWindowHeight = 3;
var lowWindowHeight = lWallHeight/2;

// others
var leftSideWidth = wallsThickness + cW + 6;

//-------------------------------------------------------------------------------

// FRONTDOOR
var doorWidth = 3.25;
var doorHeight = 5.625;
var doorThickness = 0.25;

//-------------------------------------------------------------------------------


var drawAll = function(array) {
	array.map(function(a){DRAW(a);});
};




/*
build a single step
vertexDL: vertex in basso a sinistra del rettangolo
*/
var buildStep = function(vertexDL,width,height,thickness) {
 	var x = vertexDL[0];
	var y = vertexDL[1];
	var z = vertexDL[2];

	return SIMPLEX_GRID( [ [-x,width], [-y,thickness], [-z,height] ] );
 }; 

/*
funzione che costruisce una scala
n: numberOf di steps
p1: 
*/
var buildStairs = function(p1,n,width,height,thickness) {
	var steps = [];
	var j = 1;

	for (i=0; i<n; i++) {
		var pX = p1[0];
		var pY = p1[1] + thickness*(i);
		var pZ = p1[2];

		var p = [pX, pY, pZ];

		var step = buildStep(p,width,height*j,thickness);
		steps.push(step);

		j++;
	}

	return STRUCT( steps );
}

var build2FlightOfSteps = function() {
	var builtFlightOfStep = buildFlightOfSteps()
	var builtFlightOfStepBack = R([0,1])([PI])(builtFlightOfStep);
	builtFlightOfStepBack.translate([0,1],[(leftSideWidth+2*stairsTotalWidth+3*lFS),-colonnadeDepth+4*wallsThickness+7+7+9]);
	var builtFlightsOfSteps = STRUCT([builtFlightOfStep,builtFlightOfStepBack]);
	DRAW(builtFlightsOfSteps);
};

var buildFlightOfSteps = function() {
	// BUILD STEPS
	var singleStep = buildStep(p0, wStep, hStep, tStep + d);
	var base0_1 = SIMPLEX_GRID([[wStep],[-tStep-d,tSteps],[hStep]]);
	var p1 = [p0[0],tStep+d,hStep];
	var base1_2 = SIMPLEX_GRID([ [wStep], [-p1[1]-tSteps,d+tSteps], [p1[2]+heightSteps] ]);
	var p2 = [p1[0], p1[1]+d+tSteps, p1[2]+hStep*3];
	var base2_3 = SIMPLEX_GRID([ [wStep], [-p2[1]-tSteps,d+tSteps], [p2[2]+heightSteps] ]);
	var p3 = [p2[0], p2[1]+d+tSteps, p2[2]+hStep*3];
	var base3_4 = SIMPLEX_GRID([ [wStep], [-p3[1]-tSteps,d+tSteps], [p3[2]+heightSteps] ]);
	var p4 = [p3[0], p3[1]+d+tSteps, p3[2]+heightSteps];

	var stairs1 = buildStairs(p1,3,wStep,hStep,tStep);
	var stairs2 = buildStairs(p2,3,wStep,hStep,tStep);
	var stairs3 = buildStairs(p3,3,wStep,hStep,tStep);
	var stairs4 = buildStairs(p4,3,wStep,hStep,tStep);
	var stairs = STRUCT([singleStep,stairs1,stairs2,stairs3,stairs4,base3_4,base2_3,base1_2,base0_1]);


	// BUILD STAIRS SIDE SUPPORT
	var pSideFS = [ p0, [p0[0],lFS,p0[2]], [p0[0],p4[1]+tSteps,p4[0]], [p0[0],p4[1]+tSteps,aFS],
				[p0[0],p3[1], aFS], [p0[0],lFS,lFS], [p0[0],p0[1],lFS], [p0[0],lFS,p0[2]] ];  // punti fianco scala
	var cellsSideFS = [[1,2,3,4],[1,4,5,7], [0,7,5,6]];

	var pBaseFS = pSideFS.map(function(v) {return [v[0]+lFS,v[1],v[2]]} );
	var pFS = pSideFS.concat(pBaseFS);

	var cellsBaseFS = [[0,2,10,8],[2,10,3,11],[3,11,4,12],[4,12,5,13],[5,13,6,14], [6,14,0,8]];


	var fiancoStairSx1 = SIMPLICIAL_COMPLEX(pSideFS)(cellsSideFS);
	var fiancoStairSx2 = T([0])([lFS])(fiancoStairSx1);
	var fiancoStairSx = STRUCT([ fiancoStairSx1, fiancoStairSx2, SIMPLICIAL_COMPLEX(pFS)(cellsBaseFS) ]);
	var fiancoStairDx = T([0])([wStep+lFS])(fiancoStairSx);
	var fiancoStair = STRUCT([fiancoStairDx,fiancoStairSx]);

	stairs = T([0])([lFS])(stairs);
	stairs = STRUCT([stairs,fiancoStair]);
	stairs = T([0,1])([leftSideWidth,-tStairs-colonnadeDepth])(stairs);

	return stairs;
};




var buildColonnade = function() {
	var baseColonnade = SIMPLEX_GRID([[colonnadeWidth],[-tStairs,colonnadeDepth],[hStairs]]);
	baseColonnade = T([0,1])([leftSideWidth,-tStairs-colonnadeDepth])(baseColonnade);
	DRAW(baseColonnade);
};




var buildFrames = function() {
	// DRAW 
	buildDoors();
	buildWindows();
}


var buildDoors = function() {
	buildFrontdoor();
	buildBackdoor();
}

var buildFrontdoor = function() {
	var fd = buildDoor();
	fd.translate([1],[wallsThickness/2]);
	DRAW(fd);
}

var buildBackdoor = function() {
	var bd = buildDoor();
	bd.translate([1],[-doorThickness+4*wallsThickness+7+7+9-colonnadeDepth +wallsThickness/2]);
	DRAW(bd);
}


var buildDoor = function() {
	var sf = 0.125; // scale factor
	var thickness = doorThickness/sf;
	var height = doorHeight/sf;
	var width = doorWidth/sf;

	//horizontal wood parts
	var lowPart = SIMPLEX_GRID([[width],[thickness],[7]]);
	var highPart = SIMPLEX_GRID([[width],[thickness],[-(height-2),2]]);
	var middlePart1 = SIMPLEX_GRID([ [-6,14], [thickness], [-(height-7),2] ]);
	var middlePart2 = SIMPLEX_GRID([ [-2,width-2], [thickness], [-27,2] ]);

	//vertical wood parts
	var boundarySx = SIMPLEX_GRID([[2],[thickness],[-7,45-7]]);
	var boundaryDx = T([0])([24])(boundarySx);
	var vMiddlePart1 = SIMPLEX_GRID([[-4,2],[thickness],[-27,16]]);
	var vMiddlePart2 = T([0])([16])(vMiddlePart1);
	var vMiddlePart11 = SIMPLEX_GRID([[-4,2],[thickness],[-7,20]]);
	var vMiddlePart22 = T([0])([16])(vMiddlePart11);
	var vCentralPart =  SIMPLEX_GRID([[-12,2],[thickness],[-7,20]]);

	// rods
	var rod1 = SIMPLEX_GRID([[-2,2],[thickness],[-35.8,0.4]]);
	var rod2 = T([0])([20])(rod1);
	var rod3 = SIMPLEX_GRID([[-6,14],[thickness],[-33.3,0.4]]);
	var rod4 = SIMPLEX_GRID([[-10.4,0.4],[thickness],[-40,3]]);
	var rod5 = T([0])([4.4])(rod4);
	var rod6 = SIMPLEX_GRID([[-9.2,0.4],[thickness],[-29,4.48]]);
	var rod7 = T([0])([3.4])(rod6);
	var rod8 = T([0])([3.4])(rod7);
	var rod9 = T([2])([4.9])(rod6);
	var rod10 = T([2])([4.9])(rod7);
	var rod11 = T([2])([4.9])(rod8);
	var rod12 = SIMPLEX_GRID([[-7.7,0.4],[thickness],[-7,20]]);
	var rod13 = T([0])([1.8])(rod12);
	var rod14 = SIMPLEX_GRID([[-15.7,0.4],[thickness],[-7,20]]);
	var rod15 = T([0])([1.8])(rod14);
	var rod16 = SIMPLEX_GRID([[-6,14],[thickness],[-11.5,0.4]]);
	var rod17 = T([2])([9.8])(rod16);
	var rod18 = SIMPLEX_GRID([[-2,22],[thickness],[-16.8,0.4]]);
	var rods = STRUCT([rod1,rod2,rod3,rod4,rod5,rod6,rod7,rod8,rod9,rod10,rod11,rod12,rod13,rod14,rod15,rod16,rod17,rod18]);

	var woodFDParts = STRUCT([lowPart,boundarySx,boundaryDx,highPart,middlePart1,middlePart2,vMiddlePart1,vMiddlePart2,vMiddlePart11,vMiddlePart22,vCentralPart,rods]);

	woodFDParts = COLOR(DARK_WOOD)(woodFDParts);


	var FDGlasses = SIMPLEX_GRID([ [-2,22],[-thickness/2,0.01],[-7,0.1,36] ]);
	FDglasses = COLOR(GLASS)(FDGlasses);


	frontDoor = STRUCT([woodFDParts, FDGlasses]);

	var sf = 0.125; 	//scale factor	
	frontDoor.scale([0,1,2],[sf,sf,sf]);
	frontDoor.translate([0,2],[leftSideWidth + lFS + (wStep)/2 - width*sf/2, hStairs]);
	

	return frontDoor;
};


var buildWindows = function() {

}



//-----------------------------------------------------------------------------------------------------------------------------------------

var buildWall = function(p,width,depth,height) {
	return SIMPLEX_GRID([[-p[0],width],[-p[1],depth],[-p[2],height]])
};

var buildFrontWalls = function() {
	// FRONT WALLS
	var lwFront1 = SIMPLEX_GRID([[0.5,-windowWidth,4.5,-windowWidth,1],[wallsThickness],[lWallHeight]]);
	var lwFront2_1 = SIMPLEX_GRID([[-0.5,windowWidth],
								 [wallsThickness],
								 [lWallHeight/3,-lWallHeight/3,lWallHeight/3]]);
	var lwFront2_2 = SIMPLEX_GRID([[-(0.5+windowWidth+4.5),windowWidth],
								 [wallsThickness],
								 [-lWallHeight*3/4,lWallHeight/4]]);

	var lwFront3_1 = SIMPLEX_GRID([[-(0.5+windowWidth+4.5+windowWidth+1),2+wallsThickness+1.5,-windowWidth,3],
								 [wallsThickness],
								 [lWallHeight]]);
	var lwFront3_2 = SIMPLEX_GRID([[-(0.5+windowWidth+4.5+windowWidth+1)-2-wallsThickness-1.5,windowWidth],
								 [wallsThickness],
								 [lWallHeight/3,-lWallHeight/3,lWallHeight/3]]);
	
	var lowWalls = STRUCT([lwFront1,lwFront2_1,lwFront2_2,lwFront3_2,lwFront3_1]);

	var mwFront1 = SIMPLEX_GRID([[0.5,-windowWidth,4.5,-windowWidth,1],[wallsThickness],[-lWallHeight,mWallHeight]]);
	var mwFront2_1 = SIMPLEX_GRID([[-0.5,windowWidth],
								 [wallsThickness],
								 [-lWallHeight,mWallHeight/8,-mWallHeight/2,mWallHeight*3/8]]);
	var mwFront2_3 = T([0])([4.5+windowWidth])(mwFront2_1);
	var mwFront2_4 = T([0])([5.5+windowWidth])(mwFront2_3);
	var mwFront3 = SIMPLEX_GRID([[-(leftSideWidth-3),3],
								 [wallsThickness],
								 [-lWallHeight,mWallHeight]]);
	var mwFront4 = SIMPLEX_GRID([[-(0.5+windowWidth+4.5+windowWidth+2.5),0.5+wallsThickness+1.5],
								 [wallsThickness],
								 [-lWallHeight,mWallHeight]]);
	var mwFront5 = SIMPLEX_GRID([[-(0.5+windowWidth+4.5+windowWidth+1),windowWidth],
								 [wallsThickness],
								 [-lWallHeight,mWallHeight*3/8,-mWallHeight/8,mWallHeight*2/8,-mWallHeight/8,mWallHeight/8]]);



	var dist = wallsThickness+0.5; // distanza tra inizio muro centrale con scalinate e prima finestra 
	var mwFrontCentral1 = T([0])([windowWidth+3+dist])(mwFront2_4);
	var mwFrontCentral2 = SIMPLEX_GRID([[-leftSideWidth,dist,-windowWidth,(5.875-dist-windowWidth)],[wallsThickness],[-lWallHeight,mWallHeight]]);
	var mwFrontCentral3 = SIMPLEX_GRID([[-leftSideWidth-(stairsTotalWidth/2-doorWidth/2),doorWidth/2],
										[wallsThickness],
										[-lWallHeight-doorHeight,(mWallHeight-doorHeight)]]);
	var lwFrontCentral = SIMPLEX_GRID([[-leftSideWidth,stairsTotalWidth/2],[wallsThickness],[lWallHeight]]);
	var frontCentral = STRUCT([mwFrontCentral1, mwFrontCentral2, mwFrontCentral3, lwFrontCentral]);


	var highWall1 = T([2])([mWallHeight])(frontCentral);
	var highWall2 = T([2])([mWallHeight])(STRUCT([mwFront3,mwFront2_4,mwFront4]));
	var highWalls = STRUCT([highWall1,highWall2]);

	var frontWalls = STRUCT([mwFront1,mwFront2_1,mwFront2_3,mwFront2_4,mwFront3,mwFront4,mwFront5,frontCentral,lowWalls,highWalls]);

	return frontWalls;
}

var getWallPiece = function() {
	var lwFront1 = SIMPLEX_GRID([[0.5,-windowWidth,4.5,-windowWidth,1],[wallsThickness],[lWallHeight]]);
	var lwFront2_1 = SIMPLEX_GRID([[-0.5,windowWidth],
								 [wallsThickness],
								 [lWallHeight/3,-lWallHeight/3,lWallHeight/3]]);
	var lwFront2_2 = SIMPLEX_GRID([[-(0.5+windowWidth+4.5),windowWidth],
								 [wallsThickness],
								 [-lWallHeight*3/4,lWallHeight/4]]);
	var mwFront1 = SIMPLEX_GRID([[0.5,-windowWidth,4.5,-windowWidth,1],[wallsThickness],[-lWallHeight,mWallHeight]]);
	var mwFront2_1 = SIMPLEX_GRID([[-0.5,windowWidth],
								 [wallsThickness],
								 [-lWallHeight,mWallHeight/8,-mWallHeight/2,mWallHeight*3/8]]);
	var mwFront2_3 = T([0])([4.5+windowWidth])(mwFront2_1);

	var sideWallPiece = STRUCT([lwFront1,lwFront2_1,lwFront2_2,mwFront1,mwFront2_1,mwFront2_3]);

	return sideWallPiece;
}

var buildSideWalls = function() {
	// SIDE WALLS
	var sideWall = getWallPiece();
	sideWall = R([0,1])([-PI/2])(sideWall);
	sideWall = T([0,1])([-wallsThickness,9])(sideWall);
	var rearSideWall = SIMPLEX_GRID([ [11+wallsThickness+3],[-8,wallsThickness],[lWallHeight+mWallHeight] ]);

	var sideWallB1 = SIMPLEX_GRID([ [-11,+wallsThickness],
									  [-wallsThickness-7-wallsThickness, 0.5, -windowWidth, 3, -windowWidth, 1.5],
									  [lWallHeight+mWallHeight+hWallHeight] ]);
	var sideWallB1_window1 = SIMPLEX_GRID([ [-11,+wallsThickness],
									  		[-wallsThickness-7-wallsThickness -0.5, windowWidth, -3, windowWidth],
											[totalWallHeight/18, -totalWallHeight*3/18, totalWallHeight*4/18,
										   		-totalWallHeight*3/18, totalWallHeight*4/18, 
										  		-totalWallHeight*2/18, totalWallHeight*1/18 ]]);
	var sideWallB1_window2 = T([1])([3+windowWidth])(sideWallB1_window1);
	var sideWallB1_window3 = T([1])([3+windowWidth])(sideWallB1_window2);

	var sideWallB1_windows = STRUCT([sideWallB1_window1 , sideWallB1_window2, sideWallB1_window3]); 
	var sideWallB2 = T([1])([0.5 + windowWidth + 3 +windowWidth + 1.5 +1])(sideWallB1);
	var sideWallB12 = SIMPLEX_GRID([ [-11,+wallsThickness],
									 [-wallsThickness-7-wallsThickness -0.5-windowWidth-3-windowWidth-1.5, 1],
									 [lWallHeight+mWallHeight+hWallHeight] ]);
	var sideWallB1_B2 = STRUCT([sideWallB1,sideWallB2,sideWallB12,sideWallB1_windows]);

	sideWall = STRUCT([rearSideWall,sideWall,sideWallB1_B2]);

	return sideWall;
}

var buildBackWalls = function() {
	// BACK WALLS
	var backWall1 = buildWall([11,3*wallsThickness+7+9+7,0], wallsThickness+2.25, wallsThickness, totalWallHeight);
	var backWall2 = buildWall([11+wallsThickness+2.25+windowWidth,3*wallsThickness+7+9+7 ,0], wallsThickness+2.25, wallsThickness, totalWallHeight);
	var backWallWindow1 = SIMPLEX_GRID([[-11-wallsThickness-2.25,windowWidth],
								 [-(3*wallsThickness+7+9+7),wallsThickness],
								 [lWallHeight/3,-lWallHeight/3,lWallHeight/3+mWallHeight/4,
								  -mWallHeight/4,mWallHeight/4+mWallHeight/16,-mWallHeight/8,mWallHeight/16
								  +hWallHeight*3/8,-hWallHeight*2/8,hWallHeight*3/8]]);
	
	var backWallInside = SIMPLEX_GRID([[-11 -wallsThickness -6, wallsThickness], 
									   [-wallsThickness -7 -wallsThickness, 5, -1, 7.5, -2, 1.5],[totalWallHeight]]);
	var backWallCentral = SIMPLEX_GRID([[-11 -wallsThickness -6 -wallsThickness, 4.875], 
									   [-wallsThickness -7 -wallsThickness -7 -wallsThickness -4, wallsThickness],[totalWallHeight]]);

	var backWalls = STRUCT([backWall1,backWall2,backWallWindow1,backWallInside,backWallCentral]);

	return backWalls;
}

var buildInternalWalls = function() {
	var internalWall1 = SIMPLEX_GRID([[-11 -wallsThickness -11 +1, wallsThickness],[-wallsThickness, 3, -1, 3], [totalWallHeight]]);
	var internalWall2 = SIMPLEX_GRID([[-11 -wallsThickness -3 -1, 7],[-wallsThickness -7,wallsThickness], [totalWallHeight]]);
	var internalWallMiddle = SIMPLEX_GRID([[-11, wallsThickness +3],[-wallsThickness -7,wallsThickness], [-lWallHeight -mWallHeight, hWallHeight]]);
	var internalWalls = STRUCT([internalWall1,internalWall2,internalWallMiddle]);

	return internalWalls;
}

var buildWalls = function() {
	// BUILD LEFT HALF of the building walls
	var frontWalls = buildFrontWalls();
	var sideWalls = buildSideWalls();
	var backWalls = buildBackWalls();
	var internalWalls = buildInternalWalls();

	//BUILD THE ENTIRE BUILDING WALLS
	var leftHalfBuild = STRUCT([frontWalls,sideWalls,backWalls,internalWalls]);
	var rightHalfWalls = T([0])([2*(leftSideWidth ) + stairsTotalWidth])( S([0])([-1])(leftHalfBuild) );
	var walls = STRUCT([leftHalfBuild,rightHalfWalls]);

	DRAW(walls);
};



var buildVilla = function(){
	buildWalls();
	buildColonnade();
	buildFrames();
	build2FlightOfSteps();
}


buildVilla();