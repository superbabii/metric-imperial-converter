import express from 'express';
import ConvertHandler from '../controllers/convertHandler.js';

const router = express.Router();
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  
  if (!input) return res.send("invalid number");

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === "invalid number" && initUnit === "invalid unit") {
    return res.send("invalid number and unit");
  } else if (initNum === "invalid number") {
    return res.send("invalid number");
  } else if (initUnit === "invalid unit") {
    return res.send("invalid unit");
  }

  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const resultString = `${initNum} ${convertHandler.spellOutUnit(initUnit)} converts to ${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`;

  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: resultString
  });
});

export default router;
