const parser = require('../inputParser.js');
const INSTRUCTIONS = {
    SUM: '01',
    MULTIPLY: '02',
    INPUT: '03',
    OUTPUT: '04',
    JUMP_IF_TRUE: '05',
    JUMP_IF_FALSE: '06',
    LESS_THAN: '07',
    EQUALS: '08',
    HALT: '99'
}

const MODES = {
    BY_ADDRESS: '0',
    BY_VALUE: '1'
}

const STOP_CODES = {
    TERMINATED: '99',
    WAIT_FOR_INPUT: '3',
    INFINITE: '999',
    WRONG_INSTRUCTION: '0'
}

let memory = [];

const readAddress = (mode, address) => {
    if (mode === MODES.BY_ADDRESS) {
        return memory[address];
    }
    else if (mode === MODES.BY_VALUE) {
        return address;
    }
    return undefined;
}

const readOperation = (operation, defaultMode) => {
    while (operation.length < 2) {
        operation = '0' + operation;
    }
    while (operation.length < 5) {
        operation = defaultMode + operation;
    }
    return {
        opcode: operation.substring(3),
        modes: operation.substring(0, 3).split('').reverse()
    }
}

const getAddresses = (opcode, position) => {
    if (opcode === INSTRUCTIONS.SUM || opcode === INSTRUCTIONS.MULTIPLY ||
        opcode === INSTRUCTIONS.LESS_THAN || opcode === INSTRUCTIONS.EQUALS) {
        return {
            nextPosition: position + 4,
            addresses: memory.slice(position + 1, position + 4)
        }
    }
    else if (opcode === INSTRUCTIONS.INPUT || opcode === INSTRUCTIONS.OUTPUT) {
        return {
            nextPosition: position + 2,
            addresses: memory.slice(position + 1, position + 2)
        }
    }
    else if (opcode === INSTRUCTIONS.JUMP_IF_FALSE || 
        opcode === INSTRUCTIONS.JUMP_IF_TRUE) {
        return {
            nextPosition: position + 3,
            addresses: memory.slice(position + 1, position + 3)
        }
    }
    return {} //opcode === 99
}

const executeInstruction = ({opcode, modes, addresses, input}) => {
    
    if (opcode === INSTRUCTIONS.SUM) {
        memory[addresses[2]] = 
            readAddress(modes[0], addresses[0]) + readAddress(modes[1], addresses[1]);
        return {halt: false};
    }
    else if (opcode === INSTRUCTIONS.MULTIPLY) {
        memory[addresses[2]] = 
            readAddress(modes[0], addresses[0]) * readAddress(modes[1], addresses[1]);
        return {halt: false};
    }
    else if (opcode === INSTRUCTIONS.INPUT) {
        const inputValue = input.shift();
        if (inputValue === undefined) {
            return {
                stopCode: STOP_CODES.WAIT_FOR_INPUT,
                halt: true
            }
        }
        memory[addresses[0]] = inputValue;
        return {
            halt: false
        }
    }
    else if (opcode === INSTRUCTIONS.OUTPUT) {
        return {
            halt: false,
            output: readAddress(modes[0], addresses[0])
        }
    }
    else if (opcode === INSTRUCTIONS.JUMP_IF_TRUE) {
        if (readAddress(modes[0], addresses[0]) !== 0) {
            return {
                index: readAddress(modes[1], addresses[1]),
                halt: false,
            }
        }
        return {halt: false}
    }
    else if (opcode === INSTRUCTIONS.JUMP_IF_FALSE) {
        if (readAddress(modes[0], addresses[0]) === 0) {
            return {
                index: readAddress(modes[1], addresses[1]),
                halt: false,
            }
        }
        return {halt: false}
    }
    else if (opcode === INSTRUCTIONS.LESS_THAN) {
        if (readAddress(modes[0], addresses[0]) < readAddress(modes[1], addresses[1])) {
            memory[addresses[2]] = 1;
        } 
        else {
            memory[addresses[2]] = 0;
        }
        return {halt: false}
    }
    else if (opcode === INSTRUCTIONS.EQUALS) {
        if (readAddress(modes[0], addresses[0]) === readAddress(modes[1], addresses[1])) {
            memory[addresses[2]] = 1;
        } 
        else {
            memory[addresses[2]] = 0;
        }
        return {halt: false}
    }
    else if (opcode === INSTRUCTIONS.HALT) {
        return {
            stopCode: STOP_CODES.TERMINATED,
            halt: true
        };
    }
    return {
        halt: true,
        stopCode: STOP_CODES.WRONG_INSTRUCTION, 
        error: `the wrong opcode ${opcode}`
    };
}

const intcodeProgram = (input, startPosition, defaultMode=MODES.BY_ADDRESS) => {
    let instructionPosition = startPosition;
    let notHalt = true;
    let outputs = [];

    let programStopCode = undefined;
    let programStopPosition = undefined;

    while (notHalt) {
        const {opcode, modes} = readOperation(memory[instructionPosition].toString(), defaultMode);
        const {nextPosition, addresses} = getAddresses(opcode, instructionPosition);
        const {halt, error, output, index, stopCode} = 
            executeInstruction({opcode, modes, addresses, input});

        if (error) {
            console.log(error);
        }

        if (output !== undefined) {
            outputs.push(output);
        }

        notHalt = !halt;

        if (stopCode) {
            programStopCode = stopCode;
        }
        if (stopCode === STOP_CODES.WAIT_FOR_INPUT) {
            programStopPosition = instructionPosition;
        }

        if (index !== undefined) {
            instructionPosition = index;
        }
        else {
            instructionPosition = nextPosition;
        }
        if (instructionPosition >= memory.length) {
            programStopCode = STOP_CODES.INFINITE;
            notHalt = false;
        }
    }
    return {
        outputs, 
        programMemory: [...memory],
        programStopCode,
        programStopPosition
    }
}

const fileName = 'day_5.txt';
const input = parser(fileName, ',').map(value => parseInt(value));

const runProgram = (programMemory, inputValues, startPosition, defaultMode) => {
    memory = [...programMemory];
    return intcodeProgram(inputValues, startPosition, defaultMode);
}

const run = runProgram(input, [1], 0, MODES.BY_ADDRESS);
console.log(run.outputs, run.programStopCode);

module.exports = { runProgram, STOP_CODES }