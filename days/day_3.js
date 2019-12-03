const parser = require('../inputParser.js');

const findIntersections = (wirePath1, wirePath2) => {
    const getPoints = path => {
        let points = [{x: 0, y: 0}];
        path.forEach(value => {
            const direction = value.charAt(0);
            const number = parseInt(value.substring(1));

            let {x, y} = points[points.length-1];
            if (direction === 'U') {
                x -= number;
            } else if (direction === 'D') {
                x += number;
            } else if (direction === 'L') {
                y -= number;
            } else if (direction === 'R') {
                y += number;
            }
            points.push({x, y});
        });
        return points;
    }

    let intersections = [];
    const wirePoints1 = getPoints(wirePath1);
    const wirePoints2 = getPoints(wirePath2);

    for (let i = 1; i < wirePoints1.length; i++) {
        for (let j = 1; j < wirePoints2.length; j++) {
            if (wirePoints1[i-1].x === wirePoints1[i].x &&
                wirePoints2[j-1].y === wirePoints2[j].y) {
                    const [minY1, maxY1] = wirePoints1[i-1].y < wirePoints1[i].y ?
                        [wirePoints1[i-1].y, wirePoints1[i].y] :
                        [wirePoints1[i].y, wirePoints1[i-1].y];
                    const [minX2, maxX2] = wirePoints2[j-1].x < wirePoints2[j].x ?
                        [wirePoints2[j-1].x, wirePoints2[j].x] :
                        [wirePoints2[j].x, wirePoints2[j-1].x];

                    if (minY1 <= wirePoints2[j].y && wirePoints2[j].y <= maxY1 &&
                        minX2 <= wirePoints1[i].x && wirePoints1[i].x <= maxX2) {
                            intersections.push({
                                x: wirePoints1[i].x,
                                y: wirePoints2[j].y
                            });
                        }
            }
            else if (wirePoints1[i-1].y === wirePoints1[i].y &&
                wirePoints2[j-1].x === wirePoints2[j].x) {
                    const [minX1, maxX1] = wirePoints1[i-1].x < wirePoints1[i].x ?
                        [wirePoints1[i-1].x, wirePoints1[i].x] :
                        [wirePoints1[i].x, wirePoints1[i-1].x];
                    const [minY2, maxY2] = wirePoints2[j-1].y < wirePoints2[j].y ?
                        [wirePoints2[j-1].y, wirePoints2[j].y] :
                        [wirePoints2[j].y, wirePoints2[j-1].y];

                    if (minX1 <= wirePoints2[j].x && wirePoints2[j].x <= maxX1 &&
                        minY2 <= wirePoints1[i].y && wirePoints1[i].y <= maxY2) {
                            intersections.push({
                                x: wirePoints2[j].x,
                                y: wirePoints1[i].y
                            });
                        }
            }   
        }
    }
    return intersections;
}

const minDistance = points => {
    const manhattanDistance = (point1, point2) => 
        Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
    
    if (points[0].x !== 0 && points[0].y !== 0) {
        points.unshift({x: 0, y: 0});
    }   

    let distance = manhattanDistance(points[0], points[1]);
    for (let i = 2; i < points.length; i++) {
        distance = Math.min(distance, manhattanDistance(points[0], points[i]));
    }
    return distance;
}

const fileName = 'day_3.txt';
const input = parser(fileName, '\n').map(line => line.split(','));

console.log(minDistance(findIntersections(input[0], input[1])));

module.exports = { findIntersections, minDistance }