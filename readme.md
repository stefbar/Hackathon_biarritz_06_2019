Wild Code League
Hackathon

Contexte

La Wild Code School vient de créer, il y a à peine quelques mois, la première compétition inter-campus de hackathon: la Wild Code League.  A intervalle irrégulier, les campus s’affrontent en un-contre-un dans des duels de développement logiciel sans pitié. Depuis aujourd’hui, les résultats de la ligue viennent d’être rendus disponible via l’API de la Wild Code School. 

Mission
Seul ou en équipe, votre mission sera de développer une application web ou mobile permettant de suivre la Wild Code League en temps-réel. Les utilisateurs de l’application seront les recruteurs et les futurs wilders. L’application devra remplir les fonctions suivantes: 

Permettre à un utilisateur de visualiser la liste des campus de la Wild Code School
Permettre à un utilisateur de visualiser l’historique des duels inter-campus
Permettre à un utilisateur de visualiser  le classement ELO de chaque campus
Permettre à un utilisateur de consulter la liste des élèves de chaque campus

Cahier des charges 

Développer une interface utilisateur (application) en utilisant les technologie de votre choix 
Développer un backend avec NodeJS et Express
le backend communiquera avec le front grâce à une API que vous aurez développé vous-même
le backend récupérera les données de la ligue via l’API officielle de la Wild Code School
le calcul du classement ELO de chaque campus sera réalisé sur votre backend
la backend pourra (si nécessaire) être connecté à votre propre base de données
Réaliser un ou plusieurs tests unitaires
Fournir un code clair et commenté, voire idéalement une petite documentation de manière à ce que d’autres développeurs puissent continuer votre projet.




Ressources
L’url vers l’API à utiliser: https://us-central1-rc-league.cloudfunctions.net/wildcodeschool 
Les chemins utiles de l’API : 

/campuses : la liste des campus 
/matches   : la liste des matches
/wilders      : la liste des wilders
Notes Importantes

Au début de la ligue, chaque Campus possède un classement ELO de 1000 points
