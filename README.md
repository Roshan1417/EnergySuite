🌍 EnergySuite – Smart Energy Efficiency & Task Management System

A full-stack dashboard to monitor energy usage, manage teams, assign optimization tasks, and improve operational efficiency.

🚀 Overview

EnergySuite is a modern, intuitive Energy Efficiency & Task Manager built on a full-stack architecture.
It helps organizations monitor weekly energy usage, get instant insights, assign tasks to technicians, and improve overall performance — all through a clean, premium, dark-themed dashboard.

This project solves a real operational need:

“Understanding energy consumption is easy.
Reducing it intelligently is the real problem.”

EnergySuite bridges that gap by combining analytics + task management in one place.

💡 Why I Built This

I wanted to create a project that:

✔ Is practical and resembles real industry dashboards

✔ Covers all 3 assigned tracks — Frontend, Backend & Full-Stack

✔ Showcases modern UI/UX, charts, animations, predictions

✔ Demonstrates database integrations & CRUD operations

✔ Looks visually premium, not like a basic assignment

✔ Reflects both human design and AI-driven intelligence

The result is a tool that can actually be used in:

🏭 Industries

🏢 IT Offices

🛠 Facility management

🏥 Hospitals

🏠 Smart buildings

⚡ Energy & sustainability teams

✨ Features
🔌 Energy Analytics

Interactive weekly energy usage chart

Trendline for analytics

Average consumption line

Real-time mock data simulation

Live efficiency indicator

👥 Employee Management

Add / Edit / Delete employees

Manage roles & contacts

View team structure at a glance

📝 Task Management

Create energy optimization tasks

Auto-detect priority using smart keywords

Update task progress (Pending → In-Progress → Completed)

Assign tasks to employees

Delete tasks

Task status donut chart

📊 Dashboard Highlights

Weekly energy usage chart

Task distribution chart

Efficiency sparkline

Technician stats & workforce overview

Smooth animations, gradients, UI interactivity

⚙️ Backend Capabilities

RESTful API built with Express.js

SQLite database with auto-generated tables

CRUD operations for Employees & Tasks

Mock energy data endpoint

Clean, modular routing structure

🏗 Tech Stack
Frontend

React + Vite

Tailwind CSS

Recharts (Line, Donut, Sparkline charts)

Lucide Icons

Custom animations + gradients

Backend

Node.js

Express.js

SQLite (lightweight & portable)

CORS, Morgan logging

Deployment

Netlify → Frontend

Render → Backend

📁 Project Structure
energy-efficiency-task-manager/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Charts, Forms, UI pieces
│   │   ├── pages/          # Dashboard, Employees, Tasks
│   │   ├── api.js          # API layer
│   │   ├── index.css       # Tailwind + custom theme
│   │   └── App.jsx         
│   └── public/
│
├── server/                 # Backend API
│   ├── routes/             # Employees / Tasks routers
│   ├── db/                 # SQLite DB + init script
│   └── index.js            # Express entry point
│
└── README.md

🔧 Setup Instructions
1️⃣ Clone the repository
git clone <your-repo-url>
cd energy-efficiency-task-manager

2️⃣ Install Frontend Dependencies
cd client
npm install
npm run dev


Frontend will run on:
👉 http://localhost:5173

3️⃣ Install Backend Dependencies
cd server
npm install
npm run dev


Backend REST API runs on:
👉 http://localhost:4000

🔌 API Endpoints (Backend)
Employees
GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

Tasks
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

Energy (Mock Data)
GET /api/energy

🌐 Deployment
Frontend (React) – Netlify

Build frontend

cd client
npm run build


Drag & drop dist/ folder into Netlify.

Done. Instant deployment.

Backend (Express) – Render

Push project to GitHub

Go to render.com → New Web Service

Select /server folder

Set:

Build Command: npm install
Start Command: node index.js


Deploy 🎉

🧠 Bonus Features Implemented

Live energy prediction

Auto priority detection for tasks

Efficiency trend sparkline

Gradient UI + animations

Interactive donut & line charts

Dark theme with custom CSS variables

Fully responsive layout

🌟 What Makes This Project Special?

EnergySuite isn’t a simple CRUD assignment — it's built like a real SaaS dashboard:

Beautiful design

Smooth transitions

Real-world use case

Full CRUD

Analytics + visuals

Team & task workflow

Clean fullstack architecture

It blends human creativity (UI/UX, problem-solving) and AI logic (prediction, auto-priority, insights), representing how modern software is actually built today.

📸 Screenshots

(Add your dashboard screenshots here)
Dashboard • Tasks • Employees

🤝 Author

Shaik Roshan
Full-Stack Developer | React | Node | UI/UX | Cloud
GitHub: https://github.com/Roshan1417
