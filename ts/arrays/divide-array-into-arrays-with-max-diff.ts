// LC 2966 (https://leetcode.com/problems/divide-array-into-arrays-with-max-difference)

export function divideArray(nums: number[], k: number): number[][] {
    nums.sort((a, b) => a - b);
    const res = Array(nums.length / 3);

    for (let idx = 0; idx < nums.length; idx += 3) {
        if (nums[idx + 2] - nums[idx] > k) {
            return [];
        }
        res[Math.floor(idx / 3)] = [nums[idx], nums[idx + 1], nums[idx + 2]];
    }

    return res;
}
