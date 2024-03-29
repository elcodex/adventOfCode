const { intcodeProgram } = require('../days/day_2.js');

describe('part One', () => {
    test('1,0,0,0,99 becomes 2,0,0,0,99', () => {
        const result = intcodeProgram([1,0,0,0,99]);
        const expectResult = [2,0,0,0,99];

        expect(result).toEqual(expectResult);
    });

    test('2,3,0,3,99 becomes 2,3,0,6,99', () => {
        const result = intcodeProgram([2,3,0,3,99]);
        const expectResult = [2,3,0,6,99];

        expect(result).toEqual(expectResult);
    });

    test('2,4,4,5,99,0 becomes 2,4,4,5,99,9801', () => {
        const result = intcodeProgram([2,4,4,5,99,0]);
        const expectResult = [2,4,4,5,99,9801];

        expect(result).toEqual(expectResult);
    });
    
    test('1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99', () => {
        const result = intcodeProgram([1,1,1,4,99,5,6,0,99]);
        const expectResult = [30,1,1,4,2,5,6,0,99];

        expect(result).toEqual(expectResult);
    });
});