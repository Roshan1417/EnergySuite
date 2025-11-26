// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";

export default function TaskForm({ initial = {}, onSubmit, employees = [] }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [assigned_to, setAssignedTo] = useState(initial.assigned_to || "");
  const [priority, setPriority] = useState(initial.priority || "normal");

  useEffect(() => {
    setTitle(initial.title || "");
    setDescription(initial.description || "");
    setAssignedTo(initial.assigned_to || "");
    setPriority(initial.priority || "normal");
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title,
      description,
      assigned_to: assigned_to || null,
      priority,
    });

    if (!initial.id) {
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setPriority("normal");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border p-2 rounded w-full"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="border p-2 rounded w-full"
      />

      <select
        value={assigned_to || ""}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option value="">Assign to employee (optional)</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        {initial.id ? "Update Task" : "Create Task"}
      </button>

    </form>
  );
}
