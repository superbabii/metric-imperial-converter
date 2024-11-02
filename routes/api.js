'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    // Get the initial number and unit from the input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Handle invalid number and unit scenarios
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');
    } else if (initNum === 'invalid number') {
      return res.send('invalid number');
    } else if (initUnit === 'invalid unit') {
      return res.send('invalid unit');
    }

    // Perform the conversion
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    // Construct the response string
    const resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Send the JSON response
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: resultString
    });
  });

};
