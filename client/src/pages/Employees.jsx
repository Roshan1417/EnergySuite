// src/pages/Employees.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Pencil, Save, X } from "lucide-react";
import toast from "react-hot-toast";


export default function Employees() {
  const [employees, setEmployees] = useState([]);

  // Editing row state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    role: "",
    contact: "",
  });

  // Load employees
  function load() {
    api.getEmployees().then(setEmployees);
  }

  useEffect(() => {
    load();
  }, []);

  /* ---------------- SAVE EDIT ---------------- */
  function handleSave(id) {
    const payload = {
      name: editData.name,
      role: editData.role,
      contact: editData.contact,
    };

    api.updateEmployee(id, payload)
  .then(() => {
    toast.success("Employee updated!");
    setEditingId(null);
    load();
  })
  .catch(() => toast.error("Update failed"));

  }

  /* ---------------- CANCEL EDIT ---------------- */
  function handleCancel() {
    setEditingId(null);
    setEditData({ name: "", role: "", contact: "" });
  }

  /* ---------------- DELETE EMPLOYEE ---------------- */
  function handleDelete(id) {
    if (!confirm("Delete this employee?")) return;
    api.deleteEmployee(id).then(load);
  }

  /* ---------------- ADD NEW EMPLOYEE ---------------- */
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newContact, setNewContact] = useState("");

  function handleAdd(e) {
    e.preventDefault();

    api
      .createEmployee({
        name: newName,
        role: newRole,
        contact: newContact,
      })
      .then(() => {
        setNewName("");
        setNewRole("");
        setNewContact("");
        load();
      });
  }

  return (
    <div className="fade-in space-y-10">

      {/* ---------- PAGE TITLE ---------- */}
      <h1 className="page-title bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
        Employees
      </h1>
      <p className="kv text-lg">Manage your team, update roles, and maintain clean records.</p>

      <div className="grid md:grid-cols-2 gap-6">

        {/* ---------- CREATE EMPLOYEE FORM ---------- */}
        <div className="card fade-in">
          <h2 className="section-sub">Add Employee</h2>

          <form onSubmit={handleAdd} className="space-y-4">

            <input
              required
              className="input w-full"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              className="input w-full"
              placeholder="Role (optional)"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />

            <input
              className="input w-full"
              placeholder="Contact (optional)"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
            />

            <button className="btn-primary w-full mt-3">Add Employee</button>
          </form>
        </div>

        {/* ---------- EMPLOYEE TABLE ---------- */}
        <div className="card fade-in">
          <h2 className="section-sub">Team Members</h2>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-separate border-spacing-y-3">

              <thead>
                <tr className="text-[var(--muted)]">
                  <th>Name</th>
                  <th>Role</th>
                  <th>Contact</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="pop bg-[rgba(255,255,255,0.02)] rounded-lg"
                  >

                    {/* ------------ EDIT MODE ------------ */}
                    {editingId === emp.id ? (
                      <>
                        <td className="p-3">
                          <input
                            className="input w-full"
                            value={editData.name}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                          />
                        </td>

                        <td className="p-3">
                          <input
                            className="input w-full"
                            value={editData.role}
                            onChange={(e) =>
                              setEditData({ ...editData, role: e.target.value })
                            }
                          />
                        </td>

                        <td className="p-3">
                          <input
                            className="input w-full"
                            value={editData.contact}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                contact: e.target.value,
                              })
                            }
                          />
                        </td>

                        <td className="p-3 flex justify-end gap-3">
                          <button
                            onClick={() => handleSave(emp.id)}
                            className="btn-primary px-3 py-2 flex items-center gap-1"
                          >
                            <Save size={15} />
                            Save
                          </button>

                          <button
                            onClick={handleCancel}
                            className="btn-ghost px-3 py-2 flex items-center gap-1"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        {/* ------------ NORMAL VIEW MODE ------------ */}
                        <td className="p-3">{emp.name}</td>
                        <td className="p-3">{emp.role || "—"}</td>
                        <td className="p-3">{emp.contact || "—"}</td>

                        <td className="p-3 flex justify-end gap-4">

                          {/* EDIT ICON */}
                          <button
                            onClick={() => {
                              setEditingId(emp.id);
                              setEditData({
                                name: emp.name,
                                role: emp.role || "",
                                contact: emp.contact || "",
                              });
                            }}
                            className="text-[var(--accent)] hover:scale-125 transition"
                          >
                            <Pencil size={18} />
                          </button>

                          {/* DELETE ICON */}
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="text-red-500 hover:scale-125 transition"
                          >
                            <X size={18} />
                          </button>

                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
