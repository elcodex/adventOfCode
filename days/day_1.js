const parser = require('../inputParser.js');
const fileName = 'day_1.txt'

const fuelRequired = mass => Math.floor(mass / 3) - 2;

const fuelRequiredRecursively = mass => {
    const fuel = fuelRequired(mass);
    if (fuel <= 0) {
        return 0;
    }
    return fuel + fuelRequiredRecursively(fuel);
}

const fuelCounterUpper = (masses, calcFuel) =>
    masses.reduce(
        (sum, mass) => sum + calcFuel(mass),
        0
    );

const input = parser(fileName);
//console.log(`v1: Fuel counter-Upper = ${fuelCounterUpper(input, fuelRequired)}`);
console.log(`v2: Fuel counter-Upper = ${fuelCounterUpper(input, fuelRequiredRecursively)}`);

module.exports = { fuelRequired, fuelRequiredRecursively }