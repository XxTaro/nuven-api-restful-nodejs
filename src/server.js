import express from 'express';
import authRoutes from './routes/auth_routes.js';
import userRoutes from './routes/user_routes.js';
import datasetRoutes from './routes/dataset_routes.js';
import recordRoutes from './routes/record_routes.js';
import queryRoutes from './routes/query_routes.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const require = createRequire(import.meta.url);
const swaggerFile = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/datasets', datasetRoutes);
app.use('/records', recordRoutes);
app.use('/queries', queryRoutes);

app.get('/', (_req, res) => {
  res.send('API está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});