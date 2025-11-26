// server/index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');      // request logging
const { initDb } = require('./db');    // auto-detects ./db/index.js
const employeesRouter = require('./routes/employees');
const tasksRouter = require('./routes/tasks');

const app = express();

// ----------- MIDDLEWARE -----------
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));                // logs incoming API requests (helpful!)

// ----------- INITIALIZE DATABASE -----------
initDb()
  .then(() => {
    console.log('✅ Database initialized successfully');
  })
  .catch((err) => {
    console.error('❌ Database initialization failed:', err);
    process.exit(1);
  });

// ----------- API ROUTES -----------
app.use('/api/employees', employeesRouter);
app.use('/api/tasks', tasksRouter);

// ----------- SIMPLE ROOT CHECK -----------
app.get('/', (req, res) => {
  res.send('Backend server is running...');
});

// ----------- ENERGY MOCK DATA -----------
app.get('/api/energy', (req, res) => {
  const data = [
    { day: 'Mon', usage: 120 },
    { day: 'Tue', usage: 150 },
    { day: 'Wed', usage: 170 },
    { day: 'Thu', usage: 160 },
    { day: 'Fri', usage: 180 },
    { day: 'Sat', usage: 200 },
    { day: 'Sun', usage: 190 }
  ];
  res.json(data);
});

// ----------- START SERVER -----------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
