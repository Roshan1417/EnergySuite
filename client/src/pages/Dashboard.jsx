// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api";

// Components
import EnergyChart from "../components/EnergyChart";
import MetricsCards from "../components/MetricsCards";
import TasksSummary from "../components/TasksSummary";
import Sparkline from "../components/Sparkline";

export default function Dashboard() {
  const [energy, setEnergy] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [metrics, setMetrics] = useState({
    totalWeek: 0,
    avgDaily: 0,
    peak: 0,
    variance: 0,
    efficiency: 0,
    pending: 0,
    inProgress: 0,
  });

  /* ---------------- LOAD ALL DATA ---------------- */
  async function load() {
    try {
      const e = await api.getEnergy();
      const t = await api.getTasks();
      const emp = await api.getEmployees();

      setEnergy(e);
      setTasks(t);
      setEmployees(emp);

      const totalWeek = e.reduce((s, x) => s + (x.usage || 0), 0);
      const avgDaily = Math.round(totalWeek / (e.length || 7));

      const pending = t.filter((tt) => tt.status === "pending").length;
      const inProgress = t.filter((tt) => tt.status === "in-progress").length;

      const efficiency = Math.max(
        40,
        Math.round(100 - (totalWeek / (7 * 200)) * 50 - pending * 3)
      );

      setMetrics({
        totalWeek,
        avgDaily,
        peak: Math.max(...e.map((x) => x.usage || 0)),
        variance: 12,
        efficiency,
        pending,
        inProgress,
      });
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="fade-in space-y-10">

      {/* -------------------- MAIN TITLE -------------------- */}
      <section className="mb-6">
        <h1 className="page-title text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
          Energy Dashboard
        </h1>
        <p className="kv mt-2 text-lg">Live insights, analytics & efficiency tracking.</p>
      </section>

      {/* -------------------- METRIC CARDS -------------------- */}
      <MetricsCards metrics={metrics} />

      {/* -------------------- CHARTS + DONUT + SPARKLINE -------------------- */}
      <section className="grid md:grid-cols-3 gap-6">

        {/* LEFT: LINE CHART */}
        <div className="col-span-2 card pop fade-in">
          <h2 className="section-sub mb-2">Weekly Energy Usage</h2>
          <div className="chart-wrap mt-3">
            <EnergyChart data={energy} />
          </div>
        </div>

        {/* RIGHT: TASKS DONUT */}
        <div className="card pop fade-in">
          <TasksSummary tasks={tasks} />
        </div>

        {/* FULL-WIDTH EFFICIENCY TREND (belongs INSIDE THIS GRID) */}
        <div className="col-span-3 card pop fade-in">
          <h3 className="section-sub mb-2">Efficiency Trend</h3>
          <div style={{ width: "100%", height: 80 }}>
            <Sparkline data={energy} />
          </div>
        </div>

      </section>

      {/* -------------------- EMPLOYEE CARDS -------------------- */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card-sm card center-column">
          <div className="section-sub">Employees</div>
          <div className="text-3xl font-bold">{employees.length}</div>
          <div className="kv mt-1">Total team count</div>
        </div>

        <div className="card-sm card center-column">
          <div className="section-sub">Top Technician</div>
          <div className="text-lg font-semibold">
            {employees[0]?.name || "—"}
          </div>
          <div className="kv mt-1">
            Assigned tasks:{" "}
            {tasks.filter((t) => t.assigned_to === employees[0]?.id).length}
          </div>
        </div>

        <div className="card-sm card center-column">
          <div className="section-sub">Team Status</div>
          <div className="kv">Optimization tasks active</div>
        </div>
      </section>

      {/* -------------------- SUMMARY -------------------- */}
      <section className="card fade-in">
        <h2 className="text-xl font-semibold mb-2">Analysis Summary</h2>
        <p className="text-[var(--muted)] leading-relaxed text-lg">
          Usage shows stable patterns with slight spikes.  
          Assign optimization tasks in the <b>Tasks</b> tab to improve efficiency.
        </p>
      </section>
    </div>
  );
}
