/*------------------------------   VARIABLES   ------------------------------*/
//DOMAINS
var domain1 = DOMAIN([[0,1],[0,1]])([20,20]);
var roofDomain = DOMAIN([[0,1],[0,1]])([6,6]);
var columnDomain = DOMAIN([[0,1],[0,2*PI]])([1,15]);
var poleDomain = DOMAIN([[0,1],[0,2*PI]])([5,15]);
var domain2d = DOMAIN([[0,1],[0,1]])([50,1]);
var spiralDomain = DOMAIN([[0,1],[0,1]])([20,30]);
//var spiralDomain = DOMAIN([[0,1],[0,1]])([1,1]);
var p = 10; // proportion

var domain = INTERVALS(1)(32);
var ddom = DOMAIN([[0,1],[0,1]])([50,10]);

// COLORS
var DARK_WOOD = [133/255,94/255,66/255];
var GLASS = [0.64, 0.83, 0.93, 0.8];
var MARBLE = [250/255,250/255,250/255];
var BURLY_WOODS = [139/255,119/255,101/255];
var ROOF = 	[0.8,0.51,0.4];
var WHITE_TIMPANO = [1,0.94,0.86];
var GARDEN = [154/255,205/255,50/255];
var COLUMNS_COLOR = [1,1,0.9];
var WALL_COLOR = [0.992,0.96,0.901];
var STAIRS_COLOR = [238/255,232/255,205/255];
var BASE_COLONNADE_COLOR = [139/255,119/255,101/255];

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


// WALLS
/*
e: external, c: central, b: back
m: medium, l: low
*/

// heights
var lWallHeight = hStairs;
var mWallHeight = 7;
var corniceHeight = 2;
var hWallHeight = 7;
var hwAltitude = lWallHeight +mWallHeight +corniceHeight;
var highCorniceHeight = mWallHeight*3/24;
var totalWallHeight = lWallHeight + mWallHeight + hWallHeight;
var subTympanumCorniceHeight = corniceHeight*3/4;


// wall thickness
var wallsThickness = 1;

//widths
var eW = cW = 11;
var b1WallWidth = b2WallWidth = 7;

// depths
var eD = cD = b1 = 7;
var b2D = 9;


// others
var leftSideWidth = wallsThickness + cW + 6;

//-------------------------------------------------------------------------------


// WINDOWS
var windowWidth = 1.5;
var	windowThickness = 0.1;
var littleWindowHeight = lWallHeight/3;
var littleFrontWindowWidth = 1;
var littleFrontWindowHeight = mWallHeight*3/24
var bigWindowHeight = mWallHeight/2;
var sideHighWindowHeight = mWallHeight/2;
var rearSmallerHighWindowHeight = mWallHeight/8;
var rearBiggerHighWindowHeight = hWallHeight/4;
var rearBiggerMediumWindowHeight = mWallHeight/4;


//-------------------------------------------------------------------------------


// FRAMES
var blindThickness = 0.05;
var blindHeight = 0.1;


//-------------------------------------------------------------------------------

// DOOR
var bigDoorWidth = 2.5;
var bigDoorHeight = mWallHeight*5/7;

var doorThickness = 0.25;

var littleDoorWidth = windowWidth;
var lowDoorHeight = lWallHeight*3/4;
var colonnadeDoorHeight = mWallHeight*12/24;


//-------------------------------------------------------------------------------

// COLONNADE
var colonnadeDepth = 6;
var colonnadeWidth = 15;
var columnDistance = (stairsTotalWidth/2 - bigDoorWidth/2 - 2*windowWidth - wallsThickness)/3; //0.75;

// column base
var highPartColumnBase = 0.04;
var columnBaseHeight = highPartColumnBase*11;

// COLONNE DARIO
var capitalHeight = 1;
var hColumn = mWallHeight -columnBaseHeight -capitalHeight;
var rColumn = 0.4;



// TERRACE
var incognite = 0.1;  // distance between the beginning of the flight of steps and the side balcony
var cubeWidth = 1;
var rowsHeight = 4*highPartColumnBase
var cubeHeight = cubeWidth;

var poleAndDistance = (stairsTotalWidth-6*cubeWidth-2*incognite)/27;
var poleDiameter = (poleAndDistance)*3/4;
var polesDistance = (poleAndDistance)/4;

var deltaColumns = 5*poleAndDistance;  // distance between each column


//-------------------------------------------------------------------------------


// ROOF

// Central roof
var tympanumWidth = stairsTotalWidth;
var roofDepth = 3*wallsThickness+7+7+10 + colonnadeDepth;
var tympanumHeight = 3.2;
var dTettoFrontone = 0.2;  // distanza tra parte di tetto che esce e tympanum

// Horizontal Roof
var dX = 8; // distanza tra vertici in basso a sinistra del tetto orizzontale e quello perpendicolare
var dY = colonnadeDepth;
var dZ = 2;  // differenza altezze tetti
var sporgenza = 0.2; // distanza tra muro su asse x e tetto che sporge
var horizontalCentralRoofWidth_half = dX + tympanumWidth/2;
var horizontalCentralRoofDepth = 7+12+2*wallsThickness + 2*sporgenza + 6;
var horizontalCentralRoofHeight = tympanumHeight+dZ;
var centralStraightPartWidth = 6;

// external roof
var horizontalExternalRoofDepth = 2*wallsThickness+7+ 2*sporgenza;
var horizontalExternalRoofWidth = wallsThickness+11;
var horizontalExternalRoofHeight = 1;
var externalStraightPartWidth = 11-0.5-windowWidth-2.25;


// guttam
var nGuttam = 35; // number of guttam
var nDiagonalGuttam = 20;
var nSpaces = 37; // number of spaces between guttam (even external)
// NB dim gutta = dim space
var guttaWidth = tympanumWidth/(nGuttam+nSpaces);
var guttaHeight = guttaWidth;

//-------------------------------------------------------------------------------

// PEDIMENT
var cornicePedimentThickness = 0.1;
var cornicePedimentHeight = 0.1;



/* ------------------------------------------ UTILS ------------------------------------------*/
var drawAll = function(array) {
	array.map(function(a){DRAW(a);});
};


var duplicate = function(leftHalf) {
	var rightHalf = T([0])([2*(leftSideWidth ) + stairsTotalWidth])( S([0])([-1])(leftHalf) );
	var entire = STRUCT([leftHalf,rightHalf]);
	return entire;
}

var makeKnotsColumns = function(cardP, gradoC) { 
	var knotsC = cardP + gradoC + 1;
	var knots = [0,0,0];
	for(var i = 0; i < (knotsC - 3 - 3); i++) {
		knots.push(i+1);
	}

	knots.push(i+1);
	knots.push(i+1);
	knots.push(i+1);

	return knots;
};

//given a list of controlPoints returns the relatives knots for a bidimensional NUBS
var makeKnots = function(points){
	var knots = [0,0,0];
	var tot = points.length;
	for(var i=1;i<=tot-3;i++)
		knots.push(i);
	knots.push(i);
	knots.push(i);
	knots.push(i);
	return knots;
}

//funzione che prepara la nubs a partire dai punti di controllo, per poi usarla in s1
function nubsS0 (controlpoints) {
  var curveKnots = makeKnots(controlpoints);
  var spline = NUBS(S0)(2)(curveKnots)(controlpoints);
  return spline;
}
//Funzione che, date due nubs s0 , le adopera come argomento di una hermite s1
function hermiteS1 (nubs1, nubs2, tan1, tan2) {
  var controlpoints = [nubs1, nubs2, tan1, tan2];
  var sur = CUBIC_HERMITE(S1)(controlpoints);
  var surface = MAP(sur)(domain1);
  return surface;
}

/* ------------------------------------------ STAIRS ------------------------------------------*/

/*
build a single step
vertexDL: left low vertex of the step
*/
var buildStep = function(vertexDL,width,height,thickness) {
 	var x = vertexDL[0];
	var y = vertexDL[1];
	var z = vertexDL[2];

	return SIMPLEX_GRID( [ [-x,width], [-y,thickness], [-z,height] ] );
 }; 

/*
builds a stair made of n steps
p1: low left vertex of the first step
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
	builtFlightOfStepBack.translate([0,1],[(leftSideWidth+2*stairsTotalWidth+3*lFS),-colonnadeDepth+4*wallsThickness+7+7+9+1]);
	builtFlightOfStepBack = STRUCT([builtFlightOfStepBack]);
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
	fiancoStair = COLOR(WALL_COLOR)(fiancoStair);

	stairs = T([0])([lFS])(stairs);
	stairs = COLOR(STAIRS_COLOR)(stairs);
	stairs = STRUCT([stairs,fiancoStair]);
	stairs = T([0,1])([leftSideWidth,-tStairs-colonnadeDepth])(stairs);


	return stairs;
};



/* ------------------------------------------ FRAMES ------------------------------------------*/


var buildFrames = function() {
	buildDoors();
	buildWindows();
	applyBoundaries();
	
}
var applyBoundaries = function(){
	var h = littleWindowHeight;
	// LITTLE WINDOWS
	var lowFrontLeft = applyBoundaryWood([0.5,0,lWallHeight/3],h);
	var lowFrontRight = applyBoundaryWood([13.5,0,lWallHeight/3],h);
	var lowSideExternalLeft = applyBoundaryWood([0,wallsThickness+ 7 -0.5 ,littleWindowHeight],h,true).translate([0],[-1]);
	var lowSideExternalRear = applyBoundaryWood([11 -windowWidth -0.5 ,2*wallsThickness +7 +blindThickness,littleWindowHeight],h);
	var lowBackLow = T([0,1])([0.75,7+7+9+ 4*wallsThickness+windowThickness])(lowFrontRight);

	// CURVE WINDOWS
	h = bigWindowHeight*3/4;
	var mFrontColonnade = applyBoundaryWood([19.8,0,lWallHeight+mWallHeight*2/24],h);
	var mFrontRight = T([0])([-windowWidth*3/2 -4 - blindThickness])(mFrontColonnade);
	var mFrontLeft = applyBoundaryWood([0.5,0,lWallHeight+mWallHeight*2/24],h);
	var mFrontCenter = T([0])([windowWidth+4.5])(mFrontLeft);

	var wSideLowRight = applyBoundaryWood([11,2*wallsThickness+7+(7 -windowWidth)/2 +windowWidth,lWallHeight+mWallHeight*2/24],h ,true);
	var wSideLowCenterRight = T([1])([windowWidth +(7 -windowWidth)/2+windowWidth])(wSideLowRight);
	var wSideLowCenterLeft = T([1])([windowWidth+1.5])(wSideLowCenterRight);
	var wSideLowLeft = T([1])([windowWidth+1.5])(wSideLowCenterLeft);

	// BIG WINDOWS
	h = bigWindowHeight;
	var hFrontColonnade = applyBoundaryWood([19.8,0,hwAltitude],h);
	var hFrontRight = T([0])([-windowWidth*3/2 -4 - blindThickness])(hFrontColonnade);
	var hBackColonnadeLeft = applyBoundaryWood([20.5+windowWidth,22+windowThickness,hwAltitude+mWallHeight*2/24],h);
	var hBackColonnadeRight = T([0])([-windowWidth-1+0.25])(hBackColonnadeLeft);

	var wSideMediumRight = applyBoundaryWood([11,2*wallsThickness+7+(7 -windowWidth)/2 +windowWidth,lWallHeight+mWallHeight+corniceHeight],h ,true);
	var wSideMediumCenterRight = T([1])([windowWidth +(7 -windowWidth)/2+windowWidth])(wSideMediumRight);
	var wSideMediumCenterLeft =  T([1])([windowWidth+1.5])(wSideMediumCenterRight);




	// H FRONT
	var h = mWallHeight*8/24;
	var hFrontLeft = applyBoundaryWood([0.5,0,hwAltitude],h);
	var hFrontCenter =  T([0])([windowWidth+4.5])(hFrontLeft);

	// BACk
	var mBackColonnadeLeft = applyBoundaryWood([20.5+windowWidth,22+windowThickness,lWallHeight+mWallHeight*2/24],h);
	var mBackColonnadeRight = T([0])([-windowWidth-1+0.25])(mBackColonnadeLeft);

	// MIDDLE WINDOWS
	h =  mWallHeight/8;
	var wMBackLow = applyBoundaryWood([11+wallsThickness+2.25,
										7+7+9+ 4*wallsThickness +blindThickness,
										lWallHeight+ mWallHeight/4],  mWallHeight/4 );
	var wMbackMiddle = applyBoundaryWood([11+wallsThickness+2.25,
										7+7+9+ 4*wallsThickness+blindThickness,
										lWallHeight+ mWallHeight*3/4+mWallHeight/16],   h );
	var wHBackHigh = applyBoundaryWood([11+wallsThickness+2.25,
										7+7+9+ 4*wallsThickness +blindThickness,
									lWallHeight+mWallHeight+corniceHeight+mWallHeight*4/24],    mWallHeight*8/24 );


	// EXTERNAL SIDE
	var wExternalSideLeft = T([0,1])([-11-wallsThickness,-(7 -windowWidth)/2 -wallsThickness-0.5 -windowWidth])(wSideLowRight);
	var wExternalSideRight = T([1])([-windowWidth-3])(wExternalSideLeft);

	h = mWallHeight*3/24;
	var wMRear = applyBoundaryWood([0.5+2*windowWidth+4.5+1,2*wallsThickness+7+blindThickness,hwAltitude -corniceHeight -mWallHeight*2/24 -h],h);
	var wHRear = applyBoundaryWood([0.5+2*windowWidth+4.5+1,2*wallsThickness+7+blindThickness,hwAltitude +mWallHeight/24],h);
	var wHSide = applyBoundaryWood([11,3*wallsThickness+7+7+9-1,hwAltitude+hWallHeight-mWallHeight*7/24-h],h,true); 


	var wHExternal = T([0])([-0.5])(hFrontLeft).rotate([0,1],[PI/2]).translate([0,1],[-wallsThickness -blindThickness , wallsThickness+0.5]);

	h = littleFrontWindowHeight;
	var wLowFront = apply1x1BoundaryWood([0.5+3+4.5+1,0,lWallHeight+mWallHeight*8/24],h);
	var wMiddleFront = T([2])([h+mWallHeight*8/24])(wLowFront);
	var wHighFront = T([2])([h+mWallHeight*2/24+corniceHeight])(wMiddleFront);


	boundaries = STRUCT([lowFrontLeft,lowFrontRight,lowSideExternalLeft,lowSideExternalRear,lowBackLow,
						hFrontColonnade,hFrontRight, hBackColonnadeLeft, hBackColonnadeRight,
						mFrontColonnade,mFrontRight,mFrontLeft,mFrontCenter,
						hFrontLeft,hFrontCenter,
						mBackColonnadeLeft,mBackColonnadeRight,
						wMbackMiddle,wHBackHigh,wMBackLow,
						wSideLowRight,wSideLowCenterRight,wSideLowCenterLeft,wSideMediumRight,wSideMediumCenterRight,wSideMediumCenterLeft,wSideLowLeft,
						wExternalSideLeft,wExternalSideRight,
						wMRear,wHRear,wHSide,
						wHExternal,
						wLowFront,wMiddleFront,wHighFront]);
	boundaries = duplicate(boundaries);
	DRAW(boundaries);
}

/* 
lbV: left bottom vertex
side: true if window width on x axis
*/

var applyBoundaryWood = function(lbV,windowHeight,side) {
	if (!side) {
		var bottomWood = SIMPLEX_GRID([[windowWidth],[blindThickness],[blindHeight]]);	
		var sideWoodLeft = SIMPLEX_GRID([[blindThickness],[blindThickness],[-blindHeight,windowHeight-2*blindThickness]]);	
		var sideWoodRight = T([0])([windowWidth-blindThickness])(sideWoodLeft);
		var topWood = T([2])([windowHeight -blindThickness])(bottomWood);
		var centralWood = SIMPLEX_GRID([[-(windowWidth/2-blindThickness),2*blindThickness],[blindThickness],[-blindThickness,windowHeight -blindThickness ]]);
	}
	else {
		var bottomWood = SIMPLEX_GRID([[blindThickness],[windowWidth],[blindHeight]]);	
		var sideWoodLeft = SIMPLEX_GRID([[blindThickness],[blindThickness],[-blindHeight,windowHeight-2*blindThickness]]);	
		var sideWoodRight = T([1])([windowWidth-blindThickness])(sideWoodLeft);
		var topWood = T([2])([windowHeight -blindThickness])(bottomWood);
		var centralWood = SIMPLEX_GRID([[blindThickness],[-(windowWidth/2-blindThickness),2*blindThickness],[-blindThickness,windowHeight -blindThickness ]]);
		var blind = STRUCT([bottomWood,sideWoodLeft,sideWoodRight,topWood,centralWood]).translate([0,1,2],[lbV[0],lbV[1]-blindThickness,lbV[2]]);
		blind.translate([0,1],[-windowThickness/2,-windowWidth+blindThickness])
		blind = COLOR(DARK_WOOD)(blind);
		return blind;

	}

	var blind = STRUCT([bottomWood,sideWoodLeft,sideWoodRight,topWood,centralWood]).translate([0,1,2],[lbV[0],lbV[1]-blindThickness,lbV[2]]);
	blind = COLOR(DARK_WOOD)(blind);

	return blind;
}
var apply1x1BoundaryWood = function(lbV,windowHeight,side) {
	var windowWidth = 1;
	if (!side) {
		var bottomWood = SIMPLEX_GRID([[windowWidth],[blindThickness],[blindHeight]]);	
		var sideWoodLeft = SIMPLEX_GRID([[blindThickness],[blindThickness],[-blindHeight,windowHeight-2*blindThickness]]);	
		var sideWoodRight = T([0])([windowWidth-blindThickness])(sideWoodLeft);
		var topWood = T([2])([windowHeight -blindThickness])(bottomWood);
		var centralWood = SIMPLEX_GRID([[-(windowWidth/2-blindThickness),2*blindThickness],[blindThickness],[-blindThickness,windowHeight -blindThickness ]]);
	}

	var blind = STRUCT([bottomWood,sideWoodLeft,sideWoodRight,topWood,centralWood]).translate([0,1,2],[lbV[0],lbV[1]-blindThickness,lbV[2]]);
	blind = COLOR(DARK_WOOD)(blind);

	return blind;
}

/* ------------------------------------------ DOORS ------------------------------------------*/

var buildDoors = function() {
	buildFrontdoors();
	buildBackdoors();
	buildGenericDoors();
}

var buildFrontdoors = function() {
	var fd = buildDoor();
	fd.translate([1],[wallsThickness/2]);

	var fdUp = T([2])([mWallHeight+corniceHeight -mWallHeight*3/24-0.15])(fd);

	drawAll([fd,fdUp]);
}

var buildBackdoors = function() {
	var bd = buildDoor();
	bd.translate([1],[-doorThickness+4*wallsThickness+7+7+9-colonnadeDepth +wallsThickness/2]);
	var bdUp = T([2])([mWallHeight+corniceHeight-mWallHeight*3/24-0.15])(bd);

	drawAll([bd,bdUp]);
}


var buildDoor = function() {
	var sf = 0.125; // scale factor
	var thickness = doorThickness/sf;
	var height = 5.62/sf;
	var width = 3.25/sf;

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
	FDGlasses = COLOR(GLASS)(FDGlasses);

	frontDoor = STRUCT([woodFDParts, FDGlasses]);
	sf = 0.125;
	frontDoor.scale([0,1,2],[0.0955,0.125,0.111]);
	frontDoor.translate([0,2],[leftSideWidth + lFS + (wStep)/2 - width*sf/2 +0.39, hStairs]);
	

	return frontDoor;
};

var buildGenericDoor = function (p,height,side) {
	if(!side) {
		var door = SIMPLEX_GRID([[-p[0],littleDoorWidth],[-p[1],doorThickness],[-p[2],height]]);
	}
	else {
		var door = SIMPLEX_GRID([[-p[0],doorThickness],[-p[1]+littleDoorWidth,littleDoorWidth],[-p[2],height]]);
	}
	return door;
}


var buildGenericDoors = function() {
	var dFrontLeft = buildGenericDoor([0.5+ windowWidth+4.5,wallsThickness/2,0],lowDoorHeight);
	var dSideExternalRight = buildGenericDoor([wallsThickness/2,wallsThickness +0.5 +littleDoorWidth,0],lowDoorHeight,true).translate([0],[-1]);
	var dRearExternal = buildGenericDoor([4.5-windowWidth,wallsThickness+7+wallsThickness/2,0],lowDoorHeight);
	var dMBackColonnadeDoor = SIMPLEX_GRID([[-11-wallsThickness-6-wallsThickness/2,doorThickness],
											[-3*wallsThickness-7-7-6, 2],[-lWallHeight,colonnadeDoorHeight]]);
	var dHBackColonnadeDoor = T([2])([mWallHeight+corniceHeight])(dMBackColonnadeDoor);
	
	var leftDoors = STRUCT([dSideExternalRight,dFrontLeft,dRearExternal,dMBackColonnadeDoor,dHBackColonnadeDoor]);
	var doors = duplicate(leftDoors);
	doors = COLOR(DARK_WOOD)(doors);
	DRAW(doors);
	return doors;
}


/* ------------------------------------------ WINDOWS ------------------------------------------*/


var buildWindows = function() {
	var littleWindows = buildLittleWindows();
	var bigWindows = buildBigWindows();
	var w1x1 = build1x1Windows();
	var backWindows = buildBackWindows();
	var externalLittleWindows = buildExternalHighWindows();
	var rearWindows = buildRearExternalWindows();

	var leftWindows = STRUCT([littleWindows,bigWindows,w1x1,backWindows,externalLittleWindows,rearWindows]);
	var rightWindows = S([0])([-1])(leftWindows).translate([0],[11*2+6+3+windowWidth*2+wallsThickness*2+stairsTotalWidth]) ;
	var windows = STRUCT([leftWindows,rightWindows]);
	windows = (COLOR(GLASS)(windows));
	DRAW(windows);
}

/*
p: vertex low left
side: true if window width is on y axis
*/
var buildGenericWindow = function (p,height,side) {
	if(!side) {
		var w = SIMPLEX_GRID([[-p[0],windowWidth],[-p[1],windowThickness],[-p[2],height]]);
	}
	else {
		var w = SIMPLEX_GRID([[-p[0],windowThickness],[-p[1]+windowWidth,windowWidth],[-p[2],height]]);
	}
	return BOUNDARY(w);
}


var buildCurveWindow = function(side) {
	var cpTopWindow = [[0,0,bigWindowHeight*3/4],[windowWidth/2,0,bigWindowHeight*10/8],[windowWidth,0,bigWindowHeight*3/4]];

	var curveMapping = BEZIER(S0)(cpTopWindow);
	// glass curve part
	var v1 = [0,0,bigWindowHeight*3/4];
	var frontGlass = MAP( CONICAL_SURFACE(v1) (curveMapping) )(ddom);
	var backGlass = T([1])([windowThickness])(frontGlass);
	var bottomGlass =BOUNDARY( CUBOID([windowWidth,windowThickness,bigWindowHeight*3/4]) );

	var glass = STRUCT([frontGlass,backGlass,bottomGlass]);
	glass = COLOR(GLASS)(glass);


	if (side) {
		glass.rotate([0,1],[PI/2]).translate([0,1],[windowThickness,-windowWidth]);
	}

	return glass;
}


// height: lWallHeight/3 = 1.08
var buildLittleWindows = function() {
	var h = littleWindowHeight;

	var wFrontLeft = buildGenericWindow([0.5,0,littleWindowHeight],h);
	var wFrontRight = T([0])([windowWidth+4.5+windowWidth+3+wallsThickness+1.5])(wFrontLeft);
	var wSideExternalLeft = buildGenericWindow([0,wallsThickness+ 7 -0.5 ,littleWindowHeight],h,true).translate([0],[-1]);
	var wSideExternalRear = buildGenericWindow([11 -windowWidth -0.5 ,2*wallsThickness +7 -windowThickness,littleWindowHeight],h);
	var wBackLow = T([0,1])([0.75,7+7+9+ 4*wallsThickness -windowThickness])(wFrontRight);

	var littleWindows = STRUCT([wFrontLeft,wFrontRight,wSideExternalLeft,wBackLow,wSideExternalRear]);

	return littleWindows;
}

var buildExternalHighWindows = function() {
	var h = mWallHeight*8/24;
	var wFrontLeft = buildGenericWindow([0.5,0,hwAltitude],h);
	var wFrontRight = T([0])([windowWidth+4.5])(wFrontLeft);
	var wExternal = T([0])([-0.5])(wFrontLeft).rotate([0,1],[PI/2]).translate([0,1],[-wallsThickness+windowThickness, wallsThickness+0.5]);
	var externalHigh = STRUCT([wFrontLeft,wFrontRight,wExternal]);
	return externalHigh;
}

var buildRearExternalWindows = function() {
		var h = mWallHeight*3/24;
		var wMRear = buildGenericWindow([0.5+2*windowWidth+4.5+1,2*wallsThickness+7 -windowThickness,hwAltitude -corniceHeight -mWallHeight*2/24 -h],h);
		var wHRear = buildGenericWindow([0.5+2*windowWidth+4.5+1,2*wallsThickness+7 -windowThickness,hwAltitude +mWallHeight/24],h);
		var wHSide = buildGenericWindow([11,3*wallsThickness+7+7+9-1,hwAltitude+hWallHeight-mWallHeight*7/24-h],h,true); 

		var rearWindows = STRUCT([wMRear,wHRear,wHSide]);
		return rearWindows;
}

// rearSmallerHighWindowHeight: mWallHeight/8 = 0.875
// rearSmallerHighWindowHeight: mWallHeight/4 = 0.43
var buildBackWindows = function() {
	var wMBackLow = buildGenericWindow([11+wallsThickness+2.25,
										7+7+9+ 4*wallsThickness -windowThickness,
										lWallHeight+ mWallHeight/4],  mWallHeight/4 );
	var wMbackMiddle = buildGenericWindow([11+wallsThickness+2.25,
										7+7+9+ 4*wallsThickness -windowThickness,
										lWallHeight+ mWallHeight*3/4+mWallHeight/16],    mWallHeight/8 );
	var wHBackHigh = buildGenericWindow([11+wallsThickness+2.25,
										7+7+9+ 4*wallsThickness -windowThickness,
									lWallHeight+mWallHeight+corniceHeight+mWallHeight*4/24],    mWallHeight*8/24 );
	
	var backWindows = STRUCT([wMBackLow, wMbackMiddle,wHBackHigh]);
	return backWindows;
}

// height: mWallHeight/2 = 3.5
var buildBigWindows = function () {
	var h = bigWindowHeight;

	// SIDE WALL
	var wSideLowRight = buildGenericWindow([11,2*wallsThickness+7+(7 -windowWidth)/2 +windowWidth,lWallHeight+mWallHeight*2/24],h ,true);
	var wSideLowCurveRight = buildCurveWindow(true).translate([0,1,2],[11,2*wallsThickness+7+(7 -windowWidth)/2 +windowWidth,lWallHeight+mWallHeight*2/24]);
	var wSideLowCenterRight = T([1])([windowWidth +(7 -windowWidth)/2+windowWidth])(wSideLowRight);
	var wSideLowCenterCurveRight = T([1])([windowWidth +(7 -windowWidth)/2+windowWidth])(wSideLowCurveRight);
	var wSideLowCenterLeft = T([1])([windowWidth+1.5])(wSideLowCenterRight);
	var wSideLowCenterCurveLeft = T([1])([windowWidth+1.5])(wSideLowCenterCurveRight);
	var wSideLowCurveLeft = T([1])([windowWidth+1.5])(wSideLowCenterCurveLeft);
	var wSideMediumRight = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(wSideLowRight);
	var wSideMediumCenterRight = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(wSideLowCenterRight);
	var wSideMediumCenterLeft = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(wSideLowCenterLeft);

	// EXTERNAL SIDE WALL
	var wExternalSideLeft = T([0,1])([-11-wallsThickness,-(7 -windowWidth)/2 -wallsThickness-0.5 -windowWidth])(wSideLowCurveRight);
	var wExternalSideRight = T([1])([-windowWidth-3])(wExternalSideLeft);

	// FRONT WALL
	var mFrontLeft = buildGenericWindow([0.5,0,lWallHeight+mWallHeight*2/24],h);
	var mFrontCurveLeft = buildCurveWindow().translate([0,2],[0.5,lWallHeight+mWallHeight*2/24]);
	var mFrontCurveCenter = T([0])([4.5+windowWidth])(mFrontCurveLeft);
	var mFrontCenter = T([0])([4.5+windowWidth])(mFrontLeft);
	var mFrontRight = T([0])([windowWidth+3+wallsThickness+1.5])(mFrontCenter);
	var mFrontCurveRight = T([0])([windowWidth+3+wallsThickness+1.5])(mFrontCurveCenter);


	var hFrontRight = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24 ])(mFrontRight);
	var mFrontColonnade =  T([0])([windowWidth+3.05+wallsThickness+ columnDistance])(mFrontRight);
	var mFrontCurveColonnade = T([0])([windowWidth+3.05+wallsThickness+ columnDistance])(mFrontCurveRight);
	var hFrontColonnade = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(mFrontColonnade);

	// BACK
	var mBackColonnadeLeft = buildGenericWindow([11+wallsThickness+6+wallsThickness+columnDistance,3*wallsThickness+7+7+4+wallsThickness-windowThickness,
											lWallHeight+ mWallHeight*2/24],h);
	var mBackColonnadeCurveLeft = buildCurveWindow();
	mBackColonnadeCurveLeft.translate([0,1,2],[11+wallsThickness+6+wallsThickness+columnDistance,3*wallsThickness+7+7+4+wallsThickness-windowThickness,
												lWallHeight+ mWallHeight*2/24]);
	var mBackColonnadeRight = T([0])([windowWidth+columnDistance])(mBackColonnadeLeft);
	var mBackColonnadeCurveRight = T([0])([windowWidth+columnDistance])(mBackColonnadeCurveLeft);
	var hBackColonnadeLeft = T([2])([mWallHeight+corniceHeight])(mBackColonnadeLeft);
	var hBackColonnadeRight = T([2])([mWallHeight+corniceHeight])(mBackColonnadeRight);



	
	var bigWindows = STRUCT([wSideLowCurveRight,wSideLowCenterCurveRight,wSideLowCenterCurveLeft,wSideLowCurveLeft,wSideMediumRight,wSideMediumCenterRight,wSideMediumCenterLeft,
							wExternalSideLeft,wExternalSideRight, mFrontCurveLeft,mFrontCurveCenter,mFrontCurveRight,hFrontRight,mFrontCurveColonnade,hFrontColonnade,
							mBackColonnadeCurveLeft,mBackColonnadeCurveRight,hBackColonnadeLeft,hBackColonnadeRight]);
	return bigWindows;
}

var build1x1Windows = function() {
	var h = littleFrontWindowHeight;
	var wLowFront = SIMPLEX_GRID([[-0.5-windowWidth-4.5-windowWidth-1,littleFrontWindowWidth],[windowThickness],[-lWallHeight -mWallHeight*8/24,h]]);
	var wMiddleFront = T([2])([h+mWallHeight*8/24])(wLowFront);
	var wHighFront = T([2])([h+mWallHeight*2/24+corniceHeight])(wMiddleFront);
	var w1x1 = STRUCT([wLowFront,wMiddleFront,wHighFront]);
	return w1x1;
}





/* ------------------------------------------ WALLS ------------------------------------------*/

var buildWalls = function() {

	// BUILD LEFT HALF of the building walls
	var lowWalls = buildLowWalls();
	var middleWalls = buildMiddleWalls();
	var curveWalls = buildCurveWalls();
	var cornices = buildCornices();
	var highWalls = buildHighWalls();
	var internalWalls = buildInternalWalls();

	var whiteWalls = STRUCT([middleWalls,cornices,highWalls,internalWalls,curveWalls]);
	whiteWalls = COLOR(WALL_COLOR)(whiteWalls);

	var leftHalfBuild = STRUCT([lowWalls,whiteWalls]);
	var walls = duplicate(leftHalfBuild);


	DRAW(walls);
};


var buildWall = function(p,width,depth,height) {
	return SIMPLEX_GRID([[-p[0],width],[-p[1],depth],[-p[2],height]])
};

var buildCurveWalls = function() {
	var front1st = buildCurveWall([0.5,0,lWallHeight+mWallHeight/12]);
	var front2nd = buildCurveWall([6.5,0,lWallHeight+mWallHeight/12]);
	var front3rd = buildCurveWall([13.5,0,lWallHeight+mWallHeight/12]);
	var frontColonnade1st = buildCurveWall([19.8,0,lWallHeight+mWallHeight/12]);
	var back1st = buildCurveWall([19.75,21,lWallHeight+mWallHeight/12]);
	var back2nd = buildCurveWall([22,21,lWallHeight+mWallHeight/12]);

	var side1st = buildCurveWall([0,3,lWallHeight+mWallHeight/12],true).translate([0],[-1]);
	var side2nd = buildCurveWall([0,7.5,lWallHeight+mWallHeight/12],true).translate([0],[-1]);
	var side3rd = buildCurveWall([11,13.25,lWallHeight+mWallHeight/12],true);
	var side4th = buildCurveWall([11,19,lWallHeight+mWallHeight/12],true);
	var side5th = buildCurveWall([11,22,lWallHeight+mWallHeight/12],true);
	var side6th = buildCurveWall([11,25,lWallHeight+mWallHeight/12],true);

	var curveWalls = STRUCT([front1st,front2nd,front3rd,frontColonnade1st,back1st,back2nd,side1st,side2nd,side3rd,side4th,side5th,side6th]);
	return curveWalls;
}

var buildCurveWall = function(p,side) {

	var cpTopWindow = [[0,0,bigWindowHeight*3/4],[windowWidth/2,0,bigWindowHeight*10/8],[windowWidth,0,bigWindowHeight*3/4]];

	var curveMapping = BEZIER(S0)(cpTopWindow);
	var curve1 = MAP(curveMapping)(domain);
	// missing part of the wall
	var cp = [[0,0,bigWindowHeight],[windowWidth,0,bigWindowHeight]];
	var cpMapping = BEZIER(S0)(cp);
	var curveWall2dFront = MAP(NUBS(S1)(1)([0,0,3,3])([curveMapping,cpMapping]))(ddom);
	var curveWall2dBack = T([1])([wallsThickness])(curveWall2dFront);

	var vectorCurveWall = [0,wallsThickness,0];
	var curveWallDepth = MAP(  CYLINDRICAL_SURFACE(curveMapping)(vectorCurveWall)  )(  ddom  );

	var curveWall = STRUCT([curveWall2dFront,curveWall2dBack,curveWallDepth]);


	if (side) {
		curveWall.rotate([0,1],[PI/2]).translate([0,1],[wallsThickness,-windowWidth]);
	}

	curveWall.translate([0,1,2],[p[0],p[1],p[2]]);
	
	return curveWall;	
	
}


/*  LOW WALLS */
var buildLowWalls = function() {
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
	var lowFrontWalls = STRUCT([lwFront1,lwFront2_1,lwFront2_2,lwFront3_2,lwFront3_1,]);

	// EXTERNAL SIDE WALLS
	var lwExternalSideWallRight = SIMPLEX_GRID([[wallsThickness],[wallsThickness+0.5],[lWallHeight]]);
	var lwExternalSideWallRightDoor = SIMPLEX_GRID([[wallsThickness],[-wallsThickness-0.5,windowWidth],[-lowDoorHeight,(lWallHeight -lowDoorHeight )]]);
	var lwExternalSideWallCenter = SIMPLEX_GRID([[wallsThickness],[-wallsThickness-0.5-windowWidth,3],[lWallHeight]]);
	var lwExternalSideWallLeftWindow = SIMPLEX_GRID([[wallsThickness],[-wallsThickness-0.5-windowWidth-3,windowWidth],[littleWindowHeight,-littleWindowHeight,littleWindowHeight]]);
	var lwExternalSideWallLeft = SIMPLEX_GRID([[wallsThickness],[-wallsThickness-0.5-windowWidth-3-windowWidth,0.5+wallsThickness],[lWallHeight]]);
	
	var lwExternalSideWall = STRUCT([lwExternalSideWallRight,lwExternalSideWallRightDoor,lwExternalSideWallCenter,lwExternalSideWallLeftWindow,lwExternalSideWallLeft]);
	lwExternalSideWall.translate([0],[-wallsThickness]);

	// REAR EXTERNAL SIDE WALLS
	var pezzoMancante = SIMPLEX_GRID([[-0.5-2*windowWidth-4.5,3],[wallsThickness],[lWallHeight]]);
	var lwRearExternalWalls = STRUCT([lwFront1,lwFront2_1,lwFront2_2,pezzoMancante]).scale([0],[-1]).translate([0,1],[0.5+2*windowWidth+4.5+3,7+wallsThickness]);

	// SIDE WALLS
	var lwSideWall = SIMPLEX_GRID([[-11,wallsThickness],[-2*wallsThickness-7,7+wallsThickness+9],[lWallHeight]]);

	// REAR WALLS
	var lwBackWallRight = SIMPLEX_GRID([[-11,wallsThickness+2.25,-windowWidth,2.25],[-3*wallsThickness-7-7-9,wallsThickness],[lWallHeight]]);
	var lwBackWindow = SIMPLEX_GRID([[-11-wallsThickness-2.25,windowWidth],
									 [-3*wallsThickness-7-7-9,wallsThickness],
									 [littleWindowHeight,-littleWindowHeight,littleWindowHeight]]);
	
	var lwBackWalls = STRUCT([lwBackWallRight,lwBackWindow]);

	var lowWalls = STRUCT([lowFrontWalls,lwExternalSideWall,lwRearExternalWalls,lwSideWall,lwBackWalls]);
	lowWalls = COLOR(BURLY_WOODS)(lowWalls);

	return lowWalls;
}

var buildMiddleWalls = function() {
	var bigWindowMWallMeasures_Height = [mWallHeight*2/24,-mWallHeight*12/24,mWallHeight*10/24,];

	// FRONT WALLS
	var mwFrontExternal = SIMPLEX_GRID([[0.5,-windowWidth,4.5,-windowWidth,1,-littleFrontWindowWidth,1],[wallsThickness],[mWallHeight]]);
	var mwFrontExternalLeftWindow = SIMPLEX_GRID([[-0.5,windowWidth],[wallsThickness],bigWindowMWallMeasures_Height]);
	var mwFrontExternalCentralWindow = SIMPLEX_GRID([[-0.5-windowWidth-4.5,windowWidth],[wallsThickness],bigWindowMWallMeasures_Height]);
	var mwFrontExternalRightLittleWindows = SIMPLEX_GRID([[-0.5-windowWidth-4.5-windowWidth-1,littleFrontWindowWidth],
														  [wallsThickness],
														  [mWallHeight*8/24,-littleFrontWindowHeight,mWallHeight*8/24,-littleFrontWindowHeight,mWallHeight*2/24]]);
	var mwFrontExternal = STRUCT([mwFrontExternal,mwFrontExternalLeftWindow,mwFrontExternalCentralWindow,mwFrontExternalRightLittleWindows]);


	var mwFrontCentralVertical = SIMPLEX_GRID([[-11,wallsThickness+1.5,-windowWidth,3],[wallsThickness],[mWallHeight]]);
	var mwFrontCentralWindow = SIMPLEX_GRID([[-11-wallsThickness-1.5,windowWidth],[wallsThickness],bigWindowMWallMeasures_Height]);
	var mwFrontColonnadeDoor = SIMPLEX_GRID([[-11-wallsThickness-6 -(stairsTotalWidth/2 -bigDoorWidth/2),bigDoorWidth/2],
									   [wallsThickness],[-bigDoorHeight,(mWallHeight-bigDoorHeight)]]);
	

	var mwFrontCentral = STRUCT([mwFrontCentralVertical,mwFrontCentralWindow,mwFrontColonnadeDoor]);

	var mwFrontColonnade = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness +0.8,-windowWidth,(stairsTotalWidth/2-bigDoorWidth/2 -windowWidth -wallsThickness -0.8)],
										 [wallsThickness],[mWallHeight]]);;
	var mwFrontColonnadeWindow = SIMPLEX_GRID([[-11-wallsThickness-6-wallsThickness-0.8,windowWidth],[wallsThickness],bigWindowMWallMeasures_Height]);
	var mwFrontColonnade = STRUCT([mwFrontColonnade,mwFrontColonnadeWindow]);

	var frontWalls = STRUCT([mwFrontExternal,mwFrontCentral,mwFrontColonnade]);

	// EXTERNAL SIDE WALLS
	var mwExternalSideWallVertical = SIMPLEX_GRID([[wallsThickness],[wallsThickness+0.5,-windowWidth,3,-windowWidth,0.5+wallsThickness],[mWallHeight]]);
	var mwExternalSideWallRightWindow = SIMPLEX_GRID([[wallsThickness],[-wallsThickness-0.5,windowWidth],bigWindowMWallMeasures_Height]);
	var mwExternalSideWallLeftWindow = SIMPLEX_GRID([[wallsThickness],[-wallsThickness-0.5-windowWidth-3,windowWidth],bigWindowMWallMeasures_Height]);

	var mwExternalSideWall = STRUCT([mwExternalSideWallVertical,mwExternalSideWallRightWindow,mwExternalSideWallLeftWindow]);
	mwExternalSideWall.translate([0],[-wallsThickness]);


	// REAR EXTERNAL SIDE WALLS
	var mwSideRearVertical = SIMPLEX_GRID([[9,-windowWidth,0.5],[-wallsThickness-7,wallsThickness],[mWallHeight]]);
	var mwSideRearWindow = SIMPLEX_GRID([[-9,windowWidth],[-wallsThickness-7,wallsThickness],[mWallHeight*19/24,-mWallHeight*3/24,mWallHeight*2/24]]);
	var mwSideRear = STRUCT([mwSideRearVertical,mwSideRearWindow]);
	
	// SIDE WALLS
	var mwSideVerticalRight = SIMPLEX_GRID([[-11,wallsThickness],[-2*wallsThickness-7,(7 -windowWidth)/2,-windowWidth,(7 -windowWidth)/2+wallsThickness],[mWallHeight]]);
	var mwSideWindowRight = SIMPLEX_GRID([[-11,wallsThickness],[-2*wallsThickness-7,-(7 -windowWidth)/2,windowWidth],bigWindowMWallMeasures_Height]);
	var mwSideVerticalLeft = SIMPLEX_GRID([[-11,wallsThickness],[-3*wallsThickness-7-7,0.5,-windowWidth,1.5,-windowWidth,1.5,-windowWidth,1+wallsThickness],[mWallHeight]]);
	var mwSideWindowCenterRight = SIMPLEX_GRID([[-11,wallsThickness],[-3*wallsThickness-7-7-0.5,windowWidth],bigWindowMWallMeasures_Height]);
	var mwSideWindowCenterLeft = T([1])([1.5+windowWidth])(mwSideWindowCenterRight);
	var mwSideWindowLeft = T([1])([1.5+windowWidth])(mwSideWindowCenterLeft);
	var mwSide = STRUCT([mwSideVerticalRight,mwSideWindowRight,mwSideVerticalLeft,mwSideWindowCenterRight,mwSideWindowCenterLeft,mwSideWindowLeft])
	
	// BACK WALLS
	var mwBackVertical = SIMPLEX_GRID([[-11-wallsThickness,+2.25,-windowWidth,2.25],[-3*wallsThickness-7-7-9,wallsThickness],[mWallHeight]]);
	var mwBackWindow = SIMPLEX_GRID([[-11-wallsThickness-2.25,windowWidth],
									 [-3*wallsThickness-7-7-9,wallsThickness],
									 [mWallHeight/4,-mWallHeight/4,mWallHeight/4+mWallHeight/16,-mWallHeight/8,mWallHeight/16]]);
	var mwBackColonnadeVertical = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness+columnDistance,-windowWidth,columnDistance,-windowWidth,columnDistance],
									   [-3*wallsThickness-7-7-4,wallsThickness],[mWallHeight]]);
	var mwBackColonnadeWindowRight = SIMPLEX_GRID([[-11-wallsThickness-6-wallsThickness-columnDistance,windowWidth],
									   [-3*wallsThickness-7-7-4,wallsThickness],bigWindowMWallMeasures_Height]);
	var mwBackColonnadeWindowLeft = T([0])([windowWidth+columnDistance])(mwBackColonnadeWindowRight);
	var mwBackColonnadeDoor = SIMPLEX_GRID([[-11-wallsThickness-6 -(stairsTotalWidth/2 -bigDoorWidth/2),bigDoorWidth/2],
									   [-3*wallsThickness-7-7-4,wallsThickness],[-bigDoorHeight,(mWallHeight-bigDoorHeight)]]);
	var mwBackColonnadeInternalVertical = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness],
									   [-3*wallsThickness-7-7-4,wallsThickness+1,-2,1+wallsThickness],[mWallHeight]]);
	var mwBackColonnadeInternalDoor = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness],
									   [-3*wallsThickness-7-7-4-wallsThickness-1,2],[-mWallHeight*12/24,mWallHeight*12/24]]);
	var mwBackColonnade = STRUCT([mwBackColonnadeVertical,mwBackColonnadeWindowRight,mwBackColonnadeWindowLeft,
								mwBackColonnadeDoor,mwBackColonnadeInternalVertical,mwBackColonnadeInternalDoor]);


	var mwbackWalls = STRUCT([mwBackVertical,mwBackWindow,mwBackColonnade]);

	var middleWalls = STRUCT([frontWalls,mwExternalSideWall,mwSideRear,mwbackWalls,mwSide]);
	middleWalls.translate([2],[lWallHeight]);

	return middleWalls;
}


var buildHighWalls = function() {
	var bigWindowMWallMeasures_Height = [mWallHeight*2/24,-mWallHeight*12/24,mWallHeight*10/24];


	var bigWindowHWallMeasures_Height = [-mWallHeight*12/24,mWallHeight*12/24];
	var leftExternaWindowWallMeasures_Height = [-mWallHeight*8/24,mWallHeight*1/24];
	
	// FRONT WALLS
	var hwFrontExternal = SIMPLEX_GRID([[0.5,-windowWidth,4.5,-windowWidth,1,-littleFrontWindowWidth,1],[wallsThickness],[mWallHeight*9/24]]);
	var hwFrontExternalLeftWindow = SIMPLEX_GRID([[-0.5,windowWidth],[wallsThickness],leftExternaWindowWallMeasures_Height]);
	var hwFrontExternalCentralWindow = SIMPLEX_GRID([[-0.5-windowWidth-4.5,windowWidth],[wallsThickness],leftExternaWindowWallMeasures_Height]);
	var hwFrontExternalRightLittleWindows = SIMPLEX_GRID([[-0.5-windowWidth-4.5-windowWidth-1,littleFrontWindowWidth],
														  [wallsThickness],
														  [-mWallHeight*3/24,mWallHeight*6/24]]);
	var hwFrontExternal = STRUCT([hwFrontExternal,hwFrontExternalLeftWindow,hwFrontExternalCentralWindow,hwFrontExternalRightLittleWindows]);

	var hwFrontCentral = SIMPLEX_GRID([[-11,wallsThickness+1.5,-windowWidth,3],[wallsThickness],[mWallHeight]]);
	var hwFrontCentralWindow = SIMPLEX_GRID([[-11-wallsThickness-1.5,windowWidth],[wallsThickness],bigWindowHWallMeasures_Height]);
	var hwFrontColonnadeDoor = SIMPLEX_GRID([[-11-wallsThickness-6 -(stairsTotalWidth/2 -bigDoorWidth/2),bigDoorWidth/2],
									   [wallsThickness],[-bigDoorHeight,(mWallHeight-bigDoorHeight+mWallHeight*3/24+0.15)]]);

	hwFrontColonnadeDoor.translate([2],[-mWallHeight*3/24-0.15 ]);

	var hwFrontCentral = STRUCT([hwFrontCentral,hwFrontCentralWindow,hwFrontColonnadeDoor]);

	var hwFrontColonnade = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness +0.8,-windowWidth,(stairsTotalWidth/2-bigDoorWidth/2 -windowWidth -wallsThickness -0.8)],
										 [wallsThickness],[mWallHeight]]);;
	var hwFrontColonnadeWindow = SIMPLEX_GRID([[-11-wallsThickness-6-wallsThickness-0.8,windowWidth],[wallsThickness],bigWindowHWallMeasures_Height]);;
	var frontColonnade = STRUCT([hwFrontColonnade,hwFrontColonnadeWindow]);

	var hwFrontWalls = STRUCT([frontColonnade,hwFrontCentral,hwFrontExternal]);

	// EXTERNAL SIDE WALLS
	var hwExternalSideWallVertical = SIMPLEX_GRID([[wallsThickness],[wallsThickness+0.5,-windowWidth,3+windowWidth+0.5+wallsThickness],[mWallHeight*9/24]]);
	var hwExternalSideWallWindow = SIMPLEX_GRID([[wallsThickness],[-wallsThickness-0.5,windowWidth],leftExternaWindowWallMeasures_Height]);
	var externalWalls = STRUCT([hwExternalSideWallVertical,hwExternalSideWallWindow]).translate([0],[-1]);

	// REAR EXTERNAL SIDE WALLS
	var hwRearVertical = SIMPLEX_GRID([[9,-windowWidth,0.5],[-wallsThickness-7,wallsThickness],[mWallHeight*9/24]]);
	var hwRearWindow = SIMPLEX_GRID([[-9,windowWidth],[-wallsThickness-7,wallsThickness],[mWallHeight/24,-mWallHeight*3/24,mWallHeight*5/24]]);
	var hwRear = STRUCT([hwRearVertical,hwRearWindow]);

	// BACK WALLS
	var hwBackColonnadeVertical = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness+columnDistance,-windowWidth,columnDistance,-windowWidth,columnDistance],
									   [-3*wallsThickness-7-7-4,wallsThickness],[mWallHeight]]);
	var hwBackColonnadeWindowRight = SIMPLEX_GRID([[-11-wallsThickness-6-wallsThickness-columnDistance,windowWidth],
									   [-3*wallsThickness-7-7-4,wallsThickness],bigWindowMWallMeasures_Height]);
	var hwBackColonnadeWindowLeft = T([0])([windowWidth+columnDistance])(hwBackColonnadeWindowRight);
	var hwBackColonnadeDoor = SIMPLEX_GRID([[-11-wallsThickness-6 -(stairsTotalWidth/2 -bigDoorWidth/2),bigDoorWidth/2],
									   [-3*wallsThickness-7-7-4,wallsThickness],[-bigDoorHeight,(mWallHeight-bigDoorHeight+mWallHeight*3/24+0.15)]]);
	hwBackColonnadeDoor.translate([2],[-mWallHeight*3/24-0.15 ]);


	var hwBackColonnadeInternalVertical = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness],
									   [-3*wallsThickness-7-7-4,wallsThickness+1,-2,1+wallsThickness],[mWallHeight]]);
	var hwBackColonnadeInternalDoor = SIMPLEX_GRID([[-11-wallsThickness-6,wallsThickness],
									   [-3*wallsThickness-7-7-4-wallsThickness-1,2],[-mWallHeight*12/24,mWallHeight*12/24]]);


	var hwBackWindow = SIMPLEX_GRID([[-11-wallsThickness-2.25,windowWidth],[-3*wallsThickness-7-7-9,wallsThickness],[mWallHeight*4/24,-mWallHeight*8/24,mWallHeight*12/24]]);
	var hwbackCentralVertical = SIMPLEX_GRID([[-11-wallsThickness,+2.25,-windowWidth,2.25],[-3*wallsThickness-7-7-9,wallsThickness],[mWallHeight]]);
	var hwBack = STRUCT([hwbackCentralVertical,hwBackWindow,hwBackColonnadeVertical,hwBackColonnadeWindowRight,hwBackColonnadeWindowLeft,
						hwBackColonnadeDoor,hwBackColonnadeInternalVertical,hwBackColonnadeInternalDoor]);

	// SIDE WALLS
	var hwSideVerticalRight = SIMPLEX_GRID([[-11,wallsThickness],[-2*wallsThickness-7,(7 -windowWidth)/2,-windowWidth,(7 -windowWidth)/2+wallsThickness],[mWallHeight]]);
	var hwSideWindowRight = SIMPLEX_GRID([[-11,wallsThickness],[-2*wallsThickness-7,-(7 -windowWidth)/2,windowWidth],bigWindowHWallMeasures_Height]);
	var hwSideVerticalLeft = SIMPLEX_GRID([[-11,wallsThickness],[-3*wallsThickness-7-7,0.5,-windowWidth,1.5,-windowWidth,1.5,-windowWidth,1+wallsThickness],[mWallHeight]]);
	var hwSideWindowCenterRight = SIMPLEX_GRID([[-11,wallsThickness],[-3*wallsThickness-7-7-0.5,windowWidth],bigWindowHWallMeasures_Height]);
	var hwSideWindowCenterLeft = T([1])([1.5+windowWidth])(hwSideWindowCenterRight);
	var hwSideWindowLeft = SIMPLEX_GRID([[-11,wallsThickness],
										 [-3*wallsThickness-7-7-0.5-windowWidth-1.5-windowWidth-1.5,windowWidth],
										 [mWallHeight*14/24,-mWallHeight*3/24,mWallHeight*7/24]]);
	var hwSide = STRUCT([hwSideVerticalRight,hwSideWindowRight,hwSideVerticalLeft,hwSideWindowCenterRight,hwSideWindowCenterLeft,hwSideWindowLeft])



	var highWalls = STRUCT([hwFrontWalls,externalWalls,hwRear,hwBack,hwSide]);
	highWalls.translate([2],[hwAltitude]);

	return highWalls;
}




var buildInternalWalls = function() {
	var internalWall1 = SIMPLEX_GRID([[-11 -wallsThickness -11 +1, wallsThickness],[-wallsThickness, 3, -1, 3], [totalWallHeight+corniceHeight]]);
	var internalWall2 = SIMPLEX_GRID([[-11 -wallsThickness -3 -1, 7],[-wallsThickness -7,wallsThickness], [totalWallHeight+corniceHeight]]);
	var internalWallMiddle = SIMPLEX_GRID([[-11, wallsThickness +3],[-wallsThickness -7,wallsThickness], [-lWallHeight -mWallHeight, hWallHeight+corniceHeight]]);
	var internalWalls = STRUCT([internalWall1,internalWall2,internalWallMiddle]);

	return internalWalls;
}




/*-----------------------------------------------   ROOF   --------------------------------------------------------------*/

var buildRoofs = function() {
	var cRoof = buildCentralRoof().translate([1],[-rColumn]);
	var hRoof = buildHorizontalRoof(horizontalCentralRoofWidth_half,horizontalCentralRoofDepth,horizontalCentralRoofHeight,centralStraightPartWidth);
	var externalRoof = buildHorizontalRoof(horizontalExternalRoofWidth,horizontalExternalRoofDepth,horizontalExternalRoofHeight,externalStraightPartWidth*2);

	externalRoof = COLOR(ROOF)(externalRoof);
	hRoof = COLOR(ROOF)(hRoof);

	var subTympanum = CUBOID([8,guttaWidth/2,guttaHeight/2]).rotate([0,2],[-PI/8]);
	subTympanum.translate([0,1,2],[6+11+wallsThickness,-colonnadeDepth-0.5,totalWallHeight+corniceHeight+subTympanumCorniceHeight-0.15]);;
	subTympanumk = COLOR(WALL_COLOR)(subTympanum);

	var subTympanumBack = T([1])([34.5])(subTympanum)
	subTympanumBack = COLOR(WALL_COLOR)(subTympanumBack);

	var subRoof = SIMPLEX_GRID([[-11,horizontalCentralRoofWidth_half],[roofDepth -colonnadeDepth],[-hwAltitude -hWallHeight ,subTympanumCorniceHeight]])
	var subRoofColonnade = SIMPLEX_GRID([[-11-wallsThickness-6,stairsTotalWidth/2],[colonnadeDepth+rColumn],[-hwAltitude -hWallHeight ,subTympanumCorniceHeight]]);
	subRoofColonnade.translate([1],[-colonnadeDepth-rColumn]);
	subRoof = STRUCT([subRoof,subRoofColonnade]);
	subRoof = COLOR(WALL_COLOR)(subRoof);

	cRoof.translate([0,2],[6+11+wallsThickness,totalWallHeight+corniceHeight+subTympanumCorniceHeight]);
	hRoof.translate([0,2],[6+11+wallsThickness,totalWallHeight+corniceHeight+subTympanumCorniceHeight]);
	externalRoof.translate([0,2],[11/2+wallsThickness/2+wallsThickness,hwAltitude+mWallHeight*12/24]);
	
	var sideGuttam = buildSideGuttam();

	leftRoof = STRUCT([cRoof,hRoof,externalRoof,subTympanum,subTympanumBack,subRoof,sideGuttam]);
	
	var roof = duplicate(leftRoof);
	

	var pediment = buildPediment();

	roof = STRUCT([roof,pediment]);
	DRAW(roof);
}


var buildPediment = function() {
	var lowCornice = CUBOID([tympanumWidth,cornicePedimentThickness,cornicePedimentHeight]);
	var guttam = buildGuttam().translate([1,2],[-guttaWidth,-guttaHeight]);
	var backGuttam = T([0,1,2])([6+11+wallsThickness,34.5-colonnadeDepth+sporgenza,totalWallHeight+corniceHeight+subTympanumCorniceHeight-cornicePedimentHeight])(guttam)

	var pediment = STRUCT([lowCornice,guttam]).translate([0,1,2],[6+11+wallsThickness,-colonnadeDepth+sporgenza,
												totalWallHeight+corniceHeight+subTympanumCorniceHeight-cornicePedimentHeight]);
	var pediment = STRUCT([pediment,backGuttam]);

	return pediment;
}

var buildCentralRoof = function() {
	// control points pezzo diagonale
	var cpDiagonalFront = [[0,0,0],[tympanumWidth/2,0,tympanumHeight]];
	var cpDiagonalBack = cpDiagonalFront.map(function(p){return [p[0],p[1]+roofDepth+rColumn+1,p[2]]});
	//Superficie del tetto
	var roof1Surface = MAP(BEZIER(S1)([BEZIER(S0)(cpDiagonalFront), BEZIER(S0)(cpDiagonalBack)]))(roofDomain);


	roof1Surface = COLOR(ROOF)(roof1Surface);

	//control points tympanum
	var cpDiagonalTympanum = cpDiagonalFront.map(function(p){return [p[0],p[1]+dTettoFrontone,p[2]]});
	var vertexLowRightTympanum = [[tympanumWidth/2,dTettoFrontone,0]];
	//Superficie del tympanum
	var tympanumSurfaceFront = MAP(BEZIER(S1)([BEZIER(S0)(cpDiagonalTympanum), BEZIER(S0)(vertexLowRightTympanum)]))(roofDomain);
	var tympanumSurfaceBack = T([1])([roofDepth+1])(tympanumSurfaceFront);
	var halfTympanum = STRUCT([tympanumSurfaceFront,tympanumSurfaceBack]);
	halfTympanum = COLOR(COLUMNS_COLOR)(halfTympanum);

	var stylobateFrontCentral = SIMPLEX_GRID([[stairsTotalWidth/2],[2*rColumn],[1]]).translate([2],[-2.5])
	var stylobateFrontSx = SIMPLEX_GRID([[1],[colonnadeDepth+rColumn-1],[1]]).translate([1,2],[0.8,-2.5])
	stylobateFrontCentral = COLOR(WALL_COLOR)(stylobateFrontCentral);
	stylobateFrontSx = COLOR(WALL_COLOR)(stylobateFrontSx);

	var stylobateFrontWood = SIMPLEX_GRID([[-wallsThickness-0.75,0.5,-0.5,0.5,-0.5,0.5,-0.5,0.5,-0.5,0.5,-0.5,0.5],[colonnadeDepth+rColumn-1],[1]]).translate([1,2],[0.8,-2.5]);
	stylobateFrontWood = COLOR(BURLY_WOODS)(stylobateFrontWood);
	
	var stylobateFront = STRUCT([stylobateFrontCentral,stylobateFrontSx,stylobateFrontWood]);
	var stylobateBack = SIMPLEX_GRID([[ stairsTotalWidth/2],[-colonnadeDepth-27-rColumn,2*rColumn],[subTympanumCorniceHeight+1]]).translate([2],[-subTympanumCorniceHeight-1])
	var lowStylobateFront = T([2])([-hWallHeight -corniceHeight])(stylobateFront);
	var lowStylobateBack = SIMPLEX_GRID([[-0.1,7.4],[-colonnadeDepth-26-rColumn,1],[1]]).translate([1,2],[1,-4.5 -mWallHeight]);
	lowStylobateBack = COLOR(WALL_COLOR)(lowStylobateBack);7
	stylobateBack = COLOR(WALL_COLOR)(stylobateBack);
	
	var stylobate = STRUCT([stylobateFront,lowStylobateFront,stylobateBack,lowStylobateBack]);

	var roofBase = SIMPLICIAL_COMPLEX([[0,0,0],[0,roofDepth+rColumn+1,0],[horizontalCentralRoofWidth_half,roofDepth+rColumn+1,0],[horizontalCentralRoofWidth_half,0,0]]);
	roofBase = COLOR(ROOF)(roofBase);

	var roofZAxis = STRUCT([halfTympanum,roof1Surface,stylobate,roofBase]);
	roofZAxis.translate([1],[-colonnadeDepth]);

	return roofZAxis;
}


var buildHorizontalRoof = function(horizontalRoofWidth,horizontalRoofDepth,horizontalRoofHeight,straightPartWidth) {
	var pEF = [0,0,0];
	var pEB = [0,horizontalRoofDepth,0];
	var pUM = [horizontalRoofWidth -straightPartWidth/2,horizontalRoofDepth/2,horizontalRoofHeight];
	var pMF = [horizontalRoofWidth -straightPartWidth/2,0,0];
	var pMB = [horizontalRoofWidth -straightPartWidth/2,horizontalRoofDepth,0];
	var pUC = [horizontalRoofWidth,horizontalRoofDepth/2,horizontalRoofHeight];
	var pCF = [horizontalRoofWidth,0,0];
	var pCB = [horizontalRoofWidth,horizontalRoofDepth,0];



	var cpHorizontalRoofExternalFront = [pEF,pUM];
	var cpHorizontalRoofExternalBack = [pEB,pUM];
	var cpMiddleFront = [pMF, pUM];
	var cpMiddleBack = [pMB, pUM];
	var cpCentralFront = [pCF, pUC];
	var cpCentralBack = [pCB, pUC];

	// surfaces
	var surfaceFrontLeft = MAP(BEZIER(S1)([BEZIER(S0)(cpHorizontalRoofExternalFront), BEZIER(S0)(cpMiddleFront)]))(roofDomain);
	var surfaceFrontCentral = MAP(BEZIER(S1)([BEZIER(S0)(cpMiddleFront), BEZIER(S0)(cpCentralFront)]))(roofDomain);
	var surfaceSide = MAP(BEZIER(S1)([BEZIER(S0)(cpHorizontalRoofExternalFront), BEZIER(S0)(cpHorizontalRoofExternalBack)]))(roofDomain);
	var surfaceBackLeft = MAP(BEZIER(S1)([BEZIER(S0)(cpMiddleBack), BEZIER(S0)(cpHorizontalRoofExternalBack)]))(roofDomain);
	var surfaceBackCentral = MAP(BEZIER(S1)([BEZIER(S0)(cpCentralBack), BEZIER(S0)(cpMiddleBack)]))(roofDomain);

	var horizontalRoof = STRUCT([surfaceFrontLeft,surfaceFrontCentral,surfaceSide,surfaceBackCentral,surfaceBackLeft]);
	horizontalRoof.translate([0,1],[-dX,-sporgenza]);

	return horizontalRoof;
}

var buildGuttam = function() {
	// horizontal guttam
	var g = buildGutta(guttaWidth);
	var hGuttam = STRUCT([g]);

	var i = 1;
	while (i<nGuttam) {
		hGuttam = STRUCT([hGuttam,T([0])([i*2*guttaWidth])(g)]);
		i++;
	}

	//left guttam
	i=1;
	var dGuttam = STRUCT([g]).translate([0],[6*guttaWidth]);
	while (i<nDiagonalGuttam) {
		dGuttam = STRUCT([dGuttam,T([0])([i*2*guttaWidth])(g)]);
		i++;
	}
	dGuttam.rotate([0,2],[-PI/8]);
	hGuttam.translate([0],[2*guttaWidth]);
	var rightGuttam = S([0])([-1])(dGuttam).translate([0],[tympanumWidth]);

	var guttam = STRUCT([hGuttam,dGuttam,rightGuttam]).translate([1],[-0.5]);
	return guttam;
}

var buildSideGuttam = function() {
	var g = buildGutta(guttaWidth);
	var fGuttam = STRUCT([g]);

	var i = 1;
	// FRONT
	while (i<18) {
		fGuttam = STRUCT([fGuttam,T([0])([i*2*guttaWidth])(g)]);
		i++;
	}
	fGuttam.translate([0,1,2],[11,-guttaWidth,hwAltitude+corniceHeight+subTympanumCorniceHeight+5-guttaWidth]);

	// BACK
	var bGuttam = T([1])([27.5-guttaWidth])(fGuttam);

	i = 1;
	// SIDE
	var g2 = buildGutta(guttaWidth);
	var sGuttam = STRUCT([g2]);
	while (i<65) {
		sGuttam = STRUCT([sGuttam,T([0])([i*2*guttaWidth])(g)]);
		i++;
	}
	sGuttam.rotate([0,1],[PI/2]);
	sGuttam.translate([0,2],[11,hwAltitude+corniceHeight+subTympanumCorniceHeight+5-guttaWidth]);
	

	var guttam = STRUCT([fGuttam,bGuttam,sGuttam]);
	guttam = COLOR(WALL_COLOR)(guttam);

	return guttam;

}

var buildGutta = function (dim) {
	return CUBOID([dim,dTettoFrontone,dim]);
	
}


/* ------------------------------------------ COLONNADE ------------------------------------------*/

var buildColonnade = function() {
	var leftColumns = buildColumns();
	var leftArch = buildArchs();
	var leftTerrace = buildTerrace();
	leftTerrace = COLOR(WALL_COLOR)(leftTerrace);
	leftArch = COLOR(WALL_COLOR)(leftArch);
	

	var colonnade = STRUCT([leftColumns,leftArch,leftTerrace]);
	colonnade = duplicate(colonnade);

	var baseColonnade = SIMPLEX_GRID([[colonnadeWidth],[-tStairs,colonnadeDepth],[hStairs]]);
	baseColonnade = T([0,1])([leftSideWidth,-tStairs-colonnadeDepth])(baseColonnade);
	baseColonnade = COLOR(BASE_COLONNADE_COLOR)(baseColonnade);

	var baseColonnadeBack = SIMPLEX_GRID([[-18,stairsTotalWidth],[-22,colonnadeDepth],[lWallHeight]]);
	baseColonnadeBack = COLOR(BASE_COLONNADE_COLOR)(baseColonnadeBack);

	var sideColonnade = SIMPLEX_GRID([[-leftSideWidth+0.01,0.01,-stairsTotalWidth,0.01],[-tStairs,colonnadeDepth],[hStairs]]);
	sideColonnade.translate([1],[-tStairs-colonnadeDepth])
	sideColonnade = COLOR(WALL_COLOR)(sideColonnade);
	var sideColonnadeBack = SIMPLEX_GRID([[-18+0.01,0.01,-stairsTotalWidth,0.01],[-22,colonnadeDepth],[lWallHeight]]);
	sideColonnadeBack = COLOR(WALL_COLOR)(sideColonnadeBack);

	var baseColonnade = STRUCT( [baseColonnade,baseColonnadeBack,sideColonnade,sideColonnadeBack] )

	colonnade = STRUCT([colonnade,baseColonnade]);
	DRAW(colonnade);
}


var buildColumns = function() {
	// front columns
	var c1 = buildColumn();
	var c2 = T([0])([deltaColumns+cubeWidth])(c1);
	var c3 = T([0])([deltaColumns+cubeWidth])(c2);
	
	var lowFrontColumns = STRUCT([c1,c2,c3]);
	var highFrontColumns = T([2])([mWallHeight+corniceHeight])(lowFrontColumns);

	// back columns
	var lowBackColumns =  T([1])([6+2*wallsThickness+7+12+colonnadeDepth+rColumn])(lowFrontColumns);
	var highBackColumns = T([2])([mWallHeight+corniceHeight])(lowBackColumns);

	var columns = STRUCT([lowFrontColumns,highFrontColumns,lowBackColumns,highBackColumns])

	return columns;
}


/* ------------------------------------------ TERRACE ------------------------------------------*/

var buildTerrace = function() {

	var cube = CUBOID([cubeWidth,cubeWidth,cubeHeight]);
	var cube2 = T([0])([deltaColumns+cubeWidth])(cube);
	var cube3 = T([0])([deltaColumns+cubeWidth])(cube2);
	var rows = SIMPLEX_GRID([[-cubeWidth,deltaColumns,-cubeWidth,deltaColumns,-cubeWidth, (stairsTotalWidth/2-2*deltaColumns-3*cubeWidth)],
								[-cubeWidth/4,(cubeWidth/2)],[-cubeHeight,rowsHeight]]);

	var cubes = STRUCT([cube,cube2,cube3]);
	var terraceFloorSide = SIMPLEX_GRID([[cubeWidth+0.01],[colonnadeDepth],[cubeWidth]]).translate([0],[-0.01]);
	var terraceFloorDown = CUBOID([stairsTotalWidth/2,colonnadeDepth+cubeWidth,cubeWidth]).translate([1,2],[-cubeWidth,-cubeWidth]);
	var terraceFloor = STRUCT([terraceFloorSide,terraceFloorDown]).translate([1],[cubeWidth]);

	var leftPoles = buildPoles(6).translate([0,1],[cubeWidth,(cubeWidth+poleDiameter)/2]);
	var centerPoles = T([0])([cubeWidth+deltaColumns])(leftPoles);
	var rightPoles = buildPoles(4).translate([0,1],[2*deltaColumns+3*cubeWidth,(cubeWidth+poleDiameter)/2]);

	var poles = STRUCT([leftPoles,centerPoles,rightPoles]);

	var frontTerrace = STRUCT([cubes,rows,terraceFloor,poles]);
	var backTerrace = R([0,1])([PI])(frontTerrace).translate([0,1],[stairsTotalWidth-2*incognite,colonnadeDepth+28.5]);

	var terrace = STRUCT([frontTerrace,backTerrace]);
	terrace.translate([0,1,2],[11+6+wallsThickness+0.1,-colonnadeDepth-0.5,hwAltitude-cubeWidth]);

	return terrace;
}

var buildPoles = function(i) {

	var pole = buildPole();	
	var pole2 = T([0])([polesDistance+poleDiameter])(pole);
	var pole3 = T([0])([polesDistance+poleDiameter])(pole2);
	var pole4 = T([0])([polesDistance+poleDiameter])(pole3);
	var pole5 = T([0])([polesDistance+poleDiameter])(pole4);
	var pole6 = T([0])([polesDistance+poleDiameter])(pole5);
	var pole7 = T([0])([polesDistance+poleDiameter])(pole6);

	if (i==6) {
		var poles = STRUCT([pole,pole2,pole3,pole4,pole5,pole6]);
	}
	else {
		var poles = STRUCT([pole,pole2,pole3,pole4]);
	}
	
	return poles;
}

var buildPole = function() {
	var cpTop = [[poleDiameter/3,0,0.5],[poleDiameter/2,0,0.475],[0.1,0,0.45]];
	var topKnots = makeKnots(cpTop);
	var topCurve = NUBS(S0)(2)(topKnots)(cpTop);
	var mappingTop = ROTATIONAL_SURFACE(topCurve);
	var top = MAP(mappingTop)(poleDomain);

	var cpBody = [[poleDiameter/3,0,0.45],[poleDiameter/6,0,0.4],[poleDiameter/6,0,0.35],[poleDiameter/3,0,0.25],[poleDiameter/2,0,0.15],[poleDiameter/3,0,0.05]];
	var bodyKnots = makeKnots(cpBody);
	var bodyCurve = NUBS(S0)(2)(bodyKnots)(cpBody);
	var mappingBody = ROTATIONAL_SURFACE(bodyCurve);
	var body = MAP(mappingBody)(poleDomain);

	var cpMiddle = [[poleDiameter/3,0,0.05],[poleDiameter/2,0,0],[poleDiameter/3,0,-0.05]];
	var middleKnots = makeKnots(cpMiddle);
	var middleCurve = NUBS(S0)(2)(middleKnots)(cpMiddle);
	var mappingMiddle = ROTATIONAL_SURFACE(middleCurve);
	var middle = MAP(mappingMiddle)(poleDomain);

	var topHalf = STRUCT([top,body]);
	var bottomHalf = S([2])([-1])(topHalf);

	var pole = STRUCT([topHalf,bottomHalf,middle]).translate([2],[0.5]);
	return pole;
}




var buildColumn = function() {
	var capital = buildCapital();
	var body = buildColumnBody();
	var base = buildColumnBase();

	var column = STRUCT([capital,body,base]);
	column.translate([0,1,2],[11+6+2*wallsThickness-rColumn,-colonnadeDepth,lWallHeight]);
	column = COLOR(COLUMNS_COLOR)(column);

	return column;
}

var getCapitalControlPoints = function() {
	var radius = 0.8;
	var controlPoints = [];

	var i = 0;
	var angle = PI/4;

	for (i = 0; i < 24; i++) {
		controlPoints.push( [radius * ( COS(i*angle) + i*SIN(i*angle)  ), radius * ( SIN(i*angle) - i*COS(i*angle)  ), 0] );
	}

	return controlPoints;
}


//builds the column's base
var buildColumnBase = function() {

	var dX = 0.05
	//var points = [[0,0,0],[4,0,0],[4,0,1],[3,0,1],[3,0,2],[2,0,2],[2,0,3],[0,0,3]];
	var rSubColumn = rColumn;
	var points = [[rSubColumn,0,highPartColumnBase],[rSubColumn+dX,0,0],
				[rSubColumn+2*dX,0,-highPartColumnBase],[rSubColumn+dX,0,-2*highPartColumnBase],
				[rSubColumn+dX,0,-3*highPartColumnBase],
				[rSubColumn+dX*5/2,0,-4*highPartColumnBase],[rSubColumn+dX,0,-6*highPartColumnBase]];
	var knots = makeKnots(points);
	var subColumnBodyCurve = NUBS(S0)(2)(knots)(points);

	var mappingBase = ROTATIONAL_SURFACE(subColumnBodyCurve);
	var base = MAP(mappingBase)(columnDomain);
	var lowBase = SIMPLEX_GRID([[1],[1],[4*highPartColumnBase]]).translate([0,1,2],[-0.5,-0.5,-10*highPartColumnBase]);
	base = STRUCT([base,lowBase]).translate([2],[10*highPartColumnBase]);
	return base;
}


var buildCapital = function() {
	var heightReference = 0.745;

	var prof1 = NUBS(S1)(2)(makeKnotsColumns(24,2))(getCapitalControlPoints());

	var prof2 = NUBS(S0)(2)(makeKnotsColumns(8,2))([[0.015,0,0],[0.01,0,0.001],[0,0,0.15],
		[0.015,0,0.29],
		[0.02,0,0.3],[0.025,0,0.29],[0.03,0,0.001],[0.025,0,0]]);

	var spiral = MAP(PROFILEPROD_SURFACE([prof2,prof1]))(spiralDomain);

	// center
	var spiralCenter = NUBS(S0)(2)(makeKnotsColumns(4,2))([[-0.015*p,0,0],[-0.005*p,0,0.015*p],[-0.005*p,0,0.03*p],[0,0,0.03*p]]);
	spiralCenter = MAP(ROTATIONAL_SURFACE(spiralCenter))(DOMAIN([[0,1],[0,2*PI]])([10,50]));

	// tail
	var lengthCapital1 = NUBS(S0)(2)(makeKnotsColumns(24,2))(
			AA(function (elem) { return [elem[0]*0.025,elem[1]*0.025,elem[2]*0.025];})(getCapitalControlPoints())
		);
	var lengthCapital2 = NUBS(S0)(2)(makeKnotsColumns(24,2))( 
			AA(function (elem) { return [elem[0]*0.021,elem[1]*0.021,elem[2]*0.021-0.01];})(getCapitalControlPoints())
		);
	var lengthCapital3 = NUBS(S0)(2)(makeKnotsColumns(24,2))( 
			AA(function (elem) { return [elem[0]*0.020,elem[1]*0.020,elem[2]*0.020-0.6];})(getCapitalControlPoints())
		);

	var lengthCapital = BEZIER(S1)([lengthCapital1,lengthCapital2,lengthCapital3]);
	lengthCapital = MAP(lengthCapital)(DOMAIN([[0,1],[0,1]])([50,10]));


	// center piece
	prof1 = NUBS(S0)(2)(makeKnotsColumns(4,2))([ [0,0,0],[0.0105*p,0,-0.002*p],[0.0095*p,0,0.0115*p],[0,0,0.01*p] ]);

	prof2 = NUBS(S0)(2)(makeKnotsColumns(4,2))([ [0,0.05*p,0],[0.0105*p,0.06*p,-0.002*p],[0.0095*p,0.06*p,0.0115*p],[0,0.06*p,0.01*p] ]);

	var centerCapital = MAP(BEZIER(S1)([prof2,prof1]))(DOMAIN([[0,1],[0,1]])([20,20]));

	centerCapital.translate([0,1,2],[0.090*p,0.025*p,(heightReference-0.018)*p]);


	var capital = STRUCT([ spiral, spiralCenter.translate([0,1],[-0.009,0.015]), lengthCapital ]);

	capital.rotate([0,2],[PI/2]);
	capital.rotate([1,2],[-PI/12]);
	capital.scale([0,1,2],[0.5,0.5,0.5]);
	var capital2 = S([0])([-1])(capital);
	capital.translate([0,1,2],[0.085*p,0.090*p,(heightReference-0.028)*p]);
	capital2.translate([0,1,2],[0.025*p,0.090*p,(heightReference-0.028)*p]);
	var capital3 = S([1])([-1])(capital2);
	capital3.translate([1],[0.11*p]);
	var capital4 = S([1])([-1])(capital);
	capital4.translate([1],[0.11*p]);

	var capital = STRUCT([ capital, capital2, capital3, capital4, centerCapital, (S([0])([-1])(centerCapital)).translate([0],[0.11*p]) ]);

	capital.translate([0,1,2],[-0.5,-0.5,-1.25]);
	capital.rotate([0,1],[PI/2]);
	capital.scale([0,1,2],[1.8,1.2,1.6]).translate([0,1,2],[0.1,-0.05,-3.8]);
	return capital;

}


var buildColumnBody = function(){
	var points = [[rColumn, 0, 0],[rColumn*6.3/5,0,1/3*hColumn],[rColumn,0,hColumn]];
	var pColumn = NUBS(S0)(2)(makeKnots(points))(points);
	var mappingColumn = ROTATIONAL_SURFACE(pColumn);
	var column = MAP(mappingColumn)(columnDomain);

	column.translate([2,],[columnBaseHeight]);

	return column;
}


var buildArchs = function(){
  var basement1 = CUBOID([4,1,0.28]);
  var basement2 = T([0,1,2])([0,0.07,0.279999])(CUBOID([3.93,0.73,0.76]));
  var pillar_arch1 = T([0,1,2])([3.18,0.07,1.039999])(CUBOID([0.75,0.73,3.44]));
  var pillar_arch2 = T([0,1,2])([0,0.07,1.039999])(CUBOID([0.75,0.73,3.44]));
  var ring1 = T([0,1,2])([3.08,-0.03,4.479999])(CUBOID([0.93,0.91,0.26]));
  var ring2 = T([0,1,2])([-0.10,-0.03,4.479999])(CUBOID([0.93,0.91,0.26]));
 

  var curvePart = buildCurveArchPart().translate([1,2],[0.07,4.74]);
  var lowerArch = STRUCT([basement1, basement2, pillar_arch1, pillar_arch2, ring1, ring2, curvePart]);
  lowerArch = R([0,1])([-PI/2])(lowerArch).translate([0,2],[11+6+wallsThickness,hStairs]);
  lowerArch = S([1,2])([1.35,0.85])(lowerArch).translate([2],[0.5]);

  var higherArch = T([2])([mWallHeight+corniceHeight])(lowerArch);
  var leftArch = STRUCT([lowerArch,higherArch]); 
  leftArch = COLOR(WALL_COLOR)(leftArch);

  return leftArch;
}

var buildCurveArchPart = function() {
	var p_arch_ext = [[0,0,0],[0.74,0,0],[0.75,0,0],[0.9525,0,1],[1.42875,0,1.8],[2.025,0,2],[2.50125,0,1.8],[2.9775,0,1],[3.18,0,0],[3.07,0,0],[3.93,0,0]];
    var p_arch_int = p_arch_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});

    var c_arch_ext = nubsS0(p_arch_ext);
    var c_arch_int = nubsS0(p_arch_int);

    var p_arch_lato_sx_ext = [[0,0,0],[0,0,2],[0,0,2.29]]
    var p_arch_lato_dx_ext = p_arch_lato_sx_ext.map(function (p){ return [p[0]+3.93,p[1],p[2]]});
    
    var p_arch_lato_sx_int = p_arch_lato_sx_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});
    var p_arch_lato_dx_int = p_arch_lato_sx_ext.map(function (p){ return [p[0]+3.93,p[1]+0.73,p[2]]});

    var c_arch_lato_sx_ext = nubsS0(p_arch_lato_sx_ext);
    var c_arch_lato_dx_ext = nubsS0(p_arch_lato_dx_ext);
    var c_arch_lato_sx_int = nubsS0(p_arch_lato_sx_int);
    var c_arch_lato_dx_int = nubsS0(p_arch_lato_dx_int);

    var p_arch_chiusura_ext = [[0,0,2.29],[2,0,2.29],[3.93,0,2.29]];
    var p_arch_chiusura_int = p_arch_chiusura_ext.map(function (p){ return [p[0],p[1]+0.73,p[2]]});

    var c_arch_chiusura_ext = nubsS0(p_arch_chiusura_ext);
    var c_arch_chiusura_int = nubsS0(p_arch_chiusura_int);

    var chiusura_ext = hermiteS1(c_arch_chiusura_ext,c_arch_ext, [0,0,0], [0,0,0]);
    var chiusura_int = hermiteS1(c_arch_chiusura_int, c_arch_int, [0,0,0], [0,0,0]);
    var chiusura_sup = hermiteS1(c_arch_chiusura_ext,c_arch_chiusura_int, [0,0,0], [0,0,0])
    var bordo_arch_sx = hermiteS1(c_arch_lato_sx_ext,c_arch_lato_sx_int, [0,0,0], [0,0,0]);
    var bordo_arch_dx = hermiteS1(c_arch_lato_dx_ext,c_arch_lato_dx_int, [0,0,0], [0,0,0]);
    var arch_semicirc = hermiteS1(c_arch_int, c_arch_ext, [0,0,0], [0,0,0]);
    
    var arch = STRUCT([bordo_arch_sx,bordo_arch_dx,arch_semicirc,chiusura_ext,chiusura_int,chiusura_sup]);
    return arch;
}



/* ------------------------------------------ STRUCTURE ------------------------------------------*/


var buildFloors = function() {
	buildCeilings();
	var horizontalFloor = SIMPLEX_GRID([[(1+11+6+1+stairsTotalWidth/2)*2],[1+7+1],[0.01]]).translate([0,2],[-1,-0.015])
	var verticalFloor = SIMPLEX_GRID([[-11,(1+6+stairsTotalWidth/2)*2],[-1-7-1,12+1],[0.01]]).translate([2],[-0.015])
	var externalFloors = SIMPLEX_GRID([[-11,1+6+1,-13,1+6+1],[-1-7-1-12-1,5],[0.01]]).translate([2],[-0.015])

	var garden = SIMPLEX_GRID([[60],[80],[2]]).translate([0,1,2],[-4,-25,-2.02])
	garden = COLOR(GARDEN)(garden);
	var floors = STRUCT([horizontalFloor,verticalFloor,externalFloors,garden])
	DRAW(floors);

}

var buildCeilings = function() {
	var externalCeiling = SIMPLEX_GRID([[11],[7],[0]]).translate([0,1,2],[wallsThickness-1,wallsThickness,lWallHeight+mWallHeight+corniceHeight +mWallHeight*12/24]);
	var topCeiling = SIMPLEX_GRID([[wallsThickness + 6 + stairsTotalWidth/2],[4*wallsThickness +7+7+9],[0]]).translate([0,2],[11,totalWallHeight+corniceHeight+0.01]);
	var sideCeiling = SIMPLEX_GRID([[-11,0.01],[-wallsThickness,7],[-lWallHeight-mWallHeight-corniceHeight -mWallHeight*12/24,mWallHeight*12/24]]);
	var leftCeilings = STRUCT([externalCeiling,topCeiling,sideCeiling]);
	var ceilings = duplicate(leftCeilings);
	ceilings = COLOR(WALL_COLOR)(ceilings);
	DRAW(ceilings);
}

var corniceThickness = 0.1;
var subHighWindowsCorniceHeight = 0.3;
var	buildCornices = function() {
	// WALL CORNICES
	var frontCornice = SIMPLEX_GRID([[11+6+wallsThickness],[wallsThickness],[corniceHeight]]);
	var externalSideCornice = SIMPLEX_GRID([[wallsThickness],[wallsThickness+7+wallsThickness],[corniceHeight]]).translate([0],[-1]);
	var externalRearCornice = SIMPLEX_GRID([[11],[-wallsThickness-7,wallsThickness],[corniceHeight]]);
	var sideCornice = SIMPLEX_GRID([[-11,wallsThickness],[-2*wallsThickness-7,7+2*wallsThickness+9],[corniceHeight]]);
	var backCornice = SIMPLEX_GRID([[-11-wallsThickness,6],[-3*wallsThickness-7-7-9,wallsThickness],[corniceHeight]]);
	var balconyFrontCornice = SIMPLEX_GRID([[-11-6-wallsThickness-1,((stairsTotalWidth-2)-bigDoorWidth)/2,-bigDoorWidth,((stairsTotalWidth-2)-bigDoorWidth)/2],
								[wallsThickness],[-(corniceHeight -cubeWidth) ,cubeWidth]]);
	var balconyBackCornice = T([1])([21])(balconyFrontCornice);
	
	// external high cornices
	var extHFrontCornice = SIMPLEX_GRID([[11],[wallsThickness],[-corniceHeight -mWallHeight*9/24, highCorniceHeight]]);
	var extHSideCornice = SIMPLEX_GRID([[wallsThickness],[wallsThickness+7+wallsThickness],[-corniceHeight -mWallHeight*9/24, highCorniceHeight]]).translate([0],[-1]);
	var extHRearCornice = SIMPLEX_GRID([[11],[-wallsThickness-7,wallsThickness],[-corniceHeight -mWallHeight*9/24, highCorniceHeight]]);

	// front cornices
	var subHighFront = SIMPLEX_GRID([[11+2*wallsThickness+6],[corniceThickness],[-(corniceHeight -subHighWindowsCorniceHeight),subHighWindowsCorniceHeight]])
									.translate([0,1],[-wallsThickness,-corniceThickness]);
	// external side and rear cornices
	var subHighExternalSide = SIMPLEX_GRID([[corniceThickness],[7+2*wallsThickness+2*corniceThickness],
											[-(corniceHeight -subHighWindowsCorniceHeight),subHighWindowsCorniceHeight]])
											.translate([0,1],[-corniceThickness -wallsThickness,-corniceThickness]);
	var subHighExternalRear = SIMPLEX_GRID([[11+wallsThickness],[-2*wallsThickness-7,corniceThickness],
											[-(corniceHeight -subHighWindowsCorniceHeight),subHighWindowsCorniceHeight]])
									.translate([0],[-wallsThickness]);
	// side wall
	var subHighSide = SIMPLEX_GRID([[-(11-corniceThickness),corniceThickness],[-2*wallsThickness-7,9+7+2*wallsThickness+corniceThickness],
											[-(corniceHeight -subHighWindowsCorniceHeight),subHighWindowsCorniceHeight]]);
	// back wall
	var subHighBack = SIMPLEX_GRID([[-11,6+wallsThickness],[-4*wallsThickness-7-7-9,corniceThickness],
											[-(corniceHeight -subHighWindowsCorniceHeight),subHighWindowsCorniceHeight]]);

	var subHigh = STRUCT([subHighFront,subHighExternalSide,subHighExternalRear,subHighSide,subHighBack]);
	


	var wallCornices = STRUCT([balconyFrontCornice,balconyBackCornice,frontCornice,externalSideCornice,externalRearCornice,sideCornice,backCornice,extHFrontCornice,extHSideCornice,extHRearCornice,subHigh]);

	var cornices = STRUCT([wallCornices]);
	cornices.translate([2],[lWallHeight+mWallHeight]);


	return cornices;
}


var buildVilla = function(){
	buildWalls();
	buildColonnade();
	buildFrames();
	build2FlightOfSteps();
	buildFloors();
	buildRoofs();
}


/* ------------------------------------------------------------------------------------*/

var scambiaXY = function(cp) {
	return cp.map(function(p){return [p[1],-p[0],p[2]];});
}

var sqrtCP_Y = function (cp) {
	return cp.map( function(p){return [p[0],p[1]*Math.sqrt(2),p[2]];} );
}

var buildFrontCornice = function() {
	var domain2d = DOMAIN([[0,1],[0,1]])([10,1]);
	var xDistance = stairsTotalWidth-0.1;
	vectorY = [0,colonnadeDepth,0];
	vectorX = [-xDistance,0,0];

	// RIGHT PART
	var cpY = [[0,0,0],[0,0,0],[0.5,0,0],[0.5,0,1],[1,0,1],[1,0,2],[2,0,2],[2,0,3],[0,0,3],[0,0,3]];
	var knots = makeKnotsColumns(10,1);
	var curveY = NUBS(S0)(1)(knots)(cpY);
	var mapping = CYLINDRICAL_SURFACE(curveY)(vectorY);
	var corniceY = MAP(mapping)(domain2d);

	// RIGHT CORNER
	var sqrt_controlPoints = sqrtCP_Y(cpY);
	sqrt_controlPoints = rotatePoints(sqrt_controlPoints,-PI/4,2);
	var curve_sqrt = NUBS(S0)(1)(knots)(sqrt_controlPoints);
	var mapping = NUBS(S1)(1)([0,0,3,3])([curve_sqrt,curveY]);
	var cornice_sqrt = MAP(mapping)(domain2d);

	// CENTRAL PART
	var cpX =scambiaXY(cpY);
	var curveX = NUBS(S0)(1)(knots)(cpX);
	var mapping = CYLINDRICAL_SURFACE(curveX)(vectorX);
	var corniceX = MAP(mapping)(domain2d);

	// CENTRAL-RIGHT CORNER
	var sqrt_controlPointsX = sqrtCP_Y(cpX);
	sqrt_controlPointsX = rotatePoints(sqrt_controlPointsX,-PI/4,2);
	var curve_sqrtX = NUBS(S0)(1)(knots)(sqrt_controlPoints);
	var mapping = NUBS(S1)(1)([0,0,3,3])([curve_sqrtX,curveX]);
	var cornice_sqrtX = MAP(mapping)(domain2d);

	var halfCornice = STRUCT([corniceX,corniceY,cornice_sqrt,cornice_sqrtX]);
	var halfCornice2 = S([0])([-1])(halfCornice).translate([0],[-xDistance])
	var cornice = STRUCT([halfCornice,halfCornice2])
	cornice.translate([0,1,2],[11+6+1+stairsTotalWidth,-colonnadeDepth,lWallHeight+mWallHeight])
	cornice.scale([0,2],[0.5,0.5])
	DRAW(cornice);
	return cornice;

}


rotatePoints = function(pointList, angle, axis) {
    if (axis === 0) {
      var alfa = angle;
      return pointList.map( function(pt) { 
		return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
      });
    } else if (axis === 1) {
      var beta = angle;
      return pointList.map( function(pt) { 
		return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
      });
    } else if (axis === 2) {
      var gamma = angle;
      return pointList.map( function(pt) { 
		return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
      });
    }
	    
    return pointList;
};

// sf: scale factor
scalePoints = function(pointList, sf) {
    return pointList.map( function(pt) { 
		return [ pt[0] * sf, pt[1]*sf, pt[2]*sf ];
    });
};

translatePoints = function(pointList, axis, qty) {
    if (axis === 0) {
      return pointList.map( function(pt) { 
		return [ pt[0]+qty, pt[1], pt[2] ];
      });
    } else if (axis === 1) {
      return pointList.map( function(pt) { 
		return [ pt[0], pt[1]+qty, pt[2] ];
      });
    } else if (axis === 2) {
      return pointList.map( function(pt) { 
		return [ pt[0], pt[1], pt[2]+qty ];
      });
    }
};
/* ------------------------------------------ END ------------------------------------------*/
buildVilla();
