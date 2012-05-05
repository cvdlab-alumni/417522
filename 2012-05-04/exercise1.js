// versione base: ala senza alettoni piccoli
var wing2dDomain = INTERVALS(1)(30);
var domain2 =  DOMAIN([[0,1],[0,1]])([36,36]);

var l = 4; // larghezzaAla
var h = 0.5; // altezzaAla
var distanzaXAli = 1;
var distanzaYAli = 3;

//topWing
// (x,y,z) punto centrale in basso dell'ala
var p0 = [2,0,0];
var x = p0[0];
var y = p0[1];
var z = p0[2];
var wingP1 = [ p0, [x+l/4,y,z], [x+4/5*l, y, z], [x+9/10*l,y+h/4,z], [x+l/2, y+h/2, z], [x+9/10*l,y+3/4*h,z], [x+4/5*l, y+h, z], [x+1/4*l,y+h,z], [x,y+h,z], [x-l/4,y+h,z], [x-4/5*l,y+h,z], [x-9/10*l,y+3/4*h,z], [x-l/2, y+h/2,z], [x-9/10*l,y+l/4,z], [x-4/5*l,y,z], [x-l/4,y,z], p0];
//wingP1 = wingP1.map(function(p){ return [p[0], p[1]/4, p[2]];});

var wingP2 = wingP1.map(function(p){ return [p[0], p[1], p[2] - 12];});
//var wingP5 = [[2,0,0], [3,0,0], [3.8, 0, 0], [3.9,0.5,0], [4, 0.5, 0], [3.9,0.75,0], [3.8, 1, 0], [3,1,0], [2,1,0], [1.2,1,0], [1.1,0.75,0], [1, 0.5,0], [1.1,0.25,0], [1.2,0,0], [2,0,0]];
//wingP5 = wingP5.map(function(p){ return [p[0], p[1]/4, p[2] + 2];});

var cpt0 = BEZIER(S0)(wingP1);
var cpt1 = BEZIER(S0)(wingP2);
//var cpt4 = BEZIER(S0)(wingP5);

var wing3dDomain = DOMAIN([[0,1],[0,1]])([30,30]);

//var BEZ_topWing = BEZIER(S1)([cpt0,cpt1,cpt4]);
var BEZ_topWing = BEZIER(S1)([cpt0,cpt1]);
var topWing = MAP(BEZ_topWing)(wing3dDomain);
DRAW(topWing);

//bottomWing
var bottomWing = T([0,1])([-distanzaXAli,-distanzaYAli])(topWing);
DRAW(bottomWing);



// BARS
//var steccaControlPoints = [[0,0.1,0],[0.1,0,0],[0,-0.1,0],[-0.1,0,0],[0,0.1,0]];
var steccaControlPoints1 = [[0,0,0.1],[0.6,0,0],[0,0,-0.1],[-0.6,0,0],[0,0,0.1]];
steccaControlPoints1 = steccaControlPoints1.map(function (p){return [p[0],p[1]+0.2,p[2]-3]});
var c3 = BEZIER(S0)(steccaControlPoints1);

var steccaControlPoints2 = steccaControlPoints1.map(function (p){return [p[0]-0.3,p[1]-2.8,p[2]]});
var c4 = BEZIER(S0)(steccaControlPoints2);

var steccheMapping = BEZIER(S1)([c3,c4]);
var stecche = MAP(steccheMapping)(domain2);
//DRAW(stecche);

var stecca2 = T([0])([3])(stecche);
//DRAW(stecca2);

var stecca3 = T([2])([-5])(stecche);
//DRAW(stecca3);

var stecca4 = T([0,2])([3,-5])(stecche);
//DRAW(stecca4);

var barre = STRUCT([stecche,stecca2,stecca3,stecca4]);
DRAW(barre);