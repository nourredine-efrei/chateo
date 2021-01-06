# **Chateo**

---------------

Introduction :

Le site est un chat avec plusieurs canaux Qu&#39;il est possible de rejoindre afin de discuter d&#39;un épisode, d&#39;un chapitre de light novel ou manga ou d&#39;un film, sortie récemment.

Il est possible d&#39;échanger avec n&#39;importe quel personne se connectant aussi au chat. Il y a des modérateurs pouvant gérer les différents canaux.

Le chat se doit d&#39;être en temps réel (ce n&#39;est pas un forum) et doit être très simple d&#39;utilisation (pas besoin de s&#39;inscrire sur le siteweb pour participer au chat)

---------------

**Problème à résoudre :** le chat doit être en temps réel

**Solution envisagée :** utilisation de socket.io, un module de Node.js permettant l&#39;envoi de socket entre client/serveur.

---------------

**Sous problème:** lorsque l&#39;utilisateur clique sur une catégorie de chat,

tout doit se faire sans actualiser la page (on propose directement à l&#39;utilisateur de se connecter)

**Solution envisagée:** site complètement dynamique juste avant l&#39;entrée dans le chat (barre de recherche dynamique)

---------------

**Sous problème:** Les séries/anime ont un épisode par semaine, alors il n&#39;y aura plus d&#39;activité sur les chat sur les anciens épisodes.

**Solution envisagée:** Compte admin pour supprimer/modifier/ajouter des chats supplémentaires

--------------

**Sous problème :** si une trop grosse activité, crash des serveurs

**Solution envisagée :** Limiter le nombre de personne pouvant être en simultanée

dans un chat.

--------------

**Sous problème :** générer de l&#39;importance à la participation au chat

**Solution envisagée :** rang d&#39;utilisateur selon le nombre de message envoyé et/ou le nombre de jour connecté

-----------------------------------

**Feuille de route et Deadlines :**

Etape 1 : concevoir un seul chat fonctionnel **(Obligatoire)**

**Deadline :**** 20/12/2020**

Etape 2: création de base de donnée et connexion au chat possible via login **(Obligatoire)**

**Deadline :**** 25/12/2020**

Etape 3: compte modérateur essayant certaines fonctionnalité dans le chat (première fonctionnalité à implémenter, la suppression de messages ou le bannissement d&#39;un autre utilisateur lambda) **(Obligatoire)**

**Deadline :**** 28/12/2020**

Etape 4: Création d&#39;une galerie correspondant chacun à un chat différent **(Obligatoire)**

**Deadline :**** 2/01/2021**

Etape 5: compte admin pour supprimer ajouter modifier les galeries (Optionnel)

**Deadline :**** 6/01/2021**

Etape 6: Ajout de récompense/rang aux utilisateurs selon leur participation (Optionnel)

**Deadline :**** 6/01/2021**

--------------------------------

**Répartition des tâches :**

**Boudissa Nourredine :**

Création d&#39;un chat simple avec socket.io

Création d&#39;un compte modérateur pouvant supprimer des messages, bannir des persones, ou désactiver le chat

**Shutian Liu :**

Création de la page d&#39;accueil (avec les différentes catégories, la page login)

Création de la base de donnée

Création d&#39;un compte admin qui peut ajouter à la base de données des séries/films/anime ou en supprimer/modifier leurs informations
