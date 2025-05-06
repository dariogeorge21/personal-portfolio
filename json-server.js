const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser);

// Authentication middleware
server.use((req, res, next) => {
  // Skip authentication for GET requests and login
  if (req.method === 'GET' || req.path === '/login') {
    next();
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

// Login endpoint
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple hardcoded authentication
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    return res.json({ token });
  }
  
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Use default router
server.use(router);

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
