class NumberUtil {
  constructor() {
    this.decimalPlaces = 2;
  }

  roundToTwoDecimalPlaces(number) {
    const decimalPlaces = this.decimalPlaces;
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
  }
}  

module.exports = NumberUtil;