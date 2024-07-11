import { swaggerSpec, swaggerUIOptions } from './swagger';
import express from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDocs from 'swagger-jsdoc';

import cors from 'cors';
import dotenv from 'dotenv';
import './database';

dotenv.config();

const app = express();
const apiVersion = '/v1';
const apiPrefix = `/api${apiVersion}`;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs(swaggerSpec), swaggerUIOptions));

app.use(`${apiPrefix}/users`, require('./routes/user'));
app.use(apiPrefix, require('./routes/auth'));
app.use('/', require('./routes/status'));
app.use(`${apiPrefix}/products`, require('./routes/products'));
app.use(`${apiPrefix}/seeds`, require('./routes/seeds'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
