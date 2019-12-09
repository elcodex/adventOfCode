const { runProgram, STOP_CODES } = require('../days/day_5.js');

describe('part One', () => {

    test('self-copying program', () => {
        const input = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        const results = runProgram(input, [], 0, '0');

        expect(results.outputs).toEqual(input);
        expect(results.programStopCode).toBe(STOP_CODES.TERMINATED);
    });

    test('large number as output', () => {
        const input = [1102,34915192,34915192,7,4,7,99,0];
        const results = runProgram(input, [], 0, '0');
        
        expect(results.outputs.length).toBe(1);
        expect(results.programStopCode).toBe(STOP_CODES.TERMINATED);
        expect(results.outputs[0].toString().length).toBe(16);
    });

    test('output === input[1]', () => {
        const input = [104,1125899906842624,99];
        const results = runProgram(input, [], 0, '0');
        
        expect(results.outputs.length).toBe(1);
        expect(results.programStopCode).toBe(STOP_CODES.TERMINATED);
        expect(results.outputs[0]).toBe(input[1]);
    });

    test('relative base, mode 2', () => {
        const input = [1101,400,0,500,209,500,203,10,99];
        const results = runProgram(input, [5], 0, '0');
        
        expect(results.programMemory[410]).toBe(5);
    });

    test('relative base, mode 1', () => {
        const input = [1101,400,0,500,109,500,203,10,99];
        const results = runProgram(input, [5], 0, '0');
        
        expect(results.programMemory[510]).toBe(5);
    });

    test('relative base, mode 0', () => {
        const input = [1101,400,0,500,9,500,203,10,99];
        const results = runProgram(input, [5], 0, '0');
        
        expect(results.programMemory[410]).toBe(5);
    });
});