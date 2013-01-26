function Terrain (aListePointsTemp,oTexture, fAireMinimale)  
{  
	// Points du Terrain
	this.aListePointsDepart = new Array();
	this.aListePoints = new Array();
	
	// ------------ on adapte le Terrain selon la résolution et on le centre
	
	// on centre le terrain
	var iXmin = aListePointsTemp[0].x * fRatioLargeur;
	var iXmax = aListePointsTemp[0].x * fRatioLargeur;
	var iYmin = aListePointsTemp[0].y * fRatioHauteur;
	var iYmax = aListePointsTemp[0].y * fRatioHauteur;
	
	for(var i=1; i<aListePointsTemp.length; i++)
	{
		if(aListePointsTemp[i].x * fRatioLargeur < iXmin)
			iXmin = aListePointsTemp[i].x * fRatioLargeur;
		if(aListePointsTemp[i].x * fRatioLargeur > iXmax)
			iXmax = aListePointsTemp[i].x * fRatioLargeur;
		if(aListePointsTemp[i].y * fRatioHauteur < iYmin)
			iYmin = aListePointsTemp[i].y * fRatioHauteur;
		if(aListePointsTemp[i].y * fRatioHauteur > iYmax)
			iYmax = aListePointsTemp[i].y * fRatioHauteur;
	}
	
	var iLargeurTerrain = iXmax - iXmin;
	var iHauteurTerrain = iYmax - iYmin;
	
	for(var i=0; i<aListePointsTemp.length; i++)
	{
		aListePointsTemp[i].x = aListePointsTemp[i].x*fRatioLargeur + (canvas.width-iLargeurTerrain)/2 - iXmin;
		aListePointsTemp[i].y = aListePointsTemp[i].y*fRatioHauteur + (canvas.height-iHauteurTerrain)/2 - iYmin - 15*fRatioHauteur;;
		
		this.aListePointsDepart[i] 		= new Point(aListePointsTemp[i].x, aListePointsTemp[i].y);
	}

	for(var i=0; i<aListePointsTemp.length; i++)
	{
		this.aListePoints[i] 			= new Point(aListePointsTemp[i].x, aListePointsTemp[i].y);
	}
	
	// Aire du Terrain
	this.fAireTerrainDepart 			= this.calculerAire();
	this.fAireTerrainActuel 			= this.fAireTerrainDepart;
	this.fAireMinimale 					= this.fAireTerrainDepart*fAireMinimale;
	// textures
	this.oTexture 						= oTexture;
	var img = new Image();
	img.src = 'img/textures/metal2.jpg';
	this.oTextureBords = img;
	// Points de coupe créés par le trait tracé par le joueur 
	this.aPremierCoteCoupe 				= new Array();
	this.aDeuxiemeCoteCoupe 			= new Array();
	// Partie à supprimer lors d'une coupe
	this.bDisparitionPartie 			= false;
	this.fOpacitePartie 				= 1;
	this.aPartieA_Supprimer 			= new Array();
	// Permet de trembler lorsque qu'un ennemi explose après avoir été touché
	this.bTremble 						= false;
}  

Terrain.prototype.calculerAireDepart = function()
{
	var DX  = new Array();
	var DY  = new Array();
	var A = 0;
	
	for ( var i=0; i < this.aListePointsDepart.length; i++)
	{
		DX[i] = (this.aListePointsDepart[(i+1)%this.aListePointsDepart.length].x - this.aListePointsDepart[(i+this.aListePointsDepart.length-1)%this.aListePointsDepart.length].x)/2;
		DY[i] = (this.aListePointsDepart[(i+1)%this.aListePointsDepart.length].y - this.aListePointsDepart[(i+this.aListePointsDepart.length-1)%this.aListePointsDepart.length].y)/2;
	}
	
	for ( var i=0; i < this.aListePointsDepart.length; i++)
		A = A + (this.aListePointsDepart[i].x*DY[i] - this.aListePointsDepart[i].y*DX[i]);
		
	return ( Math.abs(A/2) );
}
	
Terrain.prototype.calculerAire = function()
{
	var DX  = new Array();
	var DY  = new Array();
	var A = 0;
	
	for ( var i=0; i < this.aListePoints.length; i++)
	{
		DX[i] = (this.aListePoints[(i+1)%this.aListePoints.length].x - this.aListePoints[(i+this.aListePoints.length-1)%this.aListePoints.length].x)/2;
		DY[i] = (this.aListePoints[(i+1)%this.aListePoints.length].y - this.aListePoints[(i+this.aListePoints.length-1)%this.aListePoints.length].y)/2;
	}
	
	for ( var i=0; i < this.aListePoints.length; i++)
		A = A + (this.aListePoints[i].x*DY[i] - this.aListePoints[i].y*DX[i]);
		
	return ( Math.abs(A/2) );
}

// Méthode qui permet de couper la forme
// arg : les 2 points de coupe et la liste des ennemis
// return : true ou false si la forme n'a pas pu être coupée
Terrain.prototype.couperForme = function(oPointCoupe1Temp, oPointCoupe2Temp)
{
	var oPointCoupe1 = new Point(oPointCoupe1Temp.x, oPointCoupe1Temp.y);
	var oPointCoupe2 = new Point(oPointCoupe2Temp.x, oPointCoupe2Temp.y);
	
	var aPartie1 = new Array();
	var aPartie2 = new Array();
	this.aPartieA_Supprimer = new Array();
	
	var iFlag = 0;
	var iPartieActuelle = 1;
	
	// 0 * 1   2   3 * 4   5   6
	for(var i=0; i<this.aListePoints.length; i++)
	{
		var oPoint = new Point(this.aListePoints[i].x, this.aListePoints[i].y);
		
		if(i == this.aPremierCoteCoupe[0])
		{
			// Nous ne sommes jamais tombés sur un côté coupé
			if(iFlag == 0)
			{
				aPartie1.push(oPoint, oPointCoupe1, oPointCoupe2);
				aPartie2.push(oPointCoupe1);
				iFlag = 1;
				iPartieActuelle = 2;
			}
			else
			{
				// On boucle la partie 2
				aPartie2.push(oPoint, oPointCoupe1, oPointCoupe2);
				iPartieActuelle = 1;
			}
		}
		else if(i == this.aDeuxiemeCoteCoupe[0])
		{
			// Nous ne sommes jamais tombés sur un côté coupé
			if(iFlag == 0)
			{
				aPartie1.push(oPoint, oPointCoupe2, oPointCoupe1);
				aPartie2.push(oPointCoupe2);
				iFlag = 1;
				iPartieActuelle = 2;
			}
			else
			{
				// On boucle la partie 2
				aPartie2.push(oPoint, oPointCoupe2, oPointCoupe1);
				iPartieActuelle = 1;
			}
		}
		else
		{
			// On se trouve dans la premiere partie
			if(iPartieActuelle == 1)
			{
				aPartie1.push(oPoint);
			}
			// On se trouve dans la deuxieme partie
			else
			{
				aPartie2.push(oPoint);
			}
		}
	}
	
	// On vérifie où se trouvent les monstres afin de supprimer la partie
	var bEstDansPartie1 = false
	var bEstDansPartie2 = false;
	
	// Pour chaque ennemi, on vérifie dans quelle partie il se trouve
	for(var i=0; i<oPartie.aListeEnnemis.length; i++)
	{
		if(dansTerrain(oPartie.aListeEnnemis[i].oPosition, aPartie1) == 1)
		{
			bEstDansPartie1 = true;
		}
		else
		{
			bEstDansPartie2 = true;
		}
	}
	
	// Tous les ennemis se trouvent dans la partie 1
	if(bEstDansPartie1 && !bEstDansPartie2)
	{
		this.aListePoints = aPartie1;
		
		for(var i=0; i<aPartie2.length; i++)
			this.aPartieA_Supprimer.push(new Point(aPartie2[i].x, aPartie2[i].y));
		
		this.fAireTerrainActuel = this.calculerAire();
		this.aPremierCoteCoupe = new Array();
		this.aDeuxiemeCoteCoupe = new Array();
		this.bDisparitionPartie = true;
	}
	// Tous les ennemis se trouvent dans la partie 2
	else if(!bEstDansPartie1 && bEstDansPartie2)
	{
		this.aListePoints = aPartie2;
		
		for(var i=0; i<aPartie1.length; i++)
			this.aPartieA_Supprimer.push(new Point(aPartie1[i].x, aPartie1[i].y));
			
		this.fAireTerrainActuel = this.calculerAire();
		this.aPremierCoteCoupe = new Array();
		this.aDeuxiemeCoteCoupe = new Array();
		this.bDisparitionPartie = true;
	}
	// Des ennemis se trouvent dans les 2 parties
	else
	{
		this.aPremierCoteCoupe = new Array();
		this.aDeuxiemeCoteCoupe = new Array();
		return false;
	}
	
	return true;
}

Terrain.prototype.faireRebond = function(aListeIntersectionTerrainEnnemi, oEnnemi)
{
	var aListeNewVecteur = new Array();

	for(var i = 0; i < aListeIntersectionTerrainEnnemi.length; i++)
	{
		var A = aListeIntersectionTerrainEnnemi[i][0];
		var B = aListeIntersectionTerrainEnnemi[i][1];
		// Point d'impact
		var C = aListeIntersectionTerrainEnnemi[i][2];
	
		if(B.y - A.y != 0
			&& B.x - A.x != 0)
		{
			var mTrait = (B.y - A.y) /	(B.x - A.x);
			var vecteurNormal = new Point(-mTrait/Math.max(Math.abs(mTrait),Math.abs(1)),1/Math.max(Math.abs(mTrait),Math.abs(1)));
		}
		// si le trait est vertical
		else if(B.x - A.x == 0)
		{
			var vecteurNormal = new Point(1,0);
		}
		// si le trait est horizontal
		else
		{
			var vecteurNormal = new Point(0,1);
		}
		 
		// si le vecteur normal n'est pas orienté dans le terrain
		if(this.cn_PnPoly(new Point(C.x+vecteurNormal.x, C.y+vecteurNormal.y)) == 0)
		{
			vecteurNormal.x = -vecteurNormal.x;
			vecteurNormal.y = -vecteurNormal.y;
		}
		
		vecteurNormal.x *= 10;
		vecteurNormal.y *= 10;
		
		var centreImage = new Point(oEnnemi.oPosition.x + (oEnnemi.iTailleX/2) - oEnnemi.oDeplacement.x*1000, oEnnemi.oPosition.y + (oEnnemi.iTailleY/2) - oEnnemi.oDeplacement.y*1000);
		
		// vecteur orthogonale à vecteurNormal
		vecteurOrthoA_Normale = new Point(-vecteurNormal.y, vecteurNormal.x);
		
		// On cherche le point projeté orthogonal de l'ennemi sur le bord du terrain (AB)
		var oPoint1 = C;
		var oPoint2 = new Point(vecteurNormal.x + C.x, vecteurNormal.y + C.y);
		var oPoint3 = centreImage;
		var oPoint4 = new Point(vecteurOrthoA_Normale.x + centreImage.x, vecteurOrthoA_Normale.y + centreImage.y);
		var oPointProjete = (getIntersectionDroites(oPoint1, oPoint2, oPoint3, oPoint4))[2];
		
		// Point qui va permettre de créer le nouveau vecteur direction
		oPointNewVecteur = new Point(centreImage.x + (oPointProjete.x - centreImage.x)*2, centreImage.y + (oPointProjete.y - centreImage.y)*2)
		// nouveau vecteur de direction ajouté dans la liste
		aListeNewVecteur.push (new Point(oPointNewVecteur.x - C.x, oPointNewVecteur.y - C.y));
	}
	
	// Calcul du nouveau vecteur direction
	var v_x = 0;
	var v_y = 0;
	
	for(var i=0; i<aListeNewVecteur.length; i++)
	{
		v_x += aListeNewVecteur[i].x;
		v_y += aListeNewVecteur[i].y;
	}
	
	
	// Si le vecteur direction n'est pas dans le terrain
	if(this.cn_PnPoly(new Point(C.x + v_x/Math.max(Math.abs(v_x),Math.abs(v_y)), C.y + v_y/Math.max(Math.abs(v_x),Math.abs(v_y)))) == 0)
	{
		v_x = -v_x;
		v_y = -v_y;
	}
	
	// Changement de déplacement de l'ennemi
	var newVecteurDirection = new Point(v_x, v_y);	
	
	oEnnemi.oVecteurDirection = newVecteurDirection;
	oEnnemi.calculerDeplacement();
}

//méthode pour tracer le Terrain 
Terrain.prototype.tracer = function()  
{
	ctx.beginPath();
	
	// create pattern
	var ptrn = ctx.createPattern(this.oTexture,'repeat');
	//var ptrn2 = ctx.createPattern(this.oTextureBords,'repeat');
	ctx.fillStyle = ptrn;
	ctx.lineWidth="1";
	ctx.strokeStyle="black";
	ctx.beginPath();//On démarre un nouveau tracé
	ctx.moveTo(this.aListePoints[0].x, this.aListePoints[0].y);//On se déplace au coin inférieur gauche
	
	for(var i= 1; i < this.aListePoints.length; i++)
	{
		ctx.lineTo(this.aListePoints[i].x, this.aListePoints[i].y);
	}
	
	ctx.closePath();
	
	ctx.fill();
	ctx.stroke();
}

//méthode pour supprimer "this.aPartieA_Supprimer". Elle devient de + en + opaque
Terrain.prototype.supprimerPartie = function()  
{
	if(this.bDisparitionPartie)
	{
		if(this.fOpacitePartie - 0.04 <= 0)
		{
			this.fOpacitePartie = 0;
			this.bDisparitionPartie = false;
		}
		else
			this.fOpacitePartie -= 0.04;
				
		this.aPartieA_Supprimer[0].x += fRatioLargeur;
		this.aPartieA_Supprimer[0].y += fRatioLargeur;
		
		// Transparence
		ctx.globalAlpha = this.fOpacitePartie;
		// create pattern
		var ptrn = ctx.createPattern(this.oTexture,'repeat');
		ctx.fillStyle = ptrn;
		ctx.lineWidth="2";
		ctx.strokeStyle="black";
		ctx.beginPath();//On démarre un nouveau tracé
		ctx.moveTo(this.aPartieA_Supprimer[0].x, this.aPartieA_Supprimer[0].y);//On se déplace au coin inférieur gauche
		
		for(var i= 1; i < this.aPartieA_Supprimer.length; i++)
		{		
			this.aPartieA_Supprimer[i].x += fRatioLargeur;
			this.aPartieA_Supprimer[i].y += fRatioLargeur;
			ctx.lineTo(this.aPartieA_Supprimer[i].x, this.aPartieA_Supprimer[i].y);
		}
		
		ctx.fill();
		ctx.stroke();
		ctx.globalAlpha = 1;
		
		if(this.fOpacitePartie == 0)
		{
			this.aPartieA_Supprimer = new Array();
			this.fOpacitePartie = 1;
		}
	}
}

//méthode pour placer l'ennemi aléatoirement sur le Terrain
// arg : objet oEnnemiTemp
// return : objet oPoint (position de l'ennemi)
Terrain.prototype.placerEnnemi = function(oEnnemiTemp)
{
	var iDedans = 0;
	var oPoint = new Point();

	// on cherche le carre le + petit qui englobe la forme
	var iXmin = this.aListePointsDepart[0].x;
	var iXmax = this.aListePointsDepart[0].x;
	var iYmin = this.aListePointsDepart[0].y;
	var iYmax = this.aListePointsDepart[0].y;
	
	for(var i=1; i<this.aListePointsDepart.length; i++)
	{
		if(this.aListePointsDepart[i].x < iXmin)
			iXmin = this.aListePointsDepart[i].x;
		if(this.aListePointsDepart[i].x > iXmax)
			iXmax = this.aListePointsDepart[i].x;
		if(this.aListePointsDepart[i].y < iYmin)
			iYmin = this.aListePointsDepart[i].y;
		if(this.aListePointsDepart[i].y > iYmax)
			iYmax = this.aListePointsDepart[i].y;
	}
	
	while(iDedans == 0)
	{
		// on prend un point au hasard sur le carre
		oPoint.x = ( Math.random() * (iXmax-iXmin) ) + iXmin;
		oPoint.y = ( Math.random() * (iYmax-iYmin) ) + iYmin;
		
		// on vérifie si le point pris au hasard se trouve dans le Terrain
		// (ce point sera équivalent au coin haut gauche de l'image de l'ennemi)
		iDedans = this.cn_PnPoly(oPoint);
		
		// si oui
		if(iDedans == 1)
		{
			oEnnemiTemp.oPosition = new Point(oPoint.x, oPoint.y);
			
			// on vérifie si l'ennemi est toujours sur le terrain
			// Rappel : si ennemi touche un bord --> renvoie aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]	
			var aListeIntersectionTerrainEnnemi = this.ennemiDansTerrain(oEnnemiTemp);
			
			if(aListeIntersectionTerrainEnnemi == null)
				return oPoint;
			else
				iDedans = 0;
		}
	}
}

//méthode pour vérifier si l'ennemi est dans le terrain
// arg : objet oEnnemiTemp
// return : oIntersection (ennemi touche un bord du terrain) ou null 
Terrain.prototype.ennemiDansTerrain = function(oEnnemiTemp)
{	
	var oCoinHautGauche = new Point(oEnnemiTemp.oPosition.x, oEnnemiTemp.oPosition.y);
	var oCoinHautDroit = new Point(oEnnemiTemp.oPosition.x + oEnnemiTemp.iTailleX, oEnnemiTemp.oPosition.y);
	var oCoinBasDroit = new Point(oEnnemiTemp.oPosition.x + oEnnemiTemp.iTailleX, oEnnemiTemp.oPosition.y + oEnnemiTemp.iTailleY);
	var oCoinBasGauche = new Point(oEnnemiTemp.oPosition.x, oEnnemiTemp.oPosition.y + oEnnemiTemp.iTailleY);
	
	var aListeIntersections = new Array();
	
	// on vérifie les côtés du terrain un par un
	for(var i=0; i<this.aListePoints.length-1; i++)
	{
		// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
		var aIntersection1 = getIntersectionSegments(oCoinHautGauche, oCoinHautDroit, this.aListePoints[i], this.aListePoints[i+1]);
		var aIntersection2 = getIntersectionSegments(oCoinHautDroit, oCoinBasDroit, this.aListePoints[i], this.aListePoints[i+1]);
		var aIntersection3 = getIntersectionSegments(oCoinBasDroit, oCoinBasGauche, this.aListePoints[i], this.aListePoints[i+1]);
		var aIntersection4 = getIntersectionSegments(oCoinBasGauche, oCoinHautGauche, this.aListePoints[i], this.aListePoints[i+1]);
		
		// on vérifie si les bords de l'image touche les bords du terrain
		if(aIntersection1 != null)
		{
			aListeIntersections.push(aIntersection1);
		}
		else if(aIntersection2 != null)
		{
			aListeIntersections.push(aIntersection2);
		}
		else if(aIntersection3 != null)
		{
			aListeIntersections.push(aIntersection3);
		}
		else if(aIntersection4 != null)
		{
			aListeIntersections.push(aIntersection4);
		}
	}
	
	if(aListeIntersections.length == 0)
		return null;
	else
	{
		return aListeIntersections;
	}
}

// Méthode qui va permettre de savoir si le point donné en argument est situé dans le Terrain
Terrain.prototype.cn_PnPoly = function(P)
{
	var cn = 0;    // the crossing number counter
	var i = 0;
	
	// loop through all edges of the polygon
	for (i=0; i<this.aListePoints.length-1; i++) {    // edge from V[i] to V[i+1]
	   if (((this.aListePoints[i].y <= P.y) && (this.aListePoints[i+1].y > P.y))    // an upward crossing
		|| ((this.aListePoints[i].y > P.y) && (this.aListePoints[i+1].y <= P.y))) { // a downward crossing
			// compute the actual edge-ray intersect x-coordinate
			var vt = (P.y - this.aListePoints[i].y) / (this.aListePoints[i+1].y - this.aListePoints[i].y);
			if (P.x < this.aListePoints[i].x + vt * (this.aListePoints[i+1].x - this.aListePoints[i].x)) // P.x < intersect
				cn++;   // a valid crossing of y=P.y right of P.x
		}
	}
	return (cn&1);    // 0 if even (out), and 1 if odd (in)
}  

// Méthode de reset
Terrain.prototype.reset = function()
{
	this.aListePoints = new Array();
	for(var i=0; i<this.aListePointsDepart.length; i++)
		this.aListePoints[i] = new Point(this.aListePointsDepart[i].x , this.aListePointsDepart[i].y);
	this.fAireTerrainDepart = this.calculerAire();
	this.fAireTerrainActuel = this.calculerAire();
	this.aPremierCoteCoupe = new Array();
	this.aDeuxiemeCoteCoupe = new Array();
	this.bDisparitionPartie = false;
	this.aPartie1 = new Array();
	this.aPartie2 = new Array();
}
