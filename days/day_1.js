const parser = require('../inputParser.js');

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

const fileName = 'day_1.txt';
const input = parser(fileName, '\n').map(value => parseInt(value));
//console.log(`v1: Fuel counter-Upper = ${fuelCounterUpper(input, fuelRequired)}`);
console.log(`v2: Fuel counter-Upper = ${fuelCounterUpper(input, fuelRequiredRecursively)}`);

module.exports = { fuelRequired, fuelRequiredRecursively }