/*
Программа для интерпретатора - игра Арканоид.

В первой части задания считаем количество кирпичей в выводе программы (функция blocksNumber).

Во второй части играем в игру, двигая платформу влево и вправо(функция play). Если мяч летит вниз, то вычисляем предполагаемую позицию платформы
- ballPositions[1].x + Math.abs(ballPositions[1].y - paddlePosition[1].y) - если мяч движется вправо, 
- ballPositions[1].x - Math.abs(ballPositions[1].y - paddlePosition[1].y) - если мяч движется влево.
Чтобы успевать подставлять платформу, движемся в направлении мяча, когда он летит вверх. Каждый ход выводим в консоль доску игры, в конце выводим счёт, который возвращает программа.
*/

const intcodeComputer = require('./intcodeComputer.js');
const parser = require('../inputParser.js');

const input = parser('day_13.txt', ',').map(value => parseInt(value));

const output = intcodeComputer
    .runProgram(input, [], 0, 0, intcodeComputer.MODES.BY_ADDRESS)
    .outputs;

const GAME_OBJECTS = {
    EMPTY: 0,
    WALL: 1,
    BLOCK: 2,
    HORIZONTAL_PADDLE: 3,
    BALL: 4
}

const blocksNumber = output => 
    output.reduce((blocksNumber, value, i) => {
        if ((i + 1) % 3 === 0 && value === GAME_OBJECTS.BLOCK) {
            blocksNumber++;
        }
        return blocksNumber;
    }, 0);

console.log(blocksNumber(output));

const SCREEN_OBJECTS = {0: ' ', 1: '#', 2: '+', 3: '-', 4: 'o'} 
const drawScreen = (output) => {
    const screenSize = 30;
    let screen = [];
    for (let i = 0; i < screenSize; i++) {
        screen[i] = [];
        for (let j = 0; j < screenSize; j++) {
            screen[i][j] = SCREEN_OBJECTS[GAME_OBJECTS.EMPTY];
        } 
    }

    let maxRow = 0;
    let score = 0;
    for (let i = 0; i < output.length; i+=3) {
        if (output[i] === -1 && output[i+1] === 0) {
            score = output[i+2];
        }
        else {
            screen[output[i+1]][output[i]] = SCREEN_OBJECTS[output[i+2]];
        }
        maxRow = Math.max(maxRow, output[i+1]);
    }
    console.log(screen.slice(0, maxRow+1).map(line => line.join('')).join('\n'));
    console.log(score);
    return score;
}

const objectPositions = (output, gameObject) => {
    let positions = [];
    for (let i = 2; i < output.length; i += 3) {
        if (output[i] === gameObject) {
            positions.push({
                x: output[i - 2],
                y: output[i - 1]
            });
        }
    }
    return positions;
}

const JOYSTICK_MOVE = {
    NEUTRAL: 0,
    LEFT: -1,
    RIGHT: 1
}

const play = (input) => {
    input[0] = 2; //free game
    let score = 0;
    let currentResults = intcodeComputer
        .runProgram(input, [JOYSTICK_MOVE.NEUTRAL], 0, 0, intcodeComputer.MODES.BY_ADDRESS);
    
    score = drawScreen(currentResults.outputs);
    
    while (blocksNumber(currentResults.outputs) > 0) {
        console.log(blocksNumber(currentResults.outputs));
        const ballPositions = objectPositions(currentResults.outputs, GAME_OBJECTS.BALL);
        const paddlePosition = objectPositions(currentResults.outputs, GAME_OBJECTS.HORIZONTAL_PADDLE);
        
        let joystickInput = JOYSTICK_MOVE.NEUTRAL;

        if (ballPositions[0].y < ballPositions[1].y) {
            let finalX = ballPositions[1].x + 
                Math.abs(ballPositions[1].y - paddlePosition[paddlePosition.length-1].y);
            if ((ballPositions[1].x - ballPositions[0].x) < 0) {
                finalX = ballPositions[1].x - 
                   Math.abs(ballPositions[1].y - paddlePosition[paddlePosition.length-1].y);
            }
            if (finalX + 1 < paddlePosition[paddlePosition.length-1].x) {
                joystickInput = JOYSTICK_MOVE.LEFT;
            }
            else if (finalX > paddlePosition[paddlePosition.length-1].x) {
                joystickInput = JOYSTICK_MOVE.RIGHT;
            }    
        }
        else if (ballPositions[0].y > ballPositions[1].y) {
            if (ballPositions[1].x < paddlePosition[paddlePosition.length-1].x) {
                joystickInput = JOYSTICK_MOVE.LEFT;
            }
            else if (ballPositions[1].x > paddlePosition[paddlePosition.length-1].x) {
                joystickInput = JOYSTICK_MOVE.RIGHT;
            }
        }

        currentResults = intcodeComputer.runProgram(
            currentResults.programMemory, 
            [joystickInput], 
            0, 
            0, 
            intcodeComputer.MODES.BY_ADDRESS
        );

        score = drawScreen(currentResults.outputs);
    }
    return score;
}

console.log(play(input));
