# TO DO
 ## back
- générer des données aléatoires plausibles pour remplir passengers, employees, planes
- avec ça générer des vols avec tickets qui marchent
- faire des fonctions qui te sort des stats (plus tard)

## front
- architecture globale (taz)
- page de présentation 
- page de listing des vols possibles (avec bouton réserver)
- page de description d'un vol en particulier
- page de stat (générale pour après)

## synthèse 
- Expliquer les choix techniques
- Expliquer nos schémas de bdd
- Décrire le fonctionnement de notre appli
- Décrire l'installation en locale si besoin

# Synthèse 

## Technologies utilisées

Pour élaborer notre application, nous avons utilisé Node.js pour la partie serveur, Vue.js pour la partie client et Postgres pour la base de données. Ces choix se sont par affinités avec les membres du groupe (technologies déjà maîtrisées). Nous avons travaillé via Github pour travailler en projet en groupe et nous avons déployé la base de données et l'application sur heroku car il propose un service gratuit pour la quantité de données que nous utilisons.

## Schéma de la base de données

Notre choix de sujet s'est porté sur la gestion des vols d'un aéroport. 
Il nous a semblé logique de découper les données en trois tables disctinctes à savoir :
- employee : décrit les informations sur les employés de l'aéroport qui sont en lien avec le vols (stewart et pilote). Les colonnes sont secuNum(clé primaire, int), firstName(string), lastName(string), address(string), job(string), license(int), salary(int)
- passenger : décrit les informations sur les clients de l'aéroport. Les colonnes sont numero(clé primaire, int), fistName(str), lastName(str), address(str)
- planes : décrit les informations des avions. Les colonnes sont numPlane(clé primaire, int), type(str), capacity(int)

Avec ces trois tables nous pouvons maintenant créé des vols et tickets :
- flight : décrit les informations sur un vol. Les colonnes sont num(clé primaire, int), departureAirport(string), arrivalAirport(string), departureDate(date), arrivalDate(date), pilot1(int qui correspond au secuNum de l'employé), pilot2 (int idem), stewart1(idem), stewart2(idem), emptyPlaces(int), numPlane(int)
- ticket : décrit les information d'un ticket. Les colonnes sont num(clé primaire, int), date(date du décollage, date), price(int), numFlight(numéro du vol, int), numPassenger(numéro du client, int)
