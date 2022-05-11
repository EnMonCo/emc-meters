import * as request from 'supertest';
import {
  APP_URL,
  TEST_METER_ID,
  TEST_METER_PASSWORD,
} from '../utils/constants';

describe('Auth meter (e2e)', () => {
  const app = APP_URL;

  it('Login: /api/v1/auth/ (POST)', () => {
    return request(app)
      .post('/api/v1/auth/')
      .send({ id: TEST_METER_ID, password: TEST_METER_PASSWORD })
      .expect(200)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  it('Register new meter: /api/v1/auth/register (POST)', async () => {
    return request(app)
      .post('/api/v1/auth/register')
      .send({
        serialNumber: 'SN-TESTSN',
        name: 'Test Meter',
        password: 'test',
      })
      .expect(201);
  });
  // TODO
  // it('Login unconfirmed user: /api/v1/auth/email/login (POST)', () => {
  //   return request(app)
  //     .post('/api/v1/auth/email/login')
  //     .send({ email: newUserEmail, password: newUserPassword })
  //     .expect(200)
  //     .expect(({ body }) => {
  //       expect(body.token).toBeDefined();
  //     });
  // });
});
