// LC 3355 (https://leetcode.com/problems/zero-array-transformation-i)

export function isZeroArray(nums: number[], queries: number[][]): boolean {
    const prefix = Array(nums.length + 1).fill(0);
    let curr = 0;

    for (const [left, right] of queries) {
        prefix[left]++;
        prefix[right + 1]--;
    }

    for (let idx = 0; idx < nums.length; idx++) {
        curr += prefix[idx];

        if (curr < nums[idx]) {
            return false;
        }
    }

    return true;
}
