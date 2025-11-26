// src/components/MetricsCards.jsx
import React from "react";

function Card({ title, value, sub, accent }) {
  return (
    <div className="card-sm card" role="region" aria-label={title}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-[var(--muted)]">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
          {sub && <div className="kv mt-1">{sub}</div>}
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg" style={{
            background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,0.04) 100%)`
          }} />
        </div>
      </div>
    </div>
  );
}

export default function MetricsCards({ metrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card title="Total Week Usage" value={`${metrics.totalWeek} kWh`} sub={`Peak: ${metrics.peak} kWh`} accent="#3b82f6"/>
      <Card title="Avg Daily" value={`${metrics.avgDaily} kWh`} sub={`Variance: ${metrics.variance}%`} accent="#7c3aed"/>
      <Card title="Efficiency Score" value={`${metrics.efficiency}%`} sub="Higher is better" accent="#10b981"/>
      <Card title="Pending Tasks" value={metrics.pending} sub={`${metrics.inProgress} in-progress`} accent="#f59e0b"/>
    </div>
  );
}
