# MERN ToDo — User Management CRUD App

[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![License](https://img.shields.io/badge/License-ISC-blue)](./server/package.json)

A full-stack **MERN** CRUD application for managing users — list with live search, create, update, and delete — built with **React 18 + Vite**, **Express 4**, and **MongoDB Atlas (Mongoose)**. Toast notifications, Bootstrap 5 UI, and React Router v7 navigation included.

## Features

- List all users in a responsive table with **live search filter**
- **Create** user (name, email, age) with form validation UI
- **Update** user via pre-filled edit form (`/update/:id`)
- **Delete** user with one click + toast feedback
- Loading / empty states, toast notifications (success + error)
- Health-check endpoint (`GET /test`) for backend monitoring

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 18, Vite 8, React Router v7, Axios, Bootstrap 5, React Toastify, React Icons |
| Backend    | Node.js 24, Express 4.22, Mongoose 8, CORS, dotenv |
| Database   | MongoDB Atlas (Mongoose ODM, `users` collection) |
| Dev tools  | Nodemon (auto-reload), ESLint, `vite preview` for prod check |

## Architecture

```text
┌──────────────┐  VITE_BASE_URL  ┌────────────────┐  MONGO_URL  ┌──────────────┐
│  React (SPA) │ ──────────────▶ │ Express (/todo) │ ──────────▶ │ MongoDB Atlas│
│  :5173       │ ◀────────────── │ :5000            │ ◀────────── │ users        │
└──────────────┘   JSON + toast  └────────────────┘    Mongoose  └──────────────┘
```

## Project Structure

```text
.
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx          # Routes: / → Users, /create, /update/:id
│   │   ├── Users.jsx        # List + search + delete
│   │   ├── CreateUser.jsx   # Create form → POST /todo/adduser
│   │   ├── UpdateUser.jsx   # Edit form → GET/PUT /todo/…
│   │   └── main.jsx         # Root + ToastContainer
│   ├── .env                 # VITE_BASE_URL=http://localhost:5000 (gitignored)
│   └── package.json
└── server/                  # Express + Mongoose backend
    ├── server.js            # App entry: CORS, JSON, /test, /todo router
    ├── route/route.js       # REST routes (mounted at /todo)
    ├── controller/          # getall, getsingle, adduser, updateuser, deleteuser
    ├── models/userModel.js  # Mongoose schema: name*, email*, age*
    ├── .env                 # MONGO_URL + PORT (gitignored)
    └── package.json         # start → nodemon server.js
```

## Prerequisites

- **Node.js ≥ 20** (tested on v24) and npm
- A **MongoDB Atlas** cluster (or local MongoDB) + connection string

## Quickstart

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then fill in your values (table below)
npm start              # nodemon server.js → http://localhost:5000
```

`server/.env`:

| Variable    | Required | Example |
|-------------|----------|---------|
| `MONGO_URL` | yes | `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority` |
| `PORT`      | no (default `5000`) | `5000` |

Verify: `GET http://localhost:5000/test` → `okay`.

### 2. Frontend

```bash
cd client
npm install
echo "VITE_BASE_URL=http://localhost:5000" > .env
npm run dev            # → http://localhost:5173
```

| Variable         | Required | Purpose |
|------------------|----------|---------|
| `VITE_BASE_URL`  | yes | Base URL the SPA uses for all `/todo/*` API calls |

### 3. Production build (frontend)

```bash
cd client
npm run build    # outputs to client/dist/
npm run preview  # serve the production build locally
```

## API Reference

Base URL: `http://localhost:5000`. All bodies/returns are JSON. User shape: `{ "_id"?, "name": string, "email": string, "age": number }` (all three required on create).

| Method   | Endpoint              | Description        | Body |
|----------|-----------------------|--------------------|------|
| `GET`    | `/test`               | Health check → `"okay"` | — |
| `POST`   | `/todo/adduser`       | Create a user      | `{ name, email, age }` |
| `GET`    | `/todo/getall`        | List all users     | — |
| `GET`    | `/todo/getuser/:id`   | Get one user       | — |
| `PUT`    | `/todo/updateuser/:id`| Update a user      | `{ name, email, age }` |
| `DELETE` | `/todo/deleteuser/:id`| Delete a user      | — |

Example:

```bash
curl -X POST http://localhost:5000/todo/adduser \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","email":"asha@example.com","age":27}'

curl http://localhost:5000/todo/getall
```

## NPM Scripts

**client** — `dev` (Vite dev server), `build` (production bundle), `preview` (serve `dist/`), `lint` (ESLint).

**server** — `start` (`nodemon server.js`, auto-reloads on change).

## Deployment Notes

- Set `MONGO_URL` and `PORT` as environment variables on your host (Render/Railway/VPS); never commit `.env`.
- Serve the client (`vite build` output) via any static host (Vercel/Netlify/Nginx) and point its `VITE_BASE_URL` at the public backend URL (rebuild after changing it — Vite inlines env at build time).
- Restrict CORS in `server.js` (`server.use(cors())` currently allows all origins) before exposing the API publicly.

## Troubleshooting

| Symptom | Likely cause / fix |
|---------|--------------------|
| `undefined/todo/getall` or network errors in UI | `client/.env` missing `VITE_BASE_URL` — restart `npm run dev` after creating it |
| Backend starts but writes fail | `MONGO_URL` wrong/unreachable — check Atlas IP allow-list + credentials |
| `EADDRINUSE :::5000` | Another backend instance running — stop it, then `npm start` |
| Empty table, `[]` from `/todo/getall` | Connected DB/collection has no documents yet — create one via `/create` |

## Contributing

Issues and pull requests are welcome. For dependency (Dependabot) PRs, please ensure `npm install` + `npm run build` (client) pass before merging.

## Author

**SKSARUK10** — [github.com/SKSARUK10](https://github.com/SKSARUK10)
