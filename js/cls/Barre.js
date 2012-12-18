// Barre qui indique au joueur son avancement
function Barre(oPoint1Temp, oPoint2Temp, fTailleTemp, sCouleurTemp, sCouleurConteurTemp)  
{   
	// pour centrer la barre
	var fMilieu = canvas.width/2;
	var fPourcentageTaille = 0.8;
	
	this.oPoint1 					= new Point(fMilieu - (fPourcentageTaille/2)*canvas.width , 370);
	this.oPoint2 					= new Point(fMilieu + (fPourcentageTaille/2)*canvas.width, 370);
	this.fDiminutionProgressive		= 1;
	this.fTaille 					= fTailleTemp;
	this.sCouleur 					= sCouleurTemp;
	this.sCouleurConteneur 			= sCouleurConteurTemp;
}

Barre.prototype.tracer = function()
{
	// Texte pourcentage aire restant
	ctx.font = 20*((fRatioHauteur+fRatioLargeur)/2)+"pt Calibri,Geneva,Arial";
	ctx.fillStyle = "white";
	ctx.fillText(Math.floor((oPolygone.fAireTerrainActuel/oPolygone.fAireTerrainDepart)*100)+" %", this.oPoint1.x, 350*fRatioHauteur);

	// Barre conteneur
	ctx.beginPath();
	ctx.strokeStyle = this.sCouleurConteneur;
	ctx.lineWidth = this.fTaille*fRatioHauteur+2;
	ctx.moveTo(this.oPoint1.x-1, this.oPoint1.y*fRatioHauteur);
	ctx.lineTo(this.oPoint2.x+1, this.oPoint2.y*fRatioHauteur);
	ctx.stroke();
	
	// Barre d'avancement
	ctx.beginPath();
	ctx.strokeStyle = this.sCouleur; 
	ctx.lineWidth = this.fTaille*fRatioHauteur;
	ctx.moveTo(this.oPoint1.x, this.oPoint1.y*fRatioHauteur);
	// s'il y a eu une coupe, on diminue progressivement la taille de la barre d'avancement
	if(this.fDiminutionProgressive > (oPolygone.fAireTerrainActuel/oPolygone.fAireTerrainDepart))
	{
		this.fDiminutionProgressive -= (1-(oPolygone.fAireTerrainActuel/oPolygone.fAireTerrainDepart)) / 50;
	}
	ctx.lineTo((this.fDiminutionProgressive)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , this.oPoint2.y*fRatioHauteur);
	ctx.stroke();
	
	// Barre limite
	ctx.beginPath();
	ctx.strokeStyle='red'; 
	ctx.lineWidth=4;
	// (aire du terrain en %) * (taille de la barre totale) + this.oPoint1.x
	ctx.moveTo((oPolygone.fAireMinimale/oPolygone.fAireTerrainDepart)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , 362.5*fRatioHauteur);
	ctx.lineTo((oPolygone.fAireMinimale/oPolygone.fAireTerrainDepart)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , 377.5*fRatioHauteur);
	ctx.stroke();
}

Barre.prototype.reset = function()
{
	this.fDiminutionProgressive	= 1;
}
