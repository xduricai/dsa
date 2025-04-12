// LC 3272 (https://leetcode.com/problems/find-the-count-of-good-integers)

export function countGoodIntegers(n: number, k: number): number {
    // pre-compute factorials to eliminate unnecessary work
    const factorials = Array(11).fill(1);
    for (let idx = 1; idx <= 10; idx++) {
        factorials[idx] = factorials[idx - 1] * idx;
    }
    const seen = new Set<string>();
    const current = Array(n).fill(0);
    let res = 0;

    // find all possible permutations for a given palindromic number
    const processNum = (nums: string[]) => {
        // count digit occurrences
        const counter = Array(10).fill(0);
        for (const num of nums) {
            counter[num]++;
        }

        // keep track of duplicates to prevent counting multiple equivalent numbers
        // i.e. 220022 and 202202 are effectively the same number
        const key = counter.join("");
        if (seen.has(key)) {
            return;
        }
        seen.add(key);

        // number of all permutations using these digits
        let total = factorials[n];
        for (let idx = 0; idx < 10; idx++) {
            total /= factorials[counter[idx]];
        }

        // remove all permutations starting with 0
        const startWithZero = (total * counter[0]) / n;
        res += total - startWithZero;
    };

    const backtrack = (left: number, right: number) => {
        if (left > right) {
            // palindromic number of length n, divisible by k
            if (Number(current.join("")) % k === 0) {
                processNum([...current]);
            }
            return;
        }

        // skip 0 for the first digit of the number
        for (let num = left > 0 ? 0 : 1; num <= 9; num++) {
            current[left] = num;
            current[right] = num;
            backtrack(left + 1, right - 1);
        }
    };

    backtrack(0, n - 1);
    return res;
}
