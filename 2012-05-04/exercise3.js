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