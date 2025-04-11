// LC 2843 (https://leetcode.com/problems/count-symmetric-integers)

export function countSymmetricIntegers(low: number, high: number): number {
    let res = 0;

    for (let idx = low; idx <= high; idx++) {
        const len = idx.toString().length;
        let num = idx;
        let left = 0;
        let right = 0;

        if (len % 2 === 1) {
            continue;
        }

        for (let iter = 0; iter < len / 2; iter++) {
            right += num % 10;
            num = Math.floor(num / 10);
        }
        for (let iter = 0; iter < len / 2; iter++) {
            left += num % 10;
            num = Math.floor(num / 10);
        }

        if (left === right) {
            res++;
        }
    }

    return res;
}
