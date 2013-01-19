// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables communes au menu et à la partie
====================================================================================================================================================*/

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth-4;
canvas.height = document.documentElement.clientHeight-4;
document.body.appendChild(canvas);  
 
var fLargeurDeBase = 300;
var fHauteurDeBase = 400;

var fRatioLargeur = (document.documentElement.clientWidth-4) / fLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight-4) / fHauteurDeBase;

// souris
var oPositionDepartSouris = new Point(-100,-100);
var oPositionSouris = new Point(-100,-100);
var mouseDown = false;
var mouseMove = false;

// compteur img
var iCompteurImages = 0;
var iNombresImages = 0;

/*** ================================================================================================================================================
déclaration des variables pour le menu
====================================================================================================================================================*/

var oMenu = new Menu();
var bChargementComplet = false;

// ------------------------ Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
// ------------------------ et lancement des fonctions.
canvas.addEventListener('mousemove', mouseMovementMenu, false);
canvas.addEventListener('mousedown', mouseClickMenu, false);
canvas.addEventListener('mouseup', mouseUnClickMenu, false);
canvas.addEventListener('mouseout', mouseOutCanvasMenu, false);
window.addEventListener('resize', screenResizeMenu, false);
		
		
/*** ================================================================================================================================================
déclaration des variables pour la partie
====================================================================================================================================================*/

var oPartie;
var bChargementComplet = false;

/*
var oPartie = new Partie();

var bChargementComplet = false;

// ------------------------ Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
// ------------------------ et lancement des fonctions.
canvas.addEventListener('mousemove', mouseMovementPartie, false);
canvas.addEventListener('mousedown', mouseClickPartie, false);
canvas.addEventListener('mouseup', mouseUnClickPartie, false);
canvas.addEventListener('mouseout', mouseOutCanvasPartie, false);
// window.addEventListener('resize', screenResizePartie, false);
*/

/*** ================================================================================================================================================
Main menu
====================================================================================================================================================*/

var mainMenu = function ()
{
	// Si on est pas dans une partie
	if(oMenu != null)
	{
		now = Date.now();
		delta = now - then;
		
		if(iCompteurImages == iNombresImages)
		{
			// on lance le menu
			oMenu.lancer();
		}
		
		requestAnimationFrame(mainMenu);
	}
};


/*** ================================================================================================================================================
Main partie
====================================================================================================================================================*/

var initPartie = function ()
{
	oMenu = null;
	oPartie = new Partie();
	bChargementComplet = false;

	// ------------------------ Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
	// ------------------------ et lancement des fonctions.
	
	canvas.removeEventListener('mousemove', mouseMovementMenu, false);
	canvas.removeEventListener('mousedown', mouseClickMenu, false);
	canvas.removeEventListener('mouseup', mouseUnClickMenu, false);
	canvas.removeEventListener('mouseout', mouseOutCanvasMenu, false);
	window.removeEventListener('resize', screenResizeMenu, false);
	
	canvas.addEventListener('mousemove', mouseMovementPartie, false);
	canvas.addEventListener('mousedown', mouseClickPartie, false);
	canvas.addEventListener('mouseup', mouseUnClickPartie, false);
	canvas.addEventListener('mouseout', mouseOutCanvasPartie, false);
	window.addEventListener('resize', screenResizePartie, false);
	
	mainPartie();
}

var mainPartie = function () 
{
	now = Date.now();
	delta = now - then;
	
	if(iCompteurImages == iNombresImages)
	{
		if(!bChargementComplet)
		{
			// ennemis
			for(var i=0; i<oPartie.aListeImagesEnnemis.length; i++)
			{
				var oEnnemi = new Ennemi(oPartie.aListeImagesEnnemis[i], 2, new Point(0,0), 0.2);
				// On place l'ennemi sur le terrain (le Terrain)
				// on récupére les coordonnées
				var oPositionEnnemi = oPartie.oTerrain.placerEnnemi(oEnnemi);
				oEnnemi.oPosition = oPositionEnnemi;
				// on calcule le déplacement de l'ennemi
				oEnnemi.calculerDeplacement();

				oPartie.aListeEnnemis.push(oEnnemi);
			}
			
			// porte du bas
			oPartie.fLargeurPorteBas = oPartie.oPorteBas.width * (oPartie.fLargeurPorteDroite/oPartie.oPorteDroite.width);
			oPartie.fHauteurPorteBas = oPartie.oPorteBas.height * (oPartie.fHauteurPorteDroite/oPartie.oPorteDroite.height);
			oPartie.oPositionPorteBas = new Point((canvas.width/2)-(oPartie.fLargeurPorteBas/2),canvas.height);
			
			bChargementComplet = true;
		}
		
		// on lance la partie
		oPartie.lancer();
	}
	
	requestAnimationFrame(mainPartie);
};

// On lance le jeu
var then = Date.now();
var now = then;
var delta = 0;
mainMenu();