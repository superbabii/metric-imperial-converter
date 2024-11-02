const assert = require('chai').assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  test('Whole number input', () => {
    assert.equal(convertHandler.getNum('32L'), 32);
  });
  test('Decimal input', () => {
    assert.equal(convertHandler.getNum('3.2L'), 3.2);
  });
  test('Fractional input', () => {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });
  test('Fractional input with decimal', () => {
    assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
  });
  test('Double-fraction input', () => {
    assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
  });
  test('Default numerical input when none provided', () => {
    assert.equal(convertHandler.getNum('L'), 1);
  });
  test('Valid input unit', () => {
    assert.equal(convertHandler.getUnit('32L'), 'L');
  });
  test('Invalid input unit', () => {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });
  // Additional conversion and spell-out unit tests...
});
