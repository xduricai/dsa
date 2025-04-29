// LC 2962 (https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times)

export function countSubarrays(nums: number[], k: number): number {
    const indices = [];
    const max = Math.max(...nums);
    let res = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === max) {
            indices.push(right);
        }

        if (indices.length >= k) {
            const left = indices.at(-k);
            res += left + 1;
        }
    }

    return res;
}

// alt solution, counts all subarrays where the maximum element of the subarray appears at least k times
export function countSubarraysAlt(nums: number[], k: number): number {
    const indices = new Map<number, number[]>();
    let max = 0;
    let res = 0;

    for (let right = 0; right < nums.length; right++) {
        const list = indices.get(nums[right]);
        if (list) {
            list.push(right);
        } else {
            indices.set(nums[right], [right]);
        }

        max = Math.max(max, nums[right]);
        const maxList = indices.get(max);

        if (maxList.length >= k) {
            const left = maxList.at(-k);
            res += left + 1;
        }
    }

    return res;
}
