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
//DRAW(topWing);

//bottomWing
var bottomWing = T([0,1])([-distanzaXAli,-distanzaYAli])(topWing);
//DRAW(bottomWing);

var wings = STRUCT([topWing,bottomWing]);

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
//DRAW(barre);




var leftWing = STRUCT([barre,wings]);
var rightWing = R([1])([PI])(leftWing);
var rightWing = T([2])([12])(leftWing);

var wingsImg = STRUCT([leftWing, rightWing]);

wingsImg = S([0,1,2])([0.5,0.5,0.5])(wingsImg);
wingsImg = T([0])([3])(wingsImg);


DRAW(wingsImg);

//----------------------------------------------------------------------------

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

var cp3 = cp2.map(function (p){return [p[0]+1,p[1],p[2]]});
var c3 = BEZIER(S0)(cp3);


y = -0.3;
z = -0.1;

var cp4 = cp3.map(function (p){return [p[0]+1.5,p[1]/2,p[2]/2]});
var c4 = BEZIER(S0)(cp4);

cp5 = cp4.map(function (p){return [p[0]+1.5,p[1]/2,p[2]/2]});
var c5 = BEZIER(S0)(cp5);


var fusolieraMapping = BEZIER(S1)([tappo,c0,c1,c2,c3,c4,c5]);
var fusoliera = MAP(fusolieraMapping)(domain2);

fusoliera = S([0,1,2])([2,2,2])(fusoliera);

DRAW(fusoliera);



//----------------------------------------------------------------------------
!function(exports){

var domain =  DOMAIN([[0,1],[0,1],[0,1]])([36,1,1]);

//s1
var cpElica1 = [[0,0,-1], [0,0,-2], [0,0,-3], [-1,0,-3], [-2,0,-3], [-2,0,-2], [-2,0,-1], [-2,0,0], [-1,0,0], [0,0,0], [0,0,-1] ];
var c1 = BEZIER(S0)(cpElica1);
var fakePoint1 = [[0,0,-1]];
var f1 = BEZIER(S0)(fakePoint1);
var cElica1 = BEZIER(S1)([f1, c1]);

//s2
var fakePoint2 = [[0,0.1,-1]];
var f2 = BEZIER(S0)(fakePoint2);
var cpElica2 = cpElica1.map(function (p){return [p[0],p[1]+0.1,p[2]]});
var c2 = BEZIER(S0)(cpElica2);
var cElica2 = BEZIER(S1)([f2, c2]);

//elica
var elicaMapping = BEZIER(S2)([cElica1,cElica2]);
var elica = MAP(elicaMapping)(domain);
elica = T([2])([0.25])(elica);

//elica2
var elica2 = S([2])([-1])(elica)



// alettone verticale
//s1
var cpAlet1 = [[0,0,0], [0,1.5,0], [-2,1.5,0], [-2.2,1,0], [-2.2,0,0], [-1,0,0], [0,0,0] ];
cpAlet1 = cpAlet1.map(function (p){return [p[0]/2*2,p[1]*2,p[2]*2]});
var c1 = BEZIER(S0)(cpAlet1);
var fakePoint1 = [[0,0,0]];
var f1 = BEZIER(S0)(fakePoint1);
var cAlet1 = BEZIER(S1)([f1, c1]);



//s2
var cpAlet2 = cpAlet1.map(function (p){return [p[0],p[1],p[2]+0.1]});
var c2 = BEZIER(S0)(cpAlet2);
var fakePoint2 = [[0,0,0.1]];
var f2 = BEZIER(S0)(fakePoint2);
var cAlet2 = BEZIER(S1)([f2, c2]);

//alettone
var aletMapping = BEZIER(S2)([cAlet1,cAlet2]);
var alettone = MAP(aletMapping)(domain);
alettone = T([2])(0.05)(alettone);




var eliche = STRUCT([elica,elica2,alettone]);
eliche = S([0,1])([-1,-1])(eliche);
eliche = T([0])([9])(eliche);

exports.eliche = eliche;
return eliche;
}(this);

DRAW(eliche);

//---------------------------------------------------------------------------------