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
		oPartie.mouseDown = true;
		oPartie.oTrait.oPointDepart.x = x
		oPartie.oTrait.oPointDepart.y = y
		
		// si le joueur commence à tracer le trait dans le polygone
		// --> pas d'actions
		if(oPartie.oPolygone.cn_PnPoly(oPartie.oTrait.oPointDepart) == 1)
		{
			oPartie.oTrait.iDepartTraitDansPolygone = 1;	
			oPartie.oTrait.oPointDepart.x = 0;
			oPartie.oTrait.oPointDepart.y = 0;
		}
	}
}

var mouseUnClickPartie = function (e) 
{
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a été touché
	if(oPartie.oTrait.iCompteurFaireClignoter == 0 && oPartie.oTrait.bToucheEnnemi == false)
	{
		oPartie.mouseDown = false;
		oPartie.mouseMove = false;
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
	oPartie.oPositionSouris.x = x;
	oPartie.oPositionSouris.y = y;
	
	// si le curseur se trouve dans le polygone
	if(oPartie.oPolygone.cn_PnPoly(new Point(x, y)))
	{
		oPartie.bSourisDansPolygone = true;
	}
	// sinon
	else
	{
		oPartie.bSourisDansPolygone = false;
	}
	
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a été touché
	if(oPartie.oTrait.iCompteurFaireClignoter == 0 && oPartie.oTrait.bToucheEnnemi == false)
	{
		if(oPartie.mouseDown)
		{
			oPartie.mouseMove = true;
			oPartie.oTrait.oPointArrivee.x = x;
			oPartie.oTrait.oPointArrivee.y = y;
		}
		if(oPartie.mouseDown && oPartie.oTrait.iTraitDansPolygone == 1)
		{
			oPartie.bSourisDansPolygone = false;
		}
	}
}


var mouseOutCanvasPartie = function(e) 
{
	oPartie.bSourisDansPolygone = undefined;
}

/*** ================================================================================================================================================
Evénement resize Partie
====================================================================================================================================================*/

// redimensionnement de la fenêtre
var screenResizePartie = function(e) 
{
	oPartie.canvas.width = document.documentElement.clientWidth-4;
	oPartie.canvas.height = document.documentElement.clientHeight-4;
	
	var fNewRatioLargeur = oPartie.canvas.width / 300;
	var fNewRatioHauteur = oPartie.canvas.height / 400;
	
	/* === Redéfinition de la barre d'avancement === */
	var fMilieu = oPartie.canvas.width/2;
	var fPourcentageTaille = 0.8;
	oPartie.oBarreAvancement.oPoint1 = new Point(fMilieu - (fPourcentageTaille/2)*oPartie.canvas.width , 370);
	oPartie.oBarreAvancement.oPoint2 = new Point(fMilieu + (fPourcentageTaille/2)*oPartie.canvas.width, 370);
	
	/* === Redéfinition du polygone === */
	for(var i=0; i<oPartie.oPolygone.aListePointsDepart.length; i++)
		oPartie.oPolygone.aListePointsDepart[i] = new Point( (oPartie.oPolygone.aListePointsDepart[i].x/fRatioLargeur)*fNewRatioLargeur , (oPartie.oPolygone.aListePointsDepart[i].y/fRatioHauteur)*fNewRatioHauteur);
	for(var i=0; i<oPartie.oPolygone.aListePoints.length; i++)
		oPartie.oPolygone.aListePoints[i] = new Point( (oPartie.oPolygone.aListePoints[i].x/fRatioLargeur)*fNewRatioLargeur , (oPartie.oPolygone.aListePoints[i].y/fRatioHauteur)*fNewRatioHauteur);
	
	var fPourcentageAireMinimale = oPartie.oPolygone.fAireMinimale/oPartie.oPolygone.fAireTerrainDepart;
	oPartie.oPolygone.fAireTerrainDepart = oPartie.oPolygone.calculerAireDepart();
	oPartie.oPolygone.fAireTerrainActuel = oPartie.oPolygone.calculerAire();
	oPartie.oPolygone.fAireMinimale = oPartie.oPolygone.fAireTerrainDepart*fPourcentageAireMinimale;
	
	/* === Redéfinition des ennemis === */
	for(var i=0; i<oPartie.aListeEnnemis.length; i++)
	{
		oPartie.aListeEnnemis[i].fVitesseDepart = (oPartie.aListeEnnemis[i].fVitesseDepart / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].fVitesse = (oPartie.aListeEnnemis[i].fVitesse / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].iTailleX = (oPartie.aListeEnnemis[i].iTailleX / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].iTailleY = (oPartie.aListeEnnemis[i].iTailleY / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		oPartie.aListeEnnemis[i].oPosition = new Point(oPartie.aListeEnnemis[i].oPosition.x*(fNewRatioLargeur/fRatioLargeur), oPartie.aListeEnnemis[i].oPosition.y*(fNewRatioHauteur/fRatioHauteur))
	}
	
	/* === Redimensionnement des étoiles en fond ===*/
	oPartie.SIZE_STARS = oPartie.SIZE_STARS/((fRatioLargeur+fRatioHauteur)/2) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des cibles ===*/
	oPartie.fTailleCibles = (oPartie.fTailleCibles/((fRatioLargeur+fRatioHauteur)/2))*((fNewRatioLargeur+fNewRatioHauteur)/2);
	
	/* === Redimensionnement des portes ===*/
	// gauche
	oPartie.fLargeurPorteGauche = oPartie.canvas.width/2;
	oPartie.fHauteurPorteGauche = oPartie.canvas.height;
	oPartie.oPositionPorteGauche = new Point((oPartie.oPositionPorteGauche.x/fRatioLargeur) * fNewRatioLargeur, 0);
	// droite
	oPartie.fLargeurPorteDroite = oPartie.canvas.width/2;
	oPartie.fHauteurPorteDroite = oPartie.canvas.height;
	oPartie.oPositionPorteDroite = new Point((oPartie.oPositionPorteDroite.x/fRatioLargeur) * fNewRatioLargeur, 0);
	// bas
	oPartie.fLargeurPorteBas = oPartie.oPorteBas.width * (oPartie.fLargeurPorteDroite/oPartie.oPorteDroite.width);
	oPartie.fHauteurPorteBas = oPartie.oPorteBas.height * (oPartie.fHauteurPorteDroite/oPartie.oPorteDroite.height);
	oPartie.oPositionPorteBas = new Point((oPartie.oPositionPorteBas.x/fRatioLargeur) * fNewRatioLargeur, (oPartie.oPositionPorteBas.y/fRatioHauteur) * fNewRatioHauteur);
	
	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
}