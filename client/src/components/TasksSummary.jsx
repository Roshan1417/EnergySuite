// src/components/TasksSummary.jsx
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#f59e0b","#7c3aed","#10b981"]; // pending,in-progress,done

export default function TasksSummary({ tasks }) {
  const pending = tasks.filter(t => t.status === "pending").length;
  const inProgress = tasks.filter(t => t.status === "in-progress").length;
  const done = tasks.filter(t => t.status === "done").length;
  const data = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Done", value: done },
  ];
  return (
    <div className="card-sm card">
      <div className="flex items-center justify-between">
        <div>
          <div className="section-sub">Tasks Overview</div>
          <h3 className="page-title" style={{fontSize:"1.2rem"}}>{pending + inProgress + done} tasks</h3>
        </div>
        <div style={{width:120, height:80}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={22} outerRadius={36}>
                {data.map((entry, idx) => <Cell key={idx} fill={COLORS[idx]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div><div className="kv">Pending</div><div className="font-semibold">{pending}</div></div>
        <div><div className="kv">In Progress</div><div className="font-semibold">{inProgress}</div></div>
        <div><div className="kv">Completed</div><div className="font-semibold">{done}</div></div>
      </div>
    </div>
  );
}
