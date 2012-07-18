/*------------------------------   VARIABLES   ------------------------------*/
//DOMAINS
var roofDomain = DOMAIN([[0,1],[0,1]])([6,6]);


// COLORS
var DARK_WOOD = [133/255,94/255,66/255];
var GLASS = [0.64, 0.83, 0.93, 0.7];
var MARBLE = [250/255,250/255,250/255];
var BURLY_WOODS = [139/255,119/255,101/255];
var ROOF = 	[0.8,0.51,0.4];
var WHITE_TIMPANO = 	[1,0.94,0.86];
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


// WALLS
/*
e: external, c: central, b: back
m: medium, l: low
*/

// heights
var lWallHeight = hStairs;
var mWallHeight = 7;
var corniceHeight = 3;
var hWallHeight = 7;
var hwAltitude = lWallHeight +mWallHeight +corniceHeight;
var highCorniceHeight = mWallHeight*3/24;
var totalWallHeight = lWallHeight + mWallHeight + hWallHeight;
var subTympanumCorniceHeight = corniceHeight;


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
//var bigDoorWidth = 3.25;
var bigDoorWidth = 2.5;
//var bigDoorHeight = 5.625;
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
var domainR = DOMAIN([[0,1],[0,2*PI]])([40,30]);
//var domainR = DOMAIN([[0,1],[0,2*PI]])([20,15]);
var domain2d = DOMAIN([[0,1],[0,1]])([50,1]);
var bColor = [1,1,0.9];
var hColumn = mWallHeight -columnBaseHeight; // - capitalHeight
var rColumn = 0.4;



// TERRACE
var incognite = 0.1;  // distance between the beginning of the flight of steps and the side balcony
// balcony
var cubeWidth = 1;
var rowsHeight = 4*highPartColumnBase
var cubeHeight = cubeWidth;

var poleAndDistance = (stairsTotalWidth-6*cubeWidth-2*incognite)/27;
var poleDiameter = (poleAndDistance)*3/4;
var polesDistance = (poleAndDistance)/4;



//var deltaColumns = (stairsTotalWidth -12*rColumn)/5;  // distance between each column
//var deltaColumns = 6*poleDiameter+5*polesDistance;  // distance between each column
var deltaColumns = 5*poleAndDistance;  // distance between each column


//-------------------------------------------------------------------------------


// ROOF

// Central roof
var tympanumWidth = stairsTotalWidth;
var roofDepth = 3*wallsThickness+7+7+10 + colonnadeDepth;
var tympanumHeight = 3;
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
var nSpaces = 37; // number of spaces between guttam (even external)
// NB dim gutta = dim space
var guttaWidth = tympanumWidth/(nGuttam+nSpaces);
var guttaHeight = guttaWidth;

//-------------------------------------------------------------------------------

/* ------------------------------------------ UTILS ------------------------------------------*/
var drawAll = function(array) {
	array.map(function(a){DRAW(a);});
};


var duplicate = function(leftHalf) {
	var rightHalf = T([0])([2*(leftSideWidth ) + stairsTotalWidth])( S([0])([-1])(leftHalf) );
	var entire = STRUCT([leftHalf,rightHalf]);
	return entire;
}

/* ------------------------------------------ STAIRS ------------------------------------------*/

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
	builtFlightOfStepBack.translate([0,1],[(leftSideWidth+2*stairsTotalWidth+3*lFS),-colonnadeDepth+4*wallsThickness+7+7+9+1]);
	//var cube = SIMPLEX_GRID([[-11-6 -wallsThickness , stairsTotalWidth],[-3*wallsThickness-7-7-9,wallsThickness],[lWallHeight]]);
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

	stairs = T([0])([lFS])(stairs);
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
	// FINESTRE APERTE
	var a = applyBoundaryWood([0.5,0,lWallHeight/3],lWallHeight/3);

	//FINESTRE CHIUSE

	//PORTE


	DRAW(a);
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

	var fdUp = T([2])([mWallHeight+corniceHeight])(fd);

	drawAll([fd,fdUp]);
}

var buildBackdoors = function() {
	var bd = buildDoor();
	bd.translate([1],[-doorThickness+4*wallsThickness+7+7+9-colonnadeDepth +wallsThickness/2]);
	var bdUp = T([2])([mWallHeight+corniceHeight])(bd);

	drawAll([bd,bdUp]);
}


var buildDoor = function() {
	var sf = 0.125; // scale factor
	var thickness = doorThickness/sf;
	var height = bigDoorHeight/sf;
	var width = bigDoorWidth/sf;

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

	var sf = 0.125; 	//scale factor	
	frontDoor.scale([0,1,2],[sf,sf,sf]);
	frontDoor.translate([0,2],[leftSideWidth + lFS + (wStep)/2 - width*sf/2, hStairs]);
	

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
	windows = COLOR(GLASS)(windows);
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
	return w;
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
	var wSideLowCenterRight = T([1])([windowWidth +(7 -windowWidth)/2+windowWidth])(wSideLowRight);
	var wSideLowCenterLeft = T([1])([windowWidth+1.5])(wSideLowCenterRight);
	var wSideLowLeft = T([1])([windowWidth+1.5])(wSideLowCenterLeft);
	var wSideMediumRight = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(wSideLowRight);
	var wSideMediumCenterRight = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(wSideLowCenterRight);
	var wSideMediumCenterLeft = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(wSideLowCenterLeft);

	// EXTERNAL SIDE WALL
	var wExternalSideLeft = T([0,1])([-11-wallsThickness,-(7 -windowWidth)/2 -wallsThickness-0.5 -windowWidth])(wSideLowRight);
	var wExternalSideRight = T([1])([-windowWidth-3])(wExternalSideLeft);

	// FRONT WALL
	var mFrontLeft = buildGenericWindow([0.5,0,lWallHeight+mWallHeight*2/24],h);
	var mFrontCenter = T([0])([4.5+windowWidth])(mFrontLeft);
	var mFrontRight = T([0])([windowWidth+3+wallsThickness+1.5])(mFrontCenter);
	var hFrontRight = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24 ])(mFrontRight);
	var mFrontColonnade = T([0])([windowWidth+3.05+wallsThickness+ columnDistance])(mFrontRight);
	var hFrontColonnade = T([2])([mWallHeight+corniceHeight -mWallHeight*2/24])(mFrontColonnade);

	// BACK
	var mBackColonnadeLeft = buildGenericWindow([11+wallsThickness+6+wallsThickness+columnDistance,3*wallsThickness+7+7+4+wallsThickness-windowThickness,
												lWallHeight+ mWallHeight*2/24],h);
	var mBackColonnadeRight = T([0])([windowWidth+columnDistance])(mBackColonnadeLeft);
	var hBackColonnadeLeft = T([2])([mWallHeight+corniceHeight])(mBackColonnadeLeft);
	var hBackColonnadeRight = T([2])([mWallHeight+corniceHeight])(mBackColonnadeRight);



	
	var bigWindows = STRUCT([wSideLowRight,wSideLowCenterRight,wSideLowCenterLeft,wSideLowLeft,wSideMediumRight,wSideMediumCenterRight,wSideMediumCenterLeft,
							wExternalSideLeft,wExternalSideRight, mFrontLeft,mFrontCenter,mFrontRight,hFrontRight,mFrontColonnade,hFrontColonnade,
							mBackColonnadeLeft,mBackColonnadeRight,hBackColonnadeLeft,hBackColonnadeRight]);
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
	}
	else {

	}
	
	var blind = STRUCT([bottomWood,sideWoodLeft,sideWoodRight,topWood]).translate([0,1,2],[lbV[0],lbV[1]-blindThickness,lbV[2]]);
	blind = COLOR(DARK_WOOD)(blind);

	return blind;
}



/* ------------------------------------------ WALLS ------------------------------------------*/

var buildWalls = function() {

	// BUILD LEFT HALF of the building walls
	var lowWalls = buildLowWalls();
	var middleWalls = buildMiddleWalls();
	var cornices = buildCornices();
	var highWalls = buildHighWalls();
	var internalWalls = buildInternalWalls();

	var leftHalfBuild = STRUCT([lowWalls,middleWalls,cornices,highWalls,internalWalls]);
	var walls = duplicate(leftHalfBuild);

	DRAW(walls);
};


var buildWall = function(p,width,depth,height) {
	return SIMPLEX_GRID([[-p[0],width],[-p[1],depth],[-p[2],height]])
};

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
									   [wallsThickness],[-bigDoorHeight,(mWallHeight-bigDoorHeight)]]);
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
									   [-3*wallsThickness-7-7-4,wallsThickness],[-bigDoorHeight,(mWallHeight-bigDoorHeight)]]);
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
	var internalWall1 = SIMPLEX_GRID([[-11 -wallsThickness -11 +1, wallsThickness],[-wallsThickness, 3, -1, 3], [totalWallHeight]]);
	var internalWall2 = SIMPLEX_GRID([[-11 -wallsThickness -3 -1, 7],[-wallsThickness -7,wallsThickness], [totalWallHeight]]);
	var internalWallMiddle = SIMPLEX_GRID([[-11, wallsThickness +3],[-wallsThickness -7,wallsThickness], [-lWallHeight -mWallHeight, hWallHeight]]);
	var internalWalls = STRUCT([internalWall1,internalWall2,internalWallMiddle]);

	return internalWalls;
}




/*-----------------------------------------------   ROOF   --------------------------------------------------------------*/

var buildRoofs = function() {
	var cRoof = buildCentralRoof();
	var hRoof = buildHorizontalRoof(horizontalCentralRoofWidth_half,horizontalCentralRoofDepth,horizontalCentralRoofHeight,centralStraightPartWidth);
	var externalRoof = buildHorizontalRoof(horizontalExternalRoofWidth,horizontalExternalRoofDepth,horizontalExternalRoofHeight,externalStraightPartWidth*2);

	externalRoof = COLOR(ROOF)(externalRoof);
	hRoof = COLOR(ROOF)(hRoof);

	cRoof.translate([0,2],[6+11+wallsThickness,totalWallHeight+corniceHeight+subTympanumCorniceHeight]);
	hRoof.translate([0,2],[6+11+wallsThickness,totalWallHeight+corniceHeight+subTympanumCorniceHeight]);
	externalRoof.translate([0,2],[11/2+wallsThickness/2+wallsThickness,hwAltitude+mWallHeight*12/24]);
	leftRoof = STRUCT([cRoof,hRoof,externalRoof])
	
	var roof = duplicate(leftRoof);

	var pediment = buildPediment();

	roof = STRUCT([roof,pediment]);
	DRAW(roof);
}

var cornicePedimentThickness = 0.1;
var cornicePedimentHeight = 0.1;
var buildPediment = function() {
	var lowCornice = CUBOID([tympanumWidth,cornicePedimentThickness,cornicePedimentHeight]);
	var guttam = buildGuttam().translate([2],[-guttaHeight]);

	var pediment = STRUCT([lowCornice,guttam]).translate([0,1,2],[6+11+wallsThickness,-colonnadeDepth+sporgenza,
												totalWallHeight+corniceHeight+subTympanumCorniceHeight-cornicePedimentHeight]);

	return pediment;
}

var buildCentralRoof = function() {
	// control points pezzo diagonale
	var cpDiagonalFront = [[0,0,0],[tympanumWidth/2,0,tympanumHeight]];
	var cpDiagonalBack = cpDiagonalFront.map(function(p){return [p[0],p[1]+roofDepth,p[2]]});
	//Superficie del tetto
	var roof1Surface = MAP(BEZIER(S1)([BEZIER(S0)(cpDiagonalFront), BEZIER(S0)(cpDiagonalBack)]))(roofDomain);


	roof1Surface = COLOR(ROOF)(roof1Surface);

	//control points tympanum
	var cpDiagonalTympanum = cpDiagonalFront.map(function(p){return [p[0],p[1]+dTettoFrontone,p[2]]});
	var vertexLowRightTympanum = [[tympanumWidth/2,dTettoFrontone,0]];
	//Superficie del tympanum
	var tympanumSurfaceFront = MAP(BEZIER(S1)([BEZIER(S0)(cpDiagonalTympanum), BEZIER(S0)(vertexLowRightTympanum)]))(roofDomain);
	var tympanumSurfaceBack = T([1])([roofDepth])(tympanumSurfaceFront);
	var halfTympanum = STRUCT([tympanumSurfaceFront,tympanumSurfaceBack]);
	halfTympanum = COLOR(WHITE_TIMPANO)(halfTympanum);

	var roofZAxis = STRUCT([halfTympanum,roof1Surface]);
	roofZAxis.translate([1],[-colonnadeDepth]);

	return roofZAxis;
}


var buildHorizontalRoofs = function() {
	
	var centralRoof = buildHorizontalRoof(horizontalCentralRoofWidth_half,horizontalCentralRoofDepth,horizontalCentralRoofHeight,centralStraightPartWidth);
	var externalRoof = buildHorizontalRoof(horizontalExternalRoofWidth,horizontalExternalRoofDepth,horizontalExternalRoofHeight,externalStraightPartWidth*2);
	

	var horizontalRoofs = STRUCT([externalRoof,centralRoof]);
	horizontalRoofs = COLOR(ROOF)(horizontalRoofs);
	return horizontalRoofs;
	//return centralRoof;
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
	var g = buildGutta(guttaWidth);
	var guttam = STRUCT([g]);

	var i = 1;
	while (i<nGuttam) {
		guttam = STRUCT([guttam,T([0])([i*2*guttaWidth])(g)]);
		i++;
	}

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

	var colonnade = STRUCT([leftColumns,leftArch,leftTerrace]);
	colonnade = duplicate(colonnade);

	var baseColonnade = SIMPLEX_GRID([[colonnadeWidth],[-tStairs,colonnadeDepth],[hStairs]]);
	baseColonnade = T([0,1])([leftSideWidth,-tStairs-colonnadeDepth])(baseColonnade);

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


var buildTerrace = function() {

	var cube = CUBOID([cubeWidth,cubeWidth,cubeHeight]);
	var cube2 = T([0])([deltaColumns+cubeWidth])(cube);
	var cube3 = T([0])([deltaColumns+cubeWidth])(cube2);
	var rows = SIMPLEX_GRID([[-cubeWidth,deltaColumns,-cubeWidth,deltaColumns,-cubeWidth, (stairsTotalWidth/2-2*deltaColumns-3*cubeWidth)],
								[-cubeWidth/4,(cubeWidth/2)],[-cubeHeight,rowsHeight]]);

	var cubes = STRUCT([cube,cube2,cube3]);
	var terraceFloorSide = SIMPLEX_GRID([[cubeWidth],[colonnadeDepth-0.5],[cubeWidth]])
	var terraceFloorDown = CUBOID([stairsTotalWidth/2,colonnadeDepth-0.5+cubeWidth,cubeWidth]).translate([1,2],[-cubeWidth,-cubeWidth]);
	var terraceFloor = STRUCT([terraceFloorSide,terraceFloorDown]).translate([1],[cubeWidth]);

	var leftPoles = buildPoles(6).translate([0,1],[cubeWidth,(cubeWidth+poleDiameter)/2]);
	var centerPoles = T([0])([cubeWidth+deltaColumns])(leftPoles);
	var rightPoles = buildPoles(4).translate([0,1],[2*deltaColumns+3*cubeWidth,(cubeWidth+poleDiameter)/2]);

	var poles = STRUCT([leftPoles,centerPoles,rightPoles]);

	var terrace = STRUCT([cubes,rows,terraceFloor,poles]).translate([0,1,2],[11+6+wallsThickness+0.1,-colonnadeDepth-0.5,hwAltitude-cubeWidth]);

	return (terrace);
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
	var top = MAP(mappingTop)(domainR);

	var cpBody = [[poleDiameter/3,0,0.45],[poleDiameter/6,0,0.4],[poleDiameter/6,0,0.35],[poleDiameter/3,0,0.25],[poleDiameter/2,0,0.15],[poleDiameter/3,0,0.05]];

	var bodyKnots = makeKnots(cpBody);
	var bodyCurve = NUBS(S0)(2)(bodyKnots)(cpBody);
	var mappingBody = ROTATIONAL_SURFACE(bodyCurve);
	var body = MAP(mappingBody)(domainR);

	var cpMiddle = [[poleDiameter/3,0,0.05],[poleDiameter/2,0,0],[poleDiameter/3,0,-0.05]];
	var middleKnots = makeKnots(cpMiddle);
	var middleCurve = NUBS(S0)(2)(middleKnots)(cpMiddle);
	var mappingMiddle = ROTATIONAL_SURFACE(middleCurve);
	var middle = MAP(mappingMiddle)(domainR);

	var topHalf = STRUCT([top,body]);
	var bottomHalf = S([2])([-1])(topHalf);

	var pole = STRUCT([topHalf,bottomHalf,middle]).translate([2],[0.5]);
	return pole;
}

var buildColumn = function() {
	//var capital = buildCapital();
	var body = buildColumnBody();
	var base = buildColumnBase();

	var column = STRUCT([/*capital,*/body,base]);
	column.translate([0,1,2],[11+6+2*wallsThickness-rColumn,-colonnadeDepth,lWallHeight]);

	return column;
}


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
	var base = MAP(mappingBase)(domainR);
	var lowBase = SIMPLEX_GRID([[1],[1],[4*highPartColumnBase]]).translate([0,1,2],[-0.5,-0.5,-10*highPartColumnBase]);
	base = STRUCT([base,lowBase]).translate([2],[10*highPartColumnBase]);
	base = COLOR(bColor)(base);
	return base;
}


//builds the column's capital
var buildCapital = function(){
	var capitalHeight = 16;
	var capitalDepth = 0.6;
	var capital = [];
	var points = [[3,4,0],[3,6,0],[5,7.5,0],[8,6,0],[8,2,0],[5,0,0],[1,1,0],[-0.5,4,0],[0,7,0],[2,9,0],[6,9.5,0],[9,8,0],[10.5,4,0],[9.5,0.5,0],[7,-2,0],[-1,-1,0],[-3.5,4,0],[-2,9,0],[2,12.5,0],[8,13,0],[20,13,0]];

	var knots = makeKnots(points);
	var center = [5,4,0];
	var spes = 0.8;
	var points2 = points.map(function(p){return [ spes*p[0] + (1-spes)*center[0], spes*p[1] + (1-spes)*center[1], 0 ]});
	var curve = NUBS(S0)(2)(knots)(points);
	var curve2 = NUBS(S0)(2)(knots)(points2);
	var capit = BEZIER(S1)([curve,curve2]);
	var frontSurface1 = MAP(capit)(domain2d);
	capital.push(frontSurface1);
	var latSurface = [];
	var latSurface2 = [];
	latSurface.push(curve);
	latSurface2.push(curve2);

	var points = points.map(function(p){return [p[0],p[1],p[2]+capitalHeight]});
	var points2 = points2.map(function(p){return [p[0],p[1],p[2]+capitalHeight]});
	var curve = NUBS(S0)(2)(knots)(points);
	var curve2 = NUBS(S0)(2)(knots)(points2);
	var capit2 = BEZIER(S1)([curve,curve2]);
	var frontSurface2 = MAP(capit2)(domain2d);
	capital.push(frontSurface2);
	latSurface.push(curve);
	latSurface2.push(curve2);

	var latSurface = BEZIER(S1)(latSurface);
	var latSurface = MAP(latSurface)(domain2d);
	capital.push(latSurface);
	var latSurface2 = BEZIER(S1)(latSurface2);
	var latSurface2 = MAP(latSurface2)(domain2d);
	capital.push(latSurface2);

	var center = [5,4,capitalDepth];
	var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - capitalHeight+ capitalDepth]});
	var curve = NUBS(S0)(2)(knots)(pointsProfile);

	var fakePoint = BEZIER(S0)([center,center]);
	var filling = BEZIER(S1)([fakePoint, curve]);
	var filling = MAP(filling)(domain2d);
	capital.push(filling);

	var center = [5,4,capitalHeight - capitalDepth];
	var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - capitalDepth]});
	var curve = NUBS(S0)(2)(knots)(pointsProfile);

	var fakePoint = BEZIER(S0)([center,center]);
	var filling = BEZIER(S1)([fakePoint, curve]);
	var filling = MAP(filling)(domain2d);
	capital.push(filling);


	//otherside
	var l = 30;
	var points = [[3,4,0],[3,6,0],[5,7.5,0],[8,6,0],
					[8,2,0],[5,0,0],[1,1,0],[-0.5,4,0],
					[0,7,0],[2,9,0],[6,9.5,0],[9,8,0],
					[10.5,4,0],[9.5,0.5,0],[7,-2,0],[-1,-1,0],
					[-3.5,4,0],[-2,9,0],[2,12.5,0],[8,13,0],[20,13,0]];

	var points = points.map(function(p){return [- p[0] + l , p[1],p[2]]});

	var knots = makeKnots(points);
	var center = [5+l-7,4,0];
	var capitalOthersideDepth = 0.8;
	var points2 = points.map(function(p){return [ capitalOthersideDepth*p[0] + (1-capitalOthersideDepth)*center[0], capitalOthersideDepth*p[1] + (1-capitalOthersideDepth)*center[1], 0 ]});
	var curve = NUBS(S0)(2)(knots)(points);
	var curve2 = NUBS(S0)(2)(knots)(points2);
	var capit = BEZIER(S1)([curve,curve2]);
	var frontSurface1 = MAP(capit)(domain2d);
	capital.push(frontSurface1);
	var latSurface = [];
	var latSurface2 = [];
	latSurface.push(curve);
	latSurface2.push(curve2);

	var points = points.map(function(p){return [p[0],p[1],p[2]+capitalHeight]});
	var points2 = points2.map(function(p){return [p[0],p[1],p[2]+capitalHeight]});
	var curve = NUBS(S0)(2)(knots)(points);
	var curve2 = NUBS(S0)(2)(knots)(points2);
	var capit2 = BEZIER(S1)([curve,curve2]);
	var frontSurface2 = MAP(capit2)(domain2d);
	capital.push(frontSurface2);
	latSurface.push(curve);
	latSurface2.push(curve2);

	var latSurface = BEZIER(S1)(latSurface);
	var latSurface = MAP(latSurface)(domain2d);
	capital.push(latSurface);
	var latSurface2 = BEZIER(S1)(latSurface2);
	var latSurface2 = MAP(latSurface2)(domain2d);
	capital.push(latSurface2);

	var center = [5+l-7,4,capitalOthersideDepth];
	var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - capitalHeight+ capitalOthersideDepth]});
	var curve = NUBS(S0)(2)(knots)(pointsProfile);

	var fakePoint = BEZIER(S0)([center,center]);
	var filling = BEZIER(S1)([fakePoint, curve]);
	var filling = MAP(filling)(domain2d);
	capital.push(filling);

	var center = [5+l-7,4,capitalHeight - capitalOthersideDepth];
	var pointsProfile = points2.map(function(p){return [p[0],p[1],p[2] - capitalOthersideDepth]});
	var curve = NUBS(S0)(2)(knots)(pointsProfile);

	var fakePoint = BEZIER(S0)([center,center]);
	var filling = BEZIER(S1)([fakePoint, curve]);
	var filling = MAP(filling)(domain2d);
	capital.push(filling);



	var base = T([1])([4.2])(SIMPLEX_GRID([[-8,14],[6.2],[-capitalOthersideDepth,capitalHeight-2*capitalOthersideDepth]]));
	var torusSurface = R([1,2])([PI/2])(TORUS_SURFACE([3, 6.5])([50,10]));
	var torusSurface = T([0,1,2])([15,6,8])(torusSurface);

	capital.push(base);
	capital.push(torusSurface);

	var capital = STRUCT(capital);

	var capital = S([0,1,2])([0.3,0.15,0.3])(capital);
	capital = T([1])([-0.77])(capital);

	/*POSITIONING*/
	capital.rotate([1,2],[PI/2]);
	capital.scale([0,1,2],[0.2,0.2,0.2]);
	capital.translate([0,2],[-1,hColumn]);

	capital = COLOR(bColor)(capital);
	return capital;
}


var buildColumnBody = function(){
	var points = [[rColumn, 0, 0],[rColumn*6.3/5,0,1/3*hColumn],[rColumn,0,hColumn]];
	var pColumn = NUBS(S0)(2)([0,0,0,1,1,1])(points);
	var mappingColumn = ROTATIONAL_SURFACE(pColumn);
	var column = MAP(mappingColumn)(domainR);

	//column.translate([1],[-rColumn])
	column.translate([2,],[columnBaseHeight]);
	column = COLOR(bColor)(column);

	return column;
}


var buildArchs = function(){
  var basamento1 = CUBOID([4,1,0.28]);
  var basamento_sottoarch = T([0,1,2])([0,0.07,0.279999])(CUBOID([3.93,0.73,0.76]));
  var pilastro_arch1 = T([0,1,2])([3.18,0.07,1.039999])(CUBOID([0.75,0.73,3.44]));
  var pilastro_arch2 = T([0,1,2])([0,0.07,1.039999])(CUBOID([0.75,0.73,3.44]));
  var anello1 = T([0,1,2])([3.08,-0.03,4.479999])(CUBOID([0.93,0.91,0.26]));
  var anello2 = T([0,1,2])([-0.10,-0.03,4.479999])(CUBOID([0.93,0.91,0.26]));
 

  var curvePart = buildCurveArchPart().translate([1,2],[0.07,4.74]);
  var lowerArch = STRUCT([basamento1, basamento_sottoarch, pilastro_arch1, pilastro_arch2, anello1, anello2, curvePart]);
  var higherArch = T([2])([mWallHeight+corniceHeight])(lowerArch);
  var leftArch = STRUCT([lowerArch,higherArch]); 
  leftArch = COLOR(beige_mura)(leftArch);

  leftArch = R([0,1])([-PI/2])(leftArch).translate([0,2],[11+6+wallsThickness,hStairs]);
  leftArch = S([1])([1.3])(leftArch);

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
}

var buildCeilings = function() {
	var externalCeiling = SIMPLEX_GRID([[11],[7],[0]]).translate([0,1,2],[wallsThickness-1,wallsThickness,lWallHeight+mWallHeight+corniceHeight +mWallHeight*9/24]);
	var topCeiling = SIMPLEX_GRID([[wallsThickness + 6 + stairsTotalWidth/2],[4*wallsThickness +7+7+9],[0]]).translate([0,2],[11,totalWallHeight+corniceHeight+0.01]);

	var leftCeilings = STRUCT([externalCeiling,topCeiling]);
	var ceilings = duplicate(leftCeilings);

	DRAW(ceilings);
}

var corniceThickness = 0.1;
var subHighWindowsCorniceHeight = 0.3;
var	buildCornices = function() {
	var frontCornice = SIMPLEX_GRID([[11+6+wallsThickness],[wallsThickness],[corniceHeight]]);
	var externalSideCornice = SIMPLEX_GRID([[wallsThickness],[wallsThickness+7+wallsThickness],[corniceHeight]]).translate([0],[-1]);
	var externalRearCornice = SIMPLEX_GRID([[11],[-wallsThickness-7,wallsThickness],[corniceHeight]]);
	var sideCornice = SIMPLEX_GRID([[-11,wallsThickness],[-2*wallsThickness-7,7+2*wallsThickness+9],[corniceHeight]]);
	var backCornice = SIMPLEX_GRID([[-11-wallsThickness,6],[-3*wallsThickness-7-7-9,wallsThickness],[corniceHeight]]);
	
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

	var barabba = STRUCT([subHighFront,subHighExternalSide,subHighExternalRear,subHighSide,subHighBack]);

	var cornices = STRUCT([frontCornice,externalSideCornice,externalRearCornice,sideCornice,backCornice,extHFrontCornice,extHSideCornice,extHRearCornice,barabba]);
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


/* ------------------------------------------ STOLEN ------------------------------------------*/
var domain1 = DOMAIN([[0,1],[0,1]])([20,20]);
var beige_mura = [0.992,0.96,0.901];
var grigio_colonna = [0.960,0.960,0.960];


//funzione per calcolare i knots della NUBS
function knots (points) {
  var m = points.length;
  var k = 2; //grado della curva, per ora pari a 2 (sempre)
  var n = (m + k + 1);
  var l = n - 3; //numeo da cui si parte per terminare la sequenza
  var j = 1; // primo elemento della sequenza
  var knots = [];
  for (var i = 0; i < 3; i++) {
    knots[i] = 0;
  };
  for (var i = 3; i < l; i++, j++) {
    knots[i] = j;
  };
  for (var i = l; i < n; i++) {
    knots[i] = j;
  };
 return knots;
};

//funzione che prepara la nubs a partire dai punti di controllo, per poi usarla in s1
function nubsS0 (controlpoints) {
  //var curveKnots = knots(controlpoints);
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



/* ------------------------------------------ END ------------------------------------------*/
buildVilla();
