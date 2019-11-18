# PowerSpheres
Un __plateformer d'action en ligne__ au gameplay frais ou __deux joueurs s'affronteront en se tirant des billes dessus__.
Avec un systeme de __mapmaking simple mais puissant__ permettant l'apparition de maps variées et a terme, de différents mode de jeu…

## l'état actuel du projet
+ un projet en __javascript__ , tournant __en local__.
+ une seule "bille" peut __se déplacer de gauche a droite et sauter__ dans une map.
+ elle peut rentrer en __collisions__ avec __certains éléments__ de la map.
+ la map peut etre __dessinée__ sur n'importe quel logiciel de dessin, de gimp a photoshop.
+ la map __peut être changée__ el le jeu s'y adaptera.

## plus sur les collisions:
+ __le système de base :__

le joueur est une "bille" de couleur et de taille variable.  Ainsi les collision et contacts sont détectés et calculés grâce a 16 vecteurs, partant du centre de la bille et finissant a sa périphérie. Chaque tick toutes les fins de ces vecteurs sont vérifiés, si il se trouve un pixel non transparent a leur position dans la map, une "colision" est détéctée, la longeur en X et en Y du vecteur en question est envoyé au __gestionnaire des collisions__.

+ __les cas spéciaux :__

Si plusieurs collisions se suivent sur plusieurs vecteurs d'afilés cela veut dire que la bille est un peu rentrée dans un mur. _(Cela arrive souvent quand elle vas trop vite)_ Dans ce cas un vecteur correspondant au milieu de la suite de collisions est créé et ses  longeurs en X et en Y sont envoyés au __gestionnaire des collisions__


+ __le gestionnaire de collisions__ _(le fameux)_

+ comme son nom l'indique, cette fonction récupère les identifiants d'une collision et peut efféctuer trois opération sur la vitesse et la position de la bille avec :

	+  modification de la vélocité de la bille

	+ replacement da la bille en dehors des murs le cas présent

	+ rétribution de l'énergie perdue (permet par exemple de monter les pentes


__note:__ _cette partie du code est encore en travail, elle demande encore des corrections, et de l'optimisation, mais elle fonctionne en apparence_
## plus sur les maps:

+ __comment cela fonctionne :__

Comme mentionné plus haut, au lieu de calculer les collision par rapport a des segments ou des surfaces, seul les point de collisions sont pris en compte. Ainsi les pixels transparents sont ignorés et les pixels colorés peuvent supporter ou bloquer la bille. Cela exploite Canvas de html5.

+ __qu'est ce qu'une map__

Dans un jeu vidéo en général c'est un environnement dans lequel le(s) joueur(s) évolue(nt). Ici c'est trois images, superposées qui composent un espace jouable pour le joueur. 

+ Les Plateformes : cette image n'est pas forcement visible par le joueur; C'est ici que l'on dessine la partie solide des plateformes. C'est  grâce a cette image que l'ordinateur s'occupera de calculer les collisions. 

+ l' Arrière plan : purement esthétique, cette image sera derrière le joueur et permet d'ajouter des couleurs et des dessins aux plateformes monochromes de _plateformes.png_ 
+ Le Premier Plan: purement esthétique, cette image sera devant le joueur et permet d'ajouter des détails comme de l'herbe, des chaines qui pendent ou ce que vous voulez.


+ __comment en changer__ _(pour le moment)_

il suffit de changer les trois images _premierPlan.png_, _arrierePlan.png_ , et _plateformes.png_ par celles de votre choix



