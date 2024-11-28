export function minFlipsMonoIncr(s: string): number {
    let result = 0;
    let ones = 0;

    for (const char of s) {
        if (char === "1") {
            ones++;
        } else {
            result = Math.min(result + 1, ones);
        }
    }

    return result;
}

export function minFlipsMonoIncrAlt(s: string): number {
    let zeroesLeft = 0;
    let onesLeft = 0;

    let zeroesRight = 0;
    let onesRight = 0;

    for (const char of s) {
        if (char === "0") {
            zeroesRight++;
        } else {
            onesRight++;
        }
    }

    let result = Math.max(zeroesRight, onesRight);

    for (let idx = 0; idx < s.length; idx++) {
        if (s[idx] === "0") {
            zeroesLeft++;
            zeroesRight--;
        } else {
            onesLeft++;
            onesRight--;
        }

        const allZeroes = onesLeft + onesRight;
        const allOnes = zeroesLeft + zeroesRight;
        const zeroesLeftOnesRight = onesLeft + zeroesRight;

        result = Math.min(result, allZeroes, allOnes, zeroesLeftOnesRight);
    }

    return result;
}
