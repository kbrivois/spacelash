function Partie()
{  
	/*** ================================================================================================================================================
	déclaration des variables
	====================================================================================================================================================*/

	// nombres d'image
	this.iNombresImages = 0;
	// Compteur d'images chargée
	this.iCompteurImages = 0;

	// ------------------------ sons
	this.oSonMetal = new Audio('sons/metalhit.wav');
	this.oSonSouffleExplosion = new Audio('sons/souffleExplosion2.wav');
	this.oSonExplosion = new Audio('sons/bomb.wav');
	this.oSonEnnemiTouche = new Audio('sons/ennemiTouche.wav');
	this.oSonCoupe = new Audio('sons/swordCut.wav');
	this.oSonStars = new Audio('sons/brake.wav');
				
	// ------------------------ Création du canvas
	this.canvas = document.createElement("canvas");
	this.canvas.id = "partie";
	this.ctx = this.canvas.getContext("2d");
	this.canvas.width = document.documentElement.clientWidth-4;
	this.canvas.height = document.documentElement.clientHeight-4;

	document.body.appendChild(this.canvas);
	this.fOpaciteGlobale = 0;
	this.fGrandeurCercle = 0;
	this.bAugmenterOpacite = true;
	
	// ------------------------ Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
	// ------------------------ et lancement des fonctions.
	window.addEventListener('resize', screenResizePartie, false);

	// ------------------------ Background image
	this.MAX_DEPTH = 32;
	this.SPEED_STARS = 0.2;
	this.SIZE_STARS = 5*((fRatioLargeur+fRatioHauteur)/2);
	this.stars = new Array(100);
	this.initStars();

	// ------------------------ Variables liées à la victoire du joueur
	this.GAGNE = false;
	// Porte en metal
	// gauche
	
	this.oPorteGauche = new Image();
	this.oPorteGauche.src = 'img/gauche_porte.png';
	this.iNombresImages++;
	this.oPorteGauche.onload = function()
	{
		oPartie.iCompteurImages++;
	}
	this.fLargeurPorteGauche = this.canvas.width/2;
	this.fHauteurPorteGauche = this.canvas.height;
	this.oPositionPorteGauche = new Point(-this.fLargeurPorteGauche,0);
	// droite
	this.oPorteDroite = new Image();
	this.oPorteDroite.src = 'img/droite_porte.png';
	this.iNombresImages++;
	this.oPorteDroite.onload = function()
	{
		oPartie.iCompteurImages++;
	}
	this.fLargeurPorteDroite = this.canvas.width/2;
	this.fHauteurPorteDroite = this.canvas.height;
	this.oPositionPorteDroite = new Point(this.canvas.width,0);
	// bas
	this.oPorteBas = new Image();
	this.oPorteBas.src = 'img/bas_porte.png';
	this.iNombresImages++;
	this.oPorteBas.onload = function()
	{
		oPartie.iCompteurImages++;
	}
	this.fLargeurPorteBas = this.oPorteBas.width * (this.fLargeurPorteDroite/this.oPorteDroite.width);
	this.fHauteurPorteBas = this.oPorteBas.height * (this.fHauteurPorteDroite/this.oPorteDroite.height);
	this.oPositionPorteBas = new Point((this.canvas.width/2)-(this.fLargeurPorteBas/2),this.canvas.height);

	// ------------------------ Segment tracé avec la souris
	this.oTrait = new Trait("blue");
	this.mouseDown = false;
	this.mouseMove = false;
	this.oPositionSouris = new Point(-100,-100);
	this.bSourisDansPolygone = false;
	this.oCibleOk = new Image();
	this.oCibleOk.src = 'img/cible_ok.png';
	this.iNombresImages++;
	this.oCibleOk.onload = function()
	{
		oPartie.iCompteurImages++;
	}
	this.oCibleNok = new Image();
	this.oCibleNok.src = 'img/cible_nok.png';
	this.iNombresImages++;
	this.oCibleNok.onload = function()
	{
		oPartie.iCompteurImages++;
	}
	this.fRotationCibles = 0;
	this.fTailleCibles = 35*((fRatioLargeur+fRatioHauteur)/2);
	this.bAugmenterTailleCibles = true;

	// ------------------------ polygone
	var aListePointsTemp = new Array();

	// aListePointsTemp.push(new Point(50,50));
	// aListePointsTemp.push(new Point(250,50));
	// aListePointsTemp.push(new Point(180,175));
	// aListePointsTemp.push(new Point(250,300));
	// aListePointsTemp.push(new Point(50,300));
	// aListePointsTemp.push(new Point(120,175));
	// aListePointsTemp.push(new Point(50,50));

	aListePointsTemp.push(new Point(0,300));
	aListePointsTemp.push(new Point(150,0));
	aListePointsTemp.push(new Point(300,300));
	aListePointsTemp.push(new Point(150,150));
	aListePointsTemp.push(new Point(150,300));
	aListePointsTemp.push(new Point(75,200));
	aListePointsTemp.push(new Point(0,300));

	var img = new Image();
	img.src = 'img/textures/metal2.jpg';
	this.iNombresImages++;
	this.oPolygone = new Polygone(aListePointsTemp,img, 0.6);
	img.onload = function()
	{
		oPartie.iCompteurImages++;
	}

	// ------------------------ Ennemis
	this.aListeEnnemis = new Array();
	this.aListeImagesEnnemis = new Array();

	// Ennemi 1
	var oEnnemiImage = new Image();
	oEnnemiImage.src = "img/ennemis/fireball2.png";
	this.aListeImagesEnnemis.push(oEnnemiImage);
	this.iNombresImages++;
	oEnnemiImage.onload = function()
	{
		oPartie.iCompteurImages++;
	}

	// Ennemi 2
	var oEnnemiImage2 = new Image();
	oEnnemiImage2.src = "img/ennemis/fireball2.png";
	this.aListeImagesEnnemis.push(oEnnemiImage2);
	this.iNombresImages++;
	oEnnemiImage2.onload = function()
	{
		oPartie.iCompteurImages++;
	}

	// ------------------------ barre d'avancement
	this.oBarreAvancement = new Barre(new Point(20,370), new Point(270,370), 15, "blue", "rgb(126,133,188)", this);
}


/**
*** ==========================================================================================================================================
**** On initialise la position des étoiles
*** ========================================================================================================================================== 
**/
Partie.prototype.initStars = function()
{
	for( var i = 0; i < this.stars.length; i++ ) 
	{
		this.stars[i] = 
		{
			x: randomRange(-25,25),
			y: randomRange(-25,25),
			z: randomRange(1,this.MAX_DEPTH)
		}
	}
}


/**
*** ==========================================================================================================================================
**** on ajoute des étoiles
*** ========================================================================================================================================== 
**/
Partie.prototype.ajouterStars = function()
{
	this.stars[this.stars.length] = 
		{
			x: randomRange(-25,25),
			y: randomRange(-25,25),
			z: randomRange(1,this.MAX_DEPTH)
		}
}


/**
*** ==========================================================================================================================================
**** on dessine les étoiles
*** ========================================================================================================================================== 
**/
Partie.prototype.dessinerStars = function()
{
	this.ctx.fillStyle = "rgb(0,0,0)";
	this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
	
	// On crée les étoiles
	var halfWidth  = this.canvas.width / 2;
	var halfHeight = this.canvas.height / 2;

	for( var i = 0; i < this.stars.length; i++ ) 
	{
		this.stars[i].z -= this.SPEED_STARS;
 
		if( this.stars[i].z <= 0 ) 
		{
			this.stars[i].x = randomRange(-25,25);
			this.stars[i].y = randomRange(-25,25);
			this.stars[i].z = this.MAX_DEPTH;
		}
 
		var k  = 128.0 / this.stars[i].z;
		var px = this.stars[i].x * k + halfWidth;
		var py = this.stars[i].y * k + halfHeight;
 
		if( px >= 0 && px <= this.canvas.width && py >= 0 && py <= this.canvas.height ) 
		{
			var size = (1 - this.stars[i].z / 32.0) * this.SIZE_STARS;
			var shade = parseInt((1 - this.stars[i].z / 32.0) * 255);
			
			this.ctx.beginPath();
			//ctx.rect(px,py,size,size);
			this.ctx.arc(px,py, size/2, 0, 2 * Math.PI);
			this.ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
			this.ctx.fill();
		}
	}
}

/**
*** ==========================================================================================================================================
**** on lance la partie
*** ========================================================================================================================================== 
**/
Partie.prototype.lancer = function()
{
	// on crée le canvas
	this.ctx.beginPath();
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		
	// si les portes ne sont pas encore fermées
	if(this.oPositionPorteGauche.x < 0)
	{
		this.dessinerStars();
		
		// on trace le polygone
		this.oPolygone.tracer();
		
		// on trace la barre d'avancement
		this.oBarreAvancement.tracer(this.oPolygone);
		
		// Deplacement des ennemis, rebonds	
		for(var i=0; i<this.aListeEnnemis.length; i++)
		{	
			this.aListeEnnemis[i].oPosition.x += this.aListeEnnemis[i].oDeplacement.x;
			this.aListeEnnemis[i].oPosition.y += this.aListeEnnemis[i].oDeplacement.y;
		
			this.ctx.save(); 
			this.ctx.translate(this.aListeEnnemis[i].oPosition.x, this.aListeEnnemis[i].oPosition.y); 
			this.ctx.translate(this.aListeEnnemis[i].iTailleX/2, this.aListeEnnemis[i].iTailleY/2); 
			this.ctx.rotate(this.aListeEnnemis[i].fRotationActuelle);
			this.ctx.drawImage(this.aListeEnnemis[i].oImage, 
							  -this.aListeEnnemis[i].iTailleX/2, 
							  -this.aListeEnnemis[i].iTailleY/2, 
							  this.aListeEnnemis[i].iTailleX, 
							  this.aListeEnnemis[i].iTailleX);
			this.ctx.restore();
			
			this.aListeEnnemis[i].fRotationActuelle = (this.aListeEnnemis[i].fRotationActuelle + this.aListeEnnemis[i].fRotation);
			
			// on vérifie si l'ennemi est toujours sur le terrain
			// Rappel : si ennemiDansTerrain --> renvoie aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]	
			var aListeIntersectionTerrainEnnemi = this.oPolygone.ennemiDansTerrain(this.aListeEnnemis[i]);

			if(aListeIntersectionTerrainEnnemi != null)
			{
				// rebond
				this.oPolygone.faireRebond(aListeIntersectionTerrainEnnemi, this.aListeEnnemis[i]);
				this.oSonMetal.pause();
				this.oSonMetal = new Audio('sons/metalhit.wav');
				this.oSonMetal.volume = 0.05;
				this.oSonMetal.play();
			}
		}
		
		// si la souris se trouve dans le canvas
		// on place la cible
		if(this.bSourisDansPolygone != undefined)
		{
			if(this.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2) < 28)
				this.bAugmenterTailleCibles = true;
			else if(this.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2) > 43	)
				this.bAugmenterTailleCibles = false;
		
			if(this.bAugmenterTailleCibles)
				this.fTailleCibles += 0.4*((fRatioLargeur+fRatioHauteur)/2);
			else
				this.fTailleCibles -= 0.4*((fRatioLargeur+fRatioHauteur)/2);
		
			// si la souris se trouve dans le polygone
			if(this.bSourisDansPolygone)
			{
				this.ctx.save(); 
				this.ctx.translate(this.oPositionSouris.x-(this.fTailleCibles/2), this.oPositionSouris.y-(this.fTailleCibles/2)); 
				this.ctx.translate(this.fTailleCibles/2, this.fTailleCibles/2); 
				this.ctx.rotate(this.fRotationCibles);
				this.ctx.drawImage(this.oCibleNok, -(this.fTailleCibles/2), -(this.fTailleCibles/2), this.fTailleCibles, this.fTailleCibles);
				this.ctx.restore();
				this.fRotationCibles += 0.05;
			}
			// sinon
			else
			{
				this.ctx.save(); 
				this.ctx.translate(this.oPositionSouris.x-(this.fTailleCibles/2), this.oPositionSouris.y-(this.fTailleCibles/2)); 
				this.ctx.translate(this.fTailleCibles/2, this.fTailleCibles/2); 
				this.ctx.rotate(this.fRotationCibles);
				this.ctx.drawImage(this.oCibleOk, -(this.fTailleCibles/2), -(this.fTailleCibles/2), this.fTailleCibles, this.fTailleCibles);
				this.ctx.restore();
				if(!this.mouseDown)
					this.fRotationCibles += 0.05;
				else
				{
					this.ctx.beginPath();
					this.ctx.arc(this.oPositionSouris.x, this.oPositionSouris.y, 4*((fRatioLargeur+fRatioHauteur)/2), 0, 2 * Math.PI);
					this.ctx.fillStyle = this.oTrait.sCouleur;
					this.ctx.fill();
				}
			}
		}
	}
	
	// si l'aire minimale a été atteinte
	if(!this.GAGNE && this.oPolygone.fAireTerrainActuel < this.oPolygone.fAireMinimale)
	{
		this.GAGNE = true;
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
	if(this.GAGNE)
	{
		this.oPolygone.supprimerPartie();
		
		// on augmente la taille de l'étoiles, leur vitesse et leur nombre
		if(this.SIZE_STARS < 8*((fRatioLargeur+fRatioHauteur)/2))
			this.SIZE_STARS +=0.03;
		if(this.SPEED_STARS < 1.5)
			this.SPEED_STARS += 0.02;
		if(this.stars.length < 600)
		{
			this.ajouterStars();
			this.ajouterStars();
			this.ajouterStars();
		}
		
		if(this.SIZE_STARS > 5.5*((fRatioLargeur+fRatioHauteur)/2))
		{
			// On ferme de plus en plus la porte gauche
			if(this.oPositionPorteGauche.x < 0)
			{
				if(this.oPositionPorteGauche.x + fRatioLargeur*3 > 0)
					this.oPositionPorteGauche.x += -this.oPositionPorteGauche.x;
				else
					this.oPositionPorteGauche.x += fRatioLargeur*3;
			}
			// On ferme de plus en plus la porte droite
			if(this.oPositionPorteDroite.x > this.canvas.width/2)
			{
				if(this.oPositionPorteDroite.x - fRatioLargeur*3 < this.canvas.width/2)
					this.oPositionPorteDroite.x -= this.oPositionPorteDroite.x - this.canvas.width/2;
				else
					this.oPositionPorteDroite.x -= fRatioLargeur*3;
			}
			// On ferme de plus en plus la porte bas
			if(this.oPositionPorteBas.y > this.canvas.height-this.fHauteurPorteBas)
			{
				if(this.oPositionPorteBas.y - fRatioHauteur*3 < this.canvas.height-this.fHauteurPorteBas)
					this.oPositionPorteBas.y -= this.oPositionPorteBas.y - (this.canvas.height-this.fHauteurPorteBas);
				else
					this.oPositionPorteBas.y -= fRatioHauteur*3;
			}
			
			this.ctx.drawImage(this.oPorteGauche, this.oPositionPorteGauche.x, this.oPositionPorteGauche.y, this.fLargeurPorteGauche, this.fHauteurPorteGauche);
			this.ctx.drawImage(this.oPorteDroite, this.oPositionPorteDroite.x, this.oPositionPorteDroite.y, this.fLargeurPorteDroite, this.fHauteurPorteDroite);
			this.ctx.drawImage(this.oPorteBas, this.oPositionPorteBas.x, this.oPositionPorteBas.y, this.fLargeurPorteBas, this.fHauteurPorteBas);
		}
		
		// si les ennemis ne sont pas à l'arrêt, on ralenti les ennemis
		if(this.aListeEnnemis[0].fVitesse != 0)
		{
			for(var i=0; i<this.aListeEnnemis.length; i++)
			{
				this.aListeEnnemis[i].ralentir();
			}
		}
	}
	// Clignotement du trait si mauvaise coupe
	else if(this.oTrait.iCompteurFaireClignoter != 0)
	{
		this.oTrait.clignoter();
	}
	// Disparition d'une partie lors d'une coupe
	else if(this.oPolygone.bDisparitionPartie)
	{
		this.oPolygone.supprimerPartie();
	}
	// Trait a touché un ennemi
	else if(this.oTrait.bToucheEnnemi)
	{
		this.oTrait.disparaitre();
	
		// si les ennemis ne sont pas à l'arrêt, on ralenti les ennemis
		if(this.aListeEnnemis[0].fVitesse != 0 && this.bAugmenterOpacite)
		{
			for(var i=0; i<this.aListeEnnemis.length; i++)
			{
				this.aListeEnnemis[i].ralentir();
				
				if(i == this.oTrait.iEnnemiTouche)
					this.oTrait.oPositionEnnemiTouche = new Point( (this.aListeEnnemis[i].oPosition.x
																			+this.aListeEnnemis[i].oPosition.x+this.aListeEnnemis[i].iTailleX)/2,
																   (this.aListeEnnemis[i].oPosition.y
																			+this.aListeEnnemis[i].oPosition.y+this.aListeEnnemis[i].iTailleY)/2);
			}
		}
		// on fait apparaître une explosion sur l'ennemi touché et on réinitialise le jeu
		else
		{
			var fPasOpacite = 0.004;
			
			// Première explosion (cercle grandit doucement)
			if(this.bAugmenterOpacite)
			{	
				// Premiere fois qu'on dessine le cercle, bruit du souffle explosion
				if(this.fGrandeurCercle == 0)
				{
					this.oSonSouffleExplosion = new Audio('sons/souffleExplosion2.wav');
					this.oSonSouffleExplosion.volume = 0.5;
					this.oSonSouffleExplosion.play();
				}
				
				// Fin du premier cercle
				if(this.fOpaciteGlobale + fPasOpacite >= 0.2)
				{
					this.fOpaciteGlobale = 1;
					this.fGrandeurCercle = 0.05*((fRatioLargeur+fRatioHauteur)/2);
					this.bAugmenterOpacite = false;
					
					// on reset le polygone et les ennemis
					for(var i=0; i<this.aListeEnnemis.length; i++)
					{
						this.aListeEnnemis[i].reset();
					}
					this.oPolygone.reset();
					this.oBarreAvancement.reset();
					this.mouseDown = false;
					this.mouseMove = false;
				}
				else
				{
					// Transparence
					this.fOpaciteGlobale += fPasOpacite;
					this.fGrandeurCercle += fPasOpacite*((fRatioLargeur+fRatioHauteur)/2);
				}
				
				var iCouleur1 = Math.floor(244-10*(this.fGrandeurCercle/fRatioLargeur));
				var iCouleur2 = Math.floor(239-50*(this.fGrandeurCercle/fRatioLargeur));
				var iCouleur3 = Math.floor(221-110*(this.fGrandeurCercle/fRatioLargeur));
				
				this.ctx.beginPath();
				this.ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
				this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, 200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle, 0, 2 * Math.PI);
				this.ctx.fill();
			
				this.ctx.beginPath();
				this.ctx.lineWidth = 4;
				this.ctx.strokeStyle = "rgb(254,230,157)";
				this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
				this.ctx.stroke();
				
				this.ctx.beginPath();
				this.ctx.lineWidth = 4;
				this.ctx.strokeStyle = "rgb(251,215,109)";
				this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+4, 0, 2 * Math.PI);
				this.ctx.stroke();
				
				this.ctx.beginPath();
				this.ctx.lineWidth = 4;
				this.ctx.strokeStyle = "rgb(248,200,61)";
				this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
				this.ctx.stroke();
				
				this.ctx.beginPath();
				this.ctx.lineWidth = 4;
				this.ctx.strokeStyle = "rgb(248,150,10)";
				this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
				this.ctx.stroke();
			}
			
			// Deuxieme explosion (cercle grandit vite, devient opaque et lumière blanche en fond)
			if(!this.bAugmenterOpacite)
			{
				fPasOpacite = 0.04;
				
				
				// Premiere fois qu'on dessine le 2eme cercle, bruit de l'explosion
				if(this.fGrandeurCercle == 0.05*((fRatioLargeur+fRatioHauteur)/2))
				{
					this.oSonSouffleExplosion.pause();
					this.oSonExplosion = new Audio('sons/bomb.wav');
					this.oSonExplosion.volume = 1;
					this.oSonExplosion.play();
				}
				
				if(this.fOpaciteGlobale - fPasOpacite <= 0)
				{
					this.fOpaciteGlobale = 0;
					this.fGrandeurCercle = 0;
					this.bAugmenterOpacite = true;
					this.oTrait.reset();
				}
				else
				{
					// Transparence
					this.fOpaciteGlobale -= fPasOpacite;
				}

				if(this.fGrandeurCercle != 0)
				{
					this.ctx.globalAlpha = this.fOpaciteGlobale;
					this.fGrandeurCercle += fPasOpacite*((fRatioLargeur+fRatioHauteur)/2);
					
					var iCouleur1 = Math.floor(244-10);
					var iCouleur2 = Math.floor(239-50);
					var iCouleur3 = Math.floor(221-110);
					
					this.ctx.beginPath();
					this.ctx.fillStyle = 'rgb(255, 255, 255)';
					this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
					
					this.ctx.beginPath();
					this.ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
					this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
								this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
					this.ctx.fill();
					
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "rgb(254,230,157)";
					this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
					this.ctx.stroke();
					
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "rgb(251,215,109)";
					this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+4, 0, 2 * Math.PI);
					this.ctx.stroke();
					
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "rgb(248,200,61)";
					this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
					this.ctx.stroke();
					
					this.ctx.beginPath();
					this.ctx.lineWidth = 4;
					this.ctx.strokeStyle = "rgb(248,150,10)";
					this.ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
					this.ctx.stroke();
					
					this.ctx.globalAlpha = 1;
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
		if(this.oTrait.iDepartTraitDansPolygone == 0)
		{
			// si l'arrivée du trait tracé se trouve à l'intérieur du polygone
			if(this.oPolygone.cn_PnPoly(this.oTrait.oPointArrivee) == 1)
			{	
				if(this.oTrait.iTraitDansPolygone == 0)
				{
					var iIntersection = 0;
					
					for(var i=0; i<this.oPolygone.aListePoints.length-1; i++)
					{
						// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
						var aIntersection = getIntersectionSegments(this.oTrait.oPointDepart, 
																	this.oTrait.oPointArrivee, 
																	this.oPolygone.aListePoints[i], 
																	this.oPolygone.aListePoints[i+1]);
						
						if(aIntersection != null)
						{		
							// on défini le point de départ du trait dans le polygone
							this.oTrait.oPointDepart.x = aIntersection[2].x;
							this.oTrait.oPointDepart.y = aIntersection[2].y;
							
							this.oPolygone.aPremierCoteCoupe.push(i,i+1);
						}
					}
					this.oTrait.iTraitDansPolygone = 1;
				}
				
				this.oTrait.tracer();
				
				// on vérifie si le trait touche un ennemi
				for(var i=0; i<this.aListeEnnemis.length; i++)
				{
					// on définit les coins de l'image "ennemi"
					var oCoinHautGauche = new Point(this.aListeEnnemis[i].oPosition.x, 
													this.aListeEnnemis[i].oPosition.y);
					var oCoinHautDroit = new Point(this.aListeEnnemis[i].oPosition.x + this.aListeEnnemis[i].iTailleX, 
												   this.aListeEnnemis[i].oPosition.y);
					var oCoinBasDroit = new Point(this.aListeEnnemis[i].oPosition.x + this.aListeEnnemis[i].iTailleX, 
												  this.aListeEnnemis[i].oPosition.y + this.aListeEnnemis[i].iTailleY);
					var oCoinBasGauche = new Point(this.aListeEnnemis[i].oPosition.x, 
												   this.aListeEnnemis[i].oPosition.y + this.aListeEnnemis[i].iTailleY);
					
					// on vérifie si les bords de l'image touche le trait tracé avec la souris
					if(this.oTrait.verifierCoupeSegment(oCoinHautGauche, oCoinHautDroit) || this.oTrait.verifierCoupeSegment(oCoinHautDroit, oCoinBasDroit)
						|| this.oTrait.verifierCoupeSegment(oCoinBasDroit, oCoinBasGauche) || this.oTrait.verifierCoupeSegment(oCoinBasGauche, oCoinHautGauche))
					{
						this.oSonEnnemiTouche.volume = 0.3;
						this.oSonEnnemiTouche.play();
						this.oTrait.iEnnemiTouche = i;
						this.oTrait.bToucheEnnemi = true;
					}
				}
				
			}
			
			// si le trait sort du polygone
			if(this.oPolygone.cn_PnPoly(this.oTrait.oPointArrivee) == 0 && this.oTrait.iTraitDansPolygone == 1 && this.oTrait.bToucheEnnemi == false)
			{	
				var iIntersection = 0;
				var bCoupe = false;
				
				for(var i=0; i<this.oPolygone.aListePoints.length-1; i++)
				{
					// Si le côté ne correspond pas au premier côté coupé
					if(i != this.oPolygone.aPremierCoteCoupe[0])
					{
						// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
						var aIntersection = getIntersectionSegments(this.oTrait.oPointDepart, 
																	this.oTrait.oPointArrivee, 
																	this.oPolygone.aListePoints[i], 
																	this.oPolygone.aListePoints[i+1]);
						
						if(aIntersection != null)
						{
							
							iIntersection++;
							
							// on défini le point d'arrivée du trait dans le polygone
							this.oTrait.oPointArrivee.x = aIntersection[2].x;
							this.oTrait.oPointArrivee.y = aIntersection[2].y;
							this.oPolygone.aDeuxiemeCoteCoupe.push(i,i+1);
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
					var bCoupe = this.oPolygone.couperForme(this.oTrait.oPointDepart, this.oTrait.oPointArrivee, this.aListeEnnemis);
					
					// si coupe impossible, on décide de mettre le compteur de clignotement à 4
					if(!bCoupe)
					{
						this.oTrait.iCompteurFaireClignoter = 4;
						this.mouseDown = false;
						this.mouseMove = false;
					}
					else
					{
						this.oTrait.reset();
						this.mouseDown = false;
						this.mouseMove = false;
						this.oSonCoupe.pause();
						this.oSonCoupe = new Audio('sons/swordCut.wav');
						this.oSonCoupe.volume = 0.3;
						this.oSonCoupe.play();
					}
				}
				else
				{				
					this.oPolygone.aPremierCoteCoupe = new Array();
					this.oPolygone.aDeuxiemeCoteCoupe = new Array();
					this.oTrait.reset();
					this.mouseDown = false;
					this.mouseMove = false;
				}
				
			}
		}
	}
}

/**
*** ==========================================================================================================================================
**** reset de la partie
*** ========================================================================================================================================== 
**/
Partie.prototype.reset = function()
{
	for(var i=0; i<this.aListeEnnemis.length; i++)
	{
		this.aListeEnnemis[i].reset();
	}
	
	this.mouseDown = false;
	this.mouseMove = false;
	this.fTailleGrosseEtoile = 0;
	this.fOpaciteGlobale = 0;
	this.oTrait.reset();
	this.oPolygone.reset();
	this.oBarreAvancement.reset();
}
