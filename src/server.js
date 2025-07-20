import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import authRoutes from './routes/auth_routes.js';
import userRoutes from './routes/user_routes.js';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/users', userRoutes)

app.get('/', (_req, res) => {
  res.send('API está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});