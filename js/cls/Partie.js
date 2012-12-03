function Partie()
{  
	// Setup requestAnimationFrame
	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	// sons
	var audioElement = new Audio('sons/metalhit.wav');
				
	// Create the canvas
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 300;
	canvas.height = 400;
	document.body.appendChild(canvas);

	// Background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};

	bgImage.src = "img/textures/space2.jpg";

	// Handle keyboard controls
	var keysDown = {};

	// Segment tracé avec la souris
	var oTrait = new Trait();
	var mouseDown = false;
	var mouseMove = false;
	var iDepartTraitDansPolygone = 0;
	var iArriveeTraitDansPolygone = 0;

	//points
	var aListePointsTemp = new Array();
	aListePointsTemp.push(new Point(0,300));
	aListePointsTemp.push(new Point(150,0));
	aListePointsTemp.push(new Point(300,300));
	aListePointsTemp.push(new Point(150,150));
	aListePointsTemp.push(new Point(150,300));
	aListePointsTemp.push(new Point(75,200));
	aListePointsTemp.push(new Point(0,300));

	//polygone
	// create new image object to use as pattern
	var img = new Image();
	img.src = 'img/textures/metal2.jpg';
	var oPolygone = new Polygone(aListePointsTemp,img);

	// Ennemis
	var aEnnemis = new Array();

	var oEnnemiImage = new Image();
	oEnnemiImage.src = "img/ennemis/fireball2.png";
	var oPositionEnnemi = new Point(0,0);
	var oEnnemi = new Ennemi(oEnnemiImage, 3, oPositionEnnemi);
	// On place l'ennemi sur le terrain (le polygone)
	// on récupére les coordonnées
	var oPositionEnnemi = oPolygone.placerEnnemi(oEnnemi);
	oEnnemi.oPosition = oPositionEnnemi;
	// on calcule le déplacement de l'ennemi
	oEnnemi.calculerDeplacement();
	// rotation des ennemis
	oEnnemi.fRotation = 0.3;

	var oEnnemiImage = new Image();
	oEnnemiImage.src = "img/ennemis/fireball2.png";
	var oPositionEnnemi = new Point(0,0);
	var oEnnemi2 = new Ennemi(oEnnemiImage, 3, oPositionEnnemi);
	// On place l'ennemi sur le terrain (le polygone)
	// on récupére les coordonnées
	var oPositionEnnemi = oPolygone.placerEnnemi(oEnnemi2);
	oEnnemi2.oPosition = oPositionEnnemi;
	// on calcule le déplacement de l'ennemi
	oEnnemi2.calculerDeplacement();
	// Variable pour la rotation des ennemis
	oEnnemi.fRotation = 0.3;
	
	aEnnemis.push(oEnnemi, oEnnemi2);
}

// Méthode qui permet de savoir si le segment que forme les points oPoint1 et oPoint2 touchent ou non le trait
// return : true (trait coupe segment) ou false
Partie.prototype.verifierCoupeSegment = function(oPoint1Temp, oPoint2Temp)
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

// reset du trait
Partie.prototype.reset = function()
{
}