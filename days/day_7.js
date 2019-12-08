const parser = require('../inputParser.js');
const intcodeComputer = require('./day_5.js');

const amplificationCircuit = (input, phases) => {
    let amplifierInput = 0;
    for (let i = 0; i < 5; i++) {
        const outputs = 
            intcodeComputer.runProgram(input, [phases[i], amplifierInput], 0, '0').outputs;
        amplifierInput = outputs[outputs.length-1];    
    }
    return amplifierInput;
}

const amplificationFeedbackLoopCircuit = (input, phases) => {
    let amplifierStartInput = 0;
    let states = [{}, {}, {}, {}, {}];
    states[0] = {
        input: [phases[0], amplifierStartInput], 
        memory: [...input],
        position: 0
    }
    while (states[4].stopCode === undefined || 
           states[4].stopCode !== intcodeComputer.STOP_CODES.TERMINATED) {
        for (let amplifier = 0; amplifier < 5; amplifier++) {
            const result = intcodeComputer
                .runProgram(
                    states[amplifier].memory || [...input],
                    states[amplifier].input,
                    states[amplifier].position || 0,
                    '0');
            states[amplifier].outputs = [...result.outputs];
            states[amplifier].memory = result.programMemory;
            states[amplifier].stopCode = result.programStopCode;
            states[amplifier].position = result.programStopPosition;

            if (states[(amplifier + 1) % 5].input) {
                states[(amplifier + 1) % 5].input = [...result.outputs];
            }
            else {
                states[(amplifier + 1)].input = [phases[amplifier + 1], ...result.outputs];
            }
        }
    }
    return states[4].outputs[states[4].outputs.length-1];
}

const getMaxOutput = (input, from, to, amplifierProgram) => {
    let maxOutput = 0;
    for (let first = from; first <= to; first++) {
        for (let second = from; second <= to; second++) {
            if (second !== first) {
                for (let third = from; third <= to; third++) {
                    if (third !== second && third !== first) {
                        for (let fourth = from; fourth <= to; fourth++) {
                            if (fourth !== third && fourth !== second && fourth !== first) {
                                for (let fifth = from; fifth <= to; fifth++) {
                                    if (fifth !== fourth && fifth !== third && 
                                        fifth !== second && fifth !== first) {
                                            const phases = [first, second, third, fourth, fifth];
                                            const output = amplifierProgram(input, phases);
                                            maxOutput = Math.max(maxOutput, output);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return maxOutput;
}

const fileName ='day_7.txt';
const input = parser(fileName, ',').map(value => parseInt(value));

//console.log(getMaxOutput(input, 0, 4, amplificationCircuit));
console.log(getMaxOutput(input, 5, 9, amplificationFeedbackLoopCircuit));

module.exports = { getMaxOutput, amplificationCircuit, amplificationFeedbackLoopCircuit };