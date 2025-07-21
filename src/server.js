import express from 'express';
import authRoutes from './routes/auth_routes.js';
import userRoutes from './routes/user_routes.js';
import datasetRoutes from './routes/dataset_routes.js';
import recordRoutes from './routes/record_routes.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/datasets', datasetRoutes);
app.use('/records', recordRoutes);

app.get('/', (_req, res) => {
  res.send('API está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});