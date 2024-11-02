const express = require('express');
const app = express();
const apiRoutes = require('./routes/api.js');

// Middleware and routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for testing
