const parser = require('../inputParser.js');

const programAlarm1202 = intcode => {
    intcode[1] = 12;
    intcode[2] = 2;
    return intcode;
}

const intcodeProgram = intcode => {
    const executeOpcode = opcode => {
        if (opcode === 1) {
            const a = intcode[intcode[opcodeIndex + 1]];
            const b = intcode[intcode[opcodeIndex + 2]];
            const c = a + b;
            intcode[intcode[opcodeIndex + 3]] = c;
            return {halt: false};
        }
        else if (opcode === 2) {
            const a = intcode[intcode[opcodeIndex + 1]];
            const b = intcode[intcode[opcodeIndex + 2]];
            const c = a * b;
            intcode[intcode[opcodeIndex + 3]] = c;
            return {halt: false};
        }
        else if (opcode === 99) {
            return {halt: true};
        }
        return {halt: true, error: `the wrong opcode ${opcode}, position is ${opcodeIndex}`};
    }
    
    let opcodeIndex = 0;
    const di = 4;

    let isNextOpcode = opcodeIndex < intcode.length;
    while (isNextOpcode) {
        const {halt, error} = executeOpcode(intcode[opcodeIndex]);

        opcodeIndex += di;
        isNextOpcode = !halt;

        if (error) console.log(error);
        if (isNextOpcode && opcodeIndex >= intcode.length) {
            console.log('no more opcode but does not halt');
            isNextOpcode = false;
        }
    }
    return intcode;
}

const findProgramAlarm = intcode => {
    let noun = 0;
    let verb = 99;
    let _intcode = intcode.map(value => value);
    _intcode[1] = noun;
    _intcode[2] = verb;
    while (verb >= 0 && intcodeProgram(_intcode)[0] !== 19690720) {
        //console.log(_intcode[0]);
        noun++;
        if (noun > 99) {
            verb--;
            noun = 0;
        }
        _intcode = intcode.map(value => value);
        _intcode[1] = noun;
        _intcode[2] = verb;
    }
    
    return {noun, verb};
}

const fileName = 'day_2.txt';
const input = parser(fileName, ',').map(value => parseInt(value));

//console.log(intcodeProgram(programAlarm1202(input))[0]);

const { noun, verb } = findProgramAlarm(input);
console.log(noun, verb);
console.log(100 * noun + verb);

module.exports = { intcodeProgram }