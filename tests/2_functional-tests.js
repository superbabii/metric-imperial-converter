const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert a valid input (10L)', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.body.initNum, 10);
        chai.assert.equal(res.body.initUnit, 'L');
        done();
      });
  });
  // Other tests for invalid inputs, units, and numbers...
});
