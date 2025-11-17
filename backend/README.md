# Portfolio Backend

A simple Express + MongoDB backend for the portfolio application.

## Setup

1. Install MongoDB (or use MongoDB Atlas)
2. Install dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the `backend` directory:
```
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
PORT=4000
```

If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

## Run

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will listen on `http://localhost:4000`.

## API Endpoints

### User
- `GET /api/user` — Get user profile
- `POST /api/user` — Create or update user profile

### Projects
- `GET /api/projects` — Get all projects
- `POST /api/projects` — Create a new project
- `PUT /api/projects/:id` — Update a project
- `DELETE /api/projects/:id` — Delete a project

### Skills
- `GET /api/skills` — Get all skills
- `POST /api/skills` — Create a new skill
- `PUT /api/skills/:id` — Update a skill
- `DELETE /api/skills/:id` — Delete a skill

## Sample Data (cURL)

Create a user:
```bash
curl -X POST http://localhost:4000/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Muhammad Abdullah",
    "description": "A passionate Web Developer",
    "location": "Pakistan",
    "email": "m.abdullah3042@gmail.com",
    "phone": "+923052686065",
    "whatsapp": "+923052686065",
    "github": "https://github.com/m-abdullah15",
    "experiences": [
      { "title": "Web Developer", "company": "Sparkx Solutions", "from": "August 2025", "to": "Sep 2025", "description": "Full Web application" }
    ]
  }'
```

Create a project:
```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "CitrusInsightAI",
    "subtitle": "Citrus Disease Detection System",
    "description": "ML-powered citrus disease detection.",
    "features": ["ML Integration", "Dashboard", "History"],
    "gradient": "from-emerald-500 to-teal-600"
  }'
```

Create a skill:
```bash
curl -X POST http://localhost:4000/api/skills \
  -H "Content-Type: application/json" \
  -d '{ "name": "React.js", "level": 95 }'
```
