/* Exercise 5 */

var pista1 = T([0,1])([-5,-10])(SIMPLEX_GRID([[0,5],[0,25]]));
var pista2 = T([0,1])([-10,15])(SIMPLEX_GRID([[0,10],[0,10]]));
var halfpista = COLOR([0.8,0.8,0.8,1])(STRUCT([pista1,pista2]));
var grass1 = T([0,1])([-15,-15])(SIMPLEX_GRID([[15],[5]]));
var grass2 = T([0,1])([-10,-10])(SIMPLEX_GRID([[5],[25]]));
var grass3 = T([0,1])([-15,-10])(SIMPLEX_GRID([[5],[40]]));
var grass4 = T([0,1])([-10,25])(SIMPLEX_GRID([[10],[5]]));
var halfgrass = COLOR([0.14,0.56,0.14,1])(STRUCT([grass1,grass2,grass3,grass4]));
var halfairstrip = STRUCT([halfpista,halfgrass]);
var airstrip = STRUCT([halfairstrip,S([0])([-1])(halfairstrip)]);
DRAW(airstrip);


/* Exercise 4 */

/* Definizione dei domini */
var domain1 = INTERVALS(1)(40);
var domain2 = DOMAIN([[0,1],[0,1]])([60,60]);

/* Curva verticale posteriore della fusoliera lato destro*/
var controlpoints1 = [[0,-0.20,1],[0,-0.2,0.7],[0,0,-1],[0,0,-1]];
var c1 = CUBIC_HERMITE(S0)(controlpoints1);
var curve1 = MAP(c1)(domain1);

/* Curva superiore della fusoliera lato destro */
var controlpoints2 = [[0,-0.20,1],[5,-0.40,1],[1,-0.04,0],[1,-0.04,0]];
var c2 = CUBIC_HERMITE(S0)(controlpoints2);
var curve2 = MAP(c2)(domain1);

/* Curva inferiore della fusoliera lato destro */
var controlpoints3 = [[0,-0.20,0.7],[5,-0.40,0.2],[1,-0.04,-0.01],[1,-0.04,-0.08]];
var c3 = CUBIC_HERMITE(S0)(controlpoints3);
var curve3 = MAP(c3)(domain1);

/* Curva frontale della fusoliera lato destro */
var controlpoints4 = [[5,-0.40,1],[7,-0.52,0.7],[6.1,-0.48,0.1],[5,-0.40,0.2]];
var knots4 = [0,0,0,1,2,2,2];
var c4 = NUBS(S0)(2)(knots4)(controlpoints4);
var curve4 = MAP(c4)(domain1);

/* Lato destro della fusoliera */
var fascia1 = BEZIER(S1)([c1,c4]);
var latoDX = MAP(fascia1)(domain2); 

/* Capovolgendolo così si manifesta l'errore dell'immagine nera, adoto quindi un altro approccio
var latoSX= S([2])([-1])(latoDX); */

/* Curva verticale posteriore della fusoliera lato sinistro*/
var controlpoints1sx = [[0,0.20,1],[0,0.2,0.7],[0,0,-1],[0,0,-1]];
var c1sx = CUBIC_HERMITE(S0)(controlpoints1sx);
var curve1sx = MAP(c1sx)(domain1);

/* Curva superiore della fusoliera lato sinistro */
var controlpoints2sx = [[0,0.20,1],[5,0.40,1],[1,0.04,0],[1,0.04,0]];
var c2sx = CUBIC_HERMITE(S0)(controlpoints2sx);
var curve2sx = MAP(c2sx)(domain1);

/* Curva inferiore della fusoliera lato sinistro */
var controlpoints3sx = [[0,0.20,0.7],[5,0.40,0.2],[1,0.04,-0.01],[1,0.04,-0.08]];
var c3sx = CUBIC_HERMITE(S0)(controlpoints3sx);
var curve3sx = MAP(c3sx)(domain1);

/* Curva frontale della fusoliera lato sinistro */
var controlpoints4sx = [[5,0.40,1],[7,0.52,0.7],[6.1,0.48,0.1],[5,0.40,0.2]];
var knots4sx = [0,0,0,1,2,2,2];
var c4sx = NUBS(S0)(2)(knots4sx)(controlpoints4sx);
var curve4sx = MAP(c4sx)(domain1);

/* Lato sinistro della fusoliera */
var fascia2 = BEZIER(S1)([c1sx,c4sx]);
var latoSX = MAP(fascia2)(domain2); 

/* Superficie anteriore della fusoliera */
var punta = BEZIER(S1)([c4,c4sx]);
var surf = MAP(punta)(domain2);

/* Superficie posteriore della fusoliera */
var coda = BEZIER(S1)([c1,c1sx]);
var surfc = MAP(coda)(domain2);

/* Superficie inferiore della fusoliera */
var b = BEZIER(S1)([c3,c3sx]);
var surfb = MAP(b)(domain2);

/* Superficie superiore della fusoliera */
var t = BEZIER(S1)([c2,c2sx]);
var surft = MAP(t)(domain2);

/* Fusoliera */
var fusoliera = STRUCT([latoSX,latoDX,surft, surfb, surfc, surf]);


/* Curve per il disegno dell'elica */
var elica1points = [[0.05,0.1,0],[0.05,0.9,0],[0,1,0],[0,1,0]];
var elicac1 = (CUBIC_HERMITE(S0)(elica1points));
var elicacurve1 = MAP(elicac1)(domain1);

var elica2points = [[0.1,0.1,0],[0.05,0.9,0],[0,0.9,0],[0,0.9,0.9]];
var elicac2 = CUBIC_HERMITE(S0)(elica2points);
var elicacurve2 = MAP(elicac2)(domain1);

var e12dx = BEZIER(S1)([elicac1,elicac2]);
var elica1 = MAP(e12dx)(domain2);
var elica2 = R([1,2])([PI])(elica1);
var eliche = COLOR([0.54,0.35,0.17])(STRUCT([elica1,elica2]));

/* Curve per il disegno dell'anello che collega le due eliche */
var con1 = [[0,0,0.01],[0,-0.01,0.01],[0,-0.01,-0.01],[0,0.01,-0.01],[0,0.01,0.01],[0,0,0.01]];
var knots1 = [0,0,0,1,2,3,4,4,4];
var c1 = NUBS(S0)(2)(knots1)(con1);
var curve1 = MAP(c1)(domain1);

var con2 = [[0.1,0,0.01],[0.1,-0.01,0.01],[0.1,-0.01,-0.01],[0.1,0.01,-0.01],[0.1,0.01,0.01],[0.1,0,0.01]];
var knots2 = [0,0,0,1,2,3,4,4,4];
var c2 = NUBS(S0)(2)(knots2)(con2);
var curve2 = MAP(c2)(domain1);

var con3 = [[0,0,0.1],[0,-0.1,0.1],[0,-0.1,-0.1],[0,0.1,-0.1],[0,0.1,0.1],[0,0,0.1]];
var knots3 = [0,0,0,1,2,3,4,4,4];
var c3 = NUBS(S0)(2)(knots3)(con3);
var curve3 = MAP(c3)(domain1);

var con4 = [[0.1,0,0.1],[0.1,-0.1,0.1],[0.1,-0.1,-0.1],[0.1,0.1,-0.1],[0.1,0.1,0.1],[0.1,0,0.1]];
var knots4 = [0,0,0,1,2,3,4,4,4];
var c4 = NUBS(S0)(2)(knots4)(con4);
var curve4 = MAP(c4)(domain1);


var s12 = BEZIER(S1)([c1,c2]);
var surf1 = MAP(s12)(domain2);

var s34 = BEZIER(S1)([c3,c4]);
var surf2 = COLOR([0.54,0.35,0.17])(MAP(s34)(domain2));

var s13 = BEZIER(S1)([c1,c3]);
var surf3 = MAP(s13)(domain2);

var s24 = BEZIER(S1)([c2,c4]);
var surf4 = MAP(s24)(domain2);

/* Eliche ed anello */
var elicacompl = T([0,1,2])([6.53,0,0.9])(STRUCT([surf1,surf4,surf3,surf2,eliche]));


/* Disegno della parte frontale sporgente */

var controlpoints1 = [[0.69,-0.2,0.4],[0.69,0.2,0.4],[0,0,0.5],[0,0,-0.5]];
var c1 = CUBIC_HERMITE(S0)(controlpoints1);
var curve1 = MAP(c1)(domain1);


var controlpoints2 = [[0.69,-0.15,0.08],[0.69,0.15,0.08],[0,1,0],[0,1,0]];
var c2 = CUBIC_HERMITE(S0)(controlpoints2);
var curve2 = MAP(c2)(domain1);

/* Superficie frontale della parte sporgente */
var frontpart1 = BEZIER(S1)([c1,c2]);
var frontsurface1 = MAP(frontpart1)(domain2); 


var controlpoints3 = [[0.3,-0.2,0.4],[0.3,0.2,0.4],[0,0,0.5],[0,0,-0.5]];
var c3 = CUBIC_HERMITE(S0)(controlpoints3);
var curve3 = MAP(c3)(domain1);


var controlpoints4 = [[0.3,-0.15,0.2],[0.3,0.15,0.2],[0,1,0],[0,1,0]];
var c4 = CUBIC_HERMITE(S0)(controlpoints4);
var curve4 = MAP(c4)(domain1);

/* Superficie superiore della parte sporgente */
var supfront = BEZIER(S1)([c1,c3]);
var supfrontsur = MAP(supfront)(domain2); 


var controlpoints5 = [[0.69,-0.15,0.08],[0.69,-0.2,0.4],[0,0,0],[0,0,0]];
var c5 = CUBIC_HERMITE(S0)(controlpoints5);
var curve5 = MAP(c5)(domain1);

var controlpoints6 = [[0.3,-0.15,0.2],[0.3,-0.2,0.4],[0,0,0],[0,0,0]];
var c6 = CUBIC_HERMITE(S0)(controlpoints6);
var curve6 = MAP(c6)(domain1);

/* Superfice laterale destra della parte sporgente */
var lato1 = BEZIER(S1)([c5,c6]);
var lato1surf = MAP(lato1)(domain2); 

var controlpoints7 = [[0.69,0.15,0.08],[0.69,0.2,0.4],[0,0,0],[0,0,0]];
var c7 = CUBIC_HERMITE(S0)(controlpoints7);
var curve7 = MAP(c7)(domain1);

var controlpoints8 = [[0.3,0.15,0.2],[0.3,0.2,0.4],[0,0,0],[0,0,0]];
var c8 = CUBIC_HERMITE(S0)(controlpoints8);
var curve8 = MAP(c8)(domain1);

/* Superfice laterale sinistra della parte sporgente */
var lato2 = BEZIER(S1)([c7,c8]);
var lato2surf = MAP(lato2)(domain2); 

/* Necessario per chiudere i lati della parte frontale sporgente superiore interna */
var controlpoints9 = [[0.05,-0.15,0.3],[0.05,0.15,0.3],[0,0,0],[0,0,0]];
var c9 = CUBIC_HERMITE(S0)(controlpoints9);
var curve9 = MAP(c9)(domain1);

/* Necessario per chiudere i lati della parte frontale sporgente interna */
var controlpoints10 = [[0.05,-0.15,0.29],[0.05,-0.15,0.3],[0,0,0],[0,0,0]];
var c10 = CUBIC_HERMITE(S0)(controlpoints10);
var curve10 = MAP(c10)(domain1);

var controlpoints11 = [[0.05,0.15,0.29],[0.05,0.15,0.3],[0,0,0],[0,0,0]];
var c11 = CUBIC_HERMITE(S0)(controlpoints11);
var curve11 = MAP(c11)(domain1);

/* Superfici che compongono la porzione posteriore della parte sporgente */
var latosup = BEZIER(S1)([c3,c9]);
var latosupsur = MAP(latosup)(domain2);

var latosupdx = BEZIER(S1)([c6,c10]);
var latosupsurdx = MAP(latosupdx)(domain2);

var latosupsx = BEZIER(S1)([c8,c11]);
var latosupsursx = MAP(latosupsx)(domain2);

var latosupchiudi = BEZIER(S1)([c10,c11]);
var latosupsurclosure = MAP(latosupchiudi)(domain2);

/* Unisco le varie porzioni che compongono la parte sporgente */
var corno = STRUCT([lato2surf,lato1surf,supfrontsur, frontsurface1,
	latosupsur, latosupsurclosure,latosupsursx,latosupsurdx]);

/* Posizionamento della parte sporgente */
var cornosp = T([0,1,2])([5.9,0,0.54])(corno);


/* Ruote dell'aircraft */

var rcp1 = [[0.1,0,0],[0,0.1,0],[0,0.2,0],[-0.2,0,0]];
var rc1 = CUBIC_HERMITE(S0)(rcp1);
var rcurve1 = MAP(rc1)(domain1);

var rcp2 = [[0.2,0,0],[0,0.2,0],[0,0.3,0],[-0.3,0,0]];
var rc2 = CUBIC_HERMITE(S0)(rcp2);
var rcurve2 = MAP(rc2)(domain1);

var s12h = CUBIC_HERMITE(S1)([rc1,rc2,[0,0,0.3],[0,0,-0.3]]); 
var surface12h = MAP(s12h)(domain2);
var surface34h = R([0,1])([PI/2])(surface12h);

var surface21h = R([0,1])([PI/2])(R([1,2])([PI])(surface12h));
var surface43h = R([0,1])([PI/2])(surface21h);

var gomma1 = COLOR([0,0,0])(R([1,2])([-PI/2])((STRUCT([surface12h,surface21h,surface43h,surface34h]))));
var gomma2 = T([1])([0.7])(gomma1);
var gomme = T([0,1,2])([5.69,-0.35,0.2])(STRUCT([gomma1,gomma2]));

/* Includo la fusoliera, la parte sporgente e l'elica completa di anello in un unico oggetto */
var fusolieraCompleta = STRUCT([fusoliera,cornosp,elicacompl,gomme]);


/* Definisco le ali */
var p0 = [[-1.4,0,0],[-0.35,0.1,0],[-0.35,-0.1,0],[-1.4,0,0]];
var p01 = [[-1.2,0,0],[0,0.1,0],[0,-0.1,0],[-1.2,0,0]];
var p1 = p01.map(function(p) {return [p[0]-0.3,p[1],p[2]+0.41]});
var p02 = [[-1.2,0,0],[0,0.1,0],[0,-0.1,0],[-1.2,0,0]];
var p2 = p02.map(function(p) {return [p[0]-0.3,p[1],p[2]+1]});
var p03 = [[-1,0,0],[0,0.1,0],[0,-0.1,0],[-1,0,0]];
var p3 = p03.map(function(p) {return [p[0]-0.3,p[1],p[2]+2.82]});
var p04 = [[-0.8,0,0],[0,0.1,0],[0,-0.1,0],[-0.8,0,0]];
var p4 = p04.map(function(p) {return [p[0]-0.3,p[1],p[2]+4.23]});
var p05 = [[-0.6,0,0],[0,0.1,0],[0,-0.1,0],[-0.6,0,0]];
var p5 = p05.map(function(p) {return [p[0]-0.3,p[1],p[2]+5.64]});


var c0 = BEZIER(S0)(p0);
var c1 = BEZIER(S0)(p1);
var c2 = BEZIER(S0)(p2);
var c3 = BEZIER(S0)(p3);
var c4 = BEZIER(S0)(p4);
var c5 = BEZIER(S0)(p5);

/* Viene definita la parte non ricurva dell'ala */
var wing1 = BEZIER(S1)([c1,c2,c3,c4,c5]);
var dritta = MAP(wing1)(domain2);

/* Viene definita la parte non ricurva dell'ala */
var wing2 = BEZIER(S1)([c0,c1]);
var storta = MAP(wing2)(domain2);

/* Incluse le due parti in un unico oggetto e disegnate, con l'opportuna posizionamento */
var leftWing = T([0])([-0.6])(R([0,1])([PI])(R([1,2])([PI/2])(STRUCT([dritta,storta]))));

/* Ala destra */
var rightWing = R([0,2])([PI])(R([0,1])([PI])(leftWing));

/* Unisco in un unico elemento le due ali e le posiziono opportunamente */
var wings = T([0,1,2])([4.7,0,1])(STRUCT([leftWing,rightWing]));


/* Stabilizzatori */
/* Dati necessari per la superficie sinistra dello stabilizzatore verticale */
var cp3 = [[0,-0.1,0],[0,-0.1,1],[0,0,0],[0,0,0]];
var cc3 = CUBIC_HERMITE(S0)(cp3);
var curvacoda3 = MAP(cc3)(domain1);


var contpAP = [[0,-0.1,0],[-0.7,-0.1,0.3],[-0.7,-0.1,0.7],[-0.6,-0.1,1],[0,-0.1,1]];
var knots4ap = [0,0,0,1,2,3,3,3];
var c4ap = NUBS(S0)(2)(knots4ap)(contpAP);
var curve4AP = MAP(c4ap)(domain1);

var ap1 = BEZIER(S1)([c4ap,cc3]);
var alettoneP = MAP(ap1)(domain2); 

var alettonePS = T([1])([0.2])(alettoneP);


var cp3s = [[0,0.1,0],[0,0.1,1],[0,0,0],[0,0,0]];
var cc3s = CUBIC_HERMITE(S0)(cp3s);
var curvacoda3s = MAP(cc3s)(domain1);


var contpAPs = [[0,0.1,0],[-0.7,0.1,0.3],[-0.7,0.1,0.7],[-0.6,0.1,1],[0,0.1,1]];
var knots4aps = [0,0,0,1,2,3,3,3];
var c4aps = NUBS(S0)(2)(knots4aps)(contpAPs);
var curve4APs = MAP(c4aps)(domain1);


var apperim = BEZIER(S1)([c4aps,c4ap]);
var apperimsup = MAP(apperim)(domain2); 

var apperim1 = BEZIER(S1)([cc3s,cc3]);
var apperimsup1 = MAP(apperim1)(domain2);

/* Definisco la scritta del numero 4 sull'alettone */
var qcontrolpoints1 = [[-0.4,0,0.4],[-0.35,0,0.4],[0,0,0],[0,0,0]];
var qc1 = CUBIC_HERMITE(S0)(qcontrolpoints1);
var qcurve1 = MAP(qc1)(domain1);

var qcontrolpoints2 = [[0,0,0.7],[0.05,0,0.7],[0,0,0],[0,0,0]];
var qc2 = CUBIC_HERMITE(S0)(qcontrolpoints2);
var qcurve2 = MAP(qc2)(domain1);

var fasciaQ = BEZIER(S1)([qc1,qc2]);
var fasciaQuattro = MAP(fasciaQ)(domain2);

var verQ = SIMPLEX_GRID([[0.05],[0,0],[0,0.7]]);
var orQ = T([0,1,2])([-0.35,0,0.4])(SIMPLEX_GRID([[0.6],[0],[0.05]]));
var quattro = T([0,1,2])([-0.28,-0.11,0.2])(COLOR([0,0,0])(STRUCT([fasciaQuattro,verQ,orQ])));

var stabVert1 = STRUCT([alettoneP,alettonePS,apperimsup,apperimsup1,quattro]);


var cp4 = [[0,0.1,1],[0.6,0.1,0.75],[0,0,0],[0,0,0]];
var cc4 = CUBIC_HERMITE(S0)(cp4);
var curvacoda4 = MAP(cc4)(domain1);

var cp5 = [[0,0.1,0.3],[0.6,0.1,0.3],[0,0,0],[0,0,0]];
var cc5 = CUBIC_HERMITE(S0)(cp5);
var curvacoda5 = MAP(cc5)(domain1);

var aletf = BEZIER(S1)([cc5,cc4]);
var aletfsup = MAP(aletf)(domain2);

var aletfsupdx = T([1])([-0.2])(aletfsup);

var cp4d = [[0,-0.1,1],[0.6,-0.1,0.75],[0,0,0],[0,0,0]];
var cc4d = CUBIC_HERMITE(S0)(cp4d);
var curvacoda4d = MAP(cc4d)(domain1);

var cp5d = [[0,-0.1,0.3],[0.6,-0.1,0.3],[0,0,0],[0,0,0]];
var cc5d = CUBIC_HERMITE(S0)(cp5d);
var curvacoda5d = MAP(cc5d)(domain1);

var aletft = BEZIER(S1)([cc4d,cc4]);
var aletfsupt = MAP(aletft)(domain2);

var aletfb = BEZIER(S1)([cc5d,cc5]);
var aletfsupb = MAP(aletfb)(domain2);

var cp6d = [[0.6,-0.1,0.3],[0.6,-0.1,0.75],[0,0,0],[0,0,0]];
var cc6d = CUBIC_HERMITE(S0)(cp6d);
var curvacoda4d = MAP(cc6d)(domain1);

var cp6s = [[0.6,0.1,0.3],[0.6,0.1,0.75],[0,0,0],[0,0,0]];
var cc6s = CUBIC_HERMITE(S0)(cp6s);
var curvacoda4s = MAP(cc6s)(domain1);

var aletfv = BEZIER(S1)([cc6d,cc6s]);
var aletfsupv = MAP(aletfv)(domain2);

var stabVert2 = STRUCT([aletfsup,aletfsupdx,aletfsupb,aletfsupt,aletfsupv]);



/* Dati necessari alla definizione degli stabilizzatori orizzontali */
var contp1 = [[0.6,-0.1,0.35],[0.6,-0.8,0.35],[0,0,0],[0,0,0]];
var ccp1 = CUBIC_HERMITE(S0)(contp1);
var curveOb = MAP(ccp1)(domain1);

var contpO = [[0.6,-0.8,0.35],[0,-0.8,0.35],[-0.5,-0.8,0.35],[-0.5,-0.2,0.35],[0,-0.1,0.35],[0.6,-0.1,0.35]];
var knotsO = [0,0,0,1,2,3,4,4,4];
var cO = NUBS(S0)(2)(knotsO)(contpO);
var curveO = MAP(cO)(domain1);

var aletLat1 = BEZIER(S1)([ccp1,cO]);
var aletLat1sup = MAP(aletLat1)(domain2);

var contp2 = [[0.6,-0.1,0.3],[0.6,-0.8,0.3],[0,0,0],[0,0,0]];
var ccp2 = CUBIC_HERMITE(S0)(contp2);
var curveOb2 = MAP(ccp2)(domain1);

var contp3 = [[0.6,-0.8,0.3],[0,-0.8,0.3],[-0.5,-0.8,0.3],[-0.5,-0.2,0.3],[0,-0.1,0.3],[0.6,-0.1,0.3]];
var knots3 = [0,0,0,1,2,3,4,4,4];
var c3 = NUBS(S0)(2)(knots3)(contp3);
var curve3 = MAP(c3)(domain1);

var aletLat2 = BEZIER(S1)([ccp2,c3]);
var aletLat1inf = MAP(aletLat2)(domain2);

var bordoAL1 = BEZIER(S1)([cO,c3]);
var bordoAL1sur = MAP(bordoAL1)(domain2);

var bordoAL2 = BEZIER(S1)([ccp1,ccp2]);
var bordoAL2sur = MAP(bordoAL2)(domain2);

var aletLatDx = STRUCT([aletLat1sup,aletLat1inf,bordoAL1sur,bordoAL2sur]);

var aletLatSx = T([2])([0.65])(R([1,2])([PI])(aletLatDx));

var stabOriz = STRUCT([aletLatDx,aletLatSx]);

/* Unisco in un unico elemento gli stabilizzatori e li posiziono*/
var stabilizzatori = T([2])([0.7])(STRUCT([stabVert2,stabVert1,stabOriz]));


/* Aereo completo */
var aircraft = STRUCT([fusolieraCompleta,wings,stabilizzatori]);
DRAW(aircraft);