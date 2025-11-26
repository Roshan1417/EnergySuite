// src/components/EnergyChart.jsx
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function EnergyChart({ data = [] }) {
  // prevent crashes for empty data
  const safeData = Array.isArray(data) ? data : [];

  // calculate weekly average (analytics feature)
  const avg =
    safeData.length > 0
      ? Math.round(
          safeData.reduce((sum, d) => sum + (d.usage || 0), 0) / safeData.length
        )
      : 0;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={safeData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
        
        {/* ===== Gradient Fill ===== */}
        <defs>
          <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#3b82f6" stopOpacity={0.9} />
            <stop offset="90%" stopColor="#3b82f6" stopOpacity={0.15} />
          </linearGradient>
        </defs>

        {/* ===== Grid ===== */}
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />

        {/* ===== Axes ===== */}
        <XAxis
          dataKey="day"
          stroke="rgba(255,255,255,0.35)"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="rgba(255,255,255,0.35)"
          tickLine={false}
          axisLine={false}
        />

        {/* ===== Tooltip ===== */}
        <Tooltip
          contentStyle={{
            background: "rgba(8,12,20,0.9)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            backdropFilter: "blur(6px)",
            color: "#fff",
            padding: "10px",
          }}
          cursor={{ stroke: "rgba(255,255,255,0.15)", strokeWidth: 1 }}
        />

        {/* ===== Average Line (Analytics Feature) ===== */}
        {avg > 0 && (
          <ReferenceLine
            y={avg}
            stroke="rgba(255,255,255,0.3)"
            strokeDasharray="4 4"
            label={{
              value: `Avg ${avg} kWh`,
              position: "right",
              fill: "rgba(255,255,255,0.5)",
              fontSize: 12,
            }}
          />
        )}

        {/* ===== Main Energy Line ===== */}
        <Line
          type="monotone"
          dataKey="usage"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 4, stroke: "#fff", strokeWidth: 1 }}
          activeDot={{ r: 6 }}
          fill="url(#energyGradient)"
          animationDuration={900}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
