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
	this.oImageBandeau = new Image();
	this.oImageBandeau.src = 'img/menu/bandeau.png';
	iNombresImages++;
	this.oImageBandeau.onload = function()
	{
		iCompteurImages++;
	}
	
	this.aListeVignettesDepart = new Array();
	this.aListeVignettes = new Array();
	this.aListeTerrains = new Array();
	this.aListeRatioX = new Array();
	this.aListeRatioY = new Array();
	
	// on crée la liste des points des terrains grace à indexedDB
	var aListePointsTemp = new Array();

	// on remplit la liste
	for(var i=0; i<oNiveauPartie.length; i++)
	{
		aListePointsTemp[i] = new Array();
		
		for(var j=0; j<oNiveauPartie[i].Points.length; j++)
			aListePointsTemp[i].push(new Point(oNiveauPartie[i].Points[j].x, oNiveauPartie[i].Points[j].y));
	}
	
	// ajout des terrains dans les vignettes
	for(var i=0; i<aListePointsTemp.length; i++)
	{
		this.aListeVignettes[i] = new Array(Array(), new Point(0,0));
		
		for(var j=0; j<aListePointsTemp[i].length; j++)
			this.aListeVignettes[i][0].push(new Point(aListePointsTemp[i][j].x, aListePointsTemp[i][j].y));
	}
	
	// ajout des terrain dans les vignettes de départ
	for(var i=0; i<aListePointsTemp.length; i++)
	{
		this.aListeVignettesDepart[i] = new Array(Array(), new Point(0,0));
		
		for(var j=0; j<aListePointsTemp[i].length; j++)
			this.aListeVignettesDepart[i][0].push(new Point(aListePointsTemp[i][j].x, aListePointsTemp[i][j].y));
	}
			
	// ajout des terrain dans les vignettes fixe (va nous servir pour le redimensionnement des terrains quand resize de l'écran)
	for(var i=0; i<aListePointsTemp.length; i++)
	{
		this.aListeTerrains[i] = new Array();
		
		for(var j=0; j<aListePointsTemp[i].length; j++)
			this.aListeTerrains[i].push(new Point(aListePointsTemp[i][j].x, aListePointsTemp[i][j].y));
	}
	
	this.fEcartX_Vignettes = 30*((fRatioLargeur+fRatioHauteur)/2);
	this.fEcartY_Vignettes = 70*((fRatioLargeur+fRatioHauteur)/2);
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
		
		var fRatioX = this.iTailleVignettes / ((fEcartX+fEcartY)/2) - 0.07*((fRatioLargeur+fRatioHauteur)/2);
		var fRatioY = this.iTailleVignettes / ((fEcartX+fEcartY)/2) - 0.07*((fRatioLargeur+fRatioHauteur)/2);
		
		// si l'écart X ou Y de la forme dépasse la taille de la vignette
		if(fEcartX > fEcartY)
		{
			if(fEcartX*((fRatioX+fRatioY)/2) > this.iTailleVignettes)
			{
				var fRatioEcart = fRatioY/fRatioX;
				fRatioY = ((this.iTailleVignettes/fEcartX) * 2) - fRatioX - 0.05*((fRatioLargeur+fRatioHauteur)/2);
				fRatioX = fRatioY*fRatioEcart;
			}
		}
		else
		{
			if(fEcartY*((fRatioX+fRatioY)/2) > this.iTailleVignettes)
			{
				var fRatioEcart = fRatioX/fRatioY;
				fRatioX = ((this.iTailleVignettes/fEcartY) * 2) - fRatioY - 0.05*((fRatioLargeur+fRatioHauteur)/2);
				fRatioY = fRatioX*fRatioEcart;
			}
		}
		
		this.aListeRatioX.push(fRatioX);
		this.aListeRatioY.push(fRatioY);
		
		var fX_SupPourCentrer = (this.iTailleVignettes - fEcartX*fRatioX)/2;
		var fY_SupPourCentrer = (this.iTailleVignettes - fEcartY*fRatioY)/2;
		
		var fRatio = (fRatioX+fRatioY)/2;
		
		for(var j=0; j<this.aListeVignettes[i][0].length; j++)
		{
			// Vignettes
			this.aListeVignettes[i][0][j].x = this.aListeVignettes[i][1].x + this.aListeVignettes[i][0][j].x*fRatio - iXmin*fRatio + fX_SupPourCentrer;
			this.aListeVignettes[i][0][j].y = this.aListeVignettes[i][1].y + this.aListeVignettes[i][0][j].y*fRatio - iYmin*fRatio + fY_SupPourCentrer;
			
			// Vignettes de départ
			this.aListeVignettesDepart[i][0][j].x = this.aListeVignettes[i][0][j].x;
			this.aListeVignettesDepart[i][0][j].y = this.aListeVignettes[i][0][j].y;
		}
	}
	
	this.iEcranActuel = 0;
	this.iBulleActuelle = 0;
	this.bSlideAuto = false;
	
	iNiveauSelectionne = null;
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
		if(i == iNiveauSelectionne)
		{
			//ctx.rect(px,py,size,size);
			ctx.globalAlpha = 0.4;
			rectangleArrondi(this.aListeVignettes[i][1].x, this.aListeVignettes[i][1].y, this.iTailleVignettes, this.iTailleVignettes,
							 15, "rgb(255,255,255)", "rgb(255,255,255)", true, true, 10);
			ctx.globalAlpha = 1;
		}
	
		ctx.drawImage(this.oImageVignette, 
							0, 
							0, 
							this.oImageVignette.width, 
							this.oImageVignette.height, 
							this.aListeVignettes[i][1].x, 
							this.aListeVignettes[i][1].y, 
							this.iTailleVignettes, 
							this.iTailleVignettes);
		
		// ombre du terrain
		ctx.globalAlpha = 0.5;
		ctx.beginPath();
		ctx.fillStyle="rgb(90,90,90)";
		ctx.moveTo(this.aListeVignettes[i][0][0].x+2*((fRatioLargeur+fRatioHauteur)/2), this.aListeVignettes[i][0][0].y+2*((fRatioLargeur+fRatioHauteur)/2));
		
		for(var j=1; j < this.aListeVignettes[i][0].length; j++)
		{
			ctx.lineTo(this.aListeVignettes[i][0][j].x+2*((fRatioLargeur+fRatioHauteur)/2), this.aListeVignettes[i][0][j].y+2*((fRatioLargeur+fRatioHauteur)/2));
		}
		ctx.closePath();
		ctx.fill();
		ctx.globalAlpha = 1;
		
		// terrain dans la vignette
		ctx.beginPath();
		ctx.lineWidth=1*((fRatioLargeur+fRatioHauteur)/2);
		ctx.strokeStyle="white";
		ctx.fillStyle="rgb(90,90,90)";
		ctx.moveTo(this.aListeVignettes[i][0][0].x, this.aListeVignettes[i][0][0].y);
		
		for(var j=1; j < this.aListeVignettes[i][0].length; j++)
		{
			ctx.lineTo(this.aListeVignettes[i][0][j].x, this.aListeVignettes[i][0][j].y);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		// bandeau avec numéro du niveau
		ctx.drawImage(this.oImageBandeau, 
							0, 
							0, 
							this.oImageBandeau.width, 
							this.oImageBandeau.height, 
							this.aListeVignettes[i][1].x + 1, 
							this.aListeVignettes[i][1].y + 1, 
							22*((fRatioLargeur+fRatioHauteur)/2), 
							22*((fRatioLargeur+fRatioHauteur)/2));
	
		ctx.textAlign = 'center';		
		ctx.font = 5*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+'pt "SPACE"';
		ctx.fillStyle = "white";
		ctx.fillText(i+1, this.aListeVignettes[i][1].x + 15*((fRatioLargeur+fRatioHauteur)/2)/2 , this.aListeVignettes[i][1].y + 19*((fRatioLargeur+fRatioHauteur)/2)/2);
		
		// score
		var iNbCoupes = "-";
		var iAire = "-";
		var iTemps = "-";
		var iScore = "-";
		var scoreTemps=0;
		for(var j=0; j<oSauvegarde.length; j++)
		{
			if(oSauvegarde[j].id-1 == i)
			{
				iNbCoupes = oSauvegarde[j].nbCoupe;
				iAire = Math.floor(oSauvegarde[j].aireMinimaleAtteinte);
				iTemps= oSauvegarde[j].temps;
				scoreTemps=3000-(iTemps*50);
				if(scoreTemps<=0)
				{
					scoreTemps=0;
				}
				iScore = ((100-iAire) * 50) - (iNbCoupes * 200)+scoreTemps;
				break;
			}
		}
		
		ctx.globalAlpha = 0.5;
		ctx.textAlign = 'center';		
		ctx.font = 6*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+'pt "SPACE"';
		ctx.fillStyle = "rgb(90,90,90)";
		ctx.fillText(iScore, this.aListeVignettes[i][1].x + this.iTailleVignettes/2 + 0.8*((fRatioLargeur+fRatioHauteur)/2) , this.aListeVignettes[i][1].y + this.iTailleVignettes + 7*((fRatioLargeur+fRatioHauteur)/2) -  0.8*((fRatioLargeur+fRatioHauteur)/2));
		ctx.globalAlpha = 1;
		
		ctx.font = 6*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+'pt "SPACE"';
		ctx.fillStyle = "white";
		ctx.fillText(iScore, this.aListeVignettes[i][1].x + this.iTailleVignettes/2 , this.aListeVignettes[i][1].y + this.iTailleVignettes + 7*((fRatioLargeur+fRatioHauteur)/2));
		ctx.textAlign = 'left';
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
	// si un mouse click
	if(mouseDown == true)
	{
		for(var i=0; i<this.aListeVignettes.length; i++)
		{
				if(oPositionDepartSouris.x <= this.aListeVignettes[i][1].x+this.iTailleVignettes && oPositionDepartSouris.x >= this.aListeVignettes[i][1].x
					&& oPositionDepartSouris.y <= this.aListeVignettes[i][1].y+this.iTailleVignettes && oPositionDepartSouris.y >= this.aListeVignettes[i][1].y)
				{
					iNiveauSelectionne = i;
					break;
				}
		}
	}
	// si un mouse up et qu'il n'y a pas eu de mouseMove
	else if(!mouseDown && iNiveauSelectionne != null)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		initPartie();
	}
}
