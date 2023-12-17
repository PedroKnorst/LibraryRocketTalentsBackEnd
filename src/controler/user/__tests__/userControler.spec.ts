import * as request from 'supertest';
import app from '../../../app';

describe('userControler', () => {
  describe('POST', () => {
    it('should make login with an existing', async () => {
      const res = await request(app).post('/users').send({ email: 'gx2tecnologia@gx2.com.br', password: 'gx2@123' });

      expect(res.statusCode).toBe(200);
    });

    it('should throw an error if the user do not exist', async () => {
      const res = await request(app).post('/users').send({ email: 'pedro@gx2.com.br', password: 'pedro@123' });

      expect(res.statusCode).toBe(404);
    });
  });
});
