const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

router.get('/api/convert', (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === "invalid number" && initUnit === "invalid unit") {
    return res.json("invalid number and unit");
  } else if (initNum === "invalid number") {
    return res.json("invalid number");
  } else if (initUnit === "invalid unit") {
    return res.json("invalid unit");
  }
  
  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);

  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: `${initNum} ${convertHandler.spellOutUnit(initUnit)} converts to ${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`
  });
});

module.exports = router;
