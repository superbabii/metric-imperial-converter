function ConvertHandler() {
  this.getNum = function(input) {
    const result = input.match(/^[\d./]+/) || ["1"]; // Default to "1" if no number is provided
    const number = result[0];

    if ((number.match(/\//g) || []).length > 1) return "invalid number";
    try {
      const evaluated = eval(number); // Evaluates fractions like "1/2" or "2.5/6"
      return evaluated;
    } catch (error) {
      return "invalid number";
    }
  };

  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return "invalid unit";

    const unit = result[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    
    if (validUnits.includes(unit)) return unit === "l" ? "L" : unit;
    return "invalid unit";
  };

  this.getReturnUnit = function(initUnit) {
    const units = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs"
    };
    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spelledOutUnits = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms"
    };
    return spelledOutUnits[unit];
  };

  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };
    
    if (!conversionRates[initUnit]) return "invalid unit";
    return parseFloat((initNum * conversionRates[initUnit]).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
