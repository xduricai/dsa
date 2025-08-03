// LC 2106 (https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps)

export function maxTotalFruits(
    fruits: number[][],
    startPos: number,
    k: number
): number {
    const n = fruits.length;
    let left = 0;
    let sum = 0;
    let res = 0;

    const getSteps = (left: number, right: number) => {
        const leftDist = Math.max(startPos - fruits[left][0], 0);
        const rightDist = Math.max(fruits[right][0] - startPos, 0);

        return Math.min(
            leftDist + leftDist + rightDist,
            leftDist + rightDist + rightDist
        );
    };

    for (let right = 0; right < n; right++) {
        sum += fruits[right][1];

        while (left <= right && getSteps(left, right) > k) {
            sum -= fruits[left][1];
            left++;
        }

        res = Math.max(res, sum);
    }

    return res;
}
