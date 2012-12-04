function Ennemi(oImageTemp, fVitesseTemp, oPositionTemp, fRotationTemp)  
{   
	this.oImage = oImageTemp;
	this.fVitesseDepart = fVitesseTemp;
	this.fVitesse = fVitesseTemp;
	this.iTailleX = oImageTemp.width;
	this.iTailleY = oImageTemp.height;
	this.fDeplacement = new Point(0,0);
	this.oPosition = oPositionTemp;
	this.fRotationDepart = fRotationTemp;
	this.fRotation = fRotationTemp;
	this.fRotationActuelle = fRotationTemp;
	
	var v_x = (Math.random() * 20) - 10;
	var v_y = (Math.random() * 20) - 10;
	
	this.oVecteurDirection = new Point(v_x,v_y);
}

Ennemi.prototype.calculerDeplacement = function()
{
	var oPositionDepart = this.oPosition;
	var oPositionArrivee = new Point(oPositionDepart.x+this.oVecteurDirection.x,
									 oPositionDepart.y+this.oVecteurDirection.y);
		
	var fDistance = distance(oPositionDepart, oPositionArrivee);
	
	this.fDeplacement.x = 
			this.oVecteurDirection.x 
			/ (fDistance/this.fVitesse);
	this.fDeplacement.y = 
			this.oVecteurDirection.y 
			/ (fDistance/this.fVitesse);
}

Ennemi.prototype.ralentir = function()
{
	var fVitesseTemp = this.fVitesseDepart/50;
	var fRotationTemp = this.fRotationDepart/50;
	
	if(this.fVitesse - fVitesseTemp > 0)
		this.fVitesse -= fVitesseTemp;
	else
		this.fVitesse = 0;
	
	if(this.fRotation - fRotationTemp > 0)
			this.fRotation -= fRotationTemp;
		else
			this.fRotation = 0;
	
	this.calculerDeplacement();
}

Ennemi.prototype.reset = function()
{
	// reset la position de l'ennemi
	this.oPosition = oPolygone.placerEnnemi(this);
	this.fVitesse = this.fVitesseDepart;
	this.fRotation = this.fRotationDepart;
	// on calcule le déplacement de l'ennemi
	this.calculerDeplacement();
	
}
