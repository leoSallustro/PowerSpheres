function CanvasPlayers(params)
{
	this.img;
	this.isLoaded;
	this.htmlId;
	
	
	this.construct = function(params) {
		this.isloaded = false;
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
	


	this.construct(params);

}