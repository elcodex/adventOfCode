
const applyGravity = (targetMoonVelocity, targetMoonPosition, otherMoonPosition) => {
    for (let position in targetMoonPosition) {
        if (targetMoonPosition[position] < otherMoonPosition[position]) {
            targetMoonVelocity[position] += 1;
        }
        else if (targetMoonPosition[position] > otherMoonPosition[position]) {
            targetMoonVelocity[position] -= 1;
        }
    }
    return targetMoonVelocity;
}

const applyVelocity = (moonsPosition, moonsVelocity) => {
    for (let position in moonsPosition) {
        moonsPosition[position] += moonsVelocity[position];
    }
    return moonsPosition;
}

const trackingTheMoons = (moonsPositions, afterSteps) => {
    let _moonsPositions = moonsPositions.map(moon => Object.assign({}, moon));
    let moonsVelocities = _moonsPositions.map(() => {
        return {
            x: 0,
            y: 0,
            z: 0
        }
    });
    while (afterSteps > 0) {
        for (let i = 0; i < _moonsPositions.length; i++) {
            for (let j = (i + 1) % _moonsPositions.length; 
                     j !== i; 
                     j = (j + 1) % _moonsPositions.length) {
                moonsVelocities[i] = 
                    applyGravity(moonsVelocities[i], _moonsPositions[i], _moonsPositions[j]);
            }
        }

        moonsPositions = _moonsPositions.map((moonsPosition, i) => 
            applyVelocity(moonsPosition, moonsVelocities[i])
        );
        
        afterSteps--;
    }
    return {moonsPositions: _moonsPositions, moonsVelocities}
}

const totalSystemEnergy = (moonsPositions, moonsVelocities) => {
    let totalEnergy = moonsPositions.reduce((total, moonsPosition, i) => {
        let potentialEnergy = 
            Object.values(moonsPosition)
            .reduce((energy, value) => energy + Math.abs(value), 0);
        
        let kineticEnergy = 
            Object.values(moonsVelocities[i])
            .reduce((energy, value) => energy + Math.abs(value), 0);
        return total + potentialEnergy * kineticEnergy;
    }, 0);

    return totalEnergy;
}

const moonsPositions = [
    {x:-1, y:0, z:2},
    {x:2, y:-10, z:-7},
    {x:4, y:-8, z:8},
    {x:3, y:5, z:-1}
];



const results = trackingTheMoons(moonsPositions, 100);
console.log(totalSystemEnergy(results.moonsPositions, results.moonsVelocities));


module.exports = { trackingTheMoons }