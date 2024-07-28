import * as fs from 'fs';
import * as path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import prisma from './config/prisma';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(express.json());
app.use('/api', routes);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../openapi.json'), 'utf-8'),
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(
        `API documentation available at http://localhost:${PORT}/api-docs`,
      );
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default app;
