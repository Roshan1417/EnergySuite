// src/api.js
import axios from "axios";

const BASE = "http://localhost:4000/api";

export const api = {
  /* ================= EMPLOYEES ================= */

  getEmployees: () =>
    axios.get(`${BASE}/employees`).then((r) => r.data),

  createEmployee: (payload) =>
    axios.post(`${BASE}/employees`, payload).then((r) => r.data),

  updateEmployee: (id, data) =>
    axios.put(`${BASE}/employees/${id}`, {
      name: data.name,
      role: data.role,
      contact: data.contact,
    }).then((r) => r.data),

  deleteEmployee: (id) =>
    axios.delete(`${BASE}/employees/${id}`).then((r) => r.data),


  /* ================= TASKS ================= */

  getTasks: () =>
    axios.get(`${BASE}/tasks`).then((r) => r.data),

  createTask: (payload) =>
    axios.post(`${BASE}/tasks`, payload).then((r) => r.data),

  updateTask: (id, data) =>
    axios.put(`${BASE}/tasks/${id}`, {
      title: data.title,
      description: data.description,
      assigned_to: data.assigned_to || null,
      priority: data.priority,
      status: data.status,
    }).then((r) => r.data),

  deleteTask: (id) =>
    axios.delete(`${BASE}/tasks/${id}`).then((r) => r.data),


  /* ================= ENERGY (MOCK) ================= */

  getEnergy: () =>
    axios.get(`${BASE}/energy`).then((r) => r.data),
};
