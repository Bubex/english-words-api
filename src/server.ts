import dotenv from 'dotenv';

import app from './app';
import prisma from './config/prisma';

dotenv.config();

const PORT = process.env.PORT ?? 3333;

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
