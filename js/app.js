// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables
====================================================================================================================================================*/

// Pour savoir si le joueur a gagné
var GAGNE = false;

// sons
var oSonMetal = new Audio('sons/metalhit.wav');
var oSonSouffleExplosion = new Audio('sons/souffleExplosion2.wav');
var oSonExplosion = new Audio('sons/bomb.wav');
var oSonEnnemiTouche = new Audio('sons/ennemiTouche.wav');
var oSonCoupe = new Audio('sons/swordCut.wav');
var oSonStars = new Audio('sons/brake.wav');
			
// Création du canvas
var canvas = document.createElement("canvas");
canvas.id = "partie";
var ctx = canvas.getContext("2d");
canvas.width = 300*1.5;
canvas.height = 400*1.5;
document.body.appendChild(canvas);
var fRatioLargeur = canvas.width / 300;
var fRatioHauteur = canvas.height / 400;
var fOpaciteGlobale = 0;
var fGrandeurCercle = 0;
var bAugmenterOpacite = true;
// Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
// et lancement des fonctions.
canvas.addEventListener('mousemove', mousemovement, false);
canvas.addEventListener('mousedown', mouseclick, false);
canvas.addEventListener('mouseup', mouseunclick, false);

// Retourne un nombre aléatoire entre la plage de valeur :  [minVal,maxVal]
var randomRange = function(minVal,maxVal) {
	return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
}

//Initialise la position des étoiles
var initStars = function()
{
	for( var i = 0; i < stars.length; i++ ) 
	{
		stars[i] = 
		{
			x: randomRange(-25,25),
			y: randomRange(-25,25),
			z: randomRange(1,MAX_DEPTH)
        }
	}
}

var ajouterStars = function()
{
	stars[stars.length] = 
		{
			x: randomRange(-25,25),
			y: randomRange(-25,25),
			z: randomRange(1,MAX_DEPTH)
        }
}

// Background image
var MAX_DEPTH = 32;
var SPEED_STARS = 0.2;
var SIZE_STARS = 5*((fRatioLargeur+fRatioHauteur)/2);
var stars = new Array(100);
var fTailleGrosseEtoile = 0;
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
aListePointsTemp.push(new Point(250,300));
aListePointsTemp.push(new Point(50,300));
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
var oPolygone = new Polygone(aListePointsTemp,img, 0.6);
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

// Reset the game when the player catches a monster
var reset = function () {
	
	for(var i=0; i<aListeEnnemis.length; i++)
	{
		aListeEnnemis[i].reset();
	}
	
	mouseDown = false;
	mouseMove = false;
	fTailleGrosseEtoile = 0;
	fOpaciteGlobale = 0;
	oTrait.reset();
	oPolygone.reset();
};


/*** ================================================================================================================================================
finirNiveau
====================================================================================================================================================*/

// fin du niveau
var finirNiveau = function () 
{
	
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
		stars[i].z -= SPEED_STARS;
 
        if( stars[i].z <= 0 ) 
		{
			stars[i].x = randomRange(-25,25);
			stars[i].y = randomRange(-25,25);
			stars[i].z = MAX_DEPTH;
        }
 
        var k  = 128.0 / stars[i].z;
        var px = stars[i].x * k + halfWidth;
        var py = stars[i].y * k + halfHeight;
 
        if( px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height ) 
		{
			var size = (1 - stars[i].z / 32.0) * SIZE_STARS;
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
	
	// ctx.drawImage(oCibleImage, 0, 0, 50, 50);
	
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
	
	// on trace la barre d'avancement
	oBarreAvancement.tracer(oPolygone);
	
	// si l'aire minimale à été atteinte
	if(!GAGNE && oPolygone.fAireTerrainActuel < oPolygone.fAireMinimale)
	{
		GAGNE = true;
	}
	
	// Deplacement des ennemis, rebonds	
	for(var i=0; i<aListeEnnemis.length; i++)
	{	
		aListeEnnemis[i].oPosition.x += aListeEnnemis[i].oDeplacement.x;
		aListeEnnemis[i].oPosition.y += aListeEnnemis[i].oDeplacement.y;
	
		ctx.save(); 
		ctx.translate(aListeEnnemis[i].oPosition.x, aListeEnnemis[i].oPosition.y); 
		ctx.translate(aListeEnnemis[i].iTailleX/2, aListeEnnemis[i].iTailleY/2); 
		ctx.rotate(aListeEnnemis[i].fRotationActuelle);
		ctx.drawImage(aListeEnnemis[i].oImage, -aListeEnnemis[i].iTailleX/2, -aListeEnnemis[i].iTailleY/2, aListeEnnemis[i].iTailleX, aListeEnnemis[i].iTailleX);
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
	
	/*
	--------------------------------------------------------------------------------------------------
	** ----------------------------------------------------------------------- ***********************
	** Autres actions que le déroulement de la partie :
	** - Partie gagnée
	** - Mauvaise coupe (coupe entre 2 ennemis)
	** - Coupe d'une partie
	** - Trait a touché un ennemi
	** ----------------------------------------------------------------------- ***********************
	--------------------------------------------------------------------------------------------------
	*/
	
	// Si le joueur a gagné
	if(GAGNE)
	{
		oPolygone.supprimerPartie();
		
		// on augmente la taille de l'étoiles, leur vitesse et leur nombre
		if(SIZE_STARS < 8*((fRatioLargeur+fRatioHauteur)/2))
			SIZE_STARS +=0.03;
		if(SPEED_STARS < 0.8)
			SPEED_STARS += 0.02;
		if(stars.length < 400)
		{
			ajouterStars();
			ajouterStars();
			ajouterStars();
		}
		
		/*
		if(SIZE_STARS > 6*((fRatioLargeur+fRatioHauteur)/2))
		{
			if(fTailleGrosseEtoile >= 120*fRatioLargeur)
			{
				fTailleGrosseEtoile += 2*fRatioLargeur;
			}
			else
			{
				fTailleGrosseEtoile += 5*fRatioLargeur;
			}
			
			fOpaciteGlobale += 0.05;
			
			ctx.beginPath();
			//ctx.rect(px,py,size,size);
			ctx.arc(canvas.width/2, canvas.height/2, fTailleGrosseEtoile, 0, 2 * Math.PI);
			ctx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 255 + ","+fOpaciteGlobale+")";
			ctx.fill();
		}
		*/
		
		// si les ennemis ne sont pas à l'arrêt, on ralenti les ennemis
		if(aListeEnnemis[0].fVitesse != 0)
		{
			for(var i=0; i<aListeEnnemis.length; i++)
			{
				aListeEnnemis[i].ralentir();
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
		// on fait apparaître une explosion sur l'ennemi touché et on réinitialise le jeu
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
				
				// Fin du premier cercle
				if(fOpaciteGlobale + fPasOpacite >= 0.2)
				{
					fOpaciteGlobale = 1;
					fGrandeurCercle = 0.05*fRatioLargeur;
					bAugmenterOpacite = false;
					
					// on reset le polygone et les ennemis
					for(var i=0; i<aListeEnnemis.length; i++)
					{
						aListeEnnemis[i].reset();
					}
					oPolygone.reset();
					mouseDown = false;
					mouseMove = false;
				}
				else
				{
					// Transparence
					fOpaciteGlobale += fPasOpacite;
					fGrandeurCercle += fPasOpacite*fRatioLargeur;
				}
				
				var iCouleur1 = Math.floor(244-10*(fGrandeurCercle/fRatioLargeur));
				var iCouleur2 = Math.floor(239-50*(fGrandeurCercle/fRatioLargeur));
				var iCouleur3 = Math.floor(221-110*(fGrandeurCercle/fRatioLargeur));
				
				ctx.beginPath();
				ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, 200*fRatioLargeur*fGrandeurCercle, 0, 2 * Math.PI);
				ctx.fill();
			
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(254,230,157)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle), 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(251,215,109)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle)+4, 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(248,200,61)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle)+8, 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(248,150,10)";
				ctx.arc(oTrait.oPositionEnnemiTouche.x, 
						oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle)+8, 0, 2 * Math.PI);
				ctx.stroke();
			}
			
			// Deuxieme explosion (cercle grandit vite, devient opaque et lumière blanche en fond)
			if(!bAugmenterOpacite)
			{
				fPasOpacite = 0.04;
				
				
				// Premiere fois qu'on dessine le 2eme cercle, bruit de l'explosion
				if(fGrandeurCercle == 0.05*fRatioLargeur)
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
					bAugmenterOpacite = true;
					oTrait.reset();
				}
				else
				{
					// Transparence
					fOpaciteGlobale -= fPasOpacite;
				}

				if(fGrandeurCercle != 0)
				{
					ctx.globalAlpha = fOpaciteGlobale;
					fGrandeurCercle += fPasOpacite*fRatioLargeur;
					
					var iCouleur1 = Math.floor(244-10);
					var iCouleur2 = Math.floor(239-50);
					var iCouleur3 = Math.floor(221-110);
					
					ctx.beginPath();
					ctx.fillStyle = 'rgb(255, 255, 255)';
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					
					ctx.beginPath();
					ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle), 0, 2 * Math.PI);
					ctx.fill();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(254,230,157)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle), 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(251,215,109)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle)+4, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,200,61)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle)+8, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,150,10)";
					ctx.arc(oTrait.oPositionEnnemiTouche.x, 
							oTrait.oPositionEnnemiTouche.y, (200*fRatioLargeur*fGrandeurCercle)+8, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.globalAlpha = 1;
				}
			}
		}
	}
	
	
	/*
	--------------------------------------------------------------------------------------------------
	** ----------------------------------------------------------------------- ***********************
	** Traçage du trait + coupe de la forme + on vérifie si on coupe un ennemi
	** ----------------------------------------------------------------------- ***********************
	--------------------------------------------------------------------------------------------------
	*/
	
	// Trait ne doit pas clignoter 
	// Il y a un down et un move de la souris
	// Pas de partie coupée
	// Le trait n'a pas touché d'ennemi
	// Partie n'a pas été gagnée
	else
	{	
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
			if(oPolygone.cn_PnPoly(oTrait.oPointArrivee) == 0 && oTrait.iTraitDansPolygone == 1 && oTrait.bToucheEnnemi == false)
			{	
				var iIntersection = 0;
				var bCoupe = false;
				
				for(var i=0; i<oPolygone.aListePoints.length-1; i++)
				{
					// Si le côté ne correspond pas au premier côté coupé
					if(i != oPolygone.aPremierCoteCoupe[0])
					{
						// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
						var aIntersection = getIntersectionSegments(oTrait.oPointDepart, oTrait.oPointArrivee, oPolygone.aListePoints[i], oPolygone.aListePoints[i+1], true);
						
						if(aIntersection != null)
						{
							
							iIntersection++;
							
							// on défini le point d'arrivée du trait dans le polygone
							oTrait.oPointArrivee.x = aIntersection[2].x;
							oTrait.oPointArrivee.y = aIntersection[2].y;
							oPolygone.aDeuxiemeCoteCoupe.push(i,i+1);
						}
					}
				}
				
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
				
				// on vérifie qu'il n'y a bien qu'un seul côté de
				// coupé en plus de "oPolygone.aPremierCoteCoupe[0]"
				if(iIntersection == 1)
				{
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
						oTrait.reset();
						mouseDown = false;
						mouseMove = false;
						oSonCoupe.pause();
						oSonCoupe = new Audio('sons/swordCut.wav');
						oSonCoupe.volume = 0.3;
						oSonCoupe.play();
					}
				}
				else
				{				
					oPolygone.aPremierCoteCoupe = new Array();
					oPolygone.aDeuxiemeCoteCoupe = new Array();
					oTrait.reset();
					mouseDown = false;
					mouseMove = false;
				}
				
			}
		}
	}
};

/*** ================================================================================================================================================
Main
====================================================================================================================================================*/

var main = function () 
{
	now = Date.now();
	delta = now - then;
	
	if(iCompteurImages == iNombresImages)
	{
		partie();
	}
	
	requestAnimationFrame(main);
};

// On lance le jeu
var then = Date.now();
var now = then;
var delta = 0;
main();
