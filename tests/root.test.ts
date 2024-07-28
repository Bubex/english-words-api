import request from 'supertest';

import app from '../src/app';

jest.mock('ioredis');

describe('GET /', () => {
  let server: any;

  beforeAll(async () => {
    server = app.listen(4000);
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return "English Dictionary"', async () => {
    const response = await request(server).get('/api/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'English Dictionary' });
  });
});
