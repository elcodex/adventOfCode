const parser = require('../inputParser.js');

const manhattanDistance = (point1, point2) => 
    Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);

const GCD = (n1, n2) => {
    if (n1 === 0) return Math.abs(n2) || 1;
    if (n2 === 0) return Math.abs(n1) || 1;

    let divisor = Math.min(Math.abs(n1), Math.abs(n2));
    while (n1 % divisor !== 0 || n2 % divisor !== 0) {
        divisor--;
    }
    return divisor;
}

const detectedAsteroids = (allAsteroids, {x, y}) => {
    let usedDXDY = new Set();
    let visibleAsteroids = [];
    [...allAsteroids]
    .sort((a1, a2) => {
        const d1 = manhattanDistance(a1, {x, y});
        const d2 = manhattanDistance(a2, {x, y});
        return d1 - d2;
    })
    .forEach(asteroid => {
        let dx = asteroid.x - x;
        let dy = asteroid.y - y;
        const gcd = GCD(dx, dy);
        dx = dx / gcd;
        dy = dy / gcd;
        if (!usedDXDY.has(`${dx},${dy}`)) {
            visibleAsteroids.push(asteroid);
            usedDXDY.add(`${dx},${dy}`);
        }
    });
    return visibleAsteroids
        .filter(asteroid => asteroid.x !== x || asteroid.y !== y);
}

const orderToVaporizeAsteroids = (visibleAsteroids, {x, y}) => {
    const asteroidsWithAngles = visibleAsteroids.map(asteroid => {
        const dx = asteroid.x - x;
        const dy = asteroid.y - y;
        const radians = Math.PI - Math.atan2(dx, dy);
        return {x: asteroid.x, y: asteroid.y, radians}
    });
    return asteroidsWithAngles.sort((a1, a2) => a1.radians - a2.radians);
}

const getAllAsteroids = spaceMap => {
    return spaceMap.reduce((asteroids, spaceLine, y) => {
        return spaceLine.reduce((lineAsteroids, spacePoint, x) => {
            if (spacePoint !== '.') {    
                lineAsteroids.push({x, y});
            }
            return lineAsteroids;
        }, asteroids);
    }, []);
}

const spaceMap = parser('day_10.txt', '\n').map(line => line.split(''));
allAsteroids = getAllAsteroids(spaceMap);
let maxDetected = 0;
let stationPosition = {};
let asteroids = {};
allAsteroids.forEach((asteroid, i) => {
    const detected = detectedAsteroids(allAsteroids, asteroid);
    if (asteroid.x === 11 && asteroid.y === 13) console.log(detected.length);
    if (detected.length > maxDetected) {
        maxDetected = detected.length;
        
        stationPosition = {x: asteroid.x, y: asteroid.y};
        asteroids = detected;
    }
});

console.log(stationPosition, maxDetected);

const position = 200;
let current = 0;
let vaporizedAsteroids = [];
while (current < position) {
    detectedAsteroids(allAsteroids, stationPosition);
    vaporizedAsteroids = orderToVaporizeAsteroids(asteroids, stationPosition);
    current += vaporizedAsteroids.length;
    vaporizedAsteroids.forEach(asteroid => {
        spaceMap[asteroid.y][asteroid.x] = '.';
    });
    allAsteroids = getAllAsteroids(spaceMap);
}

console.log(vaporizedAsteroids[position - (current - vaporizedAsteroids.length) - 1]);
