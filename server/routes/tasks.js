// server/routes/tasks.js

const express = require('express');
const router = express.Router();
const { getDbConnection } = require('../db');

// GET all tasks (with employee name)
router.get('/', (req, res) => {
  const db = getDbConnection();
  const sql = `
    SELECT t.*, e.name AS assigned_name
    FROM tasks t
    LEFT JOIN employees e ON t.assigned_to = e.id
    ORDER BY t.created_at DESC
  `;
  
  db.all(sql, (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET a single task by ID
router.get('/:id', (req, res) => {
  const db = getDbConnection();

  db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(row);
  });
});

// CREATE a new task
router.post('/', (req, res) => {
  const { title, description, assigned_to, status = 'pending', priority = 'normal' } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  const db = getDbConnection();
  db.run(
    'INSERT INTO tasks (title, description, assigned_to, status, priority) VALUES (?, ?, ?, ?, ?)',
    [title, description || null, assigned_to || null, status, priority],
    function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        title,
        description,
        assigned_to: assigned_to || null,
        status,
        priority
      });
    }
  );
});

// UPDATE a task
router.put('/:id', (req, res) => {
  const { title, description, assigned_to, status, priority } = req.body;

  const db = getDbConnection();
  db.run(
    'UPDATE tasks SET title=?, description=?, assigned_to=?, status=?, priority=? WHERE id=?',
    [title, description || null, assigned_to || null, status, priority, req.params.id],
    function (err) {
      db.close();
      if (err) return res.status(500).json({ error: err.message });

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json({
        id: Number(req.params.id),
        title,
        description: description || null,
        assigned_to: assigned_to || null,
        status,
        priority
      });
    }
  );
});

// DELETE a task
router.delete('/:id', (req, res) => {
  const db = getDbConnection();

  db.run('DELETE FROM tasks WHERE id = ?', [req.params.id], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ success: true });
  });
});

module.exports = router;
