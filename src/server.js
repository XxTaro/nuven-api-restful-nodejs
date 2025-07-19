import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import authRoutes from './routes/auth_routes.js';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('API está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});