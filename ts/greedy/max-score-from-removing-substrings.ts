// LC 1717 (https://leetcode.com/problems/maximum-score-from-removing-substrings)

export function maximumGain(s: string, x: number, y: number): number {
    // flip values if x is lower
    const a = x > y ? "a" : "b";
    const b = x > y ? "b" : "a";
    const scoreA = x > y ? x : y;
    const scoreB = x > y ? y : x;
    // add terminating character
    s = `${s}x`;
    let countA = 0;
    let countB = 0;
    let res = 0;

    for (const char of s) {
        if (char === a) {
            countA++;
        } else if (char === b && countA) {
            countA--;
            res += scoreA;
        } else if (char === b) {
            countB++;
        } else {
            res += Math.min(countA, countB) * scoreB;
            countA = 0;
            countB = 0;
        }
    }

    return res;
}
