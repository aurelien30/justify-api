# justify-api

Une API REST qui justifie le texte (aligne les paragraphes à droite et à gauche) tout en gérant la limite de mots par utilisateur grâce à un système de token.

## Fonctionnalités

- Justification de texte (alignement justifié)
- Authentification simple par token
- Limitation de mots par jour par utilisateur
- API REST respectant les conventions HTTP (GET, POST)
- Tests automatisés avec Jest
- Stockage temporaire des tokens

## Structure du projet

justify-api/
├── src/
│ ├── index.js
│ ├── routes/
│ ├── controllers/
│ └── services/
├── tests/
├── data/
│ └── tokens.json
├── .gitignore
├── package.json
└── README.md


### Détails des dossiers

| Dossier/Fichier | Rôle |
|------------------|------|
| **src/** | Contiendra le code source principal (serveur, routes, contrôleurs). |
| **tests/** | Contiendra les tests unitaires et d’intégration. |
| **data/** | Contiendra les fichiers temporaires (ex : `tokens.json`). |
| **.gitignore** | Exclut certains fichiers/dossiers du dépôt Git. |
| **package.json** | Gère les dépendances et scripts Node.js. |
| **README.md** | Documentation du projet (ce fichier). |

---

## Installation du projet

### Cloner le dépôt
```bash
git clone https://github.com/aurelien30/justify-api.git

# Aller dans le dossier
cd justify-api

# Initialiser le projet (si pas déjà fait)
npm init -y

# Installer Express
npm install express
```

## Tests API avec Postman
Étape 1 — Vérifier Postman

Ouvre Postman

Clique sur New → HTTP

Choisis la méthode GET

Colle cette URL de test :
https://jsonplaceholder.typicode.com/todos/1

Clique sur Send

Afin d'obtenir:

{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}

### Technologies utilisées

Node.js — Environnement d’exécution JavaScript

Express.js — Framework minimaliste pour créer des APIs REST

Git & GitHub — Versionnement du projet

Postman — Test des requêtes HTTP


### Auteur

Projet développé par ASSIA Aurelien /Github: aurelien30
Étudiant en développement Web Full Stack à l’ESGI
Bachelor 3 — Ingénierie du Web

### Historique des commits

Commit 1: Initial commit — dépôt et configuration Git créés

Commit 2
Ajout de la structure du projet, .gitignore et README.md

Commit 3 
Ajout des fichiers src, tests, data


