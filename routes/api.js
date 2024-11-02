import express from 'express';
import ConvertHandler from '../controllers/convertHandler.js';

const router = express.Router();
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // Error handling for invalid number and unit
  if (initNum === "invalid number" && initUnit === "invalid unit") {
    return res.send("invalid number and unit");
  } else if (initNum === "invalid number") {
    return res.send("invalid number");
  } else if (initUnit === "invalid unit") {
    return res.send("invalid unit");
  }

  // Perform the conversion if inputs are valid
  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const resultString = `${initNum} ${convertHandler.spellOutUnit(initUnit)} converts to ${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`;

  // Return the response in the expected format
  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: resultString
  });
});

export default router;
