

//créer un canvas qui vas contenir les plateformes
var cP = document.getElementById("CanvasPlateformes");
var ctxPlat = cP.getContext("2d");


//créer un canvas qui vas contenir l'arrière plan
var cF = document.getElementById("CanvasFond");
var ctxDecorFond = cF.getContext("2d");


//créer un canvas qui vas contenir les joueurs
var cJ = document.getElementById("CanvasJoueurs");
var ctx = cJ.getContext("2d");


//créer un canvas qui vas contenir le décor
var cD = document.getElementById("CanvasDecor");
var ctxDecor = cD.getContext("2d");



  premierPlan = new Image();
  premierPlan.src = 'premierPlan.png';
make_base(ctxDecor,premierPlan);

  arrierePlan = new Image();
  arrierePlan.src = 'arrierePlan.png';
make_base(ctxDecorFond,arrierePlan);

  plateformes = new Image();
  plateformes.src = 'plateformes.png';
make_base(ctxPlat,plateformes);

var ImgDataFond = ctxDecorFond.getImageData(0, 0, 1200, 800).data;
var allLoaded = 0



function make_base(contx , img){
  img.onload = function(){
    contx.drawImage(img, 0, 0);
	allLoaded++;
	if (allLoaded == 3){
		startScript(ctxPlat,ctx);
	}
  }
}


