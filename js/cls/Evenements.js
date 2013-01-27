// On récupère la position de l'élément canvas pour pouvoir
// récupérer la position de la souris à l'intérieur du canvas.
var getOffset = function(e) 
{
    var cx = 0;
    var cy = 0;
 
    while(e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) 
	{
        cx += e.offsetLeft - e.scrollLeft;
        cy += e.offsetTop - e.scrollTop;
        e = e.offsetParent;
    }
    return { top: cy, left: cx };
}


/* ================================================================================================================================
============================================================================================================================================
====================================================================================================================================================
Evénements pour la partie
====================================================================================================================================================
============================================================================================================================================
=====================================================================================================================================*/


/*** ================================================================================================================================================
Evénements souris pour la partie
====================================================================================================================================================*/

var mouseClickPartie = function(e)
{		
	// on récupère les coordonnées de la souris
	if(e.offsetX || e.offsetY) 
	{
        x = e.pageX - getOffset(document.getElementById('partie')).left - window.pageXOffset;
        y = e.pageY - getOffset(document.getElementById('partie')).top - window.pageYOffset;
    }
    else if(e.layerX || e.layerY) 
	{
        x = (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
        - getOffset(document.getElementById('partie')).left - window.pageXOffset;
        y = (e.clientY + document.body.scrollTop + document.documentElement.scrollTop)
        - getOffset(document.getElementById('partie')).top;
    }  
	
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a été touché
	if(oPartie.oTrait.iCompteurFaireClignoter == 0 && oPartie.oTrait.bToucheEnnemi == false)
	{
		mouseDown = true;
		oPartie.oTrait.oPointDepart.x = x
		oPartie.oTrait.oPointDepart.y = y
		
		// si le joueur commence à tracer le trait dans le Terrain
		// --> pas d'actions
		if(oPartie.oTerrain.cn_PnPoly(oPartie.oTrait.oPointDepart) == 1)
		{
			oPartie.oTrait.iDepartTraitDansTerrain = 1;	
			oPartie.oTrait.oPointDepart.x = 0;
			oPartie.oTrait.oPointDepart.y = 0;
		}
	}
	
	// si on clique sur le bouton pause
	if(oPartie.bSurBoutonPause)
	{
		if(!oPartie.pause)
			oPartie.pause = true;
		else
			oPartie.pause = false;
	}
	// si on clique sur le bouton replay
	else if(oPartie.bSurBoutonReplay)
	{
		oPartie.reset();
	}
}

var mouseUnClickPartie = function (e) 
{
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a été touché
	if(oPartie.oTrait.iCompteurFaireClignoter == 0 && oPartie.oTrait.bToucheEnnemi == false)
	{
		mouseDown = false;
		mouseMove = false;
		oPartie.oTrait.reset();
	}
}

var mouseMovementPartie = function(e) 
{
	// on récupère les coordonnées de la souris
	if(e.offsetX || e.offsetY) 
	{
        x = e.pageX - getOffset(document.getElementById('partie')).left - window.pageXOffset;
        y = e.pageY - getOffset(document.getElementById('partie')).top - window.pageYOffset;
    }
    else if(e.layerX || e.layerY) 
	{
        x = (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
        - getOffset(document.getElementById('partie')).left - window.pageXOffset;
        y = (e.clientY + document.body.scrollTop + document.documentElement.scrollTop)
        - getOffset(document.getElementById('partie')).top;
    }

	// position de la souris
	oPositionSouris.x = x;
	oPositionSouris.y = y;
	
	// si le curseur se trouve dans le Terrain
	if(oPartie.oTerrain.cn_PnPoly(new Point(x, y)))
	{
		oPartie.bSourisDansTerrain = true;
	}
	// sinon
	else
	{
		oPartie.bSourisDansTerrain = false;
	}
	
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a été touché
	if(oPartie.oTrait.iCompteurFaireClignoter == 0 && oPartie.oTrait.bToucheEnnemi == false)
	{
		if(mouseDown)
		{
			mouseMove = true;
			oPartie.oTrait.oPointArrivee.x = x;
			oPartie.oTrait.oPointArrivee.y = y;
		}
		if(mouseDown && oPartie.oTrait.iTraitDansTerrain == 1)
		{
			oPartie.bSourisDansTerrain = false;
		}
	}
	
	// curseur sur le bouton pause
	if(x <= oPartie.oPositionBoutonPause.x+oPartie.iTailleBouton && x >= oPartie.oPositionBoutonPause.x
		&& y <= oPartie.oPositionBoutonPause.y+oPartie.iTailleBouton && y >= oPartie.oPositionBoutonPause.y)
	{
		oPartie.bSurBoutonPause = true;
		oPartie.bSurBoutonReplay = false;
	}
	// curseur sur le bouton replay
	else if (x <= oPartie.oPositionBoutonReplay.x+oPartie.iTailleBouton && x >= oPartie.oPositionBoutonReplay.x
				&& y <= oPartie.oPositionBoutonReplay.y+oPartie.iTailleBouton && y >= oPartie.oPositionBoutonReplay.y)
	{
		oPartie.bSurBoutonReplay = true;
		oPartie.bSurBoutonPause = false;
	}
	else
	{
		oPartie.bSurBoutonReplay = false;
		oPartie.bSurBoutonPause = false;
	}
}


var mouseOutCanvasPartie = function(e) 
{
	oPartie.bSourisDansTerrain = undefined;
}


/*** ================================================================================================================================================
Evénement resize partie
====================================================================================================================================================*/

// redimensionnement de la fenêtre
var screenResizePartie = function(e) 
{
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	var fNewRatioLargeur = canvas.width / fLargeurDeBase;
	var fNewRatioHauteur = canvas.height / fHauteurDeBase;
	
	var fNewRatioLargeurPorte = fNewRatioLargeur;
	var fNewRatioHauteurPorte = fNewRatioHauteur;
	
	if(fNewRatioLargeur < fNewRatioHauteur)
	{		
		fNewRatioHauteur = fNewRatioLargeur * fLargeurDeBase/fHauteurDeBase;
	}
	else
	{
		fNewRatioLargeur = fNewRatioHauteur * fHauteurDeBase/fLargeurDeBase;
	}
	
	/* === Redéfinition de la barre d'avancement === */
	var fMilieu = canvas.width/2;
	var fPourcentageTaille = 0.8;
	oPartie.oBarreAvancement.oPoint1 = new Point(fMilieu - (canvas.width/2)*fPourcentageTaille , 370);
	oPartie.oBarreAvancement.oPoint2 = new Point(fMilieu + (canvas.width/2)*fPourcentageTaille, 370);
	
	/* === Redéfinition du Terrain === */
	for(var i=0; i<oPartie.oTerrain.aListePointsDepart.length; i++)
		oPartie.oTerrain.aListePointsDepart[i] = new Point( (oPartie.oTerrain.aListePointsDepart[i].x/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2) , (oPartie.oTerrain.aListePointsDepart[i].y/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2));
	for(var i=0; i<oPartie.oTerrain.aListePoints.length; i++)
		oPartie.oTerrain.aListePoints[i] = new Point( (oPartie.oTerrain.aListePoints[i].x/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2) , (oPartie.oTerrain.aListePoints[i].y/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2));
	
	var iXmin = oPartie.oTerrain.aListePointsDepart[0].x ;
	var iXmax = oPartie.oTerrain.aListePointsDepart[0].x ;
	var iYmin = oPartie.oTerrain.aListePointsDepart[0].y ;
	var iYmax = oPartie.oTerrain.aListePointsDepart[0].y ;
	
	for(var i=1; i<oPartie.oTerrain.aListePointsDepart.length; i++)
	{
		if(oPartie.oTerrain.aListePointsDepart[i].x  < iXmin)
			iXmin = oPartie.oTerrain.aListePointsDepart[i].x ;
		if(oPartie.oTerrain.aListePointsDepart[i].x  > iXmax)
			iXmax = oPartie.oTerrain.aListePointsDepart[i].x ;
		if(oPartie.oTerrain.aListePointsDepart[i].y  < iYmin)
			iYmin = oPartie.oTerrain.aListePointsDepart[i].y ;
		if(oPartie.oTerrain.aListePointsDepart[i].y  > iYmax)
			iYmax = oPartie.oTerrain.aListePointsDepart[i].y ;
	}
	
	var iLargeurTerrain = iXmax - iXmin;
	var iHauteurTerrain = iYmax - iYmin;
	
	for(var i=0; i<oPartie.oTerrain.aListePointsDepart.length; i++)
	{
		oPartie.oTerrain.aListePointsDepart[i].x = oPartie.oTerrain.aListePointsDepart[i].x + (canvas.width-iLargeurTerrain)/2 - iXmin;
		oPartie.oTerrain.aListePointsDepart[i].y = oPartie.oTerrain.aListePointsDepart[i].y + (canvas.height-iHauteurTerrain)/2 - iYmin;
	}
	
	for(var i=0; i<oPartie.oTerrain.aListePoints.length; i++)
	{
		oPartie.oTerrain.aListePoints[i].x = oPartie.oTerrain.aListePoints[i].x + (canvas.width-iLargeurTerrain)/2 - iXmin;
		oPartie.oTerrain.aListePoints[i].y = oPartie.oTerrain.aListePoints[i].y + (canvas.height-iHauteurTerrain)/2 - iYmin;
	}
	
	var fPourcentageAireMinimale = oPartie.oTerrain.fAireMinimale/oPartie.oTerrain.fAireTerrainDepart;
	oPartie.oTerrain.fAireTerrainDepart = oPartie.oTerrain.calculerAireDepart();
	oPartie.oTerrain.fAireTerrainActuel = oPartie.oTerrain.calculerAire();
	oPartie.oTerrain.fAireMinimale = oPartie.oTerrain.fAireTerrainDepart*fPourcentageAireMinimale;
	
	/* === Redéfinition des ennemis === */
	for(var i=0; i<oPartie.aListeEnnemis.length; i++)
	{
		oPartie.aListeEnnemis[i].fVitesseDepart = (oPartie.aListeEnnemis[i].fVitesseDepart / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].fVitesse = oPartie.aListeEnnemis[i].fVitesseDepart;
		oPartie.aListeEnnemis[i].iTailleX = (oPartie.aListeEnnemis[i].iTailleX / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].iTailleY = (oPartie.aListeEnnemis[i].iTailleY / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].oPosition = new Point(oPartie.aListeEnnemis[i].oPosition.x/((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2) + (canvas.width-iLargeurTerrain)/2 - iXmin, 
													   oPartie.aListeEnnemis[i].oPosition.y/((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2) + (canvas.height-iHauteurTerrain)/2 - iYmin);
													   
		oPartie.aListeEnnemis[i].calculerDeplacement();
	}
	
	/* === Redimensionnement des étoiles en fond ===*/
	oPartie.SIZE_STARS = oPartie.SIZE_STARS/((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des cibles ===*/
	oPartie.fTailleCibles = (oPartie.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des portes ===*/
	
	// porte de gauche
	oPartie.fLargeurPorteGauche = canvas.width/2;
	oPartie.fHauteurPorteGauche = canvas.height;
	oPartie.oPositionPorteGauche.x = (oPartie.oPositionPorteGauche.x/oPartie.fRatioLargeurPorte)*fNewRatioLargeurPorte;
	oPartie.oPositionPorteGauche.y = (oPartie.oPositionPorteGauche.y/oPartie.fRatioHauteurPorte)*fNewRatioHauteurPorte;
	
	// porte de droite
	oPartie.fLargeurPorteDroite = canvas.width/2;
	oPartie.fHauteurPorteDroite = canvas.height;
	oPartie.oPositionPorteDroite.x = (oPartie.oPositionPorteDroite.x/oPartie.fRatioLargeurPorte)*fNewRatioLargeurPorte;
	oPartie.oPositionPorteDroite.y = (oPartie.oPositionPorteDroite.y/oPartie.fRatioHauteurPorte)*fNewRatioHauteurPorte;
	
	// porte du bas
	oPartie.fLargeurPorteBas = oPartie.oPorteBas.width * (oPartie.fLargeurPorteDroite/oPartie.oPorteDroite.width);
	oPartie.fHauteurPorteBas = oPartie.oPorteBas.height * (oPartie.fHauteurPorteDroite/oPartie.oPorteDroite.height);
	oPartie.oPositionPorteBas.x = (oPartie.oPositionPorteBas.x/oPartie.fRatioLargeurPorte)*fNewRatioLargeurPorte;
	oPartie.oPositionPorteBas.y = (oPartie.oPositionPorteBas.y/oPartie.fRatioHauteurPorte)*fNewRatioHauteurPorte;
	
	/* === Redimensionnement des boutons ===*/
	
	oPartie.oPositionBoutonReplay.x = oPartie.oPositionBoutonReplay.x / fRatioLargeur * fNewRatioLargeur;
	oPartie.oPositionBoutonReplay.y = oPartie.oPositionBoutonReplay.y / fRatioHauteur * fNewRatioHauteur;
	
	oPartie.oPositionBoutonPause.x = oPartie.oPositionBoutonPause.x / fRatioLargeur * fNewRatioLargeur;
	oPartie.oPositionBoutonPause.y = oPartie.oPositionBoutonPause.y / fRatioHauteur * fNewRatioHauteur;
	oPartie.iTailleBouton = oPartie.iTailleBouton / ((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
	oPartie.fRatioLargeurPorte = fNewRatioLargeurPorte;
	oPartie.fRatioHauteurPorte = fNewRatioHauteurPorte;
}


/* ================================================================================================================================
============================================================================================================================================
====================================================================================================================================================
Evénements pour le menu
====================================================================================================================================================
============================================================================================================================================
=================================================================================================================================== */


/*** ================================================================================================================================================
Evénements souris
====================================================================================================================================================*/

var mouseClickMenu = function(e)
{
	// on récupère les coordonnées de la souris
	if(e.offsetX || e.offsetY) 
	{
        x = e.pageX - getOffset(document.getElementById('menu')).left - window.pageXOffset;
        y = e.pageY - getOffset(document.getElementById('menu')).top - window.pageYOffset;
    }
    else if(e.layerX || e.layerY) 
	{
        x = (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
        - getOffset(document.getElementById('menu')).left - window.pageXOffset;
        y = (e.clientY + document.body.scrollTop + document.documentElement.scrollTop)
        - getOffset(document.getElementById('menu')).top;
    }  

	mouseDown = true;
	
	oPositionDepartSouris.x = x;
	oPositionDepartSouris.y = y;
	
	// on vérifie si on a cliqué sur une vignette
	oMenu.verifierSelectionVignette();
}

var mouseUnClickMenu = function (e) 
{
	mouseDown = false;
	mouseMove = false;
	
	// on replace les écrans correctement une fois que le clic est relaché
	oMenu.bSlideAuto = true;
	
	// on vérifie si on a cliqué sur une vignette
	oMenu.verifierSelectionVignette();
}

var mouseMovementMenu = function(e) 
{
	// on récupère les coordonnées de la souris
	if(e.offsetX || e.offsetY) 
	{
        x = e.pageX - getOffset(document.getElementById('menu')).left - window.pageXOffset;
        y = e.pageY - getOffset(document.getElementById('menu')).top - window.pageYOffset;
    }
    else if(e.layerX || e.layerY) 
	{
        x = (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
        - getOffset(document.getElementById('menu')).left - window.pageXOffset;
        y = (e.clientY + document.body.scrollTop + document.documentElement.scrollTop)
        - getOffset(document.getElementById('menu')).top;
    }

	if(mouseDown)
	{
		// s'il y a eu un click down sur une vignette, on annule car il y a un mouse move avant un mouse up
		iNiveauSelectionne = null;
	
		oPositionSouris.x = x;
		oPositionSouris.y = y;
		
		oMenu.slide();
		
		oPositionDepartSouris.x = x;
		oPositionDepartSouris.y = y;
	}
}


var mouseOutCanvasMenu = function(e) 
{
	mouseDown = false;
	mouseMove = false;
	
	// on replace les écrans correctement une fois que le clic est relaché
	oMenu.bSlideAuto = true;
}


/*** ================================================================================================================================================
Evénement resize Menu
====================================================================================================================================================*/

// redimensionnement de la fenêtre
var screenResizeMenu = function(e) 
{
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	var fNewRatioLargeur = canvas.width / fLargeurDeBase;
	var fNewRatioHauteur = canvas.height / fHauteurDeBase;
	
	/* === écrans === */
	for(var i=0; i<oMenu.aEcransNiveauxDepart.length; i++)
	{
		oMenu.aEcransNiveauxDepart[i][1].x = i*canvas.width;
	}
	for(var i=0; i<oMenu.aEcransNiveaux.length; i++)
	{
		oMenu.aEcransNiveaux[i][1].x = oMenu.aEcransNiveauxDepart[i][1].x - oMenu.aEcransNiveauxDepart[oMenu.iEcranActuel][1].x;
	}
	
	/* === vignettes === */
	oMenu.fEcartX_Vignettes *= ( ((fNewRatioLargeur+fNewRatioHauteur)/2) / ((fRatioLargeur+fRatioHauteur)/2) );
	oMenu.fEcartY_Vignettes *= ( ((fNewRatioLargeur+fNewRatioHauteur)/2) / ((fRatioLargeur+fRatioHauteur)/2) );
	oMenu.iTailleVignettes *= ( ((fNewRatioLargeur+fNewRatioHauteur)/2) / ((fRatioLargeur+fRatioHauteur)/2) );
	
	var iPageVignette = 0;
	
	// Initialisation de la position des vignettes et des terrains contenus dans les vignettes
	for(var i=0; i<oMenu.aListeVignettes.length; i++)
	{
		// position de la vignette
		// on place les vignettes au milieu (largeur)
		if(i != 0)
			iPageVignette = Math.floor(i / (oMenu.iNbreColonnesMax * oMenu.iNbreLignesMax));
		
		// si on ne se trouve pas sur la dernière slide
		if(iPageVignette+1 != oMenu.iNbrePages)
		{
			oMenu.aListeVignettes[i][1].x = canvas.width*iPageVignette + canvas.width/2 
												- (( (oMenu.iNbreColonnesMax*oMenu.iNbreLignesMax) -1)*(oMenu.fEcartX_Vignettes)+oMenu.iTailleVignettes+10)/2 
												+ (10/2 + ( (i%(oMenu.iNbreColonnesMax*oMenu.iNbreLignesMax)) * oMenu.fEcartX_Vignettes));
												
			oMenu.aListeVignettes[i][1].y = canvas.height/2
												- (( (oMenu.iNbreLignesMax) -1)*(oMenu.fEcartY_Vignettes)+oMenu.iTailleVignettes+10)/2
												+ (10/2+( (i%(oMenu.iNbreLignesMax)) * oMenu.fEcartY_Vignettes));
		}
		else
		{
			oMenu.aListeVignettes[i][1].x = canvas.width*iPageVignette + canvas.width/2 
												- (( oMenu.aListeVignettes.length - ((oMenu.iNbrePages-1)*oMenu.iNbreColonnesMax*oMenu.iNbreLignesMax) -1)*(oMenu.fEcartX_Vignettes)+oMenu.iTailleVignettes+10)/2 
												+ (10/2+( (i%(oMenu.iNbreColonnesMax*oMenu.iNbreLignesMax)) * oMenu.fEcartX_Vignettes));
			
			oMenu.aListeVignettes[i][1].y = canvas.height/2
												- (( (oMenu.iNbreLignesMax) -1)*(oMenu.fEcartY_Vignettes)+oMenu.iTailleVignettes+10)/2
												+ (10/2+( (i%(oMenu.iNbreLignesMax)) * oMenu.fEcartY_Vignettes));
		}
		
		oMenu.aListeVignettesDepart[i][1].x = oMenu.aListeVignettes[i][1].x;
		oMenu.aListeVignettesDepart[i][1].y = oMenu.aListeVignettes[i][1].y;
		
		var iXmin = oMenu.aListeTerrains[i][0].x;
		var iXmax = oMenu.aListeTerrains[i][0].x;
		var iYmin = oMenu.aListeTerrains[i][0].y;
		var iYmax = oMenu.aListeTerrains[i][0].y;
		
		/*=== position du terrain contenu dans la vignette ===*/
		
		for(var j=1; j<oMenu.aListeTerrains[i].length; j++)
		{
			if(oMenu.aListeTerrains[i][j].x < iXmin)
				iXmin = oMenu.aListeTerrains[i][j].x;
			if(oMenu.aListeTerrains[i][j].x > iXmax)
				iXmax = oMenu.aListeTerrains[i][j].x;
			if(oMenu.aListeTerrains[i][j].y < iYmin)
				iYmin = oMenu.aListeTerrains[i][j].y;
			if(oMenu.aListeTerrains[i][j].y > iYmax)
				iYmax = oMenu.aListeTerrains[i][j].y;
		}
		
		var fEcartX = iXmax - iXmin;
		var fEcartY = iYmax - iYmin;
		
		var fRatioX = oMenu.aListeRatioX[i] * ( ((fNewRatioLargeur+fNewRatioHauteur)/2) / ((fRatioLargeur+fRatioHauteur)/2) );
		var fRatioY = oMenu.aListeRatioY[i] * ( ((fNewRatioLargeur+fNewRatioHauteur)/2) / ((fRatioLargeur+fRatioHauteur)/2) );
		
		oMenu.aListeRatioX[i] = fRatioX;
		oMenu.aListeRatioY[i] = fRatioY;	
		
		var fX_SupPourCentrer = (oMenu.iTailleVignettes - fEcartX*fRatioX)/2;
		var fY_SupPourCentrer = (oMenu.iTailleVignettes - fEcartY*fRatioY)/2;
		
		var fRatio = (fRatioX+fRatioY)/2;
		
		for(var j=0; j<oMenu.aListeVignettes[i][0].length; j++)
		{
			// Vignettes
			oMenu.aListeVignettes[i][0][j].x = oMenu.aListeVignettes[i][1].x + oMenu.aListeTerrains[i][j].x*fRatio - iXmin*fRatio + fX_SupPourCentrer;
			oMenu.aListeVignettes[i][0][j].y = oMenu.aListeVignettes[i][1].y + oMenu.aListeTerrains[i][j].y*fRatio - iYmin*fRatio + fY_SupPourCentrer;
			
			// Vignettes de départ
			oMenu.aListeVignettesDepart[i][0][j].x = oMenu.aListeVignettes[i][0][j].x;
			oMenu.aListeVignettesDepart[i][0][j].y = oMenu.aListeVignettes[i][0][j].y;
		}
	}

	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
}