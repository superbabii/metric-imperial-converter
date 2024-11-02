import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.use(chaiHttp);

describe('Functional Tests', () => {
  it('Convert a valid input (10L)', (done) => {
    chai.request('https://metric-imperial-converter-chi.vercel.app')
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.body.initNum, 10);
        chai.assert.equal(res.body.initUnit, 'L');
        chai.assert.equal(res.body.returnNum, 2.64172); // Adjusted to expected conversion
        chai.assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  it('Convert an invalid input unit (32g)', (done) => {
    chai.request('https://metric-imperial-converter-chi.vercel.app')
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  it('Convert an invalid number (3/7.2/4kg)', (done) => {
    chai.request('https://metric-imperial-converter-chi.vercel.app')
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.text, 'invalid number');
        done();
      });
  });

  it('Convert an invalid number and unit (3/7.2/4kilomegagram)', (done) => {
    chai.request('https://metric-imperial-converter-chi.vercel.app')
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  it('Convert with no number (kg)', (done) => {
    chai.request('https://metric-imperial-converter-chi.vercel.app')
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.equal(res.body.initNum, 1);
        chai.assert.equal(res.body.initUnit, 'kg');
        chai.assert.equal(res.body.returnNum, 2.20462); // kg to lbs
        chai.assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});
