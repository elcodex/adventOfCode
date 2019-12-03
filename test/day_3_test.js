const { findIntersections, minDistance, minSteps } = require('../days/day_3.js');

describe('part One', () => {
    test('distance 6', () => {
        const wirePath1 = 'U7,R6,D4,L4'.split(',');
        const wirePath2 = 'R8,U5,L5,D3'.split(',');
        expect(minDistance(findIntersections(wirePath1, wirePath2))).toBe(6);
    });

    
    test('distance 159', () => {
        const wirePath1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(',');
        const wirePath2 = 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',');
        expect(minDistance(findIntersections(wirePath1, wirePath2))).toBe(159);
    });

    test('distance 135', () => {
        const wirePath1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(',');
        const wirePath2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split(',');
        expect(minDistance(findIntersections(wirePath1, wirePath2))).toBe(135);
    });  
});

describe('part Two', () => {
    test('steps 30', () => {
        const wirePath1 = 'U7,R6,D4,L4'.split(',');
        const wirePath2 = 'R8,U5,L5,D3'.split(',');
        expect(minSteps(findIntersections(wirePath1, wirePath2))).toBe(30);
    });
    
    test('steps 610', () => {
        const wirePath1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(',');
        const wirePath2 = 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',');
        expect(minSteps(findIntersections(wirePath1, wirePath2))).toBe(610);
    });

    test('steps 410', () => {
        const wirePath1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(',');
        const wirePath2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split(',');
        expect(minSteps(findIntersections(wirePath1, wirePath2))).toBe(410);
    });  
});