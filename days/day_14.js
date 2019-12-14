const parser = require('../inputParser.js');

const input = parser('day_14.txt', '\n');

let reactions = new Map();
input.forEach(reaction => {
    const [from, to] = reaction.split(' => ');
    const [number, unit] = to.split(' ');
    reactions.set(
        unit,
        {
            number: parseInt(number),
            from: from.split(', ').map(value => {
                const [number, unit] = value.split(' ');
                return {unit, number: parseInt(number)};
            })
        }
    );
});

const numberOfORE = (reactions, numberOfFuel) => {
    let unitToOREReaction = [{unit: 'FUEL', number: numberOfFuel}]//reactions.get('FUEL').from;
    let leftComponents = new Map();
    while (unitToOREReaction.some(({unit}) => unit !== 'ORE')) {
        ///console.log(unitToOREReaction.map(component => `${component.number} ${component.unit}`));
        
        let newReaction = [];
        unitToOREReaction.forEach(({unit, number}) => {
            if (unit !== 'ORE') {
                const fromUnit = reactions.get(unit);

                const leftUnitNumber = (leftComponents.get(unit) || 0);
                if (number - leftUnitNumber < 0) {   
                    leftComponents.set(
                        unit,
                        leftUnitNumber - number
                    );
                    number = 0;
                }
                else {
                    number -= leftUnitNumber;
                    leftComponents.delete(unit);
                }
                //console.log(unit)
                //console.log(leftComponents);

                const multiplicator = Math.ceil(number / fromUnit.number);
                const leftNumber = multiplicator * fromUnit.number - number;
                if (leftNumber > 0) {
                    leftComponents.set(
                        unit, 
                        (leftComponents.get(unit) || 0) + leftNumber
                    );
                }
                
                newReaction = newReaction.concat(
                    fromUnit.from.map(value => {
                        return {
                            unit: value.unit,
                            number: multiplicator * value.number
                        }
                    })
                );
                //console.log(newReaction);
            } else {
                newReaction.push({unit, number});
            }
        });

        unitToOREReaction = [...newReaction];
    }

    return unitToOREReaction.reduce((numberOfOre, {number}) => numberOfOre + number, 0);
} 

const orePerNumberOfFuel = (reactions, cargo) => {
    //const orePerFuel = numberOfORE(reactions, 1);
    //console.log(orePerFuel);
    let minFuel = 1; 
    let maxFuel = cargo;
    while (maxFuel - minFuel > 1) {
        console.log(minFuel, maxFuel);
        const fuel = minFuel + Math.floor((maxFuel - minFuel) / 2);
        const ore = numberOfORE(reactions, fuel);
        if (ore <= cargo) {
            minFuel = fuel;
        }
        else {
            maxFuel = fuel;
        }
    }
    console.log(minFuel, maxFuel);
    return minFuel;
}

console.log(orePerNumberOfFuel(reactions, Math.pow(10, 12)));