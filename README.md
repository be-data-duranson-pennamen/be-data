## TO DO

# Introduction

Dans le cadre du MOD Système de Base de Données, nous avons créé une base de données permettant de gérer un traffic aérien avec des fonctionnalités client (réserver un vol) et administrateur (créer un vol, voir des statistiques et voir les détails d'un vol).
Pour ce faire, nous avons créé une application web de type client-serveur dont nous détaillerons les choix technologiques plus tard.

# Cahier des charges

cf fichier excel cahier_des_charges_fonctionnel.xlsx

# Installation en local

## Préambule

Il est nécessaire d'avoir git et Node.js sur son pc pour pouvoir cloner et lancer le projet. Vous pouvez trouver les liens de téléchargements ici :
Node - https://nodejs.org/en/download/
Git - https://git-scm.com/downloads

1. Clonez ce repertoire git sur votre ordinateur dans un invite de commande à l'endroit désiré.
 ```git clone https://github.com/be-data-duranson-pennamen/be-data```
Vous devez avoir 2 dossier : front et back. Comme leur noms l'indique, il s'agit du back-end et du front-end.
2. Placez le fichier .env dans à la racine du dossier **back** (`/be-data/back/.env`). Le '.' signifie que c'est un fichier caché, vous ne le verrez donc pas dans votre répertoire. Vous pouvez vérifier s'il est au bon endroit avec la commande terminal `ls` ou en utilisant un IDE comme Visual Studio Code (qui vous permettra également de voir son contenu si besoin). Si vous n'avez pas ce fichier, ou si vous n'arrivez pas à le déplacer, contactez les éditeurs.
3. Assurez vous que npm est installé sur votre machine (essayer "npm something.js" dans un terminal et regardez si l'erreur est "command not found" ou "no such file or directory")
4. Lancer le serveur back-end : ouvrir un terminal dans le dossier /back et executez la commande suivante :
```npm i```
Cette commande va installer tous les packages utiles à l'execution de notre code back-end, cela peut prendre quelques secondes. Une fois fait, executez :
```npm start```
Nous avons créé un raccourci pour que npm start aille directement pointer sur le fichier de départ du serveur. Vous devez maintenant voir le message ```API listening on port 3000```, le serveur back-end est lancé en local et tourne sur votre port 3000, parfait !
5. Lancez le front-end : ouvrez une nouvelle fenetre de terminal et allez dans le dossier /front. Executez ```npm i``` puis executez :
```npm run serve```
ou
```./node_modules/.bin/vue-cli-service serve```
si cela ne marche pas
La deuxième commande va compiler le code Vue et peut donc prendre un peu de temps (quelques secondes). Vous devez ensuite voir le message : 
`App running at:
  Local:   http://localhost:8080/ 
  Network: http://xxx.xxx.xxx.xxx:8080/ `
6. Ouvrez **Chrome**, tapez dans la barre de recherche le lien Local (ou Network, c'est pareil car c'est votre adresse IP qui va apparaitre). Vous voilà sur notre site web !

# Utilisation du site Web

Vous êtes maintenant sur le port 8080 et arrivez sur la page des vols. Vous pouvez effectuer une recherche en séléctionnant les aéroports de départ et d'arrivée que vous voulez. Il n'y a aucun vol... pas d'inquiétude ! Nous avons vidé la base de donnée pour la démonstration car nous avons prévu un système de remplissage automatisé.
## Générer des données

### Se connecter en tant qu'administrateur

Nous allons donc commencer par générer du personnel, des clients, des avions et des billets (ceux des autres passagers que vous, pour tester les logiques de places restantes). Pour ce faire, nous allons nous connecter en administrateur. Cliquez sur l'onglet **Admin** en haut à droite de la page des vols. Une boite de dialogue va vous demander un mot de passe, c'est *admin* (pas très RGPD je pense mais bon dites rien). On arrive donc sur la page ```admin``` qui a 3 boutons. Votre connexion est sauvegardée en cache sur le serveur local. Cliquez sur **Générer des données d'études**, nous expliquerons plus tard à quoi sont liés les autres boutons.

### La page generate : employés, avions et clients

Vous arrivez sur la page ```generate```. (p.s. : Vous pouvez tester en vous déconnectant, il est impossible d'accéder à cette page sans être connecté, même en écrivant à la main `http://localhost:8080/generate` dans la barre de recherche de Chrome). Une fois sur cette page vous pouvez créer un certain nombre d'employés, d'avions et de clients. Nous conseillons respectivement 10, 5 et 100 mais vous pouvez en mettre plus si vous voulez (ne mettez pas des chiffres extravaguants, PosgreSQL n'est gratuit que jusqu'à un certain point). La base de donnée s'est alors remplie des données "de base". Nous expliqueront très prochainement ce que font les deux boutons suivants. Cliquez sur `Menu` sur la barre de navigation en haut à droite pour revenir au menu `admin`.

### Création de vols

Nous avons nos données "de base", mais il nous manque encore un element essentiel : les vols. Nous avons décidé de les créer à la main, avec une logique de vols réguliers. Cliquez donc sur **Créer un vol**. Vous arrivez sur la page `flight-creator`. cette page va vous permettre de de créer des vols. Sélectionnez les aéroports de départ et d'arrivée, la date de départ (la date d'arrivée est automatiquement calculée par le système en fonction de vraies données de vol), sélectionnez un avion parmis la liste des avions disponibles, sélectionner des pilotes et des stewarts parmis la liste des employés (notez qu'une logique a été implémentée pour ne pas qu'un employé puisse avoir plusieurs rôles dasn le même avion, aussi, les employés ont un métier précis, les pilotes ne peuvent pas être stewarts et inversement) et renseignez le prix du billet **en centimes**. Vous avez ensuite une option qui va vous permettre de choisir si ce vol est un vol unique, quotidien (tous les jours à cette heure) ou hebdomadaire (toutes les semaines, ce jour à cette heure). Pour les deux derniers cas de figure les vols sont générés pour 1 mois (pas à l'infini). 

Nous avons maintenant des vols ! On pourrait retourner sur la page d'accueil de tout à l'heure pour voir les vols mais nous allons d'abord générer un bon nombre de billets pour avoir d'autres passagers que vous dans l'avion.

### Retour sur la page generate : billets

Retournez sur la page `generate`. Cliquez sur **Créer des billets**. Un nombre aléatoire de billets vient d'être généré, ce nombre est dépendant de la place dans chaque avion et du nombre de clients en tout (un passager ne peux pas payer 2 fois le même billet). Vous pouvez re-cliquer quelques fois mais ne dépassez pas une 10/15 fois sinon les avions seront tous complets.

### Suppression des données (à faire à la fin du test)

En cliquant sur **Supprimer toutes les données**, vous effacez l'intégralité de la base de données. Il y a un message de confirmation pour éviter que vous fassiez ça par erreur. Notez que la base de donnée est partagée, ce qui veut dire que si vous supprimez les données plus personne n'y aura accès.

## Réservation d'un billet

### La nouvelle page de garde

Toutes les données artificielles ont été générées ! Nous pouvons maintenant nous reconnecter au site en tant que simple utilisateur qui veut réserver son billet. Cliquez sur `Déconnexion`dans la barre de navigation en haut à droite. Vous êtes de retour sur la page de garde avec la liste des vols !

Essayez maintenant de rechercher un vol en sélectionnant dans les départs et destinations disponibles. Notez que vous n'avez ici que les options conduisant à un résultat. Des infos très lisibles sont affichées pour chaque vols, avec le prix en euros, 

Notez le nombre de place disponible dans le vol que vous avez selectionné cliquez sur le bouton **Réserver ce vol**.

### La page de réservation

Renseignez ici les 3 champs : **Prénom**, **Nom** et **Adresse**. Réessayez une deuxième fois avec les mêmes informations : la réservation vous est refusée car vous avez déjà pris le billet. Réessayez mainteant une troisième fois en changeant vos informations : un deuxième billet a été créé. 

Retourner maintenant sur la page principale

## Gestion administrateur

Nous avons implémenté 2 fonction principales administrateurs : les détails de vol et les statistiques. Pour accéder aux deux vous allez devoir vous connecter en administrateur.

### Détails de vol

Pour accéder aux détails du vol, cliquez sur **Voir les vols**. Ceci va vous ramener à la page de garde mais avec des droits d'administrateurs. Vous pourrez ici supprimer un vol (corbeille rouge) ou voir les détails du vol (point d'information bleu). 

Commencez par cliquer sur le bouton information. Vous obtenez la liste des passagers, les membres d'équipage et le prix du vol.

Retournez ensuite sur la page des vols et supprimez un vol. Il disparait, et tous les billets lui étant liés sont aussi automatiquement supprimés.

### Statistiques

Pour voir des statistiques d'ordre global, retournez sur la page `admin` grâce à l'onglet `Menu` de la barre de navigation. Cliquez ensuite sur le bouton `Statistiques`. Vous arrivez sur la dernière page de notre application front-end : `statistics`. Vous avez ici 4 graphiques, tous intéractifs ce qui vous permet d'avoir plus d'informations en passant la souris dessus :
- En haut à gauche, vous avez le revenu par ligne aérienne. C'est la somme des billets pris par des passagers pour effectuer ce trajet dans un sens ou dans l'autre. Il permet à l'administrateur de se rendre compte instantanément des lignes aériennes les plus prolifiques.
- En haut à droite, vous avez les avions disponibles. Ceci permet à un administrateur de se rendre compte de la flotte dont dispose sa compagnie, et de voir s'il y a un désequilibre/une incohérence. Il s'agit ici du nombre **total** d'avions disponibles, on ne prend pas en compte leur utilisation pour des éventuels vols.
- En bas à gauche, vous avez un graphique de type "radar" pour décrire le remplissage moyen des avions (par type). Ceci permet à un administrateur de vérifier que les avions dont il dispose sont bien dimensionnés. Nous avons placé une ligne idéale en vert à 90%.
- En bas à droite, vous avez un graphique camembert représentant la charge de chaque aéroport. Chaque portion est proportionelle au nombre de vols ayant pour départ ou arrivée l'aéroport en question entre aujourd'hui et dans 7 jours. Ce graphique permet à un administrateur de vérifier si l'affluence des aéroports est en adécquation avec la taille de ceci (s'ils ne sont pas sur- ou sous-dimensionnés).

## Expérimentations

Vous avez maintenant toutes les clefs en main pour tester le site web. Essayer de générer plus de billets, de commander 2 fois le même billet, d'esquiver notre simple sécurité *admin* (ce qui n'est pas évident évident). Essayez divers limites de notre système et n'hésitez surtout pas à nous faire des retours !

# Technologies utilisées

Pour élaborer notre application, nous avons utilisé Node.js pour la partie serveur, Vue.js et VueChart pour la partie client et Postgres pour la base de données. Ces choix se sont par affinités avec les membres du groupe (technologies déjà maîtrisées). Nous avons travaillé via Github pour travailler en projet en groupe et nous avons déployé la base de données et l'application sur heroku car il propose un service gratuit pour la quantité de données que nous utilisons.

## Node js

Node js nous permet de mettre en place rapidement un serveur, c'est un framework assez flexible qui nous permet de globalement ne pas trop nous embeter avec des notions de base. Le principal défaut est la lenteur, ce qui n'est pas un problème ici car on ne va pas remplir la base de données de millions de vols.

## Vue js

Vue est un framework de javascript qui permet de décomposer en composants .vue l'interface. Ceci nous permet d'avoir une interface scriptable, réactive et facile à mettre en place grâce à toutes les fonctionnalités déjà incorporées à Vue (barre de navigation par exemple).

## VueChart

VueChart est un module de Vue. Il permet de créer des graphiques assez sympas très simplements. Il a le gros avantage d'être gratuit comparativement à d'autres modules avec lesquels on l'a comparé. Son principal inconvénient est que les graphiques ne sont par défaut pas réactifs au passage de la souris, ce qui pourraient être un plus dans certaines circonstances mais pour notre projet nous n'en avions pas besoin.

## PosgreSQL

Nous ne connaissions que 2 système SQL gratuits : MySQL et PosgreSQL. Nous avons choisi PosgreSQL car il était hébergé sur le web (MySQL est un système de base de données local) et nous avions besoin que tous les utilisateurs aient accès aux même données. Nous avons utilisé le logiciel pgAdmin 4 pour avoir un accès direct à la base de données. Nous avons ensuite utilisé le package sequelize (npm) pour assurer la communication entre notre serveur et la base de données. La base de données est hébergée sur un serveur heroku gratuit (ce qui limite la bande passante de la base de données ainsi que ça capcité maximale, éviter donc de dépasser les 10 000 lignes de données svp).

# Schéma de la base de données

Notre choix de sujet s'est porté sur la gestion des vols d'un aéroport. 
Il nous a semblé logique de découper les données en trois tables disctinctes à savoir :
- employee : décrit les informations sur les employés de l'aéroport qui sont en lien avec le vols (stewart et pilote). Les colonnes sont secuNum(clé primaire, int), firstName(string), lastName(string), address(string), job(string), license(int), salary(int)
- passenger : décrit les informations sur les clients de l'aéroport. Les colonnes sont id(clé primaire, int), fistName(str), lastName(str), address(str)
- planes : décrit les informations des avions. Les colonnes sont planeId(clé primaire, int), type(str), capacity(int)

Avec ces trois tables nous pouvons maintenant créé des vols et tickets :
- flight : décrit les informations sur un vol. Les colonnes sont id(clé primaire, int), departureAirport(string), arrivalAirport(string), departureDate(date), arrivalDate(date), pilot1(int qui correspond au secuNum de l'employé), pilot2 (int idem), stewart1(idem), stewart2(idem), emptyPlaces(int), planeId(int)
- ticket : décrit les information d'un ticket. Les colonnes sont id(clé primaire, int), flightId(numéro du vol, int), passengerId(numéro du client, int)
