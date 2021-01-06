 Chateo
---------------

Le site est un chat avec plusieurs canaux Qu'il est possible de rejoindre afin de discuter d'un épisode, d'un chapitre de light novel ou manga ou d'un film, sortie récemment. 
Il est possible d'échanger avec n'importe  quel personne se connectant aussi au chat. Il y a des modérateurs pouvant gérer les différents canaux.

Le chat se doit d'être en temps réel (ce n'est pas un forum) et doit être très simple d'utilisation (pas besoin de s'inscrire sur le siteweb pour participer au chat)


---------------
Problème à résoudre : le chat doit être en temps réel

Solution envisagée : utilisation de socket.io, un module de Node.js permettant l'envoi de socket entre client/serveur.

---------------

Sous problème: lorsque l'utilisateur clique sur une catégorie de chat, 
tout doit se faire sans actualiser la page (on propose directement à l'utilisateur de se connecter)

Solution envisagée: site complètement dynamique juste avant l'entrée dans le chat (barre de recherche dynamique)

---------------

Sous problème: Les séries/anime ont un épisode par semaine, alors il n'y aura plus d'activité sur les chat sur les anciens épisodes.

Solution envisagée: Compte admin pour supprimer/modifier/ajouter des chats supplémentaires 

--------------

Sous problème : si une trop grosse activité, crash des serveurs

Solution envisagée : Limiter le nombre de personne pouvant être en simultanée
dans un chat.

--------------

Sous problème: générer de l'importance à la participation au chat

Solution envisagée: rang d'utilisateur selon le nombre de message envoyé et/ou le nombre de jour connecté


-----------------------------------


Feuille de route: 


Etape 1 : concevoir un seul chat fonctionnel
Etape 2: création de base de donnée et connexion au chat possible via login
Etape 3: compte modérateur essayant certaines fonctionnalité dans le chat (première fonctionnalité à implémenter, la suppression de messages ou le bannissement d'un autre utilisateur lambda)
Etape 4: Création d'une galerie correspondant chacun à un chat différent
Etape 5: compte admin pour supprimer ajouter modifier les galeries
Etape 6:Ajout de récompense/rang aux utilisateurs selon leur participation


--------------------------------

Répartition des tâches :



Boudissa Nourredine :


Création d'un chat simple avec socket.io
Création d'un compte modérateur pouvant supprimer des messages, bannir des persones, ou désactiver le chat


Shutian Liu :

Création de la page d'accueil (avec les différentes catégories, la page login)
Création de la base de donnée
Création d'un compte admin qui peut ajouter à la base de données des séries/films/anime ou en supprimer/modifier leurs informations


