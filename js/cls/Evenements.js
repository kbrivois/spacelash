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
	
	// si on clique sur le bouton pause
	if(oPartie.bSurBoutonPause)
	{
		if(!oPartie.bPause)
		{
			//On met le chrono en pause
			oPartie.oChrono.pause();
			oPartie.bPause = true;
		}
		else
		{
			//On relance le chrono
			oPartie.oChrono.start();
			oPartie.bPause = false;
			
		}
			
	}
	// si on clique sur le bouton Rejouer
	else if(oPartie.bSurBoutonRejouer)
	{
		oPartie.bGagne = false;
		oPartie.reset();
		//Reset du chrono
		oPartie.oChrono.reset();
	}
	
	//si le jeu est en pause
	if(oPartie.bPause)
	{
		// si on clique sur le bouton reprendre
		if(oPartie.bSurBoutonReprendre)
		{
			//On relance le chrono
			oPartie.oChrono.start();
			oPartie.bPause = false;
			oPartie.bSurBoutonReprendre = false;
		}
		// si on clique sur le bouton menu
		else if(oPartie.bSurBoutonMenu)
		{
			oPartie.oSonPartie.pause();
			oPartie.bSurBoutonMenu = false;
			oPartie = null;
			canvas.removeEventListener('mousemove', mouseMovementPartie, false);
			canvas.removeEventListener('mousedown', mouseClickPartie, false);
			canvas.removeEventListener('mouseup', mouseUnClickPartie, false);
			canvas.removeEventListener('mouseout', mouseOutCanvasPartie, false);
			window.removeEventListener('resize', screenResizePartie, false);
			
			canvas.addEventListener('mousemove', mouseMovementMenu, false);
			canvas.addEventListener('mousedown', mouseClickMenu, false);
			canvas.addEventListener('mouseup', mouseUnClickMenu, false);
			canvas.addEventListener('mouseout', mouseOutCanvasMenu, false);
			window.addEventListener('resize', screenResizeMenu, false);
			
			canvas.width = document.documentElement.clientWidth;
			canvas.height = document.documentElement.clientHeight;
			fRatioLargeur = (document.documentElement.clientWidth) / fLargeurDeBase;
			fRatioHauteur = (document.documentElement.clientHeight) / fHauteurDeBase;
			oMenu = new Menu(false, true);
			mainMenu();
		}
	}
	//si le joueur a gagn�
	else if(oPartie.bGagne)
	{
		// si on clique sur le bouton rejouer
		if(oPartie.bSurBoutonReprendre)
		{
			oPartie.bGagne = false;
			oPartie.reset();
			//Reset du chrono
			oPartie.oChrono.reset();
			oPartie.oChrono.start();
		}
		// si on clique sur le bouton menu
		else if(oPartie.bSurBoutonMenu)
		{
			oPartie.oSonPartie.pause();
			oPartie = null;
			canvas.removeEventListener('mousemove', mouseMovementPartie, false);
			canvas.removeEventListener('mousedown', mouseClickPartie, false);
			canvas.removeEventListener('mouseup', mouseUnClickPartie, false);
			canvas.removeEventListener('mouseout', mouseOutCanvasPartie, false);
			window.removeEventListener('resize', screenResizePartie, false);
			
			canvas.addEventListener('mousemove', mouseMovementMenu, false);
			canvas.addEventListener('mousedown', mouseClickMenu, false);
			canvas.addEventListener('mouseup', mouseUnClickMenu, false);
			canvas.addEventListener('mouseout', mouseOutCanvasMenu, false);
			window.addEventListener('resize', screenResizeMenu, false);
			
			canvas.width = document.documentElement.clientWidth;
			canvas.height = document.documentElement.clientHeight;
			fRatioLargeur = (document.documentElement.clientWidth) / fLargeurDeBase;
			fRatioHauteur = (document.documentElement.clientHeight) / fHauteurDeBase;
			oMenu = new Menu(false, true);
			
			mainMenu();
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
	
	// curseur sur le bouton pause
	if(x <= oPartie.oPositionBoutonPause.x+oPartie.iTailleBouton && x >= oPartie.oPositionBoutonPause.x
		&& y <= oPartie.oPositionBoutonPause.y+oPartie.iTailleBouton && y >= oPartie.oPositionBoutonPause.y)
	{
		oPartie.bSurBoutonPause = true;
		oPartie.bSurBoutonRejouer = false;
	}
	// curseur sur le bouton Rejouer
	else if (x <= oPartie.oPositionBoutonRejouer.x+oPartie.iTailleBouton && x >= oPartie.oPositionBoutonRejouer.x
				&& y <= oPartie.oPositionBoutonRejouer.y+oPartie.iTailleBouton && y >= oPartie.oPositionBoutonRejouer.y)
	{
		oPartie.bSurBoutonRejouer = true;
		oPartie.bSurBoutonPause = false;
	}
	else
	{
		oPartie.bSurBoutonRejouer = false;
		oPartie.bSurBoutonPause = false;
	}
	
	// si le jeu est en pause
	if(oPartie.bPause)
	{
		// si le curseur se trouve sur le bouton reprendre
		if(y <= oPartie.oPositionBoutonReprendre.y && y >= oPartie.oPositionBoutonReprendre.y-oPartie.iTailleFontMenu*((fRatioHauteur+fRatioLargeur)/2))
		{
			oPartie.bSurBoutonReprendre = true;
			oPartie.bSurBoutonMenu = false;
		}
		// si le curseur se trouve sur le bouton menu
		else if(y <= oPartie.oPositionBoutonMenu.y && y >= oPartie.oPositionBoutonMenu.y-oPartie.iTailleFontMenu*((fRatioHauteur+fRatioLargeur)/2))
		{
			oPartie.bSurBoutonMenu = true;
			oPartie.bSurBoutonReprendre = false;
		}
		// si le curseur se trouve sur le bouton menu
		else
		{
			oPartie.bSurBoutonReprendre = false;
			oPartie.bSurBoutonMenu = false;
		}
	}
	
	// si le joueur a gagn�
	else if(oPartie.bGagne)
	{
		// si le curseur se trouve sur le bouton reprendre
		if(y <= canvas.height/2 + 110*fRatioHauteur - 25*((fRatioHauteur+fRatioLargeur)/2)/1.4 + 25*((fRatioHauteur+fRatioLargeur)/2) && y >= canvas.height/2 + 110*fRatioHauteur - 25*((fRatioHauteur+fRatioLargeur)/2)/1.4)
		{
			oPartie.bSurBoutonReprendre = true;
			oPartie.bSurBoutonMenu = false;
		}
		// si le curseur se trouve sur le bouton menu
		else if(y <= canvas.height/2 + 160*fRatioHauteur - 25*((fRatioHauteur+fRatioLargeur)/2)/1.4 + 25*((fRatioHauteur+fRatioLargeur)/2) && y >= canvas.height/2 + 160*fRatioHauteur - 25*((fRatioHauteur+fRatioLargeur)/2)/1.4)
		{
			oPartie.bSurBoutonMenu = true;
			oPartie.bSurBoutonReprendre = false;
		}
		// si le curseur se trouve sur le bouton menu
		else
		{
			oPartie.bSurBoutonReprendre = false;
			oPartie.bSurBoutonMenu = false;
		}
	}
}


var mouseOutCanvasPartie = function(e) 
{
	oPartie.bSourisDansTerrain = undefined;
}


/*** ================================================================================================================================================
Ev�nement resize partie
====================================================================================================================================================*/

// redimensionnement de la fen�tre
var screenResizePartie = function(e) 
{
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	var fNewRatioLargeur = canvas.width / fLargeurDeBase;
	var fNewRatioHauteur = canvas.height / fHauteurDeBase;
	
	if(fNewRatioLargeur < fNewRatioHauteur)
	{		
		fNewRatioHauteur = fNewRatioLargeur;
	}
	else
	{
		fNewRatioLargeur = fNewRatioHauteur;
	}
	
	/* === Red�finition de la barre d'avancement === */
	var fMilieu = canvas.width/2;
	var fPourcentageTaille = 0.8;
	oPartie.oBarreAvancement.oPoint1 = new Point(fMilieu - (canvas.width/2)*fPourcentageTaille , 370);
	oPartie.oBarreAvancement.oPoint2 = new Point(fMilieu + (canvas.width/2)*fPourcentageTaille, 370);
	
	/* === Red�finition du Terrain === */
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
	
	/* === Red�finition des ennemis === */
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
	
	/* === Redimensionnement des �toiles en fond ===*/
	oPartie.SIZE_STARS = oPartie.SIZE_STARS/((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des cibles ===*/
	oPartie.fTailleCibles = (oPartie.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des boutons ===*/
	
	oPartie.oPositionBoutonRejouer.x = oPartie.oPositionBoutonRejouer.x / fRatioLargeur * fNewRatioLargeur;
	oPartie.oPositionBoutonRejouer.y = oPartie.oPositionBoutonRejouer.y / fRatioHauteur * fNewRatioHauteur;
	
	oPartie.oPositionBoutonPause.x = oPartie.oPositionBoutonPause.x / fRatioLargeur * fNewRatioLargeur;
	oPartie.oPositionBoutonPause.y = oPartie.oPositionBoutonPause.y / fRatioHauteur * fNewRatioHauteur;
	oPartie.iTailleBouton = oPartie.iTailleBouton / ((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	
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

var mouseClickAccueil = function(e)
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
	
	// si le joueur clique sur le bouton "jouer"
	if(y >= canvas.height/2-(oMenu.oBouton.height/2)*((fRatioLargeur+fRatioHauteur)/2)/2 && y <= canvas.height/2+(oMenu.oBouton.height/2)*((fRatioLargeur+fRatioHauteur)/2)/2
	&& x >= canvas.width/2-(oMenu.oBouton.width/2)*((fRatioLargeur+fRatioHauteur)/2)/2 && x <= canvas.width/2+(oMenu.oBouton.width/2)*((fRatioLargeur+fRatioHauteur)/2)/2)
	{
		oMenu.bEcranAccueil = false;
		oMenu.bEcranNiveaux = true;
	}
}

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
	
	// on v�rifie si on a cliqu� sur une vignette
	oMenu.verifierSelectionVignette();
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
	
	// on replace les �crans correctement une fois que le clic est relach�
	oMenu.bSlideAuto = true;
}


/*** ================================================================================================================================================
Ev�nement resize Menu
====================================================================================================================================================*/

// redimensionnement de la fen�tre
var screenResizeMenu = function(e) 
{
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	
	var fNewRatioLargeur = canvas.width / fLargeurDeBase;
	var fNewRatioHauteur = canvas.height / fHauteurDeBase;
	
	/* === �crans === */
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
		
		// si on ne se trouve pas sur la derni�re slide
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
			
			// Vignettes de d�part
			oMenu.aListeVignettesDepart[i][0][j].x = oMenu.aListeVignettes[i][0][j].x;
			oMenu.aListeVignettesDepart[i][0][j].y = oMenu.aListeVignettes[i][0][j].y;
		}
	}

	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
}