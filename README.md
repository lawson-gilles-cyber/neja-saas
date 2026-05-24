# 🌿 Neja SaaS Platform

Plateforme pédagogique pour le Master **Nouvelles Écritures de l'Anthropocène**.

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 14, Tailwind CSS, TypeScript |
| Backend | NestJS, Prisma ORM |
| Base de données | PostgreSQL |
| IA | OpenAI GPT-4o-mini |
| Déploiement | Vercel (frontend) + Railway (backend) + Neon (DB) |

## Démarrage rapide

```bash
# 1. Copier les variables d'environnement
cp .env.example .env
# → Renseigner DATABASE_URL, POSTGRES_PASSWORD, OPENAI_API_KEY, JWT_SECRET

# 2. Lancer avec Docker
docker compose up --build

# 3. Migrer la base de données (dans un 2ème terminal)
cd apps/backend
npx prisma migrate dev --name init
```

Frontend disponible sur http://localhost:3000  
API disponible sur http://localhost:4000/api/v1

## Déploiement production

### Frontend → Vercel
```bash
cd apps/frontend
npx vercel --prod
# Ajouter NEXT_PUBLIC_API_URL dans le dashboard Vercel
```

### Backend → Railway
1. Connecter le repo GitHub sur [railway.app](https://railway.app)
2. Sélectionner `apps/backend` comme Root Directory
3. Ajouter toutes les variables de `.env.example`
4. Railway détecte automatiquement le `Dockerfile`

### Base de données → Neon
1. Créer un projet sur [neon.tech](https://neon.tech)
2. Copier la `DATABASE_URL` dans Railway
3. La migration s'exécute au démarrage via `railway.toml`

## Architecture des pages

```
/dashboard       → Tableau de bord étudiant
/courses         → Catalogue des cours
/quiz            → Quiz interactifs
/examens         → Examens hebdomadaires
/bibliotheque    → Ressources & documents
/assistant       → Chat IA pédagogique
/memoire         → Gestion du mémoire de recherche
/profil          → Profil utilisateur
/administration  → Backoffice (ADMIN only)
```
