function Partie()
{  
	/*** ================================================================================================================================================
	d�claration des variables
	====================================================================================================================================================*/

	iCompteurImages = 0;
	iNombresImages = 0;
	
	if(fRatioLargeur > 2)
		fRatioLargeur = 2;
	if(fRatioHauteur > 2)
		fRatioHauteur = 2;
	
	// ------------------------ sons
	this.oSonMetal = new Audio('sons/metalhit.wav');
	this.oSonSouffleExplosion = new Audio('sons/souffleExplosion2.wav');
	this.oSonExplosion = new Audio('sons/bomb.wav');
	this.oSonEnnemiTouche = new Audio('sons/ennemiTouche.wav');
	this.oSonCoupe = new Audio('sons/swordCut.wav');
	this.oSonStars = new Audio('sons/brake.wav');
	
	this.fOpaciteGlobale = 0;
	this.fGrandeurCercle = 0;
	this.bAugmenterOpacite = true;
	
	// ------------------------ Ajout des gestionnaires d'�v�nements pour savoir ce qu'il se passe
	// ------------------------ et lancement des fonctions.
	window.addEventListener('resize', screenResizePartie, false);

	// ------------------------ Background image
	this.MAX_DEPTH = 32;
	this.SPEED_STARS = 0.2;
	this.SIZE_STARS = 5*((fRatioLargeur+fRatioHauteur)/2);
	this.stars = new Array(30);
	this.initStars();

	// ------------------------ Variables li�es � la victoire du joueur
	this.GAGNE = false;
	
	// Porte en metal
	// gauche
	this.oPorteGauche = new Image();
	this.oPorteGauche.src = 'img/gauche_porte.png';
	iNombresImages++;
	this.oPorteGauche.onload = function()
	{
		iCompteurImages++;
	}
	this.fLargeurPorteGauche = canvas.width/2;
	this.fHauteurPorteGauche = canvas.height;
	this.oPositionPorteGauche = new Point(-this.fLargeurPorteGauche,0);
	// droite
	this.oPorteDroite = new Image();
	this.oPorteDroite.src = 'img/droite_porte.png';
	iNombresImages++;
	this.oPorteDroite.onload = function()
	{
		iCompteurImages++;
	}
	this.fLargeurPorteDroite = canvas.width/2;
	this.fHauteurPorteDroite = canvas.height;
	this.oPositionPorteDroite = new Point(canvas.width,0);
	// bas
	this.oPorteBas = new Image();
	this.oPorteBas.src = 'img/bas_porte.png';
	iNombresImages++;
	this.oPorteBas.onload = function()
	{
		iCompteurImages++;
	}

	// ------------------------ Segment trac� avec la souris
	this.oTrait = new Trait("blue");
	this.bSourisDansTerrain = false;
	this.oCibleOk = new Image();
	this.oCibleOk.src = 'img/cible_ok.png';
	iNombresImages++;
	this.oCibleOk.onload = function()
	{
		iCompteurImages++;
	}
	this.oCibleNok = new Image();
	this.oCibleNok.src = 'img/cible_nok.png';
	iNombresImages++;
	this.oCibleNok.onload = function()
	{
		iCompteurImages++;
	}
	this.fRotationCibles = 0;
	this.fTailleCibles = 35*((fRatioLargeur+fRatioHauteur)/2);
	this.bAugmenterTailleCibles = true;

	// ------------------------ Terrain
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
	
	var img = new Image();
	img.src = 'img/textures/metal2.jpg';
	iNombresImages++;
	this.oTerrain = new Terrain(aListePointsTemp,img, 0.4);
	img.onload = function()
	{
		iCompteurImages++;
	}

	// ------------------------ Ennemis
	this.aListeEnnemis = new Array();
	this.aListeImagesEnnemis = new Array();

	// Ennemi 1
	var oEnnemiImage = new Image();
	oEnnemiImage.src = "img/ennemis/fireball2.png";
	this.aListeImagesEnnemis.push(oEnnemiImage);
	iNombresImages++;
	oEnnemiImage.onload = function()
	{
		iCompteurImages++;
	}

	// Ennemi 2
	var oEnnemiImage2 = new Image();
	oEnnemiImage2.src = "img/ennemis/fireball2.png";
	this.aListeImagesEnnemis.push(oEnnemiImage2);
	iNombresImages++;
	oEnnemiImage2.onload = function()
	{
		iCompteurImages++;
	}

	// ------------------------ barre d'avancement
	this.oBarreAvancement = new Barre(new Point(20,370), new Point(270,370), 15, "blue", "rgb(126,133,188)", this);
}


/**
*** ==========================================================================================================================================
**** On initialise la position des �toiles
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
**** on ajoute des �toiles
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
**** on dessine les �toiles
*** ========================================================================================================================================== 
**/
Partie.prototype.dessinerStars = function()
{	
	// On cr�e les �toiles
	var halfWidth  = canvas.width / 2;
	var halfHeight = canvas.height / 2;

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
 
		if( px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height ) 
		{
			var size = (1 - this.stars[i].z / 32.0) * this.SIZE_STARS;
			var shade = parseInt((1 - this.stars[i].z / 32.0) * 255);
			
			ctx.beginPath();
			//ctx.rect(px,py,size,size);
			ctx.arc(px,py, size/2, 0, 2 * Math.PI);
			ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
			ctx.fill();
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
	// on cr�e le canvas
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
		
	// si les portes ne sont pas encore ferm�es
	if(this.oPositionPorteGauche.x < 0)
	{
		this.dessinerStars();
		
		// on trace le Terrain
		this.oTerrain.tracer();
		
		// on trace la barre d'avancement
		this.oBarreAvancement.tracer(this.oTerrain);
		
		// Deplacement des ennemis, rebonds	
		for(var i=0; i<this.aListeEnnemis.length; i++)
		{	
			this.aListeEnnemis[i].oPosition.x += this.aListeEnnemis[i].oDeplacement.x;
			this.aListeEnnemis[i].oPosition.y += this.aListeEnnemis[i].oDeplacement.y;
		
			ctx.save(); 
			ctx.translate(this.aListeEnnemis[i].oPosition.x, this.aListeEnnemis[i].oPosition.y); 
			ctx.translate(this.aListeEnnemis[i].iTailleX/2, this.aListeEnnemis[i].iTailleY/2); 
			ctx.rotate(this.aListeEnnemis[i].fRotationActuelle);
			ctx.drawImage(this.aListeEnnemis[i].oImage, 
							  -this.aListeEnnemis[i].iTailleX/2, 
							  -this.aListeEnnemis[i].iTailleY/2, 
							  this.aListeEnnemis[i].iTailleX, 
							  this.aListeEnnemis[i].iTailleX);
			ctx.restore();
			
			this.aListeEnnemis[i].fRotationActuelle = (this.aListeEnnemis[i].fRotationActuelle + this.aListeEnnemis[i].fRotation);
			
			// on v�rifie si l'ennemi est toujours sur le terrain
			// Rappel : si ennemiDansTerrain --> renvoie aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]	
			var aListeIntersectionTerrainEnnemi = this.oTerrain.ennemiDansTerrain(this.aListeEnnemis[i]);

			if(aListeIntersectionTerrainEnnemi != null)
			{
				// rebond
				this.oTerrain.faireRebond(aListeIntersectionTerrainEnnemi, this.aListeEnnemis[i]);
				// this.oSonMetal.pause();
				// this.oSonMetal = new Audio('sons/metalhit.wav');
				// this.oSonMetal.volume = 0.05;
				// this.oSonMetal.play();
			}
		}
		
		// si la souris se trouve dans le canvas
		// on place la cible
		if(this.bSourisDansTerrain != undefined)
		{
			if(this.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2) < 28)
				this.bAugmenterTailleCibles = true;
			else if(this.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2) > 43	)
				this.bAugmenterTailleCibles = false;
		
			if(this.bAugmenterTailleCibles)
				this.fTailleCibles += 0.4*((fRatioLargeur+fRatioHauteur)/2);
			else
				this.fTailleCibles -= 0.4*((fRatioLargeur+fRatioHauteur)/2);
		
			// si la souris se trouve dans le Terrain
			if(this.bSourisDansTerrain)
			{
				ctx.save(); 
				ctx.translate(oPositionSouris.x-(this.fTailleCibles/2), oPositionSouris.y-(this.fTailleCibles/2)); 
				ctx.translate(this.fTailleCibles/2, this.fTailleCibles/2); 
				ctx.rotate(this.fRotationCibles);
				ctx.drawImage(this.oCibleNok, -(this.fTailleCibles/2), -(this.fTailleCibles/2), this.fTailleCibles, this.fTailleCibles);
				ctx.restore();
				this.fRotationCibles += 0.05;
			}
			// sinon
			else
			{
				ctx.save(); 
				ctx.translate(oPositionSouris.x-(this.fTailleCibles/2), oPositionSouris.y-(this.fTailleCibles/2)); 
				ctx.translate(this.fTailleCibles/2, this.fTailleCibles/2); 
				ctx.rotate(this.fRotationCibles);
				ctx.drawImage(this.oCibleOk, -(this.fTailleCibles/2), -(this.fTailleCibles/2), this.fTailleCibles, this.fTailleCibles);
				ctx.restore();
				if(!mouseDown)
					this.fRotationCibles += 0.05;
				else
				{
					ctx.beginPath();
					ctx.arc(oPositionSouris.x, oPositionSouris.y, 4*((fRatioLargeur+fRatioHauteur)/2), 0, 2 * Math.PI);
					ctx.fillStyle = this.oTrait.sCouleur;
					ctx.fill();
				}
			}
		}
	}
	
	// si l'aire minimale a �t� atteinte
	if(!this.GAGNE && this.oTerrain.fAireTerrainActuel <= this.oTerrain.fAireMinimale)
	{
		this.GAGNE = true;
	}
	
	/*
	--------------------------------------------------------------------------------------------------
	** ----------------------------------------------------------------------- ***********************
	** Autres actions que le d�roulement de la partie :
	** - Partie gagn�e
	** - Mauvaise coupe (coupe entre 2 ennemis)
	** - Coupe d'une partie
	** - Trait a touch� un ennemi
	** ----------------------------------------------------------------------- ***********************
	--------------------------------------------------------------------------------------------------
	*/
	
	// Si le joueur a gagn�
	if(this.GAGNE)
	{
		this.oTerrain.supprimerPartie();
		
		// On ferme de plus en plus la porte gauche
		if(this.oPositionPorteGauche.x < 0)
		{
			if(this.oPositionPorteGauche.x + fRatioLargeur*3 > 0)
				this.oPositionPorteGauche.x += -this.oPositionPorteGauche.x;
			else
				this.oPositionPorteGauche.x += fRatioLargeur*3;
		}
		// On ferme de plus en plus la porte droite
		if(this.oPositionPorteDroite.x > canvas.width/2)
		{
			if(this.oPositionPorteDroite.x - fRatioLargeur*3 < canvas.width/2)
				this.oPositionPorteDroite.x -= this.oPositionPorteDroite.x - canvas.width/2;
			else
				this.oPositionPorteDroite.x -= fRatioLargeur*3;
		}
		// On ferme de plus en plus la porte bas
		if(this.oPositionPorteBas.y > canvas.height-this.fHauteurPorteBas)
		{
			if(this.oPositionPorteBas.y - fRatioHauteur*3 < canvas.height-this.fHauteurPorteBas)
				this.oPositionPorteBas.y -= this.oPositionPorteBas.y - (canvas.height-this.fHauteurPorteBas);
			else
				this.oPositionPorteBas.y -= fRatioHauteur*3;
		}
		
		ctx.drawImage(this.oPorteGauche, this.oPositionPorteGauche.x, this.oPositionPorteGauche.y, this.fLargeurPorteGauche, this.fHauteurPorteGauche);
		ctx.drawImage(this.oPorteDroite, this.oPositionPorteDroite.x, this.oPositionPorteDroite.y, this.fLargeurPorteDroite, this.fHauteurPorteDroite);
		ctx.drawImage(this.oPorteBas, this.oPositionPorteBas.x, this.oPositionPorteBas.y, this.fLargeurPorteBas, this.fHauteurPorteBas);
		
		// si les ennemis ne sont pas � l'arr�t, on ralenti les ennemis
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
	else if(this.oTerrain.bDisparitionPartie)
	{
		this.oTerrain.supprimerPartie();
	}
	// Trait a touch� un ennemi
	else if(this.oTrait.bToucheEnnemi)
	{
		this.oTrait.disparaitre();
	
		// si les ennemis ne sont pas � l'arr�t, on ralenti les ennemis
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
		// on fait appara�tre une explosion sur l'ennemi touch� et on r�initialise le jeu
		else
		{
			var fPasOpacite = 0.004;
			
			// Premi�re explosion (cercle grandit doucement)
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
					
					// on reset le Terrain et les ennemis
					for(var i=0; i<this.aListeEnnemis.length; i++)
					{
						this.aListeEnnemis[i].reset();
					}
					this.oTerrain.reset();
					this.oBarreAvancement.reset();
					mouseDown = false;
					mouseMove = false;
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
				
				ctx.beginPath();
				ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
				ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, 200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle, 0, 2 * Math.PI);
				ctx.fill();
			
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(254,230,157)";
				ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(251,215,109)";
				ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+4, 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(248,200,61)";
				ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgb(248,150,10)";
				ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
						this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
				ctx.stroke();
			}
			
			// Deuxieme explosion (cercle grandit vite, devient opaque et lumi�re blanche en fond)
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
					ctx.globalAlpha = this.fOpaciteGlobale;
					this.fGrandeurCercle += fPasOpacite*((fRatioLargeur+fRatioHauteur)/2);
					
					var iCouleur1 = Math.floor(244-10);
					var iCouleur2 = Math.floor(239-50);
					var iCouleur3 = Math.floor(221-110);
					
					ctx.beginPath();
					ctx.fillStyle = 'rgb(255, 255, 255)';
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					
					ctx.beginPath();
					ctx.fillStyle = "rgb("+iCouleur1+","+iCouleur2+","+iCouleur3+")";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
								this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
					ctx.fill();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(254,230,157)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(251,215,109)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+4, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,200,61)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,150,10)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (200*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.globalAlpha = 1;
				}
			}
		}
	}
	
	
	/*
	--------------------------------------------------------------------------------------------------
	** ----------------------------------------------------------------------- ***********************
	** Tra�age du trait + coupe de la forme + on v�rifie si on coupe un ennemi
	** ----------------------------------------------------------------------- ***********************
	--------------------------------------------------------------------------------------------------
	*/
	
	// Trait ne doit pas clignoter 
	// Il y a un down et un move de la souris
	// Pas de partie coup�e
	// Le trait n'a pas touch� d'ennemi
	// Partie n'a pas �t� gagn�e
	else
	{	
		// si le d�but du trait trac� se trouve � l'exterieur du Terrain
		if(this.oTrait.iDepartTraitDansTerrain == 0)
		{
			// si l'arriv�e du trait trac� se trouve � l'int�rieur du Terrain
			if(this.oTerrain.cn_PnPoly(this.oTrait.oPointArrivee) == 1)
			{	
				if(this.oTrait.iTraitDansTerrain == 0)
				{
					var iIntersection = 0;
					
					for(var i=0; i<this.oTerrain.aListePoints.length-1; i++)
					{
						// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
						var aIntersection = getIntersectionSegments(this.oTrait.oPointDepart, 
																	this.oTrait.oPointArrivee, 
																	this.oTerrain.aListePoints[i], 
																	this.oTerrain.aListePoints[i+1]);
						
						if(aIntersection != null)
						{		
							// on d�fini le point de d�part du trait dans le Terrain
							this.oTrait.oPointDepart.x = aIntersection[2].x;
							this.oTrait.oPointDepart.y = aIntersection[2].y;
							
							this.oTerrain.aPremierCoteCoupe.push(i,i+1);
						}
					}
					this.oTrait.iTraitDansTerrain = 1;
				}
				
				this.oTrait.tracer();
				
				// on v�rifie si le trait touche un ennemi
				for(var i=0; i<this.aListeEnnemis.length; i++)
				{
					// on d�finit les coins de l'image "ennemi"
					var oCoinHautGauche = new Point(this.aListeEnnemis[i].oPosition.x, 
													this.aListeEnnemis[i].oPosition.y);
					var oCoinHautDroit = new Point(this.aListeEnnemis[i].oPosition.x + this.aListeEnnemis[i].iTailleX, 
												   this.aListeEnnemis[i].oPosition.y);
					var oCoinBasDroit = new Point(this.aListeEnnemis[i].oPosition.x + this.aListeEnnemis[i].iTailleX, 
												  this.aListeEnnemis[i].oPosition.y + this.aListeEnnemis[i].iTailleY);
					var oCoinBasGauche = new Point(this.aListeEnnemis[i].oPosition.x, 
												   this.aListeEnnemis[i].oPosition.y + this.aListeEnnemis[i].iTailleY);
					
					// on v�rifie si les bords de l'image touche le trait trac� avec la souris
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
			
			// si le trait sort du Terrain
			if(this.oTerrain.cn_PnPoly(this.oTrait.oPointArrivee) == 0 && this.oTrait.iTraitDansTerrain == 1 && this.oTrait.bToucheEnnemi == false)
			{	
				var iIntersection = 0;
				var bCoupe = false;
				
				for(var i=0; i<this.oTerrain.aListePoints.length-1; i++)
				{
					// Si le c�t� ne correspond pas au premier c�t� coup�
					if(i != this.oTerrain.aPremierCoteCoupe[0])
					{
						// Rappel : aIntersection=[0:Point1 cote terrain, 1:Point2 cote terrain, 2:Point intersection]
						var aIntersection = getIntersectionSegments(this.oTrait.oPointDepart, 
																	this.oTrait.oPointArrivee, 
																	this.oTerrain.aListePoints[i], 
																	this.oTerrain.aListePoints[i+1]);
						
						if(aIntersection != null)
						{
							
							iIntersection++;
							
							// on d�fini le point d'arriv�e du trait dans le Terrain
							this.oTrait.oPointArrivee.x = aIntersection[2].x;
							this.oTrait.oPointArrivee.y = aIntersection[2].y;
							this.oTerrain.aDeuxiemeCoteCoupe.push(i,i+1);
						}
					}
				}
				
				// si l'arriv�e du trait trac� se trouve � l'int�rieur du Terrain et que le traverse bien le terrain
				// en effet, le point d'arriv� peut se trouver dans le terrain alors que le trait traverse du vide
				//
				//					_________							  _________
				//					|		|							  |		  |
				//	D�but du trait ------->	o-----------------------------|---o	<------ Fin du trait
				//					|		|_____________________________|		  |
				//					|											  |
				//					|_____________________________________________|
				//
				
				// on v�rifie qu'il n'y a bien qu'un seul c�t� de
				// coup� en plus de "oTerrain.aPremierCoteCoupe[0]"
				if(iIntersection == 1)
				{
					var bCoupe = this.oTerrain.couperForme(this.oTrait.oPointDepart, this.oTrait.oPointArrivee, this.aListeEnnemis);
					
					// si coupe impossible, on d�cide de mettre le compteur de clignotement � 4
					if(!bCoupe)
					{
						this.oTrait.iCompteurFaireClignoter = 4;
						mouseDown = false;
						mouseMove = false;
					}
					else
					{
						this.oTrait.reset();
						mouseDown = false;
						mouseMove = false;
					}
				}
				else
				{				
					this.oTerrain.aPremierCoteCoupe = new Array();
					this.oTerrain.aDeuxiemeCoteCoupe = new Array();
					this.oTrait.reset();
					mouseDown = false;
					mouseMove = false;
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
	
	mouseDown = false;
	mouseMove = false;
	this.fTailleGrosseEtoile = 0;
	this.fOpaciteGlobale = 0;
	this.oTrait.reset();
	this.oTerrain.reset();
	this.oBarreAvancement.reset();
}
