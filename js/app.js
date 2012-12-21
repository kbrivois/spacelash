// Setup requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables pour la partie
====================================================================================================================================================*/



var fRatioLargeur = (document.documentElement.clientWidth-4) / 300;
var fRatioHauteur = (document.documentElement.clientHeight-4) / 400;
var oPartie = new Partie();

// ------------------------ Ajout des gestionnaires d'événements pour savoir ce qu'il se passe
// ------------------------ et lancement des fonctions.
oPartie.canvas.addEventListener('mousemove', mouseMovementPartie, false);
oPartie.canvas.addEventListener('mousedown', mouseClickPartie, false);
oPartie.canvas.addEventListener('mouseup', mouseUnClickPartie, false);
oPartie.canvas.addEventListener('mouseout', mouseOutCanvasPartie, false);
// window.addEventListener('resize', screenResizePartie, false);

/*** ================================================================================================================================================
Main
====================================================================================================================================================*/

var main = function () 
{
	now = Date.now();
	delta = now - then;
	
	if(oPartie.iCompteurImages == oPartie.iNombresImages)
	{
		if(oPartie.aListeEnnemis.length == 0)
		{
			for(var i=0; i<oPartie.aListeImagesEnnemis.length; i++)
			{
				var oEnnemi = new Ennemi(oPartie.aListeImagesEnnemis[i], 2, new Point(0,0), 0.2);
				// On place l'ennemi sur le terrain (le polygone)
				// on récupére les coordonnées
				var oPositionEnnemi = oPartie.oPolygone.placerEnnemi(oEnnemi);
				oEnnemi.oPosition = oPositionEnnemi;
				// on calcule le déplacement de l'ennemi
				oEnnemi.calculerDeplacement();

				oPartie.aListeEnnemis.push(oEnnemi);
			}
		}
		
		// on lance la partie
		oPartie.lancer();
	}
	
	requestAnimationFrame(main);
};

// On lance le jeu
var then = Date.now();
var now = then;
var delta = 0;
main();
