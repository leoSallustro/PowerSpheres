



 //____________________________________
		//FONCTIONS D'AFFICHAGE 
 
function ActualiseDebug(){
	
	document.getElementById("Xvel").innerHTML = "Xvel"+": " + Xvel;
	document.getElementById("Yvel").innerHTML = "Yvel"+": " + Yvel;
	
	document.getElementById("isInAir").innerHTML = "isInAir"+": " + isInAir;
	
	if (Player.currentColisions != false ){
		document.getElementById("collision").innerHTML = "colision"+": " + "TRUE";
	}else{
		document.getElementById("collision").innerHTML = "colision"+": " + "FALSE";
	}
	

	document.getElementById("Ycol").innerHTML = "Ycol"+": " + vy/Player.R;
	document.getElementById("Xcol").innerHTML = "Xcol"+": " + vx/Player.R;
	if (vy != 0){
	document.getElementById("lastYcol").innerHTML = "Last Ycol : " + vy;
	}
	if (vx != 0){
	document.getElementById("lastXcol").innerHTML = "Last Xcol : " + vx;
	}
	
	
	document.getElementById("Ymouv").innerHTML = "Ymouv"+": " + Ymouv;
	document.getElementById("Xmouv").innerHTML = "Xmouv"+": " + Xmouv;
	if (Ymouv != 0){
	document.getElementById("lastYmouv").innerHTML = "Last Ymouv : " + Ymouv;
	}
	if (Xmouv != 0){
	document.getElementById("lastXmouv").innerHTML = "Last Xmouv : " + Xmouv;
	}

}

	// GESTION DES CANVAS

//créer les variables qui vont contenir les canvas et leur context
var cP
var ctxPlat

var cF
var ctxDecorFond

var cJ
var ctx

var cD 
var ctxDecor

var debugVisible = false;


  premierPlan = new Image();
  premierPlan.src = 'premierPlan.png';
loadImg(premierPlan);

  arrierePlan = new Image();
  arrierePlan.src = 'arrierePlan.png';
loadImg(arrierePlan);

  plateformes = new Image();
  plateformes.src = 'plateformes.png';
loadImg(plateformes);

plateformes.crossOrigin = "anonymous";

var imgPlateformes ;


var allLoaded = 0;
var MAP_WIDTH;
var MAP_HEIGHT;
var FirstAliteration = true;

//s'assurent que les contextes soient chargés avant de lancer la partie.
function loadImg(img){
  img.onload = function(){
	  
	if (FirstAliteration == true){
		//trouve la taille de l'image
		MAP_WIDTH = img.naturalWidth;
		MAP_HEIGHT = img.naturalHeight;
		
		//donne aux elements html la taille approprié
		var AllCanvas = document.getElementsByClassName("canvas");
		var l = AllCanvas.length;
		for (var i = 0; i < l ; i++) {
			AllCanvas[i].style.height = MAP_HEIGHT+"px";
			AllCanvas[i].style.width = MAP_WIDTH+"px";
		}
		var canvasContainer = document.getElementById("Canvas");
		canvasContainer.style.width = MAP_WIDTH+"px";
		canvasContainer.style.height = MAP_HEIGHT+"px";
		FirstAliteration = false;
		
	}
	allLoaded++;
	
	//une fois que tout est chargé	
	if(allLoaded == 3){
		
		//dessinner toutes les images dans leurs contextes
		DrawAllCtx()
		
	}
  }
}

//dessine les contextes

function DrawAllCtx(){
	
//créer un canvas qui vas contenir l'arrière plan
 cF = document.getElementById("CanvasFond");
 cF.width = MAP_WIDTH;
 cF.height = MAP_HEIGHT;
 ctxDecorFond = cF.getContext("2d");
ctxDecorFond.drawImage(arrierePlan, 0, 0);

//créer un canvas qui vas contenir les joueurs
 cJ = document.getElementById("CanvasJoueurs");
cJ.width = MAP_WIDTH;
cJ.height = MAP_HEIGHT;
 ctx = cJ.getContext("2d");

//créer un canvas qui vas contenir le décor
 cD = document.getElementById("CanvasDecor");
 cD.width = MAP_WIDTH;
 cD.height = MAP_HEIGHT;
 ctxDecor = cD.getContext("2d");
ctxDecor.drawImage(premierPlan, 0, 0);

//remplir  plateformes
cP = document.getElementById("CanvasPlateformes");
 cP.width = MAP_WIDTH;
 cP.height = MAP_HEIGHT;
ctxPlat = cP.getContext("2d");
ctxPlat.drawImage(plateformes, 0, 0);

//une fois cela fait, traduire les données en tableau pour l'objet Joueur.
imgPlateformes = ctxPlat.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT).data;
collisionTable = imgDataToTable(imgPlateformes);

//démarer le jeu
makePlayer();
start();

	
}




 //___________________________________________________________
		//INITIALISATION ET 'CABLAGE' DES INPUTS CLAVIER


var goingLeft = false;
var goingRight = false;
var isGoingDown = false;
var canGoDown = false;

document.addEventListener('keydown', function(event) {
	if (event.code  ==  'ArrowUp') {
		OnUpAr()
	}
	
	if (event.code  ==  'ArrowDown') {
		OnDownAr()
	}
	
	if (event.code  ==  'ArrowRight') {
		OnRightAr();
	}

	if (event.code  ==  'ArrowLeft') {
		OnLeftAr();
	}
	
});



	
document.addEventListener('keyup', function(event) {

	if (event.code  ==  'ArrowRight') {
		goingRight = false;
	}

	if (event.code  ==  'ArrowLeft') {
		goingLeft = false;
	}
	
	if (event.code  ==  'ArrowDown') {
		isGoingDown = false;
	}
});

var IsJumping = false;
var canDoubleJump = true;

function OnUpAr(){
	
	if (isInAir == false ){
		canDoubleJump = true;
		IsJumping = true;
	}
	else if (canDoubleJump){
		canDoubleJump = false;
		IsJumping = true;
	}
	
}

function OnDownAr(){
	
	if (isInAir && canGoDown){
		isGoingDown = true;
	}

}

function OnRightAr(){
		goingRight = true;
		goingLeft = false;
}

function OnLeftAr(){
		goingLeft = true;
		goingRight = false;
}

function ToggleDebug(){
	if(debugVisible == true ){
		document.getElementById("debug_info").style.display = "none"
		debugVisible = false;
	}else{
		document.getElementById("debug_info").style.display = "flex"	
		debugVisible = true;
	}
}
 





//_____________________________________________  
		// INITIALISATION DE LA PARTIE

var collisionTable = [];

//transforme l'imagedata des plateformes en tableau, pour etre lu par l'objet Player rapidement.
function imgDataToTable(imgData){
	
		var val = 0;
		var t = imgData.length
		var currentLine = [];
		var outputTable =[];
		
		for (i=0;i < t ;i++){
			val = val + imgData[i];
			//chaque 4 cases faire le test de si noir ou blanc
			if(((i+1)%4) == 0 ){
				//et ajouter le résultat a la colonne currentLine
				if(val == 0){
					currentLine.push(0);
				}else{
					currentLine.push(1);
				}
				val = 0;
			}
			//toute les Map_width cases, ajouter la colonne au tableau
			if (currentLine.length == MAP_WIDTH){
				outputTable.push(currentLine);
				currentLine = [];
			}
		}
		return(outputTable);
}


var PlayerX ;
var PlayerY ;

//crée un point de spawn aléatoire 
function RandomizeSpawn(){
	var positionValid = false
	while(positionValid == false){
		var randomPosX = Math.round(Math.random() * MAP_WIDTH)
		var randomPosY = Math.round(Math.random() * MAP_HEIGHT)
		//si la balle ne touche aucun mur
		
		if(collisionTable[randomPosY - PlayerR][randomPosX] == 0 &&
		collisionTable[randomPosY + PlayerR][randomPosX] == 0 &&
		collisionTable[randomPosY][randomPosX - PlayerR] == 0 &&
		collisionTable[randomPosY][randomPosX + PlayerR ] == 0 ){
			//la position est validée
			PlayerX = randomPosX;
			PlayerY = randomPosY;
			positionValid = true;
			return true;
		}
	}
}


var PlayerR = 14;
var PlayerColor = "red";
var Player;

//crée l'oject Player
function makePlayer(){
	RandomizeSpawn()
	var paramPlayer = {
			X: PlayerX,
			Y: PlayerY,
			R: PlayerR,
			couleur: PlayerColor,
			ctx: ctx,
			clTable: collisionTable
		};
	Player = new PlayerObjet(paramPlayer);

	Player.draw();
}





//____________________________
		//LA PARTIE
		
//s'active ~60x par seconde pour lancer les autres fonctions de la partie et donc donner l'illusion de mouvement
function tickUpdate(){
		//mets a jour la liste des collisions du joueur
		Player.updateColisions();
		
		isInAir = ActualiseIsInAir();
		if (!isInAir &&  !canGoDown){ canGoDown = true ;}
		
		
		IsMoving = goingLeft||goingRight;
		CalcXvel();
		CalcYvel();
		
		calcCollisions();
		
		//evite que le joueur aille assez vite pour destabiliser le systeme de collisions
		Xvel = Xvel > PlayerR ? PlayerR : Xvel;
		Yvel = Yvel > PlayerR ? PlayerR : Yvel;
		
		PlayerX = PlayerX + Xvel;
		PlayerY = PlayerY + Yvel;
		
		Player.UpdateXY(PlayerX,PlayerY);
		
		if (debugVisible){ ActualiseDebug(); }
		
		
}


var isInAir = false;

//detecte si le joueur est en l'air
function ActualiseIsInAir(){
	if (Player.currentColisions != false ){
		if(vy > -0.5){
			return false;
		}
	}
	return true;
}


var Xvel = 0.0 ;

var maxVelGround = 8.5;
var maxVelAir = 3.4;
var gainVelAir = 0.17;
var gainVelGround = 0.425;
var airResistance = 0.035;
var groundResistance = 0.17;
//calcul la vélocitée en X
function CalcXvel(){
	
	if(IsMoving){
		if (goingLeft){
			if(isInAir){
				if(Xvel > -maxVelAir){
					Xvel = Xvel - gainVelAir;	
				}
			}else if (Xvel > -maxVelGround){Xvel = Xvel - gainVelGround;}
		}
		if(goingRight){
			if(isInAir){
				if(Xvel < maxVelAir){
					Xvel = Xvel + gainVelAir;
				}
			}else if (Xvel < maxVelGround){Xvel = Xvel + gainVelGround;}
		}
	}else{
		if (Xvel > 0){
			if(isInAir){ Xvel = Xvel - airResistance; }
			else{ 
				Xvel = Xvel - groundResistance;
				if (Xvel < 0.2){
					Xvel = 0;
				}
			}
			
		}
		if (Xvel < 0){
			if(isInAir){ Xvel= Xvel + airResistance; }
			else{ Xvel= Xvel + groundResistance; 
				
			}
		}
	}
	
	
}

var Yvel = 0.0 ;
var gravity = 0.07;
var downForce = 5;
var jumpForce = 6;
//calcul la velocitée en Y
function CalcYvel(){
	
	if (IsJumping){ 
		Yvel = -jumpForce;
		IsJumping = false
	}
	if (isGoingDown && canGoDown){
		Yvel = Yvel + downForce;
		console.log("cbon")
		isGoingDown = false;
		canGoDown = false;
	}
	
		Yvel = Yvel + gravity;
	
	
	

}


var vy = 0;
var vx = 0;

var Xmouv = 0;
var Ymouv = 0;

//modification de la vélocitée en X et en Y en fonction des collisions
function calcCollisions(){
	
	if (Player.currentColisions.length != false ){
		
		var VelMod = 0;
		var signeVel = 0;
		var signeCol =0;
		var l = 1;
		var ratio = false ;
		
		// Math.floor(PlayerX);
		// Math.floor(PlayerY);
		// Player.UpdateXY(PlayerX,PlayerY);
		//récuperer les vecteurs de collision du joueur 
		
		if(Player.currentColisions != null){l= Player.currentColisions.length}
		
		
		
		for (i = 0; i < l; i++){
			
			vx = Player.currentColisions [i][0];
			vy = Player.currentColisions [i][1];
			
			//la velocitée perdue qui doit etre rétribuée 
			var lostVelX = 0;
			var lostVelY = 0;
			//le signe des collisions, sera utile pour rétriuvuer lostvel
			var signeColX = vx/Math.abs(vx);
			var signeColY = vy/Math.abs(vy);
			
			if(Player.currentColisions [i][2] == 17)/*si collision imbriquée*/{
				//calculer le ratio entre le "vecteur de collision" actuel et celui de longeur Player.R
				ratio = Math.abs(Player.R / Math.sqrt(vx*vx + vy*vy));
				
			}else{
				ratio = false;
			}
				
			
				//calculer les colision en x
				
				//-1 si negatif, +1 si positif, 0 sinon.
				
				if (Xvel != 0 && vx != 0){
 
					// trouver le signe des velocités
					signeVel = Xvel/Math.abs(Xvel);
					
					// comparere le signe des collisions et si égal calculler, sinon laisser tel quel
					
					if (signeColX == signeVel){//colision seulement dans ce cas{
						
						lostVelX = Math.abs(Xvel*vx/Player.R);//calcul de l'energie perdue
						
						Xvel = Xvel + lostVelX*(-signeColX);//calcul de la colision
						
						//l'energie perdue est rétribuée dans velY
						if(Math.abs(vy) != 0 ){
							Yvel = Yvel + lostVelX*(Math.abs(vy/Player.R))*(-signeColY)
						}
						
						if(ratio != false){
								Xmouv =  - Math.abs(vx - vx*ratio)*signeColX;
								PlayerX = PlayerX + Xmouv;
						}
					}
					
				}
				
				//calculer les colision en y
				
				if (Yvel != 0 && vy != 0){
					
					// trouver le signe des velocités
					signeVel = Yvel/Math.abs(Yvel);
					

					// comparer le signe des collisions et si égal calculler, sinon laisser tel quel
					
					if (signeColY == signeVel){//colision seulement dans ce cas{
						
						lostVelY = Math.abs(Yvel*vy/Player.R);
						
						
						Yvel = Yvel + lostVelY*(-signeColY)//calcul de la colision
						
						//retribution de l'énergie perdue
						if(Math.abs(vx) != 0){
							Xvel = Xvel + lostVelY*(Math.abs(vx/Player.R))*(-signeColX);
						}
						
						if(ratio != false){
						
							// trouver la longeur du vecteur
							Ymouv =  - Math.abs(vy - vy*ratio)*signeColY;
							// calcul de la colision imbriquée
							PlayerY = PlayerY + Ymouv;
						}
					}
					
				}
				
				
				

			
			
		}
		
	}else{
		vx = 0;
		vy = 0;
		Xmouv = 0;
		Ymouv = 0;
	}

}



		// :: DEMARRAGE DE LA PARTIE ::
function start (){ 
setInterval(tickUpdate,12);
}

