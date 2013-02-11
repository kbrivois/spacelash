function Partie()
{  
	/*** ================================================================================================================================================
	déclaration des variables
	====================================================================================================================================================*/

	iCompteurImages = 0;
	iNombresImages = 0;
	

	
	// Ratio pour les portes
	this.fRatioLargeurPorte = fRatioLargeur;
	this.fRatioHauteurPorte = fRatioHauteur;

	// ratio
	if(fRatioLargeur < fRatioHauteur)
	{		
		fRatioHauteur = fRatioLargeur;
	}
	else
	{
		fRatioLargeur = fRatioHauteur;
	}
	
	// ------------------------ Rejouer et pause
	
	// boutons Rejouer et pause
	this.iTailleBouton = 30*((fRatioLargeur+fRatioHauteur)/2);
	
	//Rejouer
	this.oBoutonRejouer = new Image();
	this.oBoutonRejouer.src = 'img/Replay.png';
	iNombresImages++;
	this.oBoutonRejouer.onload = function()
	{
		iCompteurImages++;
	}
	
	//Rejouer hover
	this.oBoutonRejouerHover = new Image();
	this.oBoutonRejouerHover.src = 'img/Replay-hover.png';
	iNombresImages++;
	this.oBoutonRejouerHover.onload = function()
	{
		iCompteurImages++;
	}
	this.oPositionBoutonRejouer = new Point(10+40*((fRatioLargeur+fRatioHauteur)/2),10);
	
	//pause
	this.bPause = false;
	this.oBoutonPause = new Image();
	this.oBoutonPause.src = 'img/pause.png';
	iNombresImages++;
	this.oBoutonPause.onload = function()
	{
		iCompteurImages++;
	}

	//pause hover
	this.oBoutonPauseHover = new Image();
	this.oBoutonPauseHover.src = 'img/pause-hover.png';
	iNombresImages++;
	this.oBoutonPauseHover.onload = function()
	{
		iCompteurImages++;
	}
	this.oPositionBoutonPause = new Point(10,10);
	
	// fond de la pause
	this.oFondPause = new Image();
	this.oFondPause.src = 'img/fond-pause.png';
	iNombresImages++;
	this.oFondPause.onload = function()
	{
		iCompteurImages++;
	}
	
	this.oBoutonDeSelection = new Image();
	this.oBoutonDeSelection.src = 'img/chargement.png';
	iNombresImages++;
	this.oBoutonDeSelection.onload = function()
	{
		iCompteurImages++;
	}
	this.fTailleBoutonDeSelection = 30*((fRatioLargeur+fRatioHauteur)/2);
	
	this.oPositionBoutonPause = new Point(10,10);
	this.oPositionBoutonReprendre = new Point(canvas.width/2, canvas.height/2-25*((fRatioHauteur+fRatioLargeur)/2));
	this.oPositionBoutonMenu = new Point(canvas.width/2, canvas.height/2+25*((fRatioHauteur+fRatioLargeur)/2));
	this.iTailleFontMenu = 15;
	
	// souris sur les bouton 
	this.bSurBoutonPause = false;
	this.bSurBoutonRejouer = false;
	this.bSurBoutonReprendre = false;
	this.bSurBoutonMenu = false;
	
	
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
	
	// ------------------------ Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
	// ------------------------ et lancement des fonctions.
	window.addEventListener('resize', screenResizePartie, false);

	// ------------------------ Background image
	this.MAX_DEPTH = 32;
	this.SPEED_STARS = 0.2;
	this.SIZE_STARS = 5*((fRatioLargeur+fRatioHauteur)/2);
	this.stars = new Array(30);
	this.initStars();

	// ------------------------ Variables liées à la victoire du joueur
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

	// ------------------------ Segment tracé avec la souris
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
	
	for(var i=0; i<oNiveauPartie[iNiveauSelectionne].Points.length; i++)
			aListePointsTemp.push(new Point(oNiveauPartie[iNiveauSelectionne].Points[i].x, oNiveauPartie[iNiveauSelectionne].Points[i].y));
	
	var img = new Image();
	img.src = 'img/textures/metal2.jpg';
	iNombresImages++;
	this.oTerrain = new Terrain(aListePointsTemp,img, oNiveauPartie[iNiveauSelectionne].AireForme/100);
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

	// ------------------------ barre d'avancement
	this.oBarreAvancement = new Barre(new Point(20,370), new Point(270,370), 15, "black", this);
	
	this.oChrono = new Chronometre();
	this.oChrono.start();

	
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
**** on dessine les étoiles
*** ========================================================================================================================================== 
**/
Partie.prototype.dessinerStars = function()
{	
	// On crée les étoiles
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
	// on crée le canvas
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
		
	this.dessinerStars();
	
	// on trace le Terrain
	this.oTerrain.tracer();
	
	// on trace la barre d'avancement
	this.oBarreAvancement.tracer(this.oTerrain);
	
	//on affiche le chrono
	ctx.font = 20*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+'pt "SPACE"';
	ctx.fillStyle = "white";
	ctx.fillText(this.oChrono.textMin + ":"+this.oChrono.textSec, 500, 40);	
	
	

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
		
		// on vérifie si l'ennemi est toujours sur le terrain
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
	
	// si la souris se trouve dans le canvas et si on ne se trouve pas sur un bouton
	// on place la cible
	if(this.bSourisDansTerrain != undefined && this.bSurBoutonPause == false && this.bSurBoutonRejouer == false)
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
	
	// bouton Rejouer
	if(this.bSurBoutonRejouer)
	{
		ctx.drawImage(this.oBoutonRejouerHover, 
							0, 
							0, 
							this.oBoutonRejouer.width, 
							this.oBoutonRejouer.height, 
							//position
							this.oPositionBoutonRejouer.x,
							this.oPositionBoutonRejouer.y,
							this.iTailleBouton, 
							this.iTailleBouton);
	}
	else
	{
		ctx.drawImage(this.oBoutonRejouer, 
							0, 
							0, 
							this.oBoutonRejouer.width, 
							this.oBoutonRejouer.height, 
							//position
							this.oPositionBoutonRejouer.x,
							this.oPositionBoutonRejouer.y,
							this.iTailleBouton, 
							this.iTailleBouton);
	}
	
	// bouton pause
	if(this.bSurBoutonPause)
	{
		ctx.drawImage(this.oBoutonPauseHover, 
							0, 
							0, 
							this.oBoutonPause.width, 
							this.oBoutonPause.height, 
							//position
							this.oPositionBoutonPause.x,
							this.oPositionBoutonPause.y,
							this.iTailleBouton, 
							this.iTailleBouton);
	}
	else
	{
		ctx.drawImage(this.oBoutonPause, 
							0, 
							0, 
							this.oBoutonPause.width, 
							this.oBoutonPause.height, 
							//position
							this.oPositionBoutonPause.x,
							this.oPositionBoutonPause.y,
							this.iTailleBouton, 
							this.iTailleBouton);
	}
	
	// si l'aire minimale a été atteinte
	if(!this.GAGNE && this.oTerrain.fAireTerrainActuel <= this.oTerrain.fAireMinimale)
	{
		this.GAGNE = true;
		
		//On arrête le chrono et récupère le temps écoulé
		this.oChrono.pause();
		var temps=this.oChrono.getTemps();
		
		var niveau=iNiveauSelectionne+1;
		if(niveau.toString().length==1)
		{
			niveau="0"+niveau.toString();
		}
		
		var scoreTemps=3000-(temps*50);
		if(scoreTemps<=0)
		{
			scoreTemps=0;
		}
		var iScore = ((100-Math.floor(this.oTerrain.fAireTerrainActuel/this.oTerrain.fAireTerrainDepart*100)) * 50) - (this.oTerrain.iNbCoupe * 200)+scoreTemps;

		for(var i=0 ;i<oSauvegarde.length ; i++)
		{
			if(oSauvegarde[i].id==iNiveauSelectionne+1)
			{
				if(iScore>oSauvegarde[iNiveauSelectionne].score)
				{
					saveSauvegarde(niveau.toString(),this.oTerrain.iNbCoupe,this.oTerrain.fAireTerrainActuel/this.oTerrain.fAireTerrainDepart*100,temps,iScore);//On garde le score en sauvegarde
				}
				else
				{
					console.log("Gagné mais score de merde "+ iScore );
				}
				
			}
			else
			{
				saveSauvegarde(niveau.toString(),this.oTerrain.iNbCoupe,this.oTerrain.fAireTerrainActuel/this.oTerrain.fAireTerrainDepart*100,temps,iScore);
			}
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
	if(this.GAGNE)
	{

		this.oTerrain.supprimerPartie();
		
		// On ferme de plus en plus la porte gauche
		if(this.oPositionPorteGauche.x < 0)
		{
			if(this.oPositionPorteGauche.x + (canvas.width/2)/50 > 0)
				this.oPositionPorteGauche.x += -this.oPositionPorteGauche.x;
			else
				this.oPositionPorteGauche.x += (canvas.width/2)/50;
		}
		// On ferme de plus en plus la porte droite
		if(this.oPositionPorteDroite.x > canvas.width/2)
		{
			if(this.oPositionPorteDroite.x - (canvas.width/2)/50 < canvas.width/2)
				this.oPositionPorteDroite.x -= this.oPositionPorteDroite.x - canvas.width/2;
			else
				this.oPositionPorteDroite.x -= (canvas.width/2)/50;
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
	else if(this.oTerrain.bDisparitionPartie)
	{
		this.oTerrain.supprimerPartie();
	}
	// Trait a touché un ennemi
	else if(this.oTrait.bToucheEnnemi)
	{
		//on relance le chrono
		this.oChrono.reset();
		
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
					
					// on reset les éléments du jeu
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
								this.oTrait.oPositionEnnemiTouche.y, (100*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
					ctx.fill();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(254,230,157)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (100*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle), 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(251,215,109)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (100*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+4, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,200,61)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (100*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
					ctx.stroke();
					
					ctx.beginPath();
					ctx.lineWidth = 4;
					ctx.strokeStyle = "rgb(248,150,10)";
					ctx.arc(this.oTrait.oPositionEnnemiTouche.x, 
							this.oTrait.oPositionEnnemiTouche.y, (100*((fRatioLargeur+fRatioHauteur)/2)*this.fGrandeurCercle)+8, 0, 2 * Math.PI);
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
		// si le début du trait tracé se trouve à l'exterieur du Terrain
		if(this.oTrait.iDepartTraitDansTerrain == 0)
		{
			// si l'arrivée du trait tracé se trouve à l'intérieur du Terrain
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
							// on défini le point de départ du trait dans le Terrain
							this.oTrait.oPointDepart.x = aIntersection[2].x;
							this.oTrait.oPointDepart.y = aIntersection[2].y;
							
							this.oTerrain.aPremierCoteCoupe.push(i,i+1);
						}
					}
					this.oTrait.iTraitDansTerrain = 1;
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
			
			// si le trait sort du Terrain
			if(this.oTerrain.cn_PnPoly(this.oTrait.oPointArrivee) == 0 && this.oTrait.iTraitDansTerrain == 1 && this.oTrait.bToucheEnnemi == false)
			{	
				var iIntersection = 0;
				var bCoupe = false;
				
				for(var i=0; i<this.oTerrain.aListePoints.length-1; i++)
				{
					// Si le côté ne correspond pas au premier côté coupé
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
							
							// on défini le point d'arrivée du trait dans le Terrain
							this.oTrait.oPointArrivee.x = aIntersection[2].x;
							this.oTrait.oPointArrivee.y = aIntersection[2].y;
							this.oTerrain.aDeuxiemeCoteCoupe.push(i,i+1);
						}
					}
				}
				
				// si l'arrivée du trait tracé se trouve à l'intérieur du Terrain et que le traverse bien le terrain
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
				// coupé en plus de "oTerrain.aPremierCoteCoupe[0]"
				if(iIntersection == 1)
				{
					var bCoupe = this.oTerrain.couperForme(this.oTrait.oPointDepart, this.oTrait.oPointArrivee, this.aListeEnnemis);
					
					// si coupe impossible, on décide de mettre le compteur de clignotement à 4
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
**** on lance la pause
*** ========================================================================================================================================== 
**/
Partie.prototype.lancerPause = function()
{
	// on crée le canvas
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	
	// les étoiles
	for( var i = 0; i < this.stars.length; i++ ) 
	{
		if( this.stars[i].z <= 0 ) 
		{
			this.stars[i].x = randomRange(-25,25);
			this.stars[i].y = randomRange(-25,25);
			this.stars[i].z = this.MAX_DEPTH;
		}
 
		var k  = 128.0 / this.stars[i].z;
		var px = this.stars[i].x * k + canvas.width / 2;
		var py = this.stars[i].y * k + canvas.height / 2;
 
		if( px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height ) 
		{
			var size = (1 - this.stars[i].z / 32.0) * this.SIZE_STARS;
			var shade = parseInt((1 - this.stars[i].z / 32.0) * 255);
			
			ctx.beginPath();
			ctx.arc(px,py, size/2, 0, 2 * Math.PI);
			ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
			ctx.fill();
		}
	}
	
	// on trace le Terrain
	this.oTerrain.tracer();
	
	// on trace la barre d'avancement
	this.oBarreAvancement.tracer(this.oTerrain);
	

	
	// bouton Rejouer
	ctx.drawImage(this.oBoutonRejouer, 
					0, 
					0, 
					this.oBoutonRejouer.width, 
					this.oBoutonRejouer.height, 
					//position
					this.oPositionBoutonRejouer.x,
					this.oPositionBoutonRejouer.y,
					this.iTailleBouton, 
					this.iTailleBouton);
	
	// bouton pause
	ctx.drawImage(this.oBoutonPause, 
					0, 
					0, 
					this.oBoutonPause.width, 
					this.oBoutonPause.height, 
					//position
					this.oPositionBoutonPause.x,
					this.oPositionBoutonPause.y,
					this.iTailleBouton, 
					this.iTailleBouton);
				
	// les ennemis
	for(var i=0; i<this.aListeEnnemis.length; i++)
	{	
		ctx.drawImage(this.aListeEnnemis[i].oImage, 
						  0, 
						  0, 
						  this.aListeEnnemis[i].oImage.width, 
						  this.aListeEnnemis[i].oImage.height,
						  this.aListeEnnemis[i].oPosition.x,
						  this.aListeEnnemis[i].oPosition.y,
						  this.aListeEnnemis[i].iTailleX, 
						  this.aListeEnnemis[i].iTailleX);
	}
	
	// fond de pause
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.globalAlpha = 1;
	
	ctx.textAlign = 'center';
	ctx.font = this.iTailleFontMenu*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+'pt "SPACE"';
	ctx.fillStyle = "black";
	ctx.fillText("reprendre", this.oPositionBoutonReprendre.x, this.oPositionBoutonReprendre.y);
	ctx.fillText("menu",this.oPositionBoutonMenu.x, this.oPositionBoutonMenu.y);
	this.oPositionBoutonReprendre = new Point(canvas.width/2, canvas.height/2-25*((fRatioHauteur+fRatioLargeur)/2));
	this.oPositionBoutonMenu = new Point(canvas.width/2, canvas.height/2+25*((fRatioHauteur+fRatioLargeur)/2));
	ctx.textAlign = 'left';
	
	if(this.bSurBoutonReprendre)
	{
		ctx.save(); 
		ctx.translate(canvas.width/2-110*((fRatioHauteur+fRatioLargeur)/2)-(this.fTailleBoutonDeSelection/2), this.oPositionBoutonReprendre.y-18*((fRatioHauteur+fRatioLargeur)/2)/2-(this.fTailleBoutonDeSelection/2)); 
		ctx.translate(this.fTailleBoutonDeSelection/2, this.fTailleBoutonDeSelection/2); 
		ctx.rotate(this.fRotationCibles);
		ctx.drawImage(this.oBoutonDeSelection, -(this.fTailleBoutonDeSelection/2), -(this.fTailleBoutonDeSelection/2), this.fTailleBoutonDeSelection, this.fTailleBoutonDeSelection);
		ctx.restore();
		this.fRotationCibles += 0.05;
		this.fTailleBoutonDeSelection = 30*((fRatioLargeur+fRatioHauteur)/2);
	}
	if(this.bSurBoutonMenu)
	{
		ctx.save(); 
		ctx.translate(canvas.width/2-110*((fRatioHauteur+fRatioLargeur)/2)-(this.fTailleBoutonDeSelection/2), this.oPositionBoutonMenu.y-18*((fRatioHauteur+fRatioLargeur)/2)/2-(this.fTailleBoutonDeSelection/2)); 
		ctx.translate(this.fTailleBoutonDeSelection/2, this.fTailleBoutonDeSelection/2); 
		ctx.rotate(this.fRotationCibles);
		ctx.drawImage(this.oBoutonDeSelection, -(this.fTailleBoutonDeSelection/2), -(this.fTailleBoutonDeSelection/2), this.fTailleBoutonDeSelection, this.fTailleBoutonDeSelection);
		ctx.restore();
		this.fRotationCibles += 0.05;
		this.fTailleBoutonDeSelection = 30*((fRatioLargeur+fRatioHauteur)/2);
	}

}

/**
*** ==========================================================================================================================================
**** on lance l'écran de victoire
*** ========================================================================================================================================== 
**/
Partie.prototype.lancerVictoire = function()
{
	// on crée le canvas
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	
	// les étoiles
	for( var i = 0; i < this.stars.length; i++ ) 
	{
		if( this.stars[i].z <= 0 ) 
		{
			this.stars[i].x = randomRange(-25,25);
			this.stars[i].y = randomRange(-25,25);
			this.stars[i].z = this.MAX_DEPTH;
		}
 
		var k  = 128.0 / this.stars[i].z;
		var px = this.stars[i].x * k + canvas.width / 2;
		var py = this.stars[i].y * k + canvas.height / 2;
 
		if( px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height ) 
		{
			var size = (1 - this.stars[i].z / 32.0) * this.SIZE_STARS;
			var shade = parseInt((1 - this.stars[i].z / 32.0) * 255);
			
			ctx.beginPath();
			ctx.arc(px,py, size/2, 0, 2 * Math.PI);
			ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
			ctx.fill();
		}
	}
	
	// on trace le Terrain
	this.oTerrain.tracer();
	
	// on trace la barre d'avancement
	this.oBarreAvancement.tracer(this.oTerrain);
	
	// bouton Rejouer
	ctx.drawImage(this.oBoutonRejouer, 
					0, 
					0, 
					this.oBoutonRejouer.width, 
					this.oBoutonRejouer.height, 
					//position
					this.oPositionBoutonRejouer.x,
					this.oPositionBoutonRejouer.y,
					this.iTailleBouton, 
					this.iTailleBouton);
	
	// bouton pause
	ctx.drawImage(this.oBoutonPause, 
					0, 
					0, 
					this.oBoutonPause.width, 
					this.oBoutonPause.height, 
					//position
					this.oPositionBoutonPause.x,
					this.oPositionBoutonPause.y,
					this.iTailleBouton, 
					this.iTailleBouton);
				
	// les ennemis
	for(var i=0; i<this.aListeEnnemis.length; i++)
	{	
		ctx.drawImage(this.aListeEnnemis[i].oImage, 
						  0, 
						  0, 
						  this.aListeEnnemis[i].oImage.width, 
						  this.aListeEnnemis[i].oImage.height,
						  this.aListeEnnemis[i].oPosition.x,
						  this.aListeEnnemis[i].oPosition.y,
						  this.aListeEnnemis[i].iTailleX, 
						  this.aListeEnnemis[i].iTailleX);
	}
	
	// fond de pause
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.globalAlpha = 1;
	
	ctx.textAlign = 'center';
	ctx.font = this.iTailleFontMenu*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+'pt "SPACE"';
	ctx.fillStyle = "black";
	ctx.fillText("reprendre", this.oPositionBoutonReprendre.x, this.oPositionBoutonReprendre.y);
	ctx.fillText("menu",this.oPositionBoutonMenu.x, this.oPositionBoutonMenu.y);
	this.oPositionBoutonReprendre = new Point(canvas.width/2, canvas.height/2-25*((fRatioHauteur+fRatioLargeur)/2));
	this.oPositionBoutonMenu = new Point(canvas.width/2, canvas.height/2+25*((fRatioHauteur+fRatioLargeur)/2));
	ctx.textAlign = 'left';
	
	if(this.bSurBoutonReprendre)
	{
		ctx.save(); 
		ctx.translate(canvas.width/2-110*((fRatioHauteur+fRatioLargeur)/2)-(this.fTailleBoutonDeSelection/2), this.oPositionBoutonReprendre.y-18*((fRatioHauteur+fRatioLargeur)/2)/2-(this.fTailleBoutonDeSelection/2)); 
		ctx.translate(this.fTailleBoutonDeSelection/2, this.fTailleBoutonDeSelection/2); 
		ctx.rotate(this.fRotationCibles);
		ctx.drawImage(this.oBoutonDeSelection, -(this.fTailleBoutonDeSelection/2), -(this.fTailleBoutonDeSelection/2), this.fTailleBoutonDeSelection, this.fTailleBoutonDeSelection);
		ctx.restore();
		this.fRotationCibles += 0.05;
		this.fTailleBoutonDeSelection = 30*((fRatioLargeur+fRatioHauteur)/2);
	}
	if(this.bSurBoutonMenu)
	{
		ctx.save(); 
		ctx.translate(canvas.width/2-110*((fRatioHauteur+fRatioLargeur)/2)-(this.fTailleBoutonDeSelection/2), this.oPositionBoutonMenu.y-18*((fRatioHauteur+fRatioLargeur)/2)/2-(this.fTailleBoutonDeSelection/2)); 
		ctx.translate(this.fTailleBoutonDeSelection/2, this.fTailleBoutonDeSelection/2); 
		ctx.rotate(this.fRotationCibles);
		ctx.drawImage(this.oBoutonDeSelection, -(this.fTailleBoutonDeSelection/2), -(this.fTailleBoutonDeSelection/2), this.fTailleBoutonDeSelection, this.fTailleBoutonDeSelection);
		ctx.restore();
		this.fRotationCibles += 0.05;
		this.fTailleBoutonDeSelection = 30*((fRatioLargeur+fRatioHauteur)/2);
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
	this.oBarreAvancement.reset;
	
	
	}
