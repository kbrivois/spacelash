// Barre qui indique au joueur son avancement
function Barre(oPoint1Temp, oPoint2Temp, fTailleTemp, sCouleurTemp, sCouleurConteurTemp, oPartieTemp)  
{
	// pour centrer la barre
	var fMilieu = oPartieTemp.canvas.width/2;
	var fPourcentageTaille = 0.8;
	
	this.oPoint1 					= new Point(fMilieu - (fPourcentageTaille/2)*oPartieTemp.canvas.width , 370);
	this.oPoint2 					= new Point(fMilieu + (fPourcentageTaille/2)*oPartieTemp.canvas.width, 370);
	this.fDiminutionProgressive		= 1;
	this.fAirePrecedente			= this.fDiminutionProgressive;
	this.fTaille 					= fTailleTemp;
	this.sCouleur 					= sCouleurTemp;
	this.sCouleurConteneur 			= sCouleurConteurTemp;
}

Barre.prototype.tracer = function(oPolygoneTemp)
{
	// Texte pourcentage aire restant
	oPartie.ctx.font = 20*((fRatioHauteur+fRatioLargeur)/2)+"pt Calibri,Geneva,Arial";
	oPartie.ctx.fillStyle = "white";
	oPartie.ctx.fillText(Math.floor((oPolygoneTemp.fAireTerrainActuel/oPolygoneTemp.fAireTerrainDepart)*100)+" %", this.oPoint1.x, 350*fRatioHauteur);

	// Barre conteneur
	oPartie.ctx.beginPath();
	oPartie.ctx.strokeStyle = this.sCouleurConteneur;
	oPartie.ctx.lineWidth = this.fTaille*fRatioHauteur+2;
	oPartie.ctx.moveTo(this.oPoint1.x-1, this.oPoint1.y*fRatioHauteur);
	oPartie.ctx.lineTo(this.oPoint2.x+1, this.oPoint2.y*fRatioHauteur);
	oPartie.ctx.stroke();
	
	// Barre d'avancement
	oPartie.ctx.beginPath();
	oPartie.ctx.strokeStyle = this.sCouleur; 
	oPartie.ctx.lineWidth = this.fTaille*fRatioHauteur;
	oPartie.ctx.moveTo(this.oPoint1.x, this.oPoint1.y*fRatioHauteur);
	// s'il y a eu une coupe, on diminue progressivement la taille de la barre d'avancement
	if(this.fDiminutionProgressive > (oPolygoneTemp.fAireTerrainActuel/oPolygoneTemp.fAireTerrainDepart))
	{
		this.fDiminutionProgressive -= (1-(oPolygoneTemp.fAireTerrainActuel/(oPolygoneTemp.fAireTerrainDepart*this.fAirePrecedente))) / 50;
	}
	else
	{
		this.fAirePrecedente = this.fDiminutionProgressive;
	}
	oPartie.ctx.lineTo((this.fDiminutionProgressive)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , this.oPoint2.y*fRatioHauteur);
	oPartie.ctx.stroke();
	
	// Barre limite
	oPartie.ctx.beginPath();
	oPartie.ctx.strokeStyle='red'; 
	oPartie.ctx.lineWidth=4;
	// (aire du terrain en %) * (taille de la barre totale) + this.oPoint1.x
	oPartie.ctx.moveTo((oPolygoneTemp.fAireMinimale/oPolygoneTemp.fAireTerrainDepart)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , 362.5*fRatioHauteur);
	oPartie.ctx.lineTo((oPolygoneTemp.fAireMinimale/oPolygoneTemp.fAireTerrainDepart)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , 377.5*fRatioHauteur);
	oPartie.ctx.stroke();
}

Barre.prototype.reset = function()
{
	this.fDiminutionProgressive	= 1;
	this.fAirePrecedente = this.fDiminutionProgressive;
}
