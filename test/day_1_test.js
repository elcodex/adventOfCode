const {fuelRequired, fuelRequiredRecursively} = require('../days/day_1.js');

describe('part One', () => {
    test('mass is 12, fuel will be 2', () => expect(fuelRequired(12)).toBe(2));
    test('mass is 14, fuel will be 2', () => expect(fuelRequired(14)).toBe(2));
    test('mass is 1969, fuel will be 654', () => expect(fuelRequired(1969)).toBe(654));
    test('mass is 100756, fuel will be 33583', () => expect(fuelRequired(100756)).toBe(33583));
});

describe('part Two', () => {
    test('mass is 14, fuel will be 2', () => expect(fuelRequiredRecursively(14)).toBe(2));
    test('mass is 1969, fuel will be 966', () => expect(fuelRequiredRecursively(1969)).toBe(966));
    test(
        'mass is 100756, fuel will be 50346', 
        () => expect(fuelRequiredRecursively(100756)).toBe(50346)
    );
})
