function Vecteur(params)
{
	this.x1;
	this.y1;
	this.x2;
	this.y2;
	this.X;
	this.Y;
	this.angle;
	this.longeur;
	
	
	this.construct = function(params) {
		this.x1 = params['x1'];
		this.y1 = params['y1'];
		this.angle = params['angle'];
		this.longeur = params['longeur'];
		
		
		this.calculeFinVecteur();
		this.setXY();
	};

	this.calculeFinVecteur = function() {
		this.y2 = this.y1 + Math.round(this.longeur*Math.cos(this.angle * Math.PI / 180));
		this.x2 = this.x1 + Math.round(this.longeur*Math.sin(this.angle * Math.PI / 180));
	};

	this.updatePosition = function(centerX, centerY){
		this.x1 = centerX;
		this.y1 = centerY;
		this.calculeFinVecteur();
		this.setXY();
	};
	
	this.setXY = function(){
		this.Y = this.y2-this.y1;
		this.X = this.x2-this.x1;
	}
	

	this.construct(params);

}