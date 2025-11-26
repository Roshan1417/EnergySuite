// src/components/Sparkline.jsx
import React from "react";
import { ResponsiveContainer, LineChart, Line } from "recharts";

export default function Sparkline({ data }) {
  return (
    <div style={{width:120, height:48}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="usage" stroke="#fff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
