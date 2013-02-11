function Chronometre()
{
	this.iChronoCs = 0;
	this.iChronoS = 0;
	this.iChronoM = 0;
	this.iChronoInterval = null;
	this.textSec="";
	this.textMin="";
}


//Récupére le temps passé pour une victoire
Chronometre.prototype.getTemps = function()
{
	var temps=0;

	if (this.iChronoM >0){
		temps=temps+(this.iChronoM*60);
	}
	temps=temps+this.iChronoS;
	
	return temps;
	
}

//Démarre le chrono
Chronometre.prototype.start = function()
{
	this.iChronoInterval = setInterval(function(){
							  calculChrono();
						   },100);
};

// Méthode de pause
Chronometre.prototype.pause = function()
{
	clearInterval(this.iChronoInterval);
	iChronoInterval = null;
};

// Méthode de reset
Chronometre.prototype.reset = function()
{
	this.iChronoCs = 0;
	this.iChronoS = 0;
	this.iChronoM = 0;
};
