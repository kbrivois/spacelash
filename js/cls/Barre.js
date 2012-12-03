// Barre qui indique au joueur son avancement
function Barre(oPoint1Temp, oPoint2Temp, fTailleTemp, sCouleurTemp, sCouleurConteurTemp)  
{   
	this.oPoint1 				= oPoint1Temp;
	this.oPoint2 				= oPoint2Temp;
	this.fTaille 				= fTailleTemp;
	this.sCouleur 				= sCouleurTemp;
	this.sCouleurConteneur 		= sCouleurConteurTemp;
}

Barre.prototype.tracer = function(oPolygoneTemp)
{

	// Barre conteneur
	ctx.beginPath();
	ctx.strokeStyle = this.sCouleurConteneur; 
	ctx.lineWidth = this.fTaille+2;
	ctx.moveTo(this.oPoint1.x-1, this.oPoint1.y);
	ctx.lineTo(this.oPoint2.x+1, this.oPoint2.y);
	ctx.stroke();
	
	// Barre d'avancement
	ctx.beginPath();
	ctx.strokeStyle = this.sCouleur; 
	ctx.lineWidth = this.fTaille;
	ctx.moveTo(this.oPoint1.x, this.oPoint1.y);
	ctx.lineTo((oPolygoneTemp.fAireTerrainActuel/oPolygoneTemp.fAireTerrainDepart)*this.oPoint2.x,this.oPoint2.y);
	ctx.stroke();
	
	if(oPolygone.fAireTerrainActuel >= oPolygone.fAireMinimale)
	{
		// Barre limite
		ctx.beginPath();
		ctx.strokeStyle='red'; 
		ctx.lineWidth=4;
		ctx.moveTo((oPolygone.fAireMinimale/oPolygone.fAireTerrainDepart)*this.oPoint2.x,362.5);
		ctx.lineTo((oPolygone.fAireMinimale/oPolygone.fAireTerrainDepart)*this.oPoint2.x,377.5);
		ctx.stroke();
	}
	else
	{
		alert("Gagn\351 !");
		reset();
	}
}

Barre.prototype.reset = function()
{
	
}