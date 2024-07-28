import * as fs from 'fs';
import * as path from 'path';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';

const app = express();

app.use(express.json());
app.use('/api', routes);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../openapi.json'), 'utf-8'),
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
