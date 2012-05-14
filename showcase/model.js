/**
 * Chess king piece
 */

!(function (exports){
	var king = [];	
	var domain2 = DOMAIN([[0,1],[0,2*PI]])([40,70]);

	var r = -1.3;
	var p0 = [[5+r,0,0], [5.2+r,0,0], [5.2+r,0,0.5], [4.4+r,0,0.6]];
	var k0 = [0,0,0,1,2,2,2];
	var c0 = NUBS(S0)(2)(k0)(p0);
	var m0 = ROTATIONAL_SURFACE(c0);
	var s0 = MAP(m0)(domain2);	
	king.push(s0);

	var d1 = 0.5;
	var p1 = [[4.4+r,0,0.6],[4.7+r,0,0.6],[4.8+r,0,1],
		[4.7+r,0,1.2],[4.5+r,0,1.3],[3.3+d1+r,0,1.7],[3.25+d1+r,0,1.71],[3.25+d1+r,0,2]];
	var k1 = [0,0,0,1,2,3,4,5,6,6,6];
	var c1 = NUBS(S0)(2)(k1)(p1);
	var m1 = ROTATIONAL_SURFACE(c1);
	var s1 = MAP(m1)(domain2);	
	king.push(s1);

	var p2 = [[3.25+d1+r,0,2],[2.9+d1+r,0,2]];
	var c2 = BEZIER(S0)(p2);
	var m2 = ROTATIONAL_SURFACE(c2);
	var s2 = MAP(m2)(domain2);	
	king.push(s2);

	// corpo del pezzo
	var p3 = [[2.9+d1+r,0,2],[2.1+d1+r,0,4],[1.8+d1+r,0,8],[2+d1+r,0,10]];
	var k3 = [0,0,0,1,2,2,2];
	var c3 = NUBS(S0)(2)(k3)(p3);
	var m3 = ROTATIONAL_SURFACE(c3);
	var s3 = MAP(m3)(domain2);	
	s3 =  T([2])([-0.4])( S([2])([1.2])(s3) );
	king.push(s3);

	var p4 = [[2+d1+r,0,10],[2.9+d1+r,0,10],
		[3+r+d1,0,10.2], [2.9+r+d1,0,10.4], [2.3+r+d1,0,10.45]];
	var k4 = [0,0,0,1,2,3,3,3];
	var c4 = NUBS(S0)(2)(k4)(p4);
	var m4 = ROTATIONAL_SURFACE(c4);
	var s4 = MAP(m4)(domain2);	
	
	var p5 = [[2.3+d1+r,0,10.45],[2.4+d1+r,0,10.45],
		[2.45+r+d1,0,10.65], [2.4+r+d1,0,10.86], [1.8+r+d1,0,10.85]];
	var k5 = [0,0,0,1,2,3,3,3];
	var c5 = NUBS(S0)(2)(k5)(p5);
	var m5 = ROTATIONAL_SURFACE(c5);
	var s5 = MAP(m5)(domain2);	

	var p6 = [[1.8+d1+r,0,10.85],[1.8+d1+r,0,11.15]];
	var c6 = BEZIER(S0)(p6);
	var m6 = ROTATIONAL_SURFACE(c6);
	var s6 = MAP(m6)(domain2);	

	var p7 = [[1.8+d1+r,0,11.15],[1.9+d1+r,0,11.15],
		[1.95+r+d1,0,11.25], [1.9+r+d1,0,11.35], [1.8+r+d1,0,11.35]];
	var k7 = [0,0,0,1,2,3,3,3];
	var c7 = NUBS(S0)(2)(k7)(p7);
	var m7 = ROTATIONAL_SURFACE(c7);
	var s7 = MAP(m7)(domain2);	
	
	var x = 0.2;	
	var d2 = -0.4;
	var p8 = [[1,0,11.35],[1,0,11.6], 
		[1.8,0,12.8], [2,0,13.3]];
	var k8 = [0,0,0,1,2,2,2];
	var c8 = NUBS(S0)(2)(k8)(p8);
	var m8 = ROTATIONAL_SURFACE(c8);
	var s8 = MAP(m8)(domain2);	
	
	var p9 = [[2,0,13.3], [1.8,0,13.35+x], 
		[1.5,0,13.4+x], [1,0,13.45+x], [0.5,0,13.5+x]];
	var k9 = [0,0,0,1,2,3,3,3];
	var c9 = NUBS(S0)(2)(k9)(p9);
	var m9 = ROTATIONAL_SURFACE(c9);
	var s9 = MAP(m9)(domain2);	


	var p10 = [[0.5,0,13.5+x], [0.6,0,13.5+x], [0.6,0,14+x], [0.4,0,14+x], [0,0,14+x]];
	var k10 = [0,0,0,1,2,3,3,3];
	var c10 = NUBS(S0)(2)(k10)(p10);
	var m10 = ROTATIONAL_SURFACE(c10);
	var s10 = MAP(m10)(domain2);


	var width = 0.5; 	// thickness = width
	var depth = width*3;
	var half_crown1 = CUBOID([width,width,depth]);
	var half_crown2 = TRANSLATE([0,2])([-width,depth-width])( ROTATE([0,2])([PI/2])(half_crown1) );
	var cross = STRUCT([half_crown1, half_crown2]);
	cross = T([0,1,2])([-width/2,-width/2,15.6])(cross);
	king.push(cross);

	var sTrans = T([2])([1.4])(STRUCT([s4,s5,s6,s7,s8,s9,s10]));
	king.push(sTrans);


	var sphereSurface = function (r, n) {  
	  var domain = DOMAIN([[0,PI], [0,2*PI]])([n,n*2]);
	  var mapping = function (p) {
	    var u = p[0];
	    var v = p[1];
	    return [
	      r * SIN(u) * COS(v),
	      r * SIN(u) * SIN(v),
	      r * COS(u)
	    ];
	  };
	  return MAP(mapping)(domain);
	};

	var sphere = sphereSurface(0.2,20);
	king.push(T([2])([17.3])(sphere));

	var b = [[5+r,0,0],[0+r,0,0]];
	var cb = BEZIER(S0)(b);
	var mb = ROTATIONAL_SURFACE(cb);
	var sb = MAP(mb)(domain2);	
	king.push(sb);

	// EXPORT THE MODEL
	var struct1 = COLOR([152/255,118/255,84/255])(STRUCT(king,cross));
	
	var finale = exports.scmodel = S([0,1,2])([0.2,0.2,0.2])(struct1);
	DRAW(finale);

}(this));