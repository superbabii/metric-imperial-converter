const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      assert.equal(convertHandler.getNum('32L'), 32);
      done();
    });

    test('Decimal number input', function(done) {
      assert.equal(convertHandler.getNum('3.2L'), 3.2);
      done();
    });

    test('Fractional input', function(done) {
      assert.equal(convertHandler.getNum('1/2L'), 0.5);
      done();
    });

    test('Fractional input with a decimal', function(done) {
      assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
      done();
    });

    test('Double-fraction input returns "invalid number"', function(done) {
      assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
      done();
    });

    test('No numerical input defaults to 1', function(done) {
      assert.equal(convertHandler.getNum('L'), 1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('Valid unit input', function(done) {
      assert.equal(convertHandler.getUnit('32L'), 'L');
      assert.equal(convertHandler.getUnit('32gal'), 'gal');
      assert.equal(convertHandler.getUnit('32mi'), 'mi');
      assert.equal(convertHandler.getUnit('32km'), 'km');
      assert.equal(convertHandler.getUnit('32lbs'), 'lbs');
      assert.equal(convertHandler.getUnit('32kg'), 'kg');
      done();
    });

    test('Invalid unit input', function(done) {
      assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('Return unit for each valid input unit', function(done) {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('Spelled-out unit for each valid input unit', function(done) {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Convert gal to L', function(done) {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
      done();
    });

    test('Convert L to gal', function(done) {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
      done();
    });

    test('Convert mi to km', function(done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
      done();
    });

    test('Convert km to mi', function(done) {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
      done();
    });

    test('Convert lbs to kg', function(done) {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
      done();
    });

    test('Convert kg to lbs', function(done) {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
      done();
    });
  });
});
