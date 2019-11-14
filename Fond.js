function CanvasFond(params)
{
	this.height;
	this.width;
	this.objectHtml;
	
	
	this.construct = function(params) {
		
		this.initObject(params);
		this.initSize(params);
	};

	this.initObject = function(params) {
		this.objectHtml = document.getElementById(params['id']);
	};

	this.initSize = function(params) {
		
		this.height = params['height'];
		this.width = params['width'];
	};
	
	this.drawLine = function(){
		
	}
	
	
	this.construct(params);

}