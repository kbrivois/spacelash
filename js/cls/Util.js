/*====================================================================*/
/*========================= Fonctions utiles =========================*/
/*====================================================================*/

// Fonction qui permet de trouver la distance entre 2 points
// arg : 2 points -> oPoint1,oPoint2
// return : distance
var distance = function(oPoint1,oPoint2) 
{
    var xs = 0;
    var ys = 0;
     
    xs = oPoint2.x - oPoint1.x;
    xs = xs * xs;
     
    ys = oPoint2.y - oPoint1.y;
    ys = ys * ys;
     
    return Math.sqrt( xs + ys );
}

// Méthode qui permet de récupérer l'intersection entre les 2 segments formés par les 4 points
// return : aIntersection=[0:oPoint3, 1:oPoint4, 2:Point intersection] (les segments se coupent) ou null
var getIntersectionSegments = function(oPoint1Temp, oPoint2Temp, oPoint3Temp, oPoint4Temp, flag)
{
	if (!flag) { flag = false; } 
	
	var oPoint1 = new Point(oPoint1Temp.x, oPoint1Temp.y);
	var oPoint2 = new Point(oPoint2Temp.x, oPoint2Temp.y);
	var oPoint3 = new Point(oPoint3Temp.x, oPoint3Temp.y);
	var oPoint4 = new Point(oPoint4Temp.x, oPoint4Temp.y);
	
	// segment 2
	if(oPoint4.y - oPoint3.y != 0
		&& oPoint4.x - oPoint3.x != 0)
	{
		var mTrait = (oPoint4.y - oPoint3.y) /	(oPoint4.x - oPoint3.x);
		var pTrait = oPoint3.y - mTrait*oPoint3.x;
	}
	// si le segment 2 est vertical
	else if(oPoint4.x - oPoint3.x == 0)
	{
		var mTrait = 1;
		var pTrait = 0;
	}
	// si le segment 2 est horizontal
	else
	{
		var mTrait = 0;
		var pTrait = oPoint4.y;
	}

	// segment 1
	if(oPoint2.y - oPoint1.y != 0
		&& oPoint2.x - oPoint1.x != 0)
	{
		// y = ax + b
		// y - ax = b
		var mPoint = (oPoint2.y - oPoint1.y) / (oPoint2.x - oPoint1.x);
		var pPoint = oPoint2.y - mPoint*oPoint2.x;
	}
	// si le segment 1 est vertical
	else if(oPoint2.x - oPoint1.x == 0)
	{
		var mPoint = 1;
		var pPoint = 0;
	}
	// si le segment 1 est horizontal
	else
	{
		var mPoint = 0;
		var pPoint = oPoint2.y;
	}
	
	// si le segment 1 ou le segment 2 est vertical ou horizontal
	if(oPoint4.y - oPoint3.y == 0 || oPoint2.y - oPoint1.y == 0
		|| oPoint4.x - oPoint3.x == 0 || oPoint2.x - oPoint1.x == 0)
	{
		// segment 2 vertical et segment 1 horizontal
		if(oPoint4.x - oPoint3.x == 0 && oPoint2.y - oPoint1.y == 0)
		{
			var xIntersection = oPoint4.x;
			var yIntersection = oPoint2.y;
		}
		
		// segment 2 vertical et segment 1 vertical
		else if(oPoint4.x - oPoint3.x == 0 && oPoint2.x - oPoint1.x == 0)
		{
			var xIntersection = oPoint4.x;
			var yIntersection = (oPoint2.y+oPoint1.y)/2;
		}
		
		// segment 2 horizontal et segment 1 vertical
		else if(oPoint4.y - oPoint3.y == 0 && oPoint2.x - oPoint1.x == 0)
		{
			var xIntersection = oPoint2.x;
			var yIntersection = oPoint3.y;
		}
		
		// segment 2 horizontal et segment 1 horizontal
		else if(oPoint4.y - oPoint3.y == 0 && oPoint2.y - oPoint1.y == 0)
		{
			var xIntersection = (oPoint2.x+oPoint1.x)/2;
			var yIntersection = oPoint3.y;
		}
		
		// si le segment 2 est horizontal
		else if(oPoint4.y - oPoint3.y == 0)
		{
			// y = ax + b
			// y-ax-b = 0
			// -ax = b-y
			// x = (b-y)/-a
			var yIntersection = oPoint4.y;
			var xIntersection = (pPoint-yIntersection)/-mPoint;

			/*
			if(flag)
			{
				ctx.beginPath();
				ctx.lineWidth = 2;
				ctx.strokeStyle = "red";
				ctx.arc(xIntersection,
						yIntersection, 4, 0, 2 * Math.PI);
				ctx.stroke();
			}*/
		}
		// si le segment 2 est vertical
		else if(oPoint4.x - oPoint3.x == 0)
		{
			var xIntersection = oPoint4.x;
			var yIntersection = mPoint*xIntersection + pPoint;
		}
		
		// si le segment 1 est horizontal
		else if(oPoint2.y - oPoint1.y == 0)
		{
			var yIntersection = oPoint2.y;
			var xIntersection = (pTrait-yIntersection)/-mTrait;
		}
		
		// si le segment 1 est vertical
		else if(oPoint2.x - oPoint1.x == 0)
		{
			var xIntersection = oPoint2.x;
			var yIntersection = mTrait*xIntersection + pTrait;
		}
	}
	else
	{
		var xIntersection = (pPoint - pTrait) / (mTrait - mPoint);
		var yIntersection = mPoint*xIntersection + pPoint;
	}
	
	// si l'intersection des 2 droites se trouve sur les segments
	if(xIntersection <= Math.max(oPoint4.x,oPoint3.x) && xIntersection >= Math.min(oPoint4.x,oPoint3.x)
		&& yIntersection <= Math.max(oPoint4.y,oPoint3.y) && yIntersection >= Math.min(oPoint4.y,oPoint3.y)
		&& xIntersection <= Math.max(oPoint1.x,oPoint2.x) && xIntersection >= Math.min(oPoint1.x,oPoint2.x)
		&& yIntersection <= Math.max(oPoint1.y,oPoint2.y) && yIntersection >= Math.min(oPoint1.y,oPoint2.y))
	{
			
		var aIntersection = new Array();
		
		/*
		**************************************************************************************
		* Ce qui suit : dans le cas où un ennemi tape perpendiculairement le "pic" d'un côté.
		**************************************************************************************
		*						 ___
		*						|	|  <------ ennemi
		*						|___|
		*				  		  |\
		*				  		  |n\
		*				  		  |nn\
		*	côté touché		----> |nnn\  <------- côtés du terrain
		*	perpendiculairement	  |nnnn\
		*				  		  |nnnnn\
		*				  		  |nnnnnn\
		*				  		  |nnnnnnn\
		*				  		  |nnnnnnnn\
		*							/\
		*							||
		*							||
		*							||
		*				    En dehors du terrain
		*/
		
		// si les deux segments se rencontrent perpendiculairement en oPoint3
		if(xIntersection >= oPoint3.x-2 && xIntersection <= oPoint3.x+2 
			&& yIntersection >= oPoint3.y-2 && yIntersection <= oPoint3.y+2 )
		{
			if(oPoint4.y - oPoint3.y != 0
			&& oPoint4.x - oPoint3.x != 0)
			{
				var mTrait = (oPoint4.y - oPoint3.y) /	(oPoint4.x - oPoint3.x);
				var vecteurNormal = new Point(-mTrait,1);
			}
			// si le segment 2 est vertical
			else if(oPoint4.x - oPoint3.x == 0)
			{
				var vecteurNormal = new Point(1,0);
			}
			// si le segment 2 est horizontal
			else
			{
				var vecteurNormal = new Point(0,1);
			}
			
			oPoint4 = new Point(oPoint3.x + vecteurNormal.x*100, oPoint3.y + vecteurNormal.y*100);
		}
		// si les deux segments se rencontrent perpendiculairement en oPoint4
		else if(xIntersection >= oPoint4.x-2 && xIntersection <= oPoint4.x+2 
			&& yIntersection >= oPoint4.y-2 && yIntersection <= oPoint4.y+2 )
		{	
			if(oPoint4.y - oPoint3.y != 0
			&& oPoint4.x - oPoint3.x != 0)
			{
				var mTrait = (oPoint4.y - oPoint3.y) /	(oPoint4.x - oPoint3.x);
				var vecteurNormal = new Point(-mTrait,1);
			}
			// si le segment 2 est vertical
			else if(oPoint4.x - oPoint3.x == 0)
			{
				var vecteurNormal = new Point(1,0);
			}
			// si le segment 2 est horizontal
			else
			{
				var vecteurNormal = new Point(0,1);
			}
			oPoint3 = new Point(oPoint4.x + vecteurNormal.x*100, oPoint4.y + vecteurNormal.y*100);
		}
		
		aIntersection.push(oPoint3, oPoint4, new Point(xIntersection,yIntersection));
		return aIntersection;
	}
	return null;
}

// Méthode qui permet de récupérer l'intersection entre les 2 droites formées par les 4 points
// return : aIntersection=[0:oPoint3, 1:oPoint4, 2:Point intersection] (les droites se coupent) ou null
var getIntersectionDroites = function(oPoint1Temp, oPoint2Temp, oPoint3Temp, oPoint4Temp)
{
	var oPoint1 = new Point(oPoint1Temp.x, oPoint1Temp.y);
	var oPoint2 = new Point(oPoint2Temp.x, oPoint2Temp.y);
	var oPoint3 = new Point(oPoint3Temp.x, oPoint3Temp.y);
	var oPoint4 = new Point(oPoint4Temp.x, oPoint4Temp.y);

	if(oPoint4.y - oPoint3.y != 0
		&& oPoint4.x - oPoint3.x != 0)
	{
		var mTrait = (oPoint4.y - oPoint3.y) /	(oPoint4.x - oPoint3.x);
		var pTrait = oPoint3.y - mTrait*oPoint3.x;
	}
	// si le trait tracé est vertical
	else if(oPoint4.x - oPoint3.x == 0)
	{
		var mTrait = 1;
		var pTrait = 0;
	}
	// si le trait tracé est horizontal
	else
	{
		var mTrait = 0;
		var pTrait = oPoint4.y;
	}

	// Segment
	if(oPoint2.y - oPoint1.y != 0
		&& oPoint2.x - oPoint1.x != 0)
	{
		// y = ax + b
		// y - ax = b
		var mPoint = (oPoint2.y - oPoint1.y) / (oPoint2.x - oPoint1.x);
		var pPoint = oPoint2.y - mPoint*oPoint2.x;
	}
	// si le Segment est vertical
	else if(oPoint2.x - oPoint1.x == 0)
	{
		var mPoint = 1;
		var pPoint = 0;
	}
	// si le Segment est horizontal
	else
	{
		var mPoint = 0;
		var pPoint = oPoint2.y;
	}
	
	// on détermine le point d'intersection
	// mTrait*x + pTrait = mPoint*x + pPoint
	// (mTrait - mPoint)*x = pPoint - pTrait
	// x = (pPoint - pTrait) / (mTrait - mPoint)
	//
	
	// droites pas paralleles
	if(mPoint != mTrait)
	{
		// si le segment ou le trait tracé est vertical ou horizontal
		if(oPoint4.y - oPoint3.y == 0 || oPoint2.y - oPoint1.y == 0
			|| oPoint4.x - oPoint3.x == 0 || oPoint2.x - oPoint1.x == 0)
		{
			// Trait vertical et segment horizontal
			if(oPoint4.x - oPoint3.x == 0 && oPoint2.y - oPoint1.y == 0)
			{
				var xIntersection = oPoint4.x;
				var yIntersection = oPoint2.y;
			}
			
			// Trait vertical et segment vertical
			else if(oPoint4.x - oPoint3.x == 0 && oPoint2.x - oPoint1.x == 0)
			{
				var xIntersection = oPoint4.x;
				var yIntersection = oPoint2.y;
			}
			
			// Trait horizontal et segment vertical
			else if(oPoint4.y - oPoint3.y == 0 && oPoint2.x - oPoint1.x == 0)
			{
				var xIntersection = oPoint2.x;
				var yIntersection = oPoint3.y;
			}
			
			// Trait horizontal et segment horizontal
			else if(oPoint4.y - oPoint3.y == 0 && oPoint2.y - oPoint1.y == 0)
			{
				var xIntersection = oPoint2.x;
				var yIntersection = oPoint3.y;
			}
			
			// si le trait tracé est horizontal
			else if(oPoint4.y - oPoint3.y == 0)
			{
				// y = ax + b
				// y-ax-b = 0
				// -ax = b-y
				// x = (b-y)/-a
				var yIntersection = oPoint4.y;
				var xIntersection = (pTrait-yIntersection)/-mTrait;
			}
			
			// si le trait tracé est vertical
			else if(oPoint4.x - oPoint3.x == 0)
			{
				var xIntersection = oPoint4.x;
				var yIntersection = mPoint*xIntersection + pPoint;
			}
			
			// si le segment est horizontal
			else if(oPoint2.y - oPoint1.y == 0)
			{
				var yIntersection = oPoint2.y;
				var xIntersection = (pTrait-yIntersection)/-mTrait;
			}
			
			// si le segment est vertical
			else if(oPoint2.x - oPoint1.x == 0)
			{
				var xIntersection = oPoint2.x;
				var yIntersection = mTrait*xIntersection + pTrait;
			}
		}
		else
		{
			var xIntersection = (pPoint - pTrait) / (mTrait - mPoint);
			var yIntersection = mPoint*xIntersection + pPoint;
		}
		
		var aIntersection = new Array();
		aIntersection.push(oPoint3, oPoint4, new Point(xIntersection,yIntersection));
		return aIntersection;
	}
	return null;
}

// Méthode qui va permettre de savoir si le point donné en argument est situé dans le polygone
var dansPolygone = function(P, aListePointsTemp)
{
	var aListePoints = aListePointsTemp;
	var cn = 0;    // the crossing number counter
	var i = 0;
	
	// loop through all edges of the polygon
	for (i=0; i<aListePoints.length-1; i++) {    // edge from V[i] to V[i+1]
	   if (((aListePoints[i].y <= P.y) && (aListePoints[i+1].y > P.y))    // an upward crossing
		|| ((aListePoints[i].y > P.y) && (aListePoints[i+1].y <= P.y))) { // a downward crossing
			// compute the actual edge-ray intersect x-coordinate
			var vt = (P.y - aListePoints[i].y) / (aListePoints[i+1].y - aListePoints[i].y);
			if (P.x < aListePoints[i].x + vt * (aListePoints[i+1].x - aListePoints[i].x)) // P.x < intersect
				cn++;   // a valid crossing of y=P.y right of P.x
		}
	}
	return (cn&1);    // 0 if even (out), and 1 if odd (in)
}

Object.prototype.clone = function() {
    var fn = function (o, cloner){
        if(o == null || typeof(o) != 'object') return o
        var no = new o.constructor()
        Object.keys(o).forEach(function(e){this[e] = cloner(o[e], cloner)},no) 
        return no;
    }
    return fn(this, fn)
}
