// Barre qui indique au joueur son avancement
function Barre(oPoint1Temp, oPoint2Temp, fTailleTemp, sCouleurTemp, sCouleurConteurTemp, oPartieTemp)  
{
	// pour centrer la barre
	var fMilieu = canvas.width/2;
	var fPourcentageTaille = 0.8;
	
	this.oPoint1 					= new Point(fMilieu - (fPourcentageTaille/2)*canvas.width , 370);
	this.oPoint2 					= new Point(fMilieu + (fPourcentageTaille/2)*canvas.width, 370);
	this.fDiminutionProgressive		= 1;
	this.fAirePrecedente			= this.fDiminutionProgressive;
	this.fTaille 					= fTailleTemp;
	this.sCouleur 					= sCouleurTemp;
	this.sCouleurConteneur 			= sCouleurConteurTemp;
}

Barre.prototype.tracer = function(oTerrainTemp)
{
	// Texte pourcentage aire restante
	ctx.font = 20*(((canvas.height/fHauteurDeBase)+fRatioLargeur)/2)+"pt Calibri,Geneva,Arial";
	ctx.fillStyle = "white";
	ctx.fillText(Math.floor((this.fDiminutionProgressive)*100)+" %", this.oPoint1.x, 350*(canvas.height/fHauteurDeBase));

	// Barre conteneur
	ctx.beginPath();
	ctx.strokeStyle = this.sCouleurConteneur;
	ctx.lineWidth = this.fTaille*(canvas.height/fHauteurDeBase)+2;
	ctx.moveTo(this.oPoint1.x-1, this.oPoint1.y*(canvas.height/fHauteurDeBase));
	ctx.lineTo(this.oPoint2.x+1, this.oPoint2.y*(canvas.height/fHauteurDeBase));
	ctx.stroke();
	
	// Barre d'avancement
	ctx.beginPath();
	ctx.strokeStyle = this.sCouleur; 
	ctx.lineWidth = this.fTaille*(canvas.height/fHauteurDeBase);
	ctx.moveTo(this.oPoint1.x, this.oPoint1.y*(canvas.height/fHauteurDeBase));
	// s'il y a eu une coupe, on diminue progressivement la taille de la barre d'avancement
	if(this.fDiminutionProgressive > (oTerrainTemp.fAireTerrainActuel/oTerrainTemp.fAireTerrainDepart))
	{
		this.fDiminutionProgressive -= (1-(oTerrainTemp.fAireTerrainActuel/(oTerrainTemp.fAireTerrainDepart*this.fAirePrecedente))) / 50;
	}
	else
	{
		this.fAirePrecedente = this.fDiminutionProgressive;
	}
	ctx.lineTo((this.fDiminutionProgressive)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , this.oPoint2.y*(canvas.height/fHauteurDeBase));
	ctx.stroke();
	
	// Barre limite
	ctx.beginPath();
	ctx.strokeStyle='red'; 
	ctx.lineWidth=4;
	// (aire du terrain en %) * (taille de la barre totale) + this.oPoint1.x
	ctx.moveTo((oTerrainTemp.fAireMinimale/oTerrainTemp.fAireTerrainDepart)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , 362.5*(canvas.height/fHauteurDeBase));
	ctx.lineTo((oTerrainTemp.fAireMinimale/oTerrainTemp.fAireTerrainDepart)*(this.oPoint2.x-this.oPoint1.x) + this.oPoint1.x , 377.5*(canvas.height/fHauteurDeBase));
	ctx.stroke();
}

Barre.prototype.reset = function()
{
	this.fDiminutionProgressive	= 1;
	this.fAirePrecedente = this.fDiminutionProgressive;
}
