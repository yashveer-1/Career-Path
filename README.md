# PathFinder Skill Gap Analyzer

A full MERN module that compares a student's current skills with a target
career, persists each analysis, and produces readiness scores, recommendations,
learning roadmaps, course resources, history, trend charts, PDF reports, and
JSON exports.

The existing static PathFinder pages remain at the repository root. The new
application is organized as:

```text
backend/   Express, Mongoose, MVC controllers, services, and API routes
frontend/  React, Tailwind CSS, Axios, Recharts, and report exports
```

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the backend environment template and set your MongoDB connection:

   ```bash
   cp backend/.env.example backend/.env
   ```

3. Optionally copy `frontend/.env.example` to `frontend/.env`. The Vite
   development proxy works without it.

4. Start MongoDB, then run both applications:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173`.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/register` | Create an account and issue a 7-day JWT |
| `POST` | `/api/auth/login` | Authenticate and issue a 7-day JWT |
| `GET` | `/api/auth/me` | Return the authenticated user |
| `POST` | `/api/auth/logout` | Confirm stateless logout |
| `POST` | `/api/users/guest-session` | Restore or create a guest student |
| `GET` | `/api/skill-gap/options` | Careers and required skills |
| `POST` | `/api/skill-gap/analyze` | Create and save an analysis |
| `GET` | `/api/skill-gap/history/:userId` | Retrieve analysis history |
| `GET` | `/api/skill-gap/analysis/:analysisId` | Retrieve one report |
| `POST` | `/api/career-path/generate` | Generate or restore a personalized path |
| `GET` | `/api/career-path/?userId=...` | Retrieve saved career progress |
| `PATCH` | `/api/career-path/task-complete` | Update daily, weekly, or monthly completion |

Example analysis request:

```json
{
  "userId": "YOUR_MONGODB_USER_ID",
  "career": "AI Engineer",
  "selectedSkills": ["Python", "SQL", "Git"]
}
```

## Verification and production

```bash
npm run check
npm run build
NODE_ENV=production npm start
```

In production, Express serves `frontend/dist` and the API from the same
process. Set `CLIENT_URL` to a comma-separated allowlist when the client is
hosted separately.
