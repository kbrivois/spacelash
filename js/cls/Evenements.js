/*** ================================================================================================================================================
Evénements souris pour la partie
====================================================================================================================================================*/

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

var mouseClick = function(e)
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
	if(oTrait.iCompteurFaireClignoter == 0 && oTrait.bToucheEnnemi == false)
	{
		mouseDown = true;
		oTrait.oPointDepart.x = x
		oTrait.oPointDepart.y = y
		
		if(oPolygone.cn_PnPoly(oTrait.oPointDepart) == 1)
		{
			oTrait.iDepartTraitDansPolygone = 1;	
			oTrait.oPointDepart.x = 0;
			oTrait.oPointDepart.y = 0;
		}
	}
}

var mouseUnClick = function (e) 
{
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a été touché
	if(oTrait.iCompteurFaireClignoter == 0 && oTrait.bToucheEnnemi == false)
	{
		mouseDown = false;
		mouseMove = false;
		oTrait.reset();
	}
}

var mouseMovement = function(e) 
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
	if(oTrait.iCompteurFaireClignoter == 0 && oTrait.bToucheEnnemi == false)
	{
		if(mouseDown)
		{				
			mouseMove = true;
			oTrait.oPointArrivee.x = x;
			oTrait.oPointArrivee.y = y;
		}
	}
}

/*** ================================================================================================================================================
Evénements resize
====================================================================================================================================================*/

var screenResize = function(e) 
{
	canvas.width = document.documentElement.clientWidth-4;
	canvas.height = document.documentElement.clientHeight-4;
	
	var fNewRatioLargeur = canvas.width / 300;
	var fNewRatioHauteur = canvas.height / 400;
	
	/* === Redéfinition de la barre d'avancement === */
	var fMilieu = canvas.width/2;
	var fPourcentageTaille = 0.8;
	oBarreAvancement.oPoint1 = new Point(fMilieu - (fPourcentageTaille/2)*canvas.width , 370);
	oBarreAvancement.oPoint2 = new Point(fMilieu + (fPourcentageTaille/2)*canvas.width, 370);
	
	/* === Redéfinition du polygone === */
	for(var i=0; i<oPolygone.aListePointsDepart.length; i++)
		oPolygone.aListePointsDepart[i] = new Point( (oPolygone.aListePointsDepart[i].x/fRatioLargeur)*fNewRatioLargeur , (oPolygone.aListePointsDepart[i].y/fRatioHauteur)*fNewRatioHauteur);
	for(var i=0; i<oPolygone.aListePoints.length; i++)
		oPolygone.aListePoints[i] = new Point( (oPolygone.aListePoints[i].x/fRatioLargeur)*fNewRatioLargeur , (oPolygone.aListePoints[i].y/fRatioHauteur)*fNewRatioHauteur);
	
	var fPourcentageAireMinimale = oPolygone.fAireMinimale/oPolygone.fAireTerrainDepart;
	oPolygone.fAireTerrainDepart = oPolygone.calculerAireDepart();
	oPolygone.fAireTerrainActuel = oPolygone.calculerAire();
	oPolygone.fAireMinimale = oPolygone.fAireTerrainDepart*fPourcentageAireMinimale;
	
	/* === Redéfinition des ennemis === */
	for(var i=0; i<aListeEnnemis.length; i++)
	{
		aListeEnnemis[i].fVitesseDepart = (aListeEnnemis[i].fVitesseDepart / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		aListeEnnemis[i].fVitesse = (aListeEnnemis[i].fVitesse / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		aListeEnnemis[i].iTailleX = (aListeEnnemis[i].iTailleX / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		aListeEnnemis[i].iTailleY = (aListeEnnemis[i].iTailleY / ((fRatioLargeur+fRatioHauteur)/2)) * ((fNewRatioLargeur+fNewRatioHauteur)/2);
		aListeEnnemis[i].oPosition = new Point(aListeEnnemis[i].oPosition.x*(fNewRatioLargeur/fRatioLargeur), aListeEnnemis[i].oPosition.y*(fNewRatioHauteur/fRatioHauteur))
	}
	
	fRatioLargeur = fNewRatioLargeur;
	fRatioHauteur = fNewRatioHauteur;
}