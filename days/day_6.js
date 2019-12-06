const parser = require('../inputParser.js');

const createMap = input => {
    let orbitMap = new Map();
    input.forEach(line => {
        const [obj, orbitObj] = line.split(')');
        const orbitObjs = orbitMap.get(obj) || [];
        orbitObjs.push(orbitObj);
        orbitMap.set(obj, orbitObjs);
    });
    return orbitMap;
}

const orbitTotalCount = orbitMap => {
    let count = 0;
    let currentObjs = [{name: 'COM', orbitsCount: 0}];
    while (currentObjs.length > 0) {
        //console.log(currentObjs);
        const obj = currentObjs.shift();
        const orbitObjs = orbitMap.get(obj.name) || [];
        orbitObjs.forEach(orbitObj => {
            currentObjs.push({
                name: orbitObj,
                orbitsCount: obj.orbitsCount + 1
            });
        });

        count += (obj.orbitsCount + 1) * orbitObjs.length;
    }
    return count;
}

//part Two - find minimum path

const createDoubleMap = input => {
    let orbitMap = new Map();
    input.forEach(line => {
        const [obj, orbitObj] = line.split(')');
        const orbitObjs = orbitMap.get(obj) || [];
        orbitObjs.push(orbitObj);
        orbitMap.set(obj, orbitObjs);

        const objs = orbitMap.get(orbitObj) || [];
        objs.push(obj);
        orbitMap.set(orbitObj, objs);
    });
    //console.log(orbitMap);
    return orbitMap;
}

const path = orbitMap => {
    const from = 'YOU';
    const to = 'SAN';
    let currentObjs = [];
    let obj = {name: from, distance: 0}
    let visitedObjs = new Set();
    while (obj.name !== to) {
        visitedObjs.add(obj.name);
        const connectedObjs = orbitMap.get(obj.name) || [];
        connectedObjs.forEach(connectedObj => {
            if (!visitedObjs.has(connectedObj)) {
                currentObjs.push({
                    name: connectedObj,
                    distance: obj.distance + 1
                });
            }
        });
        currentObjs.sort((a, b) => a.distance - b.distance);
        //console.log(currentObjs);
        obj = currentObjs.shift();
    }

    return obj.distance - 2;
}

const fileName = 'day_6.txt';
const input = parser(fileName, '\n');

//console.log(orbitTotalCount(createMap(input)));
console.log(path(createDoubleMap(input)));
