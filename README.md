# TO DO
 ## back
- faire des fonctions qui te sort des stats

## front
- page de listing des vols possibles (avec bouton réserver)
- page de description d'un vol en particulier
- page de stat : prochains vols, encombrement des aéroports, chiffre d'affaire, occupation des avions, répartition vol / passager dans la semaine, avions disponibles

## synthèse 
- Expliquer les choix techniques
- Expliquer nos schémas de bdd
- Décrire le fonctionnement de notre appli
- Décrire l'installation en locale si besoin

# Synthèse 

## Technologies utilisées

Pour élaborer notre application, nous avons utilisé Node.js pour la partie serveur, Vue.js et VueChart pour la partie client et Postgres pour la base de données. Ces choix se sont par affinités avec les membres du groupe (technologies déjà maîtrisées). Nous avons travaillé via Github pour travailler en projet en groupe et nous avons déployé la base de données et l'application sur heroku car il propose un service gratuit pour la quantité de données que nous utilisons.

### Node js

Node js nous permet de mettre en place rapidement un serveur, c'est un framework assez flexible qui nous permet de globalement ne pas trop nous embeter avec des notions de base. Le principal défaut est la lenteur, ce qui n'est pas un problème ici car on ne va pas remplir la base de données de millions de vols.

### Vue js

Vue est un framework de javascript qui permet de décomposer en composants .vue l'interface. Ceci nous permet d'avoir une interface scriptable, réactive et facile à mettre en place grâce à toutes les fonctionnalités déjà incorporées à Vue (barre de navigation par exemple).

### VueChart

VueChart est un module de Vue. Il permet de créer des graphiques assez sympa très simplements. Il a le gros avantage d'être gratuit comparativement à d'autres modules avec lesquels on l'a comparé. Son principal inconvénient est que les graphiques ne sont par défaut pas réactifs au passage de la souris, ce qui pourraient être un plus dans certaines circonstances mais pour notre projet nous n'en avions pas besoin.

### PosgreSQL

Nous ne connaissions que 2 système SQL gratuits : MySQL et PosgreSQL. Nous avons choisi PosgreSQL car il était hébergé sur le web (MySQL est un système de base de données local) et nous avions besoin que tous les utilisateurs aient accès aux même données. Nous avons utilisé le logiciel pgAdmin 4 pour avoir un accès direct à la base de données. Nous avons ensuite utilisé le package sequelize (npm) pour assurer la communication entre notre serveur et la base de données.

## Schéma de la base de données

Notre choix de sujet s'est porté sur la gestion des vols d'un aéroport. 
Il nous a semblé logique de découper les données en trois tables disctinctes à savoir :
- employee : décrit les informations sur les employés de l'aéroport qui sont en lien avec le vols (stewart et pilote). Les colonnes sont secuNum(clé primaire, int), firstName(string), lastName(string), address(string), job(string), license(int), salary(int)
- passenger : décrit les informations sur les clients de l'aéroport. Les colonnes sont numero(clé primaire, int), fistName(str), lastName(str), address(str)
- planes : décrit les informations des avions. Les colonnes sont numPlane(clé primaire, int), type(str), capacity(int)

Avec ces trois tables nous pouvons maintenant créé des vols et tickets :
- flight : décrit les informations sur un vol. Les colonnes sont num(clé primaire, int), departureAirport(string), arrivalAirport(string), departureDate(date), arrivalDate(date), pilot1(int qui correspond au secuNum de l'employé), pilot2 (int idem), stewart1(idem), stewart2(idem), emptyPlaces(int), numPlane(int)
- ticket : décrit les information d'un ticket. Les colonnes sont num(clé primaire, int), date(date du décollage, date), price(int), numFlight(numéro du vol, int), numPassenger(numéro du client, int)
