// On r�cup�re la position de l'�l�ment canvas pour pouvoir
// r�cup�rer la position de la souris � l'int�rieur du canvas.
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
Ev�nements pour la partie
====================================================================================================================================================
============================================================================================================================================
=====================================================================================================================================*/


/*** ================================================================================================================================================
Ev�nements souris pour la partie
====================================================================================================================================================*/

var mouseClickPartie = function(e)
{
	// on r�cup�re les coordonn�es de la souris
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
	
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a �t� touch�
	if(oPartie.oTrait.iCompteurFaireClignoter == 0 && oPartie.oTrait.bToucheEnnemi == false)
	{
		mouseDown = true;
		oPartie.oTrait.oPointDepart.x = x
		oPartie.oTrait.oPointDepart.y = y
		
		// si le joueur commence � tracer le trait dans le Terrain
		// --> pas d'actions
		if(oPartie.oTerrain.cn_PnPoly(oPartie.oTrait.oPointDepart) == 1)
		{
			oPartie.oTrait.iDepartTraitDansTerrain = 1;	
			oPartie.oTrait.oPointDepart.x = 0;
			oPartie.oTrait.oPointDepart.y = 0;
		}
	}
}

var mouseUnClickPartie = function (e) 
{
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a �t� touch�
	if(oPartie.oTrait.iCompteurFaireClignoter == 0 && oPartie.oTrait.bToucheEnnemi == false)
	{
		mouseDown = false;
		mouseMove = false;
		oPartie.oTrait.reset();
	}
}

var mouseMovementPartie = function(e) 
{
	// on r�cup�re les coordonn�es de la souris
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
	
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a �t� touch�
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
}


var mouseOutCanvasPartie = function(e) 
{
	oPartie.bSourisDansTerrain = undefined;
}


/*** ================================================================================================================================================
Ev�nement resize
====================================================================================================================================================*/

// redimensionnement de la fen�tre
var screenResizePartie = function(e) 
{
	canvas.width = document.documentElement.clientWidth-4;
	canvas.height = document.documentElement.clientHeight-4;
	
	var fNewRatioLargeur = canvas.width / 300;
	var fNewRatioHauteur = canvas.height / 400;
	
	var fNewRatioLargeurPorte = canvas.width / 300;
	var fNewRatioHauteurPorte = canvas.height / 400;
	
	if(fNewRatioLargeur > 2)
		fNewRatioLargeur = 2;
	if(fNewRatioHauteur > 2)
		fNewRatioHauteur = 2;
	
	/* === Red�finition de la barre d'avancement === */
	var fMilieu = canvas.width/2;
	var fPourcentageTaille = 0.8;
	oPartie.oBarreAvancement.oPoint1 = new Point(fMilieu - (canvas.width/2)*fPourcentageTaille , 370);
	oPartie.oBarreAvancement.oPoint2 = new Point(fMilieu + (canvas.width/2)*fPourcentageTaille, 370);
	
	/* === Red�finition du Terrain === */
	for(var i=0; i<oPartie.oTerrain.aListePointsDepart.length; i++)
		oPartie.oTerrain.aListePointsDepart[i] = new Point( (oPartie.oTerrain.aListePointsDepart[i].x/fRatioLargeur)*fNewRatioLargeur , (oPartie.oTerrain.aListePointsDepart[i].y/fRatioHauteur)*fNewRatioHauteur);
	for(var i=0; i<oPartie.oTerrain.aListePoints.length; i++)
		oPartie.oTerrain.aListePoints[i] = new Point( (oPartie.oTerrain.aListePoints[i].x/fRatioLargeur)*fNewRatioLargeur , (oPartie.oTerrain.aListePoints[i].y/fRatioHauteur)*fNewRatioHauteur);
	
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
		oPartie.oTerrain.aListePointsDepart[i].y = oPartie.oTerrain.aListePointsDepart[i].y + (canvas.height-iHauteurTerrain)/2 - iYmin - 15*fNewRatioHauteur;
	}
	
	for(var i=0; i<oPartie.oTerrain.aListePoints.length; i++)
	{
		oPartie.oTerrain.aListePoints[i].x = oPartie.oTerrain.aListePoints[i].x + (canvas.width-iLargeurTerrain)/2 - iXmin;
		oPartie.oTerrain.aListePoints[i].y = oPartie.oTerrain.aListePoints[i].y + (canvas.height-iHauteurTerrain)/2 - iYmin - 15*fNewRatioHauteur;
	}
	
	var fPourcentageAireMinimale = oPartie.oTerrain.fAireMinimale/oPartie.oTerrain.fAireTerrainDepart;
	oPartie.oTerrain.fAireTerrainDepart = oPartie.oTerrain.calculerAireDepart();
	oPartie.oTerrain.fAireTerrainActuel = oPartie.oTerrain.calculerAire();
	oPartie.oTerrain.fAireMinimale = oPartie.oTerrain.fAireTerrainDepart*fPourcentageAireMinimale;
	
	/* === Red�finition des ennemis === */
	for(var i=0; i<oPartie.aListeEnnemis.length; i++)
	{
		oPartie.aListeEnnemis[i].fVitesseDepart = (oPartie.aListeEnnemis[i].fVitesseDepart / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].fVitesse = (oPartie.aListeEnnemis[i].fVitesse / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].iTailleX = (oPartie.aListeEnnemis[i].iTailleX / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].iTailleY = (oPartie.aListeEnnemis[i].iTailleY / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].oPosition = new Point(oPartie.aListeEnnemis[i].oPosition.x*(fNewRatioLargeur/fRatioLargeur) + (canvas.width-iLargeurTerrain)/2 - iXmin, 
													   oPartie.aListeEnnemis[i].oPosition.y*(fNewRatioHauteur/fRatioHauteur) + (canvas.height-iHauteurTerrain)/2 - iYmin - 15*fNewRatioHauteur);
	}
	
	/* === Redimensionnement des �toiles en fond ===*/
	oPartie.SIZE_STARS = oPartie.SIZE_STARS/((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des cibles ===*/
	oPartie.fTailleCibles = (oPartie.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des portes ===*/
	
	// porte de gauche
	oPartie.fLargeurPorteGauche = canvas.width/2;
	oPartie.fHauteurPorteGauche = canvas.height;
	oPartie.oPositionPorteGauche = new Point(-oPartie.fLargeurPorteGauche,0);
	
	// porte de droite
	oPartie.fLargeurPorteDroite = canvas.width/2;
	oPartie.fHauteurPorteDroite = canvas.height;
	oPartie.oPositionPorteDroite = new Point(canvas.width,0);
	
	// porte du bas
	oPartie.fLargeurPorteBas = oPartie.oPorteBas.width * (oPartie.fLargeurPorteDroite/oPartie.oPorteDroite.width);
	oPartie.fHauteurPorteBas = oPartie.oPorteBas.height * (oPartie.fHauteurPorteDroite/oPartie.oPorteDroite.height);
	oPartie.oPositionPorteBas = new Point((canvas.width/2)-(oPartie.fLargeurPorteBas/2),canvas.height);
	
	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
}


/* ================================================================================================================================
============================================================================================================================================
====================================================================================================================================================
Ev�nements pour le menu
====================================================================================================================================================
============================================================================================================================================
=================================================================================================================================== */


/*** ================================================================================================================================================
Ev�nements souris
====================================================================================================================================================*/

var mouseClickMenu = function(e)
{
	// on r�cup�re les coordonn�es de la souris
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
	
	// on v�rifie si on a cliqu� sur une vignette
	oMenu.verifierSelectionVignette();
}

var mouseUnClickMenu = function (e) 
{
	mouseDown = false;
	mouseMove = false;
	
	// on replace les �crans correctement une fois que le clic est relach�
	oMenu.bSlideAuto = true;
}

var mouseMovementMenu = function(e) 
{
	// on r�cup�re les coordonn�es de la souris
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
	
	// on replace les �crans correctement une fois que le clic est relach�
	oMenu.bSlideAuto = true;
}


/*** ================================================================================================================================================
Ev�nement resize Menu
====================================================================================================================================================*/

// redimensionnement de la fen�tre
var screenResizeMenu = function(e) 
{
	canvas.width = document.documentElement.clientWidth-4;
	canvas.height = document.documentElement.clientHeight-4;
	
	var fNewRatioLargeur = canvas.width / 300;
	var fNewRatioHauteur = canvas.height / 400;
	
	// �crans
	for(var i=0; i<oMenu.aEcransNiveauxDepart.length; i++)
	{
		oMenu.aEcransNiveauxDepart[i][1].x = i*canvas.width;
	}
	for(var i=0; i<oMenu.aEcransNiveaux.length; i++)
	{
		oMenu.aEcransNiveaux[i][1].x = oMenu.aEcransNiveauxDepart[i][1].x - oMenu.aEcransNiveauxDepart[oMenu.iEcranActuel][1].x;
	}
	
	// vignettes
	oMenu.iTailleVignettes = oMenu.iTailleVignettes / ((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	oMenu.fEcartVignettes = oMenu.fEcartVignettes / ((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	// vignettes
	for(var i=0; i<oMenu.aListeVignettes.length; i++)
	{
		// position du terrain contenu dans la vignette
		for(var j=0; j<oMenu.aListeVignettes[i].length; j++)
		{
			oMenu.aListeVignettes[i][0][j].x *= fRatioLargeur;
			oMenu.aListeVignettes[i][0][j].y *= fRatioHauteur;
		}
		// position de la vignette
		// on place les vignettes au milieu (largeur)
		oMenu.aListeVignettes[i][1].x = canvas.width/2 - ((oMenu.aListeVignettes.length-1)*(oMenu.fEcartVignettes)+oMenu.iTailleVignettes+10)/2 + (10/2+(i*oMenu.fEcartVignettes));
		oMenu.aListeVignettes[i][1].y = 10;
	}
	
	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
}