const assert = require('chai').assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

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

  test('Double-fraction input returns "invalid number"', () => {
    assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
  });

  test('Default numerical input when none provided', () => {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('Valid input unit', () => {
    assert.equal(convertHandler.getUnit('32L'), 'L');
  });

  test('Invalid input unit returns "invalid unit"', () => {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Correct return unit for each valid input unit', () => {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('Spelled-out string unit for each valid input unit', () => {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('Convert gal to L', () => {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });

  test('Convert L to gal', () => {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
  });

  test('Convert mi to km', () => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });

  test('Convert km to mi', () => {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
  });

  test('Convert lbs to kg', () => {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  test('Convert kg to lbs', () => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
  });
});
