import { swaggerSpec } from './swagger';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', require('./routes/challenge'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
