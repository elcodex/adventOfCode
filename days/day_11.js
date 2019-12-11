const intcodeComputer = require('./intcodeComputer.js');
const parser = require('../inputParser.js');

const COLORS = {BLACK: 0, WHITE: 1}
    
const emergencyHullPaintingRobot = (intcode, startPanelColor) => {
    const DIRECTIONS = [
        {title: '^', dx: 0, dy: -1},
        {title: '>', dx: 1, dy: 0}, 
        {title: 'v', dx: 0, dy: 1},
        {title: '<', dx: -1, dy: 0}
    ];

    const robotTurn = (robotPosition, move) => {
        let direction = robotPosition.direction;
        if (move[1] === 0) {
            direction = (DIRECTIONS.length + direction - 1) % DIRECTIONS.length; 
        }
        else if (move[1] === 1) {
            direction = (direction + 1) % DIRECTIONS.length;
        }
        
        return {
            color: move[0],
            robot: {
                x: robotPosition.x + DIRECTIONS[direction].dx, 
                y: robotPosition.y + DIRECTIONS[direction].dy, 
                direction
            }
        }
    }

    const getColor = (points, robotPosition) => {
        const allSamePoints = points.filter(point => 
            point.x === robotPosition.x && point.y === robotPosition.y
        );
        if (allSamePoints.length > 0) {
            return allSamePoints[allSamePoints.length - 1].color;
        }
        return COLORS.BLACK;
    }

    let points = [];
    let robotPosition = {x: 0, y: 0, direction: 0};
    let programResults = {
        programMemory: [...intcode], 
        programStopPosition: 0,
        programRelativeBase: 0
    }
   
    let nextInputColor = startPanelColor;
    while (programResults.programStopCode !== intcodeComputer.STOP_CODES.TERMINATED) {
        programResults = 
            intcodeComputer.runProgram(
                [...programResults.programMemory],
                [nextInputColor], 
                programResults.programStopPosition,
                programResults.programRelativeBase, 
                intcodeComputer.MODES.BY_ADDRESS
            );
        
        const {color, robot} = robotTurn(robotPosition, programResults.outputs);
        points.push({
            x: robotPosition.x, 
            y: robotPosition.y, 
            color: color
        });
        robotPosition = Object.assign(robot);
        nextInputColor = getColor(points, robotPosition);   
    }
    return points;
}

const drawPainting = (points) => {
    const minX = Math.min(...points.map(({x}) => x));
    const minY = Math.min(...points.map(({y}) => y));
    const maxX = Math.max(...points.map(({x}) => x));
    const maxY = Math.max(...points.map(({y}) => y));

    let board = [];
    for (let y = 0; y <= maxY - minY; y++) {
        board[y] = [];
        for (let x = 0; x <= maxX - minX; x++) {
            board[y][x] = ' '; //COLORS.BLACK;
        }
    }
   
    points.forEach(point => {
        board[point.y - minY][point.x - minX] = 
            point.color === COLORS.BLACK ? ' ' : '#';
    });
    return board.map(line => line.join(''));
}

const input = parser('day_11.txt', ',').map(value => parseInt(value));

const points = emergencyHullPaintingRobot(input, COLORS.WHITE);
const numbersOfPanels = new Set(points.map(({x, y}) => `${x} ${y}`)).size;

console.log(numbersOfPanels);

console.log(drawPainting(points));