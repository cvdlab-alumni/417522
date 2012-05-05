var domain2 =  DOMAIN([[0,1],[0,1]])([36,36]);

// FUSOLIERA
var r = 0.2; // raggio cerchio
var cp0 = [ [0,-0.5,0], [0,-0.5,-0.2], [0,-0.3,-0.2], [0,-0.1,-0.2], [0,-0.1,0.2], [0,-0.3,0.2], [0,-0.5,0.2], [0,-0.5,0] ];
cp0 = cp0.map(function (p){return [p[0]-0.2,p[1]*2,p[2]*2]});
var c0 = BEZIER(S0)(cp0);


//tappo front
var fakePoint0 = [[-0.1,-0.3,0]];
var f0 = BEZIER(S0)(fakePoint0);
var tappo = BEZIER(S1)([f0, c0]);




var cp1 = [[0,-0.5,0], [0,-0.5,-0.5], [0,0,-0.5], [0.4,0.5,0], [0,0,0.5], [0,-0.5,0.5], [0,-0.5,0]];
cp1 = cp1.map(function (p){return [p[0]*2,p[1]*2,p[2]*2]});
var c1 = BEZIER(S0)(cp1);

var y = 0.5; // aumento di y
var z = 0.1; // aumento di z

var cp2 = [[0,-0.5,0], [0,-0.5,-0.5-z], [0,0,-0.5-z], [0,0.5+y,0], [0,0,0.5+z], [0,-0.5,0.5], [0,-0.5,0]];
cp2 = cp2.map(function (p){return [p[0]+1,p[1],p[2]]});
var c2 = BEZIER(S0)(cp2);


//var cp3 = [[0,-0.5,0], [0,-0.5,-0.5-z], [0,0,-0.5-z], [0,0.5+y,0], [0,0,0.5+z], [0,-0.5,0.5], [0,-0.5,0]];
var cp3 = cp2.map(function (p){return [p[0]+1,p[1],p[2]]});
var c3 = BEZIER(S0)(cp3);


y = -0.3;
z = -0.1;
//var cp4 = [[0,-0.5,0], [0,-0.5,-0.5-z], [0,0,-0.5-z], [0,0.5+y,0], [0,0,0.5+z], [0,-0.5,0.5], [0,-0.5,0]];
var cp4 = cp3.map(function (p){return [p[0]+1.5,p[1]/2,p[2]/2]});
var c4 = BEZIER(S0)(cp4);

cp5 = cp4.map(function (p){return [p[0]+1.5,p[1]/2,p[2]/2]});
var c5 = BEZIER(S0)(cp5);


var fusolieraMapping = BEZIER(S1)([tappo,c0,c1,c2,c3,c4,c5]);
var fusoliera = MAP(fusolieraMapping)(domain2);

fusoliera = S([0,1,2])([2,2,2])(fusoliera);

DRAW(fusoliera);
/*
var getBezierS0 = function (controls,n,draw){

	var domain = INTERVALS(1)(n || 20);
	var mapping = BEZIER(S0)(controls);

	var c = MAP(mapping)(domain);
	if(draw){
		DRAW(c);
	}

	return c;
}

var drawBz0 = function(controls){
	DRAW(getBezierS0(controls));
}
drawBz0(cp1);
drawBz0(cp2);
drawBz0(cp3);
drawBz0(cp4);
drawBz0(cp5);
*/