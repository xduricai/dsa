// LC 1399 (https://leetcode.com/problems/count-largest-group)

export function countLargestGroup(n: number): number {
    const counts = Array(46).fill(0);
    let max = 0;
    let res = 0;

    for (let num = 1; num <= n; num++) {
        let curr = num;
        let sum = 0;

        while (curr) {
            sum += curr % 10;
            curr = Math.floor(curr / 10);
        }

        counts[sum]++;
        max = Math.max(max, counts[sum]);
    }

    for (const count of counts) {
        if (count === max) {
            res++;
        }
    }

    return res;
}
