function PlayerObjet(params)
{

	this.X;
	this.Y;
	this.R;
	this.couleur;
	this.ctTable =[];
	this.vecteurListe=[];
	this.currentColisions =[];
	this.debug = true;
	this.firstCol = true;

	//relatives a la création d'un joueur
	this.construct = function(params) {
		this.initObject(params);
		this.initVecteurListe(params);
		this.draw(params);

		this.updateColision;
	};

	this.initObject = function(params){
		this.X = params['X'];
		this.Y = params['Y'];
		this.R = params['R'];
		this.couleur = params['couleur'];
		this.ctx = params['ctx'];
		this.clTable = params['clTable'];
	}

	//effacer et dessiner le joueur dans son contexte
	this.draw = function(params){
		this.ctx.beginPath();
		this.ctx.arc(this.X, this.Y, this.R, 0, Math.PI*2);
		this.ctx.fillStyle = this.couleur; //"#0095DD"
		this.ctx.fill();
	}

	this.erease = function(params){
		this.ctx.clearRect(this.X - this.R - 2 , this.Y - this.R - 2 , this.R*2 +3 , this.R*2 +3 );
	}

	//permet de déplacer/teleporter le joueur
	this.UpdateXY = function(x,y){
		this.erease();
		this.X = x;
		this.Y = y;
		this.updateVecteurListe();
		this.draw();
	}
	
	//initialise la liste des Vecteurs (voir Vecteurs.js) qui détectent les collisions autour du joueur
	this.initVecteurListe = function() {
		//fait le tour du cercle représentant le joueur, créant 16 vecteurs
		for(var cpt = 0; cpt < 16; cpt ++) {
			var paramVecteur = {
				x1: this.X,
				y1: this.Y,
				angle: cpt * 22.5,
				longeur: this.R 
			};
			this.vecteurListe.push(new Vecteur(paramVecteur));
		}
	};

	//mets a jour la liste des vecteurs pour la nouvelle posision du joueur
	this.updateVecteurListe = function() {

		for(cpt = 0; cpt < 16; cpt ++) {
			var vecteur = this.vecteurListe[cpt];
			vecteur.updatePosition(this.X,this.Y);
			this.vecteurListe[cpt] = vecteur;
		}
	};

	//mets a jour la liste de collisions(contacts avec le décor) du joueur
	this.updateColisions = function(){
		
		this.currentColisions =[];
		//reset le tableau de collisions.
		
		var tableauATrier=[];
		//le tableau qui contiendra tout les numéros des vecteurs ayant des collisions
		
		var uneCollision = false;
		//permet de stopper la fonction si aucune col est détéctée
		
		//faire le tour des detecteurs de collisions du cercle
		for (var i = 0 ; i < 16 ; i++ ){

			//a chaque fois trouver les positions suceptibles d'etre collisions
			var posY = parseInt(this.vecteurListe[i].y2);
			var posX = parseInt(this.vecteurListe[i].x2);

			
			
			//si le pixel de la position actuelle est noir ou non compris dans le tableau
			if (this.clTable[posY] == undefined || this.clTable[posY][posX] != 0){
				tableauATrier.push(i)
				uneCollision = true;
			}else{
				tableauATrier.push(17)
			}

		}
		
		var tailleTableauATrier = tableauATrier.length;
		// pour la prochaine boucle
		
		if (uneCollision == false){
			return false;
		}
		
		var lastVect = 0;
		//le dernier vecteur ayant une collision, utile pour gérer les suites.
		
		var currentTablColision = [];
		//tableau de suites de collisions ou de collisions uniques.
		
		var tablColisions = [];
		//contiendra des tableaux "currentTablColision"
		
		//tableau a trier V

		for (i = 0 ; i < 16 ; i++ ){
			
			if (tableauATrier[i] != 17){

				//si la case du tableau contient au moins un index.	
				currentTablColision.push(tableauATrier[i]);
				//l'ajouter a currentTablColision
				
				if(i == 15 &&  tablColisions[0] !=  null && tablColisions[0][0] == 0){
					//si on est a la fin et que le début est plein aussi, les mettre dans la meme case
					tablColisions[0] = [...currentTablColision, ...tablColisions[0]] 
					
				}
					
			} else if (currentTablColision.length > 0){
				//si la case du tableau ne contient rien, donc pas de col en cet index

				tablColisions.push(currentTablColision);
				//on ajoute a tableCollision le tableau car c'est la fin du streak
				
				currentTablColision = [];
				//on reset pour la prochaine suite
				
			}
			
		}
		
		
		var outputTable = [];
		//les tableaux qui composeront la sortie, une fois le traitement éffectué.
		
		// TablColisions V
		var l = tablColisions.length;
		
		for (i = 0; i < l; i++){
			currentTablColision = [];
			currentTablColision = tablColisions[i];
			var currentLength = currentTablColision.length;
			
			
			if(currentLength > 1){
				//si c'est plusieurs vecteurs, faire une moyenne
				outputTable = [];
					outputTable[0] = (this.vecteurListe[currentTablColision[0]].X + this.vecteurListe[currentTablColision[currentLength-1]].X)/2;
					outputTable[1] = (this.vecteurListe[currentTablColision[0]].Y + this.vecteurListe[currentTablColision[currentLength-1]].Y)/2;
					outputTable[2] = 17;

			}else{
				//si c'est un seul vecteur, juste l'ajouter
				outputTable = [];
				outputTable[0] = this.vecteurListe[currentTablColision].X;
				outputTable[1] = this.vecteurListe[currentTablColision].Y;
				outputTable[2] = currentTablColision;
			}
			
			this.currentColisions.push(outputTable);
			outputTable = [];
			
		}
		
		return true;
	}

	this.construct(params);

}