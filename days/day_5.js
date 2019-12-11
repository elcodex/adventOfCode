const parser = require('../inputParser.js');
const { runProgram, MODES } = require('./intcodeComputer.js');

const fileName = 'day_5.txt';
const input = parser(fileName, ',').map(value => parseInt(value));

const run = runProgram(input, [1], 0, MODES.BY_ADDRESS);
console.log(run.outputs, run.programStopCode);
