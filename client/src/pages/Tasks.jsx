// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Pencil, Save, X } from "lucide-react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  // New task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned, setAssigned] = useState("");
  const [priority, setPriority] = useState("normal");

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    assigned_to: "",
    priority: "normal",
    status: "pending",
  });

  function load() {
    api.getTasks().then(setTasks);
    api.getEmployees().then(setEmployees);
  }

  useEffect(() => {
    load();
  }, []);

  /* ---------------- CREATE NEW TASK ---------------- */
  function handleCreate(e) {
    e.preventDefault();

    let payload = {
      title,
      description,
      assigned_to: assigned || null,
      priority,
    };

    // auto detect high priority terms
    const keywords = ["power", "voltage", "critical", "maintenance"];
    if (keywords.some((k) => title.toLowerCase().includes(k))) {
      payload.priority = "high";
    }

    api.createTask(payload).then(() => {
      load();
      setTitle("");
      setDescription("");
      setAssigned("");
      setPriority("normal");
    });
  }

  /* ---------------- DELETE TASK ---------------- */
  function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    api.deleteTask(id).then(load);
  }

  /* ---------------- START EDIT ---------------- */
  function startEdit(task) {
    setEditingId(task.id);
    setEditData({
      title: task.title,
      description: task.description || "",
      assigned_to: task.assigned_to || "",
      priority: task.priority,
      status: task.status,
    });
  }

  /* ---------------- SAVE EDIT ---------------- */
  function saveEdit(id) {
    const payload = {
      title: editData.title,
      description: editData.description,
      assigned_to: editData.assigned_to || null,
      priority: editData.priority,
      status: editData.status,
    };

    api.updateTask(id, payload).then(() => {
      setEditingId(null);
      load(); // refresh
    });
  }

  /* ---------------- CANCEL EDIT ---------------- */
  function cancelEdit() {
    setEditingId(null);
    setEditData({
      title: "",
      description: "",
      assigned_to: "",
      priority: "normal",
      status: "pending",
    });
  }

  /* ---------------- PRIORITY BADGES ---------------- */
  const badgeClass = {
    high: "badge badge-high",
    normal: "badge badge-normal",
    low: "badge badge-low",
  };

  return (
    <div className="fade-in space-y-10">

      {/* ---------------- TITLE ---------------- */}
      <h1 className="page-title bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
        Tasks
      </h1>
      <p className="kv text-lg">Track, edit, assign and update efficiency tasks.</p>

      <div className="grid md:grid-cols-2 gap-6">

        {/* ---------------- CREATE FORM ---------------- */}
        <div className="card fade-in">
          <h2 className="section-sub">Create New Task</h2>

          <form onSubmit={handleCreate} className="space-y-4">

            <input
              className="input w-full"
              placeholder="Task title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="input w-full h-24"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Assign employee */}
            <select
              className="input w-full"
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
            >
              <option value="">Assign employee (optional)</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {/* Priority */}
            <select
              className="input w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="normal">Normal Priority</option>
              <option value="high">High Priority</option>
            </select>

            <button className="btn-primary w-full mt-3">Create Task</button>
          </form>
        </div>

        {/* ---------------- TASK LIST ---------------- */}
        <div className="card fade-in">
          <h2 className="section-sub">All Tasks</h2>

          <div className="space-y-3 mt-3">

            {tasks.map((task) => (
              <div
                key={task.id}
                className="pop p-4 rounded-lg border border-[rgba(255,255,255,0.05)] hover:border-[var(--accent)] transition-all"
              >

                {/* ---------------- EDIT MODE ---------------- */}
                {editingId === task.id ? (
                  <>

                    <input
                      className="input w-full mb-2"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                    />

                    <textarea
                      className="input w-full mb-2 h-20"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({ ...editData, description: e.target.value })
                      }
                    />

                    {/* Assigned */}
                    <select
                      className="input w-full mb-2"
                      value={editData.assigned_to}
                      onChange={(e) =>
                        setEditData({ ...editData, assigned_to: e.target.value })
                      }
                    >
                      <option value="">Unassigned</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>

                    {/* Priority */}
                    <select
                      className="input w-full mb-2"
                      value={editData.priority}
                      onChange={(e) =>
                        setEditData({ ...editData, priority: e.target.value })
                      }
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                    </select>

                    {/* Status */}
                    <select
                      className="input w-full mb-3"
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({ ...editData, status: e.target.value })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Completed</option>
                    </select>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="btn-primary flex items-center gap-1 px-3 py-2"
                      >
                        <Save size={16} />
                        Save
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="btn-ghost flex items-center gap-1 px-3 py-2"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* ---------------- NORMAL MODE ---------------- */}
                    <div className="flex justify-between items-start">

                      {/* Left Info */}
                      <div className="flex-1">
                        <p className="text-lg font-semibold flex items-center gap-3">
                          {task.title}
                          <span className={badgeClass[task.priority]}>
                            {task.priority}
                          </span>
                        </p>

                        {task.description && (
                          <p className="text-sm text-[var(--muted)] mt-1">
                            {task.description}
                          </p>
                        )}

                        <p className="text-sm text-[var(--muted)] mt-1">
                          Assigned: <span className="text-white">{task.assigned_name || "Unassigned"}</span>
                        </p>

                        <p className="text-sm text-[var(--muted)] mt-1">
                          Status: <strong className="text-white">{task.status}</strong>
                        </p>
                      </div>

                      {/* Right Section */}
                      <div className="flex flex-col gap-3 items-end">

                        {/* Edit */}
                        <button
                          onClick={() => startEdit(task)}
                          className="text-[var(--accent)] hover:scale-125 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>

                      </div>
                    </div>
                  </>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
