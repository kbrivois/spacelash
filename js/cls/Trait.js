function Trait()
{  
	this.oPointDepart 				= new Point(0,0);  
	this.oPointArrivee 				= new Point(0,0);
	this.iDepartTraitDansPolygone 	= 0;
	this.iTraitDansPolygone 		= 0;
	this.fOpacite 					= 1;
	// True si coupe impossible entre 2 ennemis
	this.iCompteurFaireClignoter 	= 0;
	this.bAugmenterOpacite 			= false;
	// True si le trait touche un ennemi
	this.bToucheEnnemi 				= false;
	this.iEnnemiTouche 				= 0;
	this.oPositionEnnemiTouche 		= null;
}
	
// Méthode qui permet de savoir si le segment que forme les points oPoint1 et oPoint2 touchent ou non le trait
// return : true (trait coupe segment) ou false
Trait.prototype.verifierCoupeSegment = function(oPoint1Temp, oPoint2Temp)
{
	var oPoint1 = new Point(oPoint1Temp.x, oPoint1Temp.y);
	var oPoint2 = new Point(oPoint2Temp.x, oPoint2Temp.y);
	
	if(this.oPointArrivee.y - this.oPointDepart.y != 0
		&& this.oPointArrivee.x - this.oPointDepart.x != 0)
	{
		var mTrait = (this.oPointArrivee.y - this.oPointDepart.y) /	(this.oPointArrivee.x - this.oPointDepart.x);
		var pTrait = this.oPointDepart.y - mTrait*this.oPointDepart.x;
	}
	// si le trait tracé est vertical
	else if(this.oPointArrivee.x - this.oPointDepart.x == 0)
	{
		var mTrait = 1;
		var pTrait = 0;
	}
	// si le trait tracé est horizontal
	else
	{
		var mTrait = 0;
		var pTrait = this.oPointArrivee.y;
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
	
	// si le segment ou le trait tracé est vertical ou horizontal
	if(this.oPointArrivee.y - this.oPointDepart.y == 0 || oPoint2.y - oPoint1.y == 0
		|| this.oPointArrivee.x - this.oPointDepart.x == 0 || oPoint2.x - oPoint1.x == 0)
	{
		// Trait vertical et segment horizontal
		if(this.oPointArrivee.x - this.oPointDepart.x == 0 && oPoint2.y - oPoint1.y == 0)
		{
			var xIntersection = this.oPointArrivee.x;
			var yIntersection = oPoint2.y;
		}
		
		// Trait vertical et segment vertical
		else if(this.oPointArrivee.x - this.oPointDepart.x == 0 && oPoint2.x - oPoint1.x == 0)
		{
			var xIntersection = this.oPointArrivee.x;
			var yIntersection = oPoint2.y;
		}
		
		// Trait horizontal et segment vertical
		else if(this.oPointArrivee.y - this.oPointDepart.y == 0 && oPoint2.x - oPoint1.x == 0)
		{
			var xIntersection = oPoint2.x;
			var yIntersection = this.oPointDepart.y;
		}
		
		// Trait horizontal et segment horizontal
		else if(this.oPointArrivee.y - this.oPointDepart.y == 0 && oPoint2.y - oPoint1.y == 0)
		{
			var xIntersection = oPoint2.x;
			var yIntersection = this.oPointDepart.y;
		}
		
		// si le trait tracé est horizontal
		else if(this.oPointArrivee.y - this.oPointDepart.y == 0)
		{
			// y = ax + b
			// y-ax-b = 0
			// -ax = b-y
			// x = (b-y)/-a
			var yIntersection = this.oPointArrivee.y;
			var xIntersection = (pTrait-yIntersection)/-mTrait;
		}
		
		// si le trait tracé est vertical
		else if(this.oPointArrivee.x - this.oPointDepart.x == 0)
		{console.log("fff");
			var xIntersection = this.oPointArrivee.x;
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
	
	
	// si l'intersection des 2 droites se trouve sur les segments
	if(xIntersection <= Math.max(this.oPointArrivee.x,this.oPointDepart.x) && xIntersection >= Math.min(this.oPointArrivee.x,this.oPointDepart.x)
		&& yIntersection <= Math.max(this.oPointArrivee.y,this.oPointDepart.y) && yIntersection >= Math.min(this.oPointArrivee.y,this.oPointDepart.y)
		&& xIntersection <= Math.max(oPoint1.x,oPoint2.x) && xIntersection >= Math.min(oPoint1.x,oPoint2.x)
		&& yIntersection <= Math.max(oPoint1.y,oPoint2.y) && yIntersection >= Math.min(oPoint1.y,oPoint2.y))
	{
		return true;
	}
	return false;
}

// trace le trait
Trait.prototype.tracer = function()
{
	ctx.beginPath();
	ctx.strokeStyle='blue'; 
	ctx.lineWidth=3;
	ctx.moveTo(oTrait.oPointDepart.x,oTrait.oPointDepart.y);
	ctx.lineTo(oTrait.oPointArrivee.x,oTrait.oPointArrivee.y);
	ctx.stroke();
}

// rend de plus en plus opaque le trait (et inversement) en fonction de "iCompteurFaireClignoter"
// si "iCompteurFaireClignoter" = 3, le trait doit clignoter encore 3 fois, etc.
Trait.prototype.clignoter = function()
{
	if(this.iCompteurFaireClignoter != 0)
	{
		var fOpaciteTemp = 0.1;
		
		if(this.fOpacite >= 1)
		{
			this.bAugmenterOpacite = false;
			this.iCompteurFaireClignoter--;
			if(this.iCompteurFaireClignoter != 0)
			{
				this.fOpacite -= fOpaciteTemp;
			}
		}
		else if(this.fOpacite <= 0)
		{
			this.fOpacite += fOpaciteTemp;
			this.bAugmenterOpacite = true;
		}
		else
		{
			if(!this.bAugmenterOpacite)
			{
				if(this.fOpacite - fOpaciteTemp < 0)
					this.fOpacite = 0;
				else
					this.fOpacite -= fOpaciteTemp;
			}
			else
			{
				if(this.fOpacite + fOpaciteTemp > 1)
					this.fOpacite = 1;
				else
					this.fOpacite += fOpaciteTemp;
			}
		}
		
		ctx.save(); 
		ctx.beginPath();
		ctx.strokeStyle="rgba(255,0,0,"+this.fOpacite+")";
		ctx.lineWidth=3;
		ctx.moveTo(oTrait.oPointDepart.x,oTrait.oPointDepart.y);
		ctx.lineTo(oTrait.oPointArrivee.x,oTrait.oPointArrivee.y);
		ctx.stroke();
		ctx.restore();
		
		if(this.iCompteurFaireClignoter == 0)
		{
			this.reset();
		}
	}
}

// fait disparaitre le trait de + en + en le rendant plus opaque et en le déplaçant vers le bas
// si "iCompteurFaireClignoter" = 3, le trait doit clignoter encore 3 fois, etc.
Trait.prototype.disparaitre = function()
{
	if(this.iCompteurFaireClignoter != 0)
	{
		var fOpaciteTemp = 0.1;
		
		if(this.fOpacite >= 1)
		{
			this.bAugmenterOpacite = false;
			this.iCompteurFaireClignoter--;
			if(this.iCompteurFaireClignoter != 0)
			{
				this.fOpacite -= fOpaciteTemp;
			}
		}
		else if(this.fOpacite <= 0)
		{
			this.fOpacite += fOpaciteTemp;
			this.bAugmenterOpacite = true;
		}
		else
		{
			if(!this.bAugmenterOpacite)
			{
				if(this.fOpacite - fOpaciteTemp < 0)
					this.fOpacite = 0;
				else
					this.fOpacite -= fOpaciteTemp;
			}
			else
			{
				if(this.fOpacite + fOpaciteTemp > 1)
					this.fOpacite = 1;
				else
					this.fOpacite += fOpaciteTemp;
			}
		}
		
		ctx.save(); 
		ctx.beginPath();
		ctx.strokeStyle="rgba(255,0,0,"+this.fOpacite+")";
		ctx.lineWidth=3;
		ctx.moveTo(oTrait.oPointDepart.x,oTrait.oPointDepart.y);
		ctx.lineTo(oTrait.oPointArrivee.x,oTrait.oPointArrivee.y);
		ctx.stroke();
		ctx.restore();
		
		if(this.iCompteurFaireClignoter == 0)
		{
			this.reset();
		}
	}
}


// reset du trait
Trait.prototype.reset = function()
{
	this.oPointDepart.x = 0;
	this.oPointDepart.y = 0;
	this.oPointArrivee.x = 0;
	this.oPointArrivee.y = 0;
	this.iDepartTraitDansPolygone = 0;
	this.iTraitDansPolygone = 0;
	this.iCompteurFaireClignoter = 0;
	this.fOpacite = 1;
	this.bAugmenterOpacite = false;
}
