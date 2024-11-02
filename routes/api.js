const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

router.get('/api/convert', (req, res) => {
  const input = req.query.input;
  const number = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  if (number === "invalid number" && unit === "invalid unit") {
    return res.json("invalid number and unit");
  } else if (number === "invalid number") {
    return res.json("invalid number");
  } else if (unit === "invalid unit") {
    return res.json("invalid unit");
  }

  const returnNum = convertHandler.convert(number, unit);
  const returnUnit = convertHandler.getReturnUnit(unit);

  res.json({
    initNum: number,
    initUnit: unit,
    returnNum,
    returnUnit,
    string: `${number} ${convertHandler.spellOutUnit(unit)} converts to ${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`
  });
});

module.exports = router;
