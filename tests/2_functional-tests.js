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

  test('Convert an invalid input unit (32g)', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number (3/7.2/4kg)', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number and unit (3/7.2/4kilomegagram)', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number (kg)', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.body.initNum, 1);
        chai.assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });
});
