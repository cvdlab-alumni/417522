// sedia

var gamba1 = SIMPLEX_GRID([ [0.05], [0.05], [0.4] ]);
var gamba2 = SIMPLEX_GRID([ [-0.35, 0.05], [0.05], [0.4] ]);
var gamba3 = SIMPLEX_GRID([ [0.05], [-0.35, 0.05], [0.4] ]);
var gamba4 = SIMPLEX_GRID([ [-0.35, 0.05], [-0.35, 0.05], [0.4] ]);

var interGamba1 = SIMPLEX_GRID([ [-0.05, 0.3], [0.05], [-0.1, 0.05] ]);
var interGamba2 = SIMPLEX_GRID([ [0.05], [-0.05,0.3], [-0.1,0.05] ]);
var interGamba3 = SIMPLEX_GRID([ [-0.35, 0.05], [-0.05, 0.3], [-0.1,0.05] ]);

var gambe = STRUCT( [gamba1, gamba2, gamba3, gamba4, interGamba1, interGamba2, interGamba3] );


var sedile = SIMPLEX_GRID([ [-0.35, 0.05], [-0.05, 0.3], [-0.1,0.05] ]);


var sedia = STRUCT( [gambe] );

DRAW(sedia);