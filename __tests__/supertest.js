const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  xdescribe('/', () => {
    // describe('GET', () => {
    //   // Note that we return the evaluation of `request` here! It evaluates to
    //   // a promise, so Jest knows not to say this test passes until that
    //   // promise resolves. See https://jestjs.io/docs/en/asynchronous
    //   it('responds with 200 status and text/html content type', () =>
    //     request(server)
    //       .get('/')
    //       .expect('Content-Type', /text\/html/)
    //       .expect(200));
    // });
  });
  xdescribe('setup router', () => {
    describe('/promSetup', () => {
      it('responds with status 200', () =>
        request(server).get('/setup/promSetup').expect(200));
    });
    describe('/grafSetup', () => {
      it('responds with status 200', () =>
        request(server).get('/setup/grafSetup').expect(200));
    });
    describe('/forwardGraf', () => {
      it('responds with status 200', () =>
        request(server).get('/setup/forwardGraf').expect(200));
    });
    describe('/forwardProm', () => {
      it('responds with status 200', () =>
        request(server).get('/setup/forwardProm'));
    });
  });
  xdescribe('/clusterdata', () => {
    describe('/clusterdata', () => {
      it('responds with object', () =>
        request(server)
          .get('/clusterdata')
          .expect(200)
          .expect((res) => {
            expect(res.body).toMatchObject({
              nodes: expect.any(Array),
              pods: expect.any(Array),
              namespaces: expect.any(Array),
              services: expect.any(Array),
              deployments: expect.any(Array),
              ingresses: expect.any(Array),
            });
          }));
    });
  });

  xdescribe('alertsRouter', () => {
    describe('/alerts', () => {
      it('should create an alert successfuly', () =>
        request(server)
          .post('/alerts')
          .send({ type: 'CPU', threshold: 80, name: 'HighCPUUsage' })
          .expect(200)
          .then((res) => {
            expect(res.text).toBe('Alert created successfully');
          }));
    });
    describe('/alerts', () => {
      it('should handle errors correctly', () => {
        const mockCreateAlert = jest.fn((req, res, next) =>
          next(new Error('An error occured'))
        );
        jest.doMock('../server/controllers/alertController', () => ({
          createAlert: mockCreateAlert,
        }));
        request(server)
          .post('/alerts')
          .send({
            type: 'CPU',
            threshold: 80,
            name: 'MyAlert',
          })
          .expect(500)
          .then((res) => {
            expect(res.text).toContain('An error occured');
          });
        jest.resetModules();
      });
    });
  });
  describe('grafana router', () => {
    xdescribe('/key GET', () => {
      it('should return an API key', () => {
        request(server)
          .get('/grafana/key')
          .expect((res) => {
            expect(typeof res.body.key).toBe('string');
          })
          .expect(200);
      });
    });
    describe('/Uid', () => {
      it('should return Uid', () => {
        request(server)
          .post('/grafana/uid')
          .send({
            key: 'eyJrIjoiaHFjejVnb0Vua0xFRWFwbjMzVHd1ZnZBWThPZjlDMnUiLCJuIjoia2NzYXIiLCJpZCI6MX0=',
            dashboard: 'Kubernetes / API server',
          })
          .expect(200)
          .then((res) => {
            console.log(res.body);
            expect(typeof res.body).toBe('string');
          });
      });
    });
  });
});
