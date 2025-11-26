// src/components/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';

export default function EmployeeForm({ initial = {}, onSubmit }) {
  const [name, setName] = useState(initial.name || "");
  const [role, setRole] = useState(initial.role || "");
  const [contact, setContact] = useState(initial.contact || "");

  // Update form when editing
  useEffect(() => {
    setName(initial.name || "");
    setRole(initial.role || "");
    setContact(initial.contact || "");
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, role, contact });

    // Clear the form if adding
    if (!initial.id) {
      setName("");
      setRole("");
      setContact("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 w-full rounded"
      />

      <input
        value={role}
        onChange={e => setRole(e.target.value)}
        placeholder="Role"
        className="border p-2 w-full rounded"
      />

      <input
        value={contact}
        onChange={e => setContact(e.target.value)}
        placeholder="Contact"
        className="border p-2 w-full rounded"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {initial.id ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
}
