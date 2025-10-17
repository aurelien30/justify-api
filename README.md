# Justify API

API REST en **Node.js + TypeScript** qui justifie un texte (80 caractères par ligne), protégée par **token** et avec **quota journalier de 80 000 mots**.

---

## Installation & développement

```bash
# Cloner le repo
git clone https://github.com/<ton-username>/justify-api.git
cd justify-api

# Installer les dépendances
npm install

# Lancer le serveur en mode développement (avec hot reload)
npm run dev
```

---

## Build & production

```bash
npm run build
npm start
```

---

## Endpoints (exemples Postman)

### 1) Générer un token

**Méthode :** `POST`  
**URL :** `http://localhost:3000/api/token`  

**Headers :**
| Key | Value |
|------|--------|
| Content-Type | application/json |

**Body (raw JSON) :**
```json
{"email": "test@example.com"}
```

**Réponse attendue :**
```json
{"token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
```

---

### 2) Justifier un texte

**Méthode :** `POST`  
**URL :** `http://localhost:3000/api/justify`  

**Headers :**
| Key | Value |
|------|--------|
| Content-Type | text/plain |
| Authorization | Bearer <ton_token_valide> |

**Body (raw Text) :**
```
Ceci est un exemple de texte à justifier. Il doit être envoyé en plain text.
```

**Réponse attendue :**
- **HTTP 200 OK**
- **Content-Type :** `text/plain; charset=utf-8`
- Corps : texte justifié, chaque ligne = 80 caractères maximum.

---

## Codes d’erreur possibles

| Code | Type | Explication |
|------|------|--------------|
| 400 | Bad Request | Mauvais format du body ou Content-Type incorrect |
| 401 | Unauthorized | Token manquant ou invalide |
| 402 | Payment Required | Quota journalier de 80 000 mots dépassé |

---

## Tests manuels (via Postman)

 **1)Créer un token**
- Requête : `POST /api/token`
- Vérifie la réponse `{ "token": "..." }`

 **2) Justifier un texte**
- Requête : `POST /api/justify`
- Ajoute le header `Authorization: Bearer <token>`  
- Type de body : `text/plain`
- Vérifie que le texte est justifié à 80 caractères par ligne.

**3) Tester les erreurs**
- Sans token → 401  
- Token invalide → 401  
- Mauvais Content-Type → 400  
- Texte > 80 000 mots → 402  

---

## Page de test HTML 

Une page de test locale `public/index.html` est incluse pour tester l’API sans Postman.  
Elle contient deux formulaires :
- un pour **obtenir un token** → récupère le token via `/api/token`
- un pour **justifier un texte** → teste la justification directement dans le navigateur via `/api/justify`

> Si vous modifier cette page, valide-la sur [https://validator.w3.org/](https://validator.w3.org/)  
> (respect du doctype, des balises `<html lang="fr">`, `<meta charset="utf-8">`, et des labels `<label for="...">`).

Via la page web
1. Lance le serveur (`npm run dev`)
2. Ouvre le navigateur à `http://localhost:3000`
3. Formulaire “Obtenir un token” :
   Entre ton email
   Clique sur “Générer le token”
   Le token s’affiche sous le formulaire
   
4. Formulaire “Justifier un texte” :
   Copie ton texte à justifier
   Clique sur “Envoyer”
   Le texte justifié s’affiche dans la page

---

## Déploiement (Render / Railway)

**Commandes Render :**
- **Build command :** `npm ci && npm run build`
- **Start command :** `node dist/server.js`

Une fois déployée, L'API sera accessible depuis une URL publique (ex : `https://justify-api.onrender.com`).

---

## Auteur

**ASSIA Aurélien**  
Étudiant en 3ᵉ année de Bachelor en Ingénierie du Web — ESGI  
Email: aurassil3003@gmail.com




