const { runProgram } = require('../days/day_5.js');

describe('part One', () => {
    test('1,0,0,0,99 becomes 2,0,0,0,99', () => {
        const {memory} = runProgram([1,0,0,0,99]);
        const expectResult = [2,0,0,0,99];

        expect(memory).toEqual(expectResult);
    });

    test('2,3,0,3,99 becomes 2,3,0,6,99', () => {
        const {memory} = runProgram([2,3,0,3,99]);
        const expectResult = [2,3,0,6,99];

        expect(memory).toEqual(expectResult);
    });

    test('2,4,4,5,99,0 becomes 2,4,4,5,99,9801', () => {
        const {memory} = runProgram([2,4,4,5,99,0]);
        const expectResult = [2,4,4,5,99,9801];

        expect(memory).toEqual(expectResult);
    });
    
    test('1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99', () => {
        const {memory} = runProgram([1,1,1,4,99,5,6,0,99]);
        const expectResult = [30,1,1,4,2,5,6,0,99];

        expect(memory).toEqual(expectResult);
    });

});