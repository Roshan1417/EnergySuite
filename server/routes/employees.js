// server/routes/employees.js

const express = require('express');
const router = express.Router();
const { getDbConnection } = require('../db');

// GET all employees
router.get('/', (req, res) => {
  const db = getDbConnection();
  db.all('SELECT * FROM employees ORDER BY id DESC', (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET single employee by ID
router.get('/:id', (req, res) => {
  const db = getDbConnection();
  db.get('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Employee not found' });
    res.json(row);
  });
});

// CREATE a new employee
router.post('/', (req, res) => {
  const { name, role, contact } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const db = getDbConnection();
  db.run(
    'INSERT INTO employees (name, role, contact) VALUES (?, ?, ?)',
    [name, role || null, contact || null],
    function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        name,
        role: role || null,
        contact: contact || null
      });
    }
  );
});

// UPDATE employee
router.put('/:id', (req, res) => {
  const { name, role, contact } = req.body;

  const db = getDbConnection();
  db.run(
    'UPDATE employees SET name=?, role=?, contact=? WHERE id=?',
    [name, role || null, contact || null, req.params.id],
    function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.json({
        id: Number(req.params.id),
        name,
        role: role || null,
        contact: contact || null
      });
    }
  );
});

// DELETE employee
router.delete('/:id', (req, res) => {
  const db = getDbConnection();
  db.run(
    'DELETE FROM employees WHERE id = ?',
    [req.params.id],
    function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.json({ success: true });
    }
  );
});

module.exports = router;
