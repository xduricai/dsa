export function minLength(s: string, numOps: number): number {
    const charGroups: [string, number][] = [[s[0], 0]];
    let currChar = s[0];
    // number of swaps needed to have alternating characters (group size 1) with 1's at even/odd positions
    let opsForOddOnes = 0;
    let opsForEvenOnes = 0;

    // group substrings of same consecutive characters
    for (const char of s) {
        if (char === currChar) {
            charGroups.at(-1)[1]++;
        } else {
            currChar = char;
            charGroups.push([currChar, 1]);
        }
    }

    // precalculate for group size of 1
    for (let idx = 0; idx < s.length; idx++) {
        if (idx % 2 === 1) {
            if (s[idx] === "1") {
                opsForEvenOnes++;
            } else {
                opsForOddOnes++;
            }
        } else {
            if (s[idx] === "1") {
                opsForOddOnes++;
            } else {
                opsForEvenOnes++;
            }
        }
    }

    // number of flips needed for every group to be of at most size len
    const flipsNeeded = (len: number) => {
        // group size 1 is unique
        if (len === 1) {
            return Math.min(opsForOddOnes, opsForEvenOnes);
        }

        let sum = 0;

        // check the number of operations requried for each group
        // add +1 because each block has a size k + 1 (k is the desired group size and k is the divider)
        // we floor the result because the number of blocks will be the number of dividers + 1
        for (const [_, groupSize] of charGroups) {
            sum += Math.floor(groupSize / (len + 1));
        }

        return sum;
    };

    let left = 1;
    let right = s.length;

    // binary search for the smallest possible group size that can be achieved with available operations
    while (left < right) {
        const mid = (left + right) >> 1;

        if (flipsNeeded(mid) > numOps) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}
