// src/App.jsx
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "employees", label: "Employees" },
    { id: "tasks", label: "Tasks" },
  ];
 <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0b1220",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
        }}
      />
  return (
    <div className="min-h-screen">
      {/* ------------------ NAVBAR ------------------ */}
     <header className="backdrop-blur-xl bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.08)] shadow-sm sticky top-0 z-50 animate-[fadeInUp_0.6s_ease]">
  <div className="app-container flex justify-between items-center py-4 top-nav">
    
    {/* -------- LOGO BLOCK -------- */}
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage("dashboard")}>
      <div className="brand-mark animate-[pulse_2s_infinite]"></div>
      <span className="text-xl font-bold tracking-tight flex items-center gap-2">
        <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
          EnergySuite
        </span>
      </span>
    </div>

    {/* -------- NAV TABS -------- */}
    <nav className="flex gap-4 items-center">

      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setPage(t.id)}
          className={`
            px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 
            ${page === t.id 
              ? "bg-[var(--accent)] text-white shadow-md scale-[1.05]"
              : "text-[var(--muted)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
            }
          `}
        >
          {/* ICONS BASED ON PAGE */}
          {t.id === "dashboard" && <i className="lucide lucide-pie-chart" />}
          {t.id === "employees" && <i className="lucide lucide-users" />}
          {t.id === "tasks" && <i className="lucide lucide-check-square" />}

          {t.label}
        </button>
      ))}

      {/* -------- Light/Dark mode toggle -------- */}
      <button
        onClick={() => {
          
          document.documentElement.classList.toggle("light");
        }}
        className="btn-ghost px-3 py-2 rounded-lg hover:border-[var(--accent)] transition flex items-center gap-2"
      >
        <i className="lucide lucide-sun" />
        Theme
      </button>

    </nav>
  </div>
</header>


      {/* ------------------ MAIN CONTENT ------------------ */}
      <main className="app-container fade-in">
        {page === "dashboard" && <Dashboard />}
        {page === "employees" && <Employees />}
        {page === "tasks" && <Tasks />}
      </main>
    </div>
  );
}
