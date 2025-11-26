// server/db/index.js
const path = require("path");
const sqlite3 = require("sqlite3");

const DB_PATH = path.join(__dirname, "database.sqlite");

// Create new DB connection
function getDbConnection() {
  return new sqlite3.Database(DB_PATH);
}

// Initialize database and tables
function initDb() {
  return new Promise((resolve, reject) => {
    const db = getDbConnection();

    db.serialize(() => {
      // Employees Table
      db.run(
        `CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          role TEXT,
          contact TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
        (err) => {
          if (err) {
            db.close();
            return reject(err);
          }
        }
      );

      // Tasks Table
      db.run(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          assigned_to INTEGER,
          status TEXT DEFAULT 'pending',
          priority TEXT DEFAULT 'normal',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (assigned_to) REFERENCES employees(id)
        );`,
        (err) => {
          if (err) {
            db.close();
            return reject(err);
          }
        }
      );

      // Optional seeding: Only if there are no employees yet
      db.get("SELECT COUNT(*) AS count FROM employees", (err, row) => {
        if (err) {
          db.close();
          return reject(err);
        }

        if (row.count === 0) {
          console.log("🌱 Seeding demo data...");

          db.run(
            `INSERT INTO employees (name, role, contact) VALUES 
            ('John Doe', 'Engineer', 'johndoe@example.com'),
            ('Sarah Tech', 'Technician', 'sarah@example.com')`
          );

          db.run(
            `INSERT INTO tasks (title, description, assigned_to, status, priority) VALUES 
            ('Check HVAC systems', 'Perform energy audit', 1, 'pending', 'normal'),
            ('Replace bulbs', 'Switch to LED bulbs', 2, 'in-progress', 'high')`
          );
        }

        db.close();
        resolve();
      });
    });
  });
}

module.exports = { initDb, getDbConnection };
