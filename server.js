import express from 'express';
import apiRoutes from './routes/api.js';

const app = express();

app.use('/api', apiRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
