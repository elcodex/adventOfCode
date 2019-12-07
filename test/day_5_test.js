const { runProgram } = require('../days/day_5.js');

describe('part One', () => {
    test('1,0,0,0,99 becomes 2,0,0,0,99', () => {
        const {memory} = runProgram([1,0,0,0,99], [1], '0');
        const expectResult = [2,0,0,0,99];

        expect(memory).toEqual(expectResult);
    });

    test('2,3,0,3,99 becomes 2,3,0,6,99', () => {
        const {memory} = runProgram([2,3,0,3,99], [1],'0');
        const expectResult = [2,3,0,6,99];

        expect(memory).toEqual(expectResult);
    });

    test('2,4,4,5,99,0 becomes 2,4,4,5,99,9801', () => {
        const {memory} = runProgram([2,4,4,5,99,0], [1], '0');
        const expectResult = [2,4,4,5,99,9801];

        expect(memory).toEqual(expectResult);
    });
    
    test('1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99', () => {
        const {memory} = runProgram([1,1,1,4,99,5,6,0,99], [1], '0');
        const expectResult = [30,1,1,4,2,5,6,0,99];

        expect(memory).toEqual(expectResult);
    });

});

describe('part Two', () => {
    test('3,9,8,9,10,9,4,9,99,-1,8, mode 0, input 8 => output 1', () => {
        const {outputs} = runProgram([3,9,8,9,10,9,4,9,99,-1,8], [8], '0');
        expect(outputs[outputs.length-1]).toBe(1);
    });

    test('3,9,7,9,10,9,4,9,99,-1,8, mode 0, input 5 => output 1', () => {
        const {outputs} = runProgram([3,9,7,9,10,9,4,9,99,-1,8], [5], '0');
        expect(outputs[outputs.length-1]).toBe(1);
    });

    test('3,3,1108,-1,8,3,4,3,99, mode 1, input 8 => output 1', () => {
        const {outputs} = runProgram([3,3,1108,-1,8,3,4,3,99], [8], '0');
        //console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(1);
    });

    test('3,3,1107,-1,8,3,4,3,99, mode 1, input 5 => output 1', () => {
        const {outputs} = runProgram([3,3,1107,-1,8,3,4,3,99], [5], '0');
        //console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(1);
    });

    test('jump test, mode 0, input 0 => output 0', () => {
        const {outputs} = runProgram([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],[0], '0');
        //console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(0);
    });

    test('jump test, mode 0, input 1 => output 1', () => {
        const {outputs} = runProgram([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], [1], '0');
        //console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(1);
    });

    test('jump test, mode 1, input 0 => output 0', () => {
        const {outputs} = runProgram([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], [0], '0');
       // console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(0);
    });

    test('jump test, mode 1, input 1 => output 1', () => {
        const {outputs} = runProgram([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], [1], '0');
        //console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(1);
    });

    test('large intcode, input less than 8 => output 999', () => {
        const intcode = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
        const {outputs} = runProgram(intcode, [5], '0');
       // console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(999);
    });

    test('large intcode, input equals 8 => output 1000', () => {
        const intcode = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
        const {outputs} = runProgram(intcode, [8], '0');
        //console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(1000);
    });

    test('large intcode, input greater than 8 => output 1001', () => {
        const intcode = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
        const {outputs} = runProgram(intcode, [15], '0');
        //console.log(outputs);
        expect(outputs[outputs.length-1]).toBe(1001);
    });
});