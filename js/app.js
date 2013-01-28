// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables communes au menu et à la partie
====================================================================================================================================================*/

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.body.appendChild(canvas);  
 
var fLargeurDeBase = 300;
var fHauteurDeBase = 400;

var fRatioLargeur = (document.documentElement.clientWidth) / fLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight) / fHauteurDeBase;

// souris
var oPositionDepartSouris = new Point(-100,-100);
var oPositionSouris = new Point(-100,-100);
var mouseDown = false;
var mouseMove = false;

// compteur img
var iCompteurImages = 0;
var iNombresImages = 0;

var oNiveauPartie = new Array();
var bChargementNiveauxComplet = false;
var bChargementSauvegardeComplet = false;
readAllNiveau();//Stocke tous les niveaux(et ses infos) dans oNiveauPartie
readAllSauvegarde();
// niveau selectionnée
var iNiveauSelectionne = null;

/*** ================================================================================================================================================
déclaration des variables pour le menu
====================================================================================================================================================*/

var oMenu;
		
/*** ================================================================================================================================================
déclaration des variables pour la partie
====================================================================================================================================================*/

var oPartie;
var bChargementComplet = false;

/*** ================================================================================================================================================
Main menu
====================================================================================================================================================*/

var mainMenu = function ()
{
	// Si on aucun menu n'a encore été initialisé et si l'indexedDB a fini de charger les niveaux
	if(oPartie == null && oMenu == null && bChargementNiveauxComplet)
	{
		oMenu = new Menu();

		// ------------------------ Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
		// ------------------------ et lancement des fonctions.
		canvas.addEventListener('mousemove', mouseMovementMenu, false);
		canvas.addEventListener('mousedown', mouseClickMenu, false);
		canvas.addEventListener('mouseup', mouseUnClickMenu, false);
		canvas.addEventListener('mouseout', mouseOutCanvasMenu, false);
		window.addEventListener('resize', screenResizeMenu, false);
		
		requestAnimationFrame(mainMenu);
	}
	else if(oMenu != null && bChargementNiveauxComplet)
	{
		now = Date.now();
		delta = now - then;
		
		if(iCompteurImages == iNombresImages)
		{
			// on lance le menu
			oMenu.lancer();
		}
		else
		{
			// Texte d'attente
			ctx.font = 20*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+"pt Calibri,Geneva,Arial";
			ctx.fillStyle = "black";
			ctx.fillText("Wait...", 50, 50);
		}
		requestAnimationFrame(mainMenu);
	}
	else if(oPartie == null && bChargementNiveauxComplet)
	{
		requestAnimationFrame(mainMenu);
	}
	
	if(!bChargementNiveauxComplet)
	{
		// Texte d'attente
		ctx.font = 20*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+"pt Calibri,Geneva,Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Wait...", 50, 100);
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
	
	if(iCompteurImages == iNombresImages && bChargementNiveauxComplet && iNiveauSelectionne != null)
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
		
		if(!oPartie.pause)
		{
			// on lance la partie
			oPartie.lancer();
		}
		else
		{
			// on lance le menu de pause
			oPartie.lancerPause();
		}
	}
	
	requestAnimationFrame(mainPartie);
};

// On lance le jeu
var then = Date.now();
var now = then;
var delta = 0;
mainMenu();