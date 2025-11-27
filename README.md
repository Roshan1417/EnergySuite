# 🌍 EnergySuite – Smart Energy Efficiency & Task Management System

A full-stack dashboard to monitor energy usage, manage teams, assign optimization tasks, and improve operational efficiency.

---

## 🚀 Overview

EnergySuite is a modern, intuitive Energy Efficiency & Task Manager built on a full-stack architecture.
It helps organizations monitor weekly energy usage, get instant insights, assign tasks to technicians, and improve overall performance — all through a clean, premium, dark-themed dashboard.

This project solves a real operational need:

> **“Understanding energy consumption is easy.  
> Reducing it intelligently is the real problem.”**

EnergySuite bridges that gap by combining **analytics + task management** in one place.

---

## 💡 Why I Built This

I wanted to create a project that:

✔ Practical and resembles real industry dashboards  
✔ Covers all 3 assigned tracks — Frontend, Backend & Full-Stack  
✔ Showcases modern UI/UX, charts, animations, predictions  
✔ Demonstrates database integrations & CRUD operations  
✔ Looks visually premium, not like a basic assignment  
✔ Blends human design + AI-powered logic  

This tool can actually be used in:

🏭 Industries  
🏢 IT Offices  
🛠 Facility Management  
🏥 Hospitals  
🏠 Smart Buildings  
⚡ Energy & Sustainability Teams  

---

## ✨ Features

### 🔌 Energy Analytics
- Interactive weekly energy usage chart  
- Trendlines & analytics  
- Average consumption indicator  
- Real-time mock data simulation  
- Live efficiency indicator  

### 👥 Employee Management
- Add / Edit / Delete employees  
- Manage roles & contacts  
- View team structure at a glance  

### 📝 Task Management
- Create energy optimization tasks  
- Auto-detect priority using keyword intelligence  
- Update task progress (Pending → In-Progress → Completed)  
- Assign tasks to employees  
- Delete tasks  
- Task status donut chart  

### 📊 Dashboard Highlights
- Weekly energy usage chart  
- Task distribution chart  
- Efficiency sparkline  
- Technician stats & workforce overview  
- Smooth animations + gradients  

### ⚙️ Backend Capabilities
- RESTful API built with **Express.js**  
- **SQLite** database with auto-generated tables  
- CRUD operations for Employees & Tasks  
- Mock energy endpoint  
- Clean modular routing  

---

## 🏗 Tech Stack

### Frontend
- React + Vite  
- Tailwind CSS  
- Recharts (Line, Donut, Sparkline charts)  
- Lucide Icons  
- Custom Animations & Gradients  

### Backend
- Node.js  
- Express.js  
- SQLite  
- CORS, Morgan Logging  

### Deployment
- **Netlify → Frontend**
- **Render → Backend**

---

## 📁 Project Structure

energy-efficiency-task-manager/
│
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/ # Charts, Forms, UI pieces
│ │ ├── pages/ # Dashboard, Employees, Tasks
│ │ ├── api.js # API layer
│ │ ├── index.css # Tailwind + custom theme
│ │ └── App.jsx
│ └── public/
│
├── server/ # Backend API
│ ├── routes/ # Employees / Tasks routers
│ ├── db/ # SQLite DB + init script
│ └── index.js # Express entry point
│
└── README.md

---

## 🔧 Setup Instructions

### **1️⃣ Clone the repository**
bash
git clone <your-repo-url>
cd energy-efficiency-task-manager
2️⃣ Install Frontend Dependencies
cd client
npm install
npm run dev


Frontend will run at:
👉 http://localhost:5173

3️⃣ Install Backend Dependencies
cd ../server
npm install
npm run dev


Backend API runs at:
👉 http://localhost:4000

🔌 API Endpoints
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

Energy (Mock)
GET /api/energy

🌐 Deployment
Frontend (React) – Netlify
cd client
npm run build



🧠 Bonus Features Implemented

Live energy prediction

Auto-priority detection for tasks

Efficiency trend sparkline

Gradient UI + animations

Interactive donut & line charts

Fully responsive layout

🌟 What Makes This Project Special?

EnergySuite isn’t a simple CRUD assignment — it's built like a real SaaS dashboard:

Beautiful design & animations

Real-world use case

Full CRUD

Analytics + visuals

Team & task workflow

Clean fullstack architecture

A blend of human creativity + AI intelligence, just like modern SaaS tools.

📸 Screenshots

<img width="2938" height="1598" alt="image" src="https://github.com/user-attachments/assets/fddcd0b3-9d0d-4ea1-82cf-ac0096c76379" />

<img width="2940" height="1598" alt="image" src="https://github.com/user-attachments/assets/d702f219-5de7-4036-8837-dde894b88b13" />

<img width="2940" height="1592" alt="image" src="https://github.com/user-attachments/assets/26c8d365-bb78-47c5-be04-2220f5517ee1" />


🤝 Author

Shaik Roshan
Full-Stack Developer | React | Node | UI/UX | Cloud
GitHub: https://github.com/Roshan1417
🔗 Live Frontend: https://gleaming-cheesecake-4c2dc6.netlify.app  
🔗 Live Backend API: https://energysuite.onrender.com
