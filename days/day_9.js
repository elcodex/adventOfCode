const { runProgram } = require('../days/intcodeComputer.js');
const parser = require('../inputParser.js');


const input = parser('day_9.txt', ',').map(value => parseInt(value));

console.log(runProgram(input, [2], 0, 0, '0').outputs);
