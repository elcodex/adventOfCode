const parser = require('../inputParser.js');
const intcodeComputer = require('./intcodeComputer.js');

const DESCRIPTIVE_TEXT = {
    UNEXPLORED: ' ',
    WALL: '#',
    DROID: 'D',
    EXPLORED: '.',
    OXYGEN: 'o',
    START: 'S'
}

const detectingSystem = input => {
    const SIZE = 60;

    let oxygenMap = [];
    for (let i = 0; i < SIZE; i++) {
        oxygenMap.push([]);
        for (let j = 0; j < SIZE; j++) {
            oxygenMap[i][j] = DESCRIPTIVE_TEXT.UNEXPLORED;
        }
    } 

    const MOVEMENT_COMMANDS = {
        NORTH: 1,
        SOUTH: 2,
        WEST: 3,
        EAST: 4
    }

    const STATUS_CODES = {
        WALL: 0,
        CONTINUE: 1,
        OXYGEN: 2
    }
    const startPosition = {
        x: Math.floor(SIZE / 2),
        y: Math.floor(SIZE / 2)
    }

    let droidPosition = {
        x: startPosition.x,
        y: startPosition.y
    }

    oxygenMap[droidPosition.y][droidPosition.x] = DESCRIPTIVE_TEXT.START;
    
    const dxdy = [
        {dx: 0, dy: -1, command: MOVEMENT_COMMANDS.NORTH}, 
        {dx: 1, dy: 0, command: MOVEMENT_COMMANDS.EAST},
        {dx: 0, dy: 1, command: MOVEMENT_COMMANDS.SOUTH},
        {dx: -1, dy: 0, command: MOVEMENT_COMMANDS.WEST}
    ]
    let hasPath = dxdy.some(({dx, dy}) => 
        oxygenMap[droidPosition.y + dy][droidPosition.x + dx] !== DESCRIPTIVE_TEXT.WALL || 
        oxygenMap[droidPosition.y + dy][droidPosition.x + dx] !== DESCRIPTIVE_TEXT.OXYGEN);
    let programParameters = {
        programMemory: input,
        programStopPosition: 0,
        programRelativeBase: 0
    }
    const MAX_STEPS = 150000;

    let step = 0;
    while (hasPath) {
        const unexploredDXDY = dxdy.filter(({dx, dy}) => 
            oxygenMap[droidPosition.y + dy][droidPosition.x + dx] === DESCRIPTIVE_TEXT.UNEXPLORED);
        
        const exploredDXDY = dxdy.filter(({dx, dy}) => 
            oxygenMap[droidPosition.y + dy][droidPosition.x + dx] === DESCRIPTIVE_TEXT.EXPLORED);

        const {dx, dy, command} = (unexploredDXDY.length > 0) ? 
            unexploredDXDY[Math.floor(Math.random() * unexploredDXDY.length)] : 
            exploredDXDY[Math.floor(Math.random() * exploredDXDY.length)];
        
        //console.log(command);
        programParameters = intcodeComputer.runProgram(
            programParameters.programMemory,
            [command],
            programParameters.programStopPosition,
            programParameters.programRelativeBase,
            intcodeComputer.MODES.BY_ADDRESS
        );
        if (programParameters.outputs[0] === STATUS_CODES.WALL) {
            //console.log('wall');
            oxygenMap[droidPosition.y + dy][droidPosition.x + dx] = DESCRIPTIVE_TEXT.WALL;
        }
        else if (programParameters.outputs[0] === STATUS_CODES.CONTINUE) {
            //console.log('continue');
            oxygenMap[droidPosition.y + dy][droidPosition.x + dx] = DESCRIPTIVE_TEXT.EXPLORED;
            droidPosition.x += dx;
            droidPosition.y += dy;
        }
        else if (programParameters.outputs[0] === STATUS_CODES.OXYGEN) {
            //console.log('oxygen');
            oxygenMap[droidPosition.y + dy][droidPosition.x + dx] = DESCRIPTIVE_TEXT.OXYGEN;
            droidPosition.x += dx;
            droidPosition.y += dy;
        }

        hasPath = dxdy.some(({dx, dy}) => 
            oxygenMap[droidPosition.y + dy][droidPosition.x + dx] !== DESCRIPTIVE_TEXT.WALL || 
            oxygenMap[droidPosition.y + dy][droidPosition.x + dx] !== DESCRIPTIVE_TEXT.OXYGEN) &&
            droidPosition.x >= 0 && droidPosition.x < oxygenMap[droidPosition.y].length &&
            droidPosition.y >= 0 && droidPosition.y < oxygenMap.length &&
            step < MAX_STEPS;

        step++   
    }
    const visualMap = oxygenMap.map(line => line.map(value => value));
    visualMap[droidPosition.y][droidPosition.x] = DESCRIPTIVE_TEXT.DROID;
    visualMap.forEach(line => console.log(line.join('')));

    return visualMap;
}

const path = (map, from, to) => {
    let fromPosition = {x:0, y:0};
    let toPosition = {x: 0, y: 0};
    map.forEach((line, y) => line.forEach((value, x) => {
        if (value === from) {
            fromPosition.x = x;
            fromPosition.y = y;
        }
        if (value === to) {
            toPosition.x = x;
            toPosition.y = y;
        }
    }));

    let front = [];
    let visited = new Set();
    let element = { x: fromPosition.x, y: fromPosition.y, len: 0};
    visited.add(element.x + element.y * map[element.y].length);
    while (element && (element.x !== toPosition.x || element.y !== toPosition.y)) {
        [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}]
        .forEach(({dx, dy}) => {
            if (map[element.y + dy][element.x + dx] === DESCRIPTIVE_TEXT.EXPLORED ||
                map[element.y + dy][element.x + dx] === DESCRIPTIVE_TEXT.OXYGEN) {
                const elementId = (element.x + dx) + (element.y + dy) * map[element.y].length;
                if (!visited.has(elementId)) {
                    front.push({
                        x: element.x + dx,
                        y: element.y + dy,
                        len: element.len + 1
                    });
                    visited.add(elementId);
                }
            }
        });

        console.log(front.length);
        element = front.shift();
    }
    
    return element.len;
}

const spreadOxygen = (map) => {
    let oxygenPosition = {x:0, y:0};
    map.forEach((line, y) => line.forEach((value, x) => {
        if (value === DESCRIPTIVE_TEXT.OXYGEN) {
            oxygenPosition.x = x;
            oxygenPosition.y = y;
        }
    }));

    let front = [];
    let visited = new Set();
    let element = { x: oxygenPosition.x, y: oxygenPosition.y, len: 0};
    visited.add(element.x + element.y * map[element.y].length);
    let spreadTime = 0;
    while (element) {
        [{dx: 0, dy: -1}, {dx: 1, dy: 0}, {dx: 0, dy: 1}, {dx: -1, dy: 0}]
        .forEach(({dx, dy}) => {
            if (map[element.y + dy][element.x + dx] === DESCRIPTIVE_TEXT.EXPLORED ||
                map[element.y + dy][element.x + dx] === DESCRIPTIVE_TEXT.START) {
                const elementId = (element.x + dx) + (element.y + dy) * map[element.y].length;
                if (!visited.has(elementId)) {
                    front.push({
                        x: element.x + dx,
                        y: element.y + dy,
                        len: element.len + 1
                    });
                    visited.add(elementId);
                }
            }
        });
        spreadTime = Math.max(spreadTime, ...front.map(({len}) => len));

        element = front.shift();
    }
    return spreadTime;
}

const input = parser('day_15.txt', ',').map(value => parseInt(value))
//detectingSystem(input);

const detectedMap = parser('day_15_map.txt', '\n').map(line => line.split(''));

console.log(path(detectedMap, DESCRIPTIVE_TEXT.START, DESCRIPTIVE_TEXT.OXYGEN));

conole.log(spreadOxygen(detectedMap));
