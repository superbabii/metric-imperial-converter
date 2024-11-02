function ConvertHandler() {
    this.getNum = function(input) {
      // Regex to match fractional, decimal, and whole number
      const result = input.match(/^[\d./]+/) || ["1"];
      const number = result[0];
  
      try {
        // Use eval to support fractions
        const evaluated = eval(number);
        return evaluated;
      } catch (error) {
        return "invalid number";
      }
    };
  
    this.getUnit = function(input) {
      // Regex to get unit by matching characters at end of input
      const result = input.match(/[a-zA-Z]+$/);
      const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
      return result && validUnits.includes(result[0].toLowerCase())
        ? result[0]
        : "invalid unit";
    };
  
    this.getReturnUnit = function(unit) {
      const units = {
        gal: "L",
        L: "gal",
        mi: "km",
        km: "mi",
        lbs: "kg",
        kg: "lbs"
      };
      return units[unit];
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
  
    this.convert = function(num, unit) {
      const conversionRates = {
        gal: 3.78541,
        L: 1 / 3.78541,
        mi: 1.60934,
        km: 1 / 1.60934,
        lbs: 0.453592,
        kg: 1 / 0.453592
      };
      return parseFloat((num * conversionRates[unit]).toFixed(5));
    };
  }
  
  module.exports = ConvertHandler;
  