
const notDecreaseDigits = digits => {
    return digits.every((digit, i, digits) => {
        if (i === 0) {
            return true;
        }
        return digit >= digits[i-1];
    });
}

const areTwoAdjDigitsSame = digits => {
    return digits.some((digit, i, digits) => {
        if (i === 0) {
            return false;
        }
        return digit ===digits[i-1];
    });
}

const havePair = digits => {
    return digits.some((digit, i, arr) => {
        if (i === 0) {
            return false;
        }
        if (digit === arr[i-1] && 
            (i - 1 === 0 || digit !== arr[i-2]) &&
            (i + 1 === arr.length || digit !== arr[i+1])) {
                return true;
            }
        return false;    
    });
}

const countDiffPasswords = (from, to) => {
    let count = 0;
    for (let number = from; number <= to; number++) {
        const digits = number
            .toString()
            .split('')
            .map(value => parseInt(value));

        if (notDecreaseDigits(digits) && 
            areTwoAdjDigitsSame(digits) &&
            havePair(digits)) {
                count++;
        }
    }
    return count;
}

console.log(countDiffPasswords(372037, 905157));