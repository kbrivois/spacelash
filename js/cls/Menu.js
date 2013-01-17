function Menu()  
{
	iCompteurImages = 0;
	iNombresImages = 0;
	
	// ------------------------ Fond
	this.oFond = new Image();
	this.oFond.src = 'img/menu/fond2.jpg';
	iNombresImages++;
	this.oFond.onload = function()
	{
		iCompteurImages++;
	}
	
	// ------------------------ Vignettes
	this.oImageVignette = new Image();
	this.oImageVignette.src = 'img/menu/vignette2.png';
	iNombresImages++;
	this.oImageVignette.onload = function()
	{
		iCompteurImages++;
	}
	
	this.aListeVignettesDepart = new Array();
	this.aListeVignettes = new Array();
	
	var aListePointsTemp1 = new Array();

	aListePointsTemp1.push(new Point(50,50));
	aListePointsTemp1.push(new Point(250,50));
	aListePointsTemp1.push(new Point(180,175));
	aListePointsTemp1.push(new Point(250,300));
	aListePointsTemp1.push(new Point(50,300));
	aListePointsTemp1.push(new Point(120,175));
	aListePointsTemp1.push(new Point(50,50));

	
	var aListePointsTemp2 = new Array();

	aListePointsTemp2.push(new Point(0,300));
	aListePointsTemp2.push(new Point(150,0));
	aListePointsTemp2.push(new Point(300,300));
	aListePointsTemp2.push(new Point(150,150));
	aListePointsTemp2.push(new Point(150,300));
	aListePointsTemp2.push(new Point(75,200));
	aListePointsTemp2.push(new Point(0,300));
	
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettes.push( new Array(Array(), new Point(0,0)) );
	
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	this.aListeVignettesDepart.push( new Array(Array(), new Point(0,0)) );
	
	// ajout des terrain dans les vignettes
	for(var i=0; i<aListePointsTemp1.length; i++)
		this.aListeVignettes[0][0].push(new Point(aListePointsTemp1[i].x, aListePointsTemp1[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[1][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[2][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[3][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[4][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[5][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[6][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[7][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[8][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[9][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettes[10][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	
	// ajout des terrain dans les vignettes de départ
	for(var i=0; i<aListePointsTemp1.length; i++)
		this.aListeVignettesDepart[0][0].push(new Point(aListePointsTemp1[i].x, aListePointsTemp1[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[1][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[2][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[3][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[4][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[5][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[6][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[7][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[8][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[9][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	for(var i=0; i<aListePointsTemp2.length; i++)
		this.aListeVignettesDepart[10][0].push(new Point(aListePointsTemp2[i].x, aListePointsTemp2[i].y));
	
	this.fEcartX_Vignettes = 30*((fRatioLargeur+fRatioHauteur)/2);
	this.fEcartY_Vignettes = 60*((fRatioLargeur+fRatioHauteur)/2);
	this.iTailleVignettes = 50*((fRatioLargeur+fRatioHauteur)/2);
	
	// ------------------------ Initialisation des écrans de niveaux (nombre d'écrans)
	this.aEcransNiveauxDepart = new Array();
	this.aEcransNiveaux = new Array();
	
	this.iNbreColonnesMax = 4;
	this.iNbreLignesMax = 2;
	
	this.iNbrePages = Math.ceil(this.aListeVignettes.length / (this.iNbreColonnesMax * this.iNbreLignesMax));
	
	for(var i=0; i<this.iNbrePages; i++)
	{
		this.aEcransNiveauxDepart[i] = new Array(i,new Point(i*canvas.width,0));			
		this.aEcransNiveaux[i] = new Array(i,new Point(i*canvas.width,0))
	}
	
	var iPageVignette = 0;
	
	// ------------------------ Initialisation de la position des vignettes et des terrains contenus dans les vignettes
	for(var i=0; i<this.aListeVignettes.length; i++)
	{
		// position de la vignette
		// on place les vignettes au milieu (largeur)
		if(i != 0)
			iPageVignette = Math.floor(i / (this.iNbreColonnesMax * this.iNbreLignesMax));
		
		// si on ne se trouve pas sur la dernière slide
		if(iPageVignette+1 != this.iNbrePages)
		{
			this.aListeVignettes[i][1].x = canvas.width*iPageVignette + canvas.width/2 
												- (( (this.iNbreColonnesMax*this.iNbreLignesMax) -1)*(this.fEcartX_Vignettes)+this.iTailleVignettes+10)/2 
												+ (10/2 + ( (i%(this.iNbreColonnesMax*this.iNbreLignesMax)) * this.fEcartX_Vignettes));
												
			this.aListeVignettes[i][1].y = canvas.height/2
												- (( (this.iNbreLignesMax) -1)*(this.fEcartY_Vignettes)+this.iTailleVignettes+10)/2
												+ (10/2+( (i%(this.iNbreLignesMax)) * this.fEcartY_Vignettes));
		}
		else
		{
			this.aListeVignettes[i][1].x = canvas.width*iPageVignette + canvas.width/2 
												- (( this.aListeVignettes.length - ((this.iNbrePages-1)*this.iNbreColonnesMax*this.iNbreLignesMax) -1)*(this.fEcartX_Vignettes)+this.iTailleVignettes+10)/2 
												+ (10/2+( (i%(this.iNbreColonnesMax*this.iNbreLignesMax)) * this.fEcartX_Vignettes));
			
			this.aListeVignettes[i][1].y = canvas.height/2
												- (( (this.iNbreLignesMax) -1)*(this.fEcartY_Vignettes)+this.iTailleVignettes+10)/2
												+ (10/2+( (i%(this.iNbreLignesMax)) * this.fEcartY_Vignettes));
		}
		
		this.aListeVignettesDepart[i][1].x = this.aListeVignettes[i][1].x;
		this.aListeVignettesDepart[i][1].y = this.aListeVignettes[i][1].y;
		
		var iXmin = this.aListeVignettes[i][0][0].x;
		var iXmax = this.aListeVignettes[i][0][0].x;
		var iYmin = this.aListeVignettes[i][0][0].y;
		var iYmax = this.aListeVignettes[i][0][0].y;
		
		/*=== position du terrain contenu dans la vignette ===*/
		
		for(var j=1; j<this.aListeVignettes[i][0].length; j++)
		{
			if(this.aListeVignettes[i][0][j].x < iXmin)
				iXmin = this.aListeVignettes[i][0][j].x;
			if(this.aListeVignettes[i][0][j].x > iXmax)
				iXmax = this.aListeVignettes[i][0][j].x;
			if(this.aListeVignettes[i][0][j].y < iYmin)
				iYmin = this.aListeVignettes[i][0][j].y;
			if(this.aListeVignettes[i][0][j].y > iYmax)
				iYmax = this.aListeVignettes[i][0][j].y;
		}
		
		var fEcartX = iXmax - iXmin;
		var fEcartY = iYmax - iYmin;
		var fRatioX = this.iTailleVignettes / fEcartX - 0.05*((fRatioLargeur+fRatioHauteur)/2);
		var fRatioY = this.iTailleVignettes / fEcartY - 0.05*((fRatioLargeur+fRatioHauteur)/2);
		var fX_SupPourCentrer = (this.iTailleVignettes - fEcartX*fRatioX)/2;
		var fY_SupPourCentrer = (this.iTailleVignettes - fEcartY*fRatioY)/2;
		
		for(var j=0; j<this.aListeVignettes[i][0].length; j++)
		{
			// Vignettes
			this.aListeVignettes[i][0][j].x = this.aListeVignettes[i][1].x + this.aListeVignettes[i][0][j].x*fRatioX - iXmin*fRatioX + fX_SupPourCentrer;
			this.aListeVignettes[i][0][j].y = this.aListeVignettes[i][1].y + this.aListeVignettes[i][0][j].y*fRatioY - iYmin*fRatioY + fY_SupPourCentrer;
			
			// Vignettes de départ
			this.aListeVignettesDepart[i][0][j].x = this.aListeVignettes[i][0][j].x;
			this.aListeVignettesDepart[i][0][j].y = this.aListeVignettes[i][0][j].y;
		}
	}
	
	this.iEcranActuel = 0;
	this.iBulleActuelle = 0;
	this.bSlideAuto = false;
}


/**
*** ==========================================================================================================================================
**** fonction qui permet de dessiner le menu
*** ========================================================================================================================================== 
**/
Menu.prototype.lancer = function()
{
	// on crée le canvas
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// fond
	ctx.drawImage(this.oFond, 0, 0, this.oFond.width, this.oFond.height, 0, 0, canvas.width, canvas.height);

	/*
	* =======================
	*  Slide auto
	* =======================
	*/
	
	// s'il est nécessaire de faire slider automatiquement les écrans après un click up
	if(this.bSlideAuto)
	{
		// si l'écran se trouve entre 0 et canvas.width/2
		if(this.aEcransNiveaux[this.iEcranActuel][1].x >= 0 && this.aEcransNiveaux[this.iEcranActuel][1].x <= canvas.width/2)
		{
			// tant que le slide n'est pas fini
			if(this.aEcransNiveaux[this.iEcranActuel][1].x-25*fRatioLargeur > 0)
			{
				// --- Les écrans
				for(var i=0; i<this.aEcransNiveaux.length; i++)
					this.aEcransNiveaux[i][1].x -= 25*fRatioLargeur;
					
				// --- Les vignettes
				for(var i=0; i<this.aListeVignettes.length; i++)
				{
					this.aListeVignettes[i][1].x -= 25*fRatioLargeur;
					
					// le terrain	
					for(var j=0; j<this.aListeVignettes[i][0].length; j++)
					{
						this.aListeVignettes[i][0][j].x -= 25*fRatioLargeur;
					}
				}
			}
			// fin du slide
			else
			{
				// --- Les vignettes
				for(var i=0; i<this.aListeVignettes.length; i++)
				{
					this.aListeVignettes[i][1].x -= this.aEcransNiveaux[this.iEcranActuel][1].x;
					
					// le terrain	
					for(var j=0; j<this.aListeVignettes[i][0].length; j++)
					{
						this.aListeVignettes[i][0][j].x -= this.aEcransNiveaux[this.iEcranActuel][1].x;
					}
				}
					
				// --- Les écrans
				for(var i=0; i<this.aEcransNiveaux.length; i++)
					this.aEcransNiveaux[i][1].x = this.aEcransNiveauxDepart[i][1].x - this.aEcransNiveauxDepart[this.iEcranActuel][1].x;
					
				this.bSlideAuto = false;
				this.iBulleActuelle = this.iEcranActuel;
			}
		}
		// si l'écran se trouve entre canvas.width/2 et canvas.width
		else
		{
			// tant que le slide n'est pas fini
			if(this.aEcransNiveaux[this.iEcranActuel][1].x+25*fRatioLargeur < 0)
			{
				// --- Les écrans
				for(var i=0; i<this.aEcransNiveaux.length; i++)
					this.aEcransNiveaux[i][1].x += 25*fRatioLargeur;
				
				// --- Les vignettes
				for(var i=0; i<this.aListeVignettes.length; i++)
				{
					this.aListeVignettes[i][1].x += 25*fRatioLargeur;
					
					// le terrain	
					for(var j=0; j<this.aListeVignettes[i][0].length; j++)
					{
						this.aListeVignettes[i][0][j].x += 25*fRatioLargeur;
					}
				}
			}
			// fin du slide
			else
			{
				// --- Les vignettes
				for(var i=0; i<this.aListeVignettes.length; i++)
				{
					this.aListeVignettes[i][1].x += (0 - this.aEcransNiveaux[this.iEcranActuel][1].x);
					
					// le terrain	
					for(var j=0; j<this.aListeVignettes[i][0].length; j++)
					{
						this.aListeVignettes[i][0][j].x += (0 - this.aEcransNiveaux[this.iEcranActuel][1].x);
					}
				}
				
				// --- Les écrans
				for(var i=0; i<this.aEcransNiveaux.length; i++)
					this.aEcransNiveaux[i][1].x = this.aEcransNiveauxDepart[i][1].x - this.aEcransNiveauxDepart[this.iEcranActuel][1].x;
				
				this.bSlideAuto = false;
				this.iBulleActuelle = this.iEcranActuel;
			}
		}
	}
	
	/*
	* =======================
	*  On dessine les bulles de numéros de pages
	* =======================
	*/
	
	var fTailleBulle = 5 * fRatioLargeur;
	var fEcartBulle = 15 * fRatioLargeur;
	
	for(var i=0; i<this.aEcransNiveaux.length; i++)
	{
		var fPosX = canvas.width/2 - ((this.aEcransNiveaux.length-1)*fEcartBulle*1.5)/2 + i*(fEcartBulle*1.5);
		var fPosY = canvas.height - fTailleBulle - 20;
		
		if(i == this.iBulleActuelle)
		{
			ctx.beginPath();
			ctx.arc(fPosX, fPosY, fTailleBulle, 0, 2 * Math.PI);
			ctx.lineWidth = 1*((fRatioLargeur+fRatioHauteur)/2);
			ctx.fillStyle = "rgb(255,255,255)";
			ctx.strokeStyle = "rgb(90,90,90)";
			ctx.fill();
			ctx.stroke();
		}
		else
		{
			ctx.beginPath();
			ctx.arc(fPosX, fPosY, fTailleBulle, 0, 2 * Math.PI);
			ctx.fillStyle = "rgb(90,90,90)";
			ctx.fill();
		} 
	}
	
	/*
	* =======================
	*  On dessine les vignettes
	* =======================
	*/
	
	for(var i=0; i<this.aListeVignettes.length; i++)
	{
		ctx.drawImage(this.oImageVignette, 
							0, 
							0, 
							this.oImageVignette.width, 
							this.oImageVignette.height, 
							this.aListeVignettes[i][1].x, 
							this.aListeVignettes[i][1].y, 
							this.iTailleVignettes, 
							this.iTailleVignettes);
	
		// On dessine les terrains contenus dans les vignettes
		if(i != 0)
		{
			ctx.globalAlpha = 0.4;
		}
		
		ctx.beginPath();
		ctx.lineWidth=1*((fRatioLargeur+fRatioHauteur)/2);;
		ctx.strokeStyle="white";
		ctx.fillStyle="rgb(90,90,90)";
		ctx.moveTo(this.aListeVignettes[i][0][0].x, this.aListeVignettes[i][0][0].y);
		
		for(var j=1; j < this.aListeVignettes[i][0].length; j++)
		{
			ctx.lineTo(this.aListeVignettes[i][0][j].x, this.aListeVignettes[i][0][j].y);
		}
	
		ctx.fill();
		ctx.stroke();
		
		ctx.globalAlpha = 1;
	}
}

/**
*** ==========================================================================================================================================
**** fonction qui permet de faire slider les écrans
*** ========================================================================================================================================== 
**/
Menu.prototype.slide = function()
{
	var bStop = false;

	// --- Les slides
	for(var i=0; i<this.aEcransNiveaux.length; i++)
	{
		// si le début de l'écran se trouve entre 0 et canvas.width/2, il devient l'écran actuel
		if(this.aEcransNiveaux[i][1].x >= 0 && this.aEcransNiveaux[i][1].x <= canvas.width/2)
		{
			this.iEcranActuel = i;
		}
		// si la fin de l'écran se trouve entre canvas.width/2 et canvas.width, il devient l'écran actuel
		else if(this.aEcransNiveaux[i][1].x+canvas.width >= canvas.width/2 && this.aEcransNiveaux[i][1].x+canvas.width <= canvas.width)
		{
			this.iEcranActuel = i;
		}
		
		// si on se trouve sur l'écran 0
		if(i == 0)
		{
			if(this.aEcransNiveaux[i][1].x <= 0)
			{
				this.aEcransNiveaux[i][1].x = this.aEcransNiveaux[i][1].x + (oPositionSouris.x-oPositionDepartSouris.x);
				
			}
			// si on se trouve sur l'écran 0 et qu'on essaye de le slider vers la droite
			else
			{
				// on réinitialise les positions des écrans
				for(var i=0; i<this.aEcransNiveaux.length; i++)
					this.aEcransNiveaux[i][1].x = this.aEcransNiveauxDepart[i][1].x;
				
				bStop = true;
				
				break;
			}
		}
		// si on se trouve sur le dernier ecran
		else if(i == this.aEcransNiveaux.length-1)
		{
			if(this.aEcransNiveaux[i][1].x >= 0)
			{
				this.aEcransNiveaux[i][1].x = this.aEcransNiveaux[i][1].x + (oPositionSouris.x-oPositionDepartSouris.x);
			}
			// si on se trouve sur le dernier ecran et qu'on essaye de le slider vers la gauche
			else
			{
				for(var i=0; i<this.aEcransNiveaux.length; i++)
					this.aEcransNiveaux[i][1].x = this.aEcransNiveauxDepart[i][1].x - (this.aEcransNiveaux.length-1)*canvas.width;
				
				bStop = true;
					
				break;
			}
		}
		else
		{
			this.aEcransNiveaux[i][1].x = this.aEcransNiveaux[i][1].x + (oPositionSouris.x-oPositionDepartSouris.x);
		}
	}
	
	// --- Les vignettes
	for(var i=0; i<this.aListeVignettes.length; i++)
	{
		if(!bStop)
		{
			this.aListeVignettes[i][1].x += (oPositionSouris.x-oPositionDepartSouris.x);
			// le terrain	
			for(var j=0; j<this.aListeVignettes[i][0].length; j++)
			{
				this.aListeVignettes[i][0][j].x += (oPositionSouris.x-oPositionDepartSouris.x);
			}
		}
		else
		{
			// Premier écran
			if(this.iEcranActuel == 0)
			{
				this.aListeVignettes[i][1].x = this.aListeVignettesDepart[i][1].x;
				// le terrain	
				for(var j=0; j<this.aListeVignettes[i][0].length; j++)
				{
					this.aListeVignettes[i][0][j].x = this.aListeVignettesDepart[i][0][j].x;
				}
			}
			// dernier écran
			else
			{
				this.aListeVignettes[i][1].x = this.aListeVignettesDepart[i][1].x - (this.aEcransNiveaux.length-1)*canvas.width;
				// le terrain	
				for(var j=0; j<this.aListeVignettes[i][0].length; j++)
				{
					this.aListeVignettes[i][0][j].x = this.aListeVignettesDepart[i][0][j].x - (this.aEcransNiveaux.length-1)*canvas.width;
				}
			}
		}
	}
}

/**
*** ==========================================================================================================================================
**** fonction qui permet de vérifier s'il y a eu un clique down et clique up sur une vignette
*** ========================================================================================================================================== 
**/
Menu.prototype.verifierSelectionVignette = function()
{
	for(var i=0; i<this.aListeVignettes.length; i++)
	{
		if(i==0)
		{
			if(oPositionDepartSouris.x <= this.aListeVignettes[i][1].x+this.iTailleVignettes && oPositionDepartSouris.x >= this.aListeVignettes[i][1].x
				&& oPositionDepartSouris.y <= this.aListeVignettes[i][1].y+this.iTailleVignettes && oPositionDepartSouris.y >= this.aListeVignettes[i][1].y)
			{
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				initPartie();
				break;
			}
		}
	}
}
