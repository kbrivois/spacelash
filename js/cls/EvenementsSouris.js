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

var mouseclick = function(e)
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

var mouseunclick = function (e) 
{
	// Si le trait ne doit pas clignoter et qu'aucun ennemi n'a été touché
	if(oTrait.iCompteurFaireClignoter == 0 && oTrait.bToucheEnnemi == false)
	{
		mouseDown = false;
		mouseMove = false;
		oTrait.reset();
	}
}

var mousemovement = function(e) 
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