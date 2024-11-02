import express from 'express';
import apiRoutes from './routes/api.js';

const app = express();

app.use('/api', apiRoutes);

export default app;
