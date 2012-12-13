// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables
====================================================================================================================================================*/
						
// sons
var oSonMetal = new Audio('sons/metalhit.wav');
var oSonSouffleExplosion = new Audio('sons/souffleExplosion2.wav');
var oSonExplosion = new Audio('sons/bomb.wav');
var oSonEnnemiTouche = new Audio('sons/ennemiTouche.wav');
var oSonCoupe = new Audio('sons/swordCut.wav');
			
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 400;
document.body.appendChild(canvas);
var fOpaciteGlobale = 0;
var fGrandeurCercle = 0;
var bAugmenterOpacite = true;

// Retourne un nombre aléatoire entre la plage de valeur :  [minVal,maxVal]
var randomRange = function(minVal,maxVal) {
	return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
}

//Initialise la position des étoiles
var initStars = function() {
	for( var i = 0; i < stars.length; i++ ) {
		stars[i] = {
          x: randomRange(-25,25),
          y: randomRange(-25,25),
          z: randomRange(1,MAX_DEPTH)
        }
	}
}

// Background image
MAX_DEPTH = 32;
var stars = new Array(512);
initStars();

// Handle keyboard controls
var keysDown = {};

// Segment tracé avec la souris
var oTrait = new Trait();
var mouseDown = false;
var mouseMove = false;

//points
var aListePointsTemp = new Array();

aListePointsTemp.push(new Point(50,50));
aListePointsTemp.push(new Point(250,50));
aListePointsTemp.push(new Point(180,175));
// aListePointsTemp.push(new Point(250,300));
// aListePointsTemp.push(new Point(50,300));
aListePointsTemp.push(new Point(120,175));
aListePointsTemp.push(new Point(50,50));

// aListePointsTemp.push(new Point(0,300));
// aListePointsTemp.push(new Point(150,0));
// aListePointsTemp.push(new Point(300,300));
// aListePointsTemp.push(new Point(150,150));
// aListePointsTemp.push(new Point(150,300));
// aListePointsTemp.push(new Point(75,200));
// aListePointsTemp.push(new Point(0,300));

// nombres d'image
var iNombresImages = 0;
// Compteur d'images chargée
var iCompteurImages = 0;

//polygone
var img = new Image();
img.src = 'img/textures/metal2.jpg';
iNombresImages++;
var oPolygone = new Polygone(aListePointsTemp,img);
img.onload = function()
{
	iCompteurImages++;
}

// test
var oCibleImage = new Image();
oCibleImage.src = 'img/cible_ok.png';
iNombresImages++;
oCibleImage.onload = function()
{
	iCompteurImages++;
}

// Ennemis
var aListeEnnemis = new Array();

// Ennemi 1
var oEnnemiImage = new Image();
oEnnemiImage.src = "img/ennemis/fireball2.png";
iNombresImages++;
oEnnemiImage.onload = function()
{
	iCompteurImages++;
	var oEnnemi = new Ennemi(oEnnemiImage, 1, new Point(0,0), 0.1);
	// On place l'ennemi sur le terrain (le polygone)
	// on récupére les coordonnées
	var oPositionEnnemi = oPolygone.placerEnnemi(oEnnemi);
	oEnnemi.oPosition = oPositionEnnemi;
	// on calcule le déplacement de l'ennemi
	oEnnemi.calculerDeplacement();

	aListeEnnemis.push(oEnnemi);
}

// Ennemi 2
var oEnnemiImage2 = new Image();
oEnnemiImage2.src = "img/ennemis/fireball2.png";
iNombresImages++;
oEnnemiImage2.onload = function()
{
	iCompteurImages++;
	var oEnnemi2 = new Ennemi(oEnnemiImage2, 2, new Point(0,0), 0.2);
	// On place l'ennemi sur le terrain (le polygone)
	// on récupére les coordonnées
	var oPositionEnnemi2 = oPolygone.placerEnnemi(oEnnemi2);
	oEnnemi2.oPosition = oPositionEnnemi2;
	// on calcule le déplacement de l'ennemi
	oEnnemi2.calculerDeplacement();

	aListeEnnemis.push(oEnnemi2);
}

//barre d'avancement
var oBarreAvancement = new Barre(new Point(20,370), new Point(270,370), 15, "blue", "rgb(126,133,188)");


/*** ================================================================================================================================================
Evénements souris
====================================================================================================================================================*/

addEventListener("mousedown", function (e) 
{
	// Si le trait ne doit pas clignoter
	if(oTrait.iCompteurFaireClignoter == 0)
	{
		mouseDown = true;
		oTrait.oPointDepart.x = e.clientX
		oTrait.oPointDepart.y = e.clientY
		
		if(oPolygone.cn_PnPoly(oTrait.oPointDepart) == 1)
		{
			oTrait.iDepartTraitDansPolygone = 1;	
			oTrait.oPointDepart.x = 0;
			oTrait.oPointDepart.y = 0;
		}
	}
}, false);

addEventListener("mouseup", function (e) 
{
	// Si le trait ne doit pas clignoter
	if(oTrait.iCompteurFaireClignoter == 0)
	{
		mouseDown = false;
		mouseMove = false;
		oTrait.reset();
	}
}, false);

var aPartiesCoupees = null;

addEventListener("mousemove", function (e) 
{
	// Si le trait ne doit pas clignoter
	if(oTrait.iCompteurFaireClignoter == 0)
	{
		if(mouseDown)
		{				
			mouseMove = true;
			oTrait.oPointArrivee.x = e.clientX;
			oTrait.oPointArrivee.y = e.clientY;
		}
	}
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	
	for(var i=0; i<aListeEnnemis.length; i++)
	{
		aListeEnnemis[i].reset();
	}
	
	mouseDown = false;
	mouseMove = false;
	oTrait.reset();
	oPolygone.reset();
};


/*** ================================================================================================================================================
finirNiveau
====================================================================================================================================================*/

// fin du niveau
var finirNiveau = function () {
	
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var halfWidth  = canvas.width / 2;
    var halfHeight = canvas.height / 2;
 
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for( var i = 0; i < stars.length; i++ ) 
	{
		stars[i].z -= 0.2;
 
        if( stars[i].z <= 0 ) 
		{
			stars[i].x = randomRange(-25,25);
			stars[i].y = randomRange(-25,25);
			stars[i].z = MAX_DEPTH;
        }
 
        var k  = 128.0 / stars[i].z;
        var px = stars[i].x * k + halfWidth;
        var py = stars[i].y * k + halfHeight;
 
        if( px >= 0 && px <= 500 && py >= 0 && py <= 400 ) 
		{
			var size = (1 - stars[i].z / 32.0) * 5;
			var shade = parseInt((1 - stars[i].z / 32.0) * 255);
			
			ctx.beginPath();
			//ctx.rect(px,py,size,size);
			ctx.arc(px,py, size/2, 0, 2 * Math.PI);
			ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
			ctx.fill();
		}
	}
	
	oPolygone.tracer();
	
	// Texte aire
	ctx.font = "20pt Calibri,Geneva,Arial";
	ctx.fillStyle = "white";
	ctx.fillText(Math.floor((oPolygone.fAireTerrainActuel/oPolygone.fAireTerrainDepart)*100)+" %", 20, 350);
	
	// on trace la barre d'avancement
	oBarreAvancement.tracer(oPolygone);
	
	// Deplacement des ennemis, rebonds	
	for(var i=0; i<aListeEnnemis.length; i++)
	{
		ctx.drawImage(aListeEnnemis[i].oImage, 0 , 0);
	}
	
};


/*** ================================================================================================================================================
Partie
====================================================================================================================================================*/

var partie = function () {

	// on crée le canvas
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	
	// On crée les étoiles
	var halfWidth  = canvas.width / 2;
    var halfHeight = canvas.height / 2;

    for( var i = 0; i < stars.length; i++ ) 
	{
		stars[i].z -= 0.2;
 
        if( stars[i].z <= 0 ) 
		{
			stars[i].x = randomRange(-25,25);
			stars[i].y = randomRange(-25,25);
			stars[i].z = MAX_DEPTH;
        }
 
        var k  = 128.0 / stars[i].z;
        var px = stars[i].x * k + halfWidth;
        var py = stars[i].y * k + halfHeight;
 
        if( px >= 0 && px <= 500 && py >= 0 && py <= 400 ) 
		{
			var size = (1 - stars[i].z / 32.0) * 5;
			var shade = parseInt((1 - stars[i].z / 32.0) * 255);
			
			ctx.beginPath();
			//ctx.rect(px,py,size,size);
			ctx.arc(px,py, size/2, 0, 2 * Math.PI);
			ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
			ctx.fill();
		}
	}
	
	// on trace le polygone
	oPolygone.tracer();
	
	ctx.drawImage(oCibleImage, 0, 0, 50, 50);
	
	/*
	if(aPartiesCoupees != null)
	{
		ctx.beginPath();
	
		// create pattern
		ctx.lineWidth="2";
		ctx.strokeStyle="red";
		ctx.beginPath();//On démarre un nouveau tracé
		ctx.moveTo(aPartiesCoupees[0][0].x, aPartiesCoupees[0][0].y);//On se déplace au coin inférieur gauche
		
		for(var i= 1; i < aPartiesCoupees[0].length; i++)
		{
			ctx.lineTo(aPartiesCoupees[0][i].x, aPartiesCoupees[0][i].y);
		}
		
		ctx.stroke();
		
		ctx.beginPath();
	
		// create pattern
		ctx.lineWidth="2";
		ctx.strokeStyle="green";
		ctx.beginPath();//On démarre un nouveau tracé
		ctx.moveTo(aPartiesCoupees[1][0].x, aPartiesCoupees[1][0].y);//On se déplace au coin inférieur gauche
		
		for(var i= 1; i < aPartiesCoupees[1].length; i++)
		{
			ctx.lineTo(aPartiesCoupees[1][i].x, aPartiesCoupees[1][i].y);
		}
		
		ctx.stroke();
	}
	*/
	
	// Texte aire
	ctx.font = "20pt Calibri,Geneva,Arial";
	ctx.fillStyle = "white";
	ctx.fillText(Math.floor((oPolygone.fAireTerrainActuel/oPolygone.fAireTerrainDepart)*100)+" %", 20, 350);
	
	// on trace la barre d'avancement
	oBarreAvancement.tracer(oPolygone);
	
	// Deplacement des ennemis, rebonds	
	for(var i=0; i<aListeEnnemis.length; i++)
	{	
		aListeEnnemis[i].oPosition.x += aListeEnnemis[i].oDeplacement.x;
		aListeEnnemis[i].oPosition.y += aListeEnnemis[i].oDeplacement.y;
	
		ctx.save(); 
		ctx.translate(aListeEnnemis[i].oPosition.x, aListeEnnemis[i].oPosition.y); 
		ctx.translate(aListeEnnemis[i].iTailleX/2, aListeEnnemis[i].iTailleY/2); 
		ctx.rotate(aListeEnnemis[i].fRotationActuelle);
		ctx.drawImage(aListeEnnemis[i].oImage, -aListeEnnemis[i].iTailleX/2, -aListeEnnemis[i].iTailleY/2);
		ctx.restore();
		
		aListeEnnemis[i].fRotationActuelle = (aListeEnnemis[i].fRotationActuelle + aListeEnnemis[i].fRotation);
		
		// on vérifie si l'ennemi est toujours sur le terrain
		// Rappel : si ennemiDansTerrain --> renvoie aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]	
		var aListeIntersectionTerrainEnnemi = oPolygone.ennemiDansTerrain(aListeEnnemis[i]);

		if(aListeIntersectionTerrainEnnemi != null)
		{
			// rebond
			oPolygone.faireRebond(aListeIntersectionTerrainEnnemi, aListeEnnemis[i]);
			oSonMetal.pause();
			oSonMetal = new Audio('sons/metalhit.wav');
			oSonMetal.volume = 0.05;
			oSonMetal.play();
		}
	}
	
	/********** ==================================================================== **********/
	/********* Traçage du trait + coupe de la forme + on vérifie si on coupe un ennemi ********/
	/********** ==================================================================== **********/
	
	// Trait ne doit pas clignoter 
	// Il y a un down et un move de la souris
	// Pas de partie coupée
	// Le trait n'a pas touché d'ennemi
	if(mouseDown && mouseMove && oTrait.iCompteurFaireClignoter == 0 && !oPolygone.bDisparitionPartie && !oTrait.bToucheEnnemi)
	{	
		
		// si l'arrivée du trait tracé se trouve à l'intérieur du polygone et que le traverse bien le terrain
		// en effet, le point d'arrivé peut se trouver dans le terrain alors que le trait traverse du vide
		//
		//					_________							  _________
		//					|		|							  |		  |
		//	Début du trait ------->	o-----------------------------|---o	<------ Fin du trait
		//					|		|_____________________________|		  |
		//					|											  |
		//					|_____________________________________________|
		//
		
		oVecteurDirecteurTrait = new Point( (oTrait.oPointArrivee.x - oTrait.oPointDepart.x) / (oTrait.oPointArrivee.x - oTrait.oPointDepart.x), 
										    (oTrait.oPointArrivee.y - oTrait.oPointDepart.y) / (oTrait.oPointArrivee.x - oTrait.oPointDepart.x) );
		oPointArriveeVecteur = new Point( oVecteurDirecteurTrait.x + oTrait.oPointDepart.x, 
										  oVecteurDirecteurTrait.y + oTrait.oPointDepart.y );
			
		// si le début du trait tracé se trouve à l'exterieur du polygone
		if(oTrait.iDepartTraitDansPolygone == 0)
		{
			// si l'arrivée du trait tracé se trouve à l'intérieur du polygone
			if(oPolygone.cn_PnPoly(oTrait.oPointArrivee) == 1)
			{	
				if(oTrait.iTraitDansPolygone == 0)
				{
					var iIntersection = 0;
					
					for(var i=0; i<oPolygone.aListePoints.length-1; i++)
					{
						// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
						var aIntersection = getIntersectionSegments(oTrait.oPointDepart, oTrait.oPointArrivee, oPolygone.aListePoints[i], oPolygone.aListePoints[i+1], true);
						
						if(aIntersection != null)
						{
							iIntersection++;

							if(iIntersection == 2)
								break;
								
							// on défini le point de départ du trait dans le polygone
							oTrait.oPointDepart.x = aIntersection[2].x;
							oTrait.oPointDepart.y = aIntersection[2].y;
							
							oPolygone.aPremierCoteCoupe.push(i,i+1);
						}
					}
					oTrait.iTraitDansPolygone = 1;
				}
				
				oTrait.tracer();
				
				// on vérifie si le trait touche un ennemi
				for(var i=0; i<aListeEnnemis.length; i++)
				{
					// on définit les coins de l'image "ennemi"
					var oCoinHautGauche = new Point(aListeEnnemis[i].oPosition.x, aListeEnnemis[i].oPosition.y);
					var oCoinHautDroit = new Point(aListeEnnemis[i].oPosition.x + aListeEnnemis[i].iTailleX, aListeEnnemis[i].oPosition.y);
					var oCoinBasDroit = new Point(aListeEnnemis[i].oPosition.x + aListeEnnemis[i].iTailleX, aListeEnnemis[i].oPosition.y + aListeEnnemis[i].iTailleY);
					var oCoinBasGauche = new Point(aListeEnnemis[i].oPosition.x, aListeEnnemis[i].oPosition.y + aListeEnnemis[i].iTailleY);
					
					// on vérifie si les bords de l'image touche le trait tracé avec la souris
					if(oTrait.verifierCoupeSegment(oCoinHautGauche, oCoinHautDroit) || oTrait.verifierCoupeSegment(oCoinHautDroit, oCoinBasDroit)
						|| oTrait.verifierCoupeSegment(oCoinBasDroit, oCoinBasGauche) || oTrait.verifierCoupeSegment(oCoinBasGauche, oCoinHautGauche))
					{
						oSonEnnemiTouche.volume = 0.3;
						oSonEnnemiTouche.play();
						oTrait.iEnnemiTouche = i;
						oTrait.bToucheEnnemi = true;
					}
				}
				
			}
			
			// si le trait sort du polygone
			if(oPolygone.cn_PnPoly(oTrait.oPointArrivee) == 0 && oTrait.iTraitDansPolygone == 1 && oTrait.bToucheEnnemi == false 
				/*&& oPolygone.cn_PnPoly(oPointArriveeVecteur) == 1*/)
			{	
				for(var i=0; i<oPolygone.aListePoints.length-1; i++)
				{
					// Si le côté ne correspond pas au premier côté coupé
					if(i != oPolygone.aPremierCoteCoupe[0])
					{
						// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
						var aIntersection = getIntersectionSegments(oTrait.oPointDepart, oTrait.oPointArrivee, oPolygone.aListePoints[i], oPolygone.aListePoints[i+1], true);
						
						if(aIntersection != null)
						{
							// on défini le point de départ du trait dans le polygone
							oTrait.oPointArrivee.x = aIntersection[2].x;
							oTrait.oPointArrivee.y = aIntersection[2].y;
							oPolygone.aDeuxiemeCoteCoupe.push(i,i+1);
							
							var bCoupe = oPolygone.couperForme(oTrait.oPointDepart, oTrait.oPointArrivee, aListeEnnemis);
							
							// si coupe impossible, on décide de mettre le compteur de clignotement à 4
							if(!bCoupe)
							{
								oTrait.iCompteurFaireClignoter = 4;
								mouseDown = false;
								mouseMove = false;
							}
							else
							{
								mouseDown = false;
								mouseMove = false;
								oSonCoupe.pause();
								oSonCoupe = new Audio('sons/swordCut.wav');
								oSonCoupe.volume = 0.3;
								oSonCoupe.play();
								oTrait.reset();
							}
	
							break;
						}
					}
				}
			}
		}
	}	
	// Clignotement du trait si mauvaise coupe
	else if(oTrait.iCompteurFaireClignoter != 0)
	{
		oTrait.clignoter();
	}
	// Disparition d'une partie lors d'une coupe
	else if(oPolygone.bDisparitionPartie)
	{
		oPolygone.supprimerPartie();
	}
	// Trait a touché un ennemi
	else if(oTrait.bToucheEnnemi)
	{
		oTrait.disparaitre();
	
		// si les ennemis ne sont pas à l'arrêt, on ralenti les ennemis
		if(aListeEnnemis[0].fVitesse != 0 && bAugmenterOpacite)
		{
			for(var i=0; i<aListeEnnemis.length; i++)
			{
				aListeEnnemis[i].ralentir();
				
				if(i == oTrait.iEnnemiTouche)
					oTrait.oPositionEnnemiTouche = new Point( (aListeEnnemis[i].oPosition.x+aListeEnnemis[i].oPosition.x+aListeEnnemis[i].iTailleX)/2,
															  (aListeEnnemis[i].oPosition.y+aListeEnnemis[i].oPosition.y+aListeEnnemis[i].iTailleY)/2);
			}
		}
		// on fait apparaître et disparaître un fond blanc et on réinitialise le jeu
		else
		{
			var fPasOpacite = 0.004;
			
			// Première explosion (cercle grandit doucement)
			if(bAugmenterOpacite)
			{	
				// Premiere fois qu'on dessine le cercle, bruit du souffle explosion
				if(fGrandeurCercle == 0)
				{
					oSonSouffleExplosion = new Audio('sons/souffleExplosion2.wav');
					oSonSouffleExplosion.volume = 0.5;
					oSonSouffleExplosion.play();
				}
				
				if(fOpaciteGlobale + fPasOpacite >= 0.2)
				{
					fOpaciteGlobale = 1;
					fGrandeurCercle = 0.05;
					bAugmenterOpacite = false;
					reset();
				}
				else
				{
					// Transparence
					fOpaciteGlobale += fPasOpacite;
					fGrandeurCercle += fPasOpacite;
				}
				
				var iCouleur1 = Math.floor(244-10*fGrandeurCercle);
				var iCouleur2 = Math.floor(239-50*fGrandeurCercle);
				var iCouleur3 = Math.floor(221-110*fGrandeurCercle);
				
				ctx.beginPath();
				ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, 200*fGrandeurCercle, 0, 2 * Math.PI);
				ctx.fill();
			
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(254,230,157)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle), 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(251,215,109)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle)+4, 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(248,200,61)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle)+8, 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(248,150,10)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle)+8, 0, 2 * Math.PI);
				ctx.stroke();
			}
			
			// Deuxieme explosion (cercle grandit vite, devient opaque et lumière blanche en fond)
			if(!bAugmenterOpacite)
			{
				fPasOpacite = 0.04;
				
				
				// Premiere fois qu'on dessine le 2eme cercle, bruit de l'explosion
				if(fGrandeurCercle == 0.05)
				{
					oSonSouffleExplosion.pause();
					oSonExplosion = new Audio('sons/bomb.wav');
					oSonExplosion.volume = 1;
					oSonExplosion.play();
				}
				
				if(fOpaciteGlobale - fPasOpacite <= 0)
				{
					fOpaciteGlobale = 0;
					fGrandeurCercle = 0;
					oTrait.bToucheEnnemi = false;
					bAugmenterOpacite = true;
				}
				else
				{
					// Transparence
					fOpaciteGlobale -= fPasOpacite;
				}

				if(fGrandeurCercle != 0)
				{
					ctx.globalAlpha = fOpaciteGlobale;
					fGrandeurCercle += fPasOpacite;
					
					var iCouleur1 = Math.floor(244-10);
					var iCouleur2 = Math.floor(239-50);
					var iCouleur3 = Math.floor(221-110);
					
					ctx.beginPath();
					ctx.fillStyle = 'rgb(255, 255, 255)';
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					
					ctx.beginPath();
					ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle), 0, 2 * Math.PI);
					ctx.fill();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(254,230,157)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle), 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(251,215,109)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle)+4, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,200,61)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle)+8, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,150,10)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fGrandeurCercle)+8, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.globalAlpha = 1;
				}
			}
		}
		oTrait.clignoter();
	}
};

/*** ================================================================================================================================================
Main
====================================================================================================================================================*/

var main = function () {

	var now = Date.now();
	var delta = now - then;
	
	if(iCompteurImages == iNombresImages)
	{
		partie();
	}
	
	then = now;
	requestAnimationFrame(main);
};

// On lance le jeu
var then = Date.now();
main();
