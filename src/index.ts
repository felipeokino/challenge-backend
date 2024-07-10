import { swaggerSpec } from './swagger';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database';

dotenv.config();

const app = express();
const apiVersion = '/v1';
const apiPrefix = `/api${apiVersion}`;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`${apiPrefix}/users`, require('./routes/user'));
app.use(apiPrefix, require('./routes/auth'));
app.use('/', require('./routes/status'));
app.use(`${apiPrefix}/products`, require('./routes/products'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
