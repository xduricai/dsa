// LC 2799 (https://leetcode.com/problems/count-complete-subarrays-in-an-array)

export function countCompleteSubarrays(nums: number[]): number {
    const target = new Set<number>(nums).size;
    const counter = new Map<number, number>();
    let left = 0;
    let res = 0;

    for (let right = 0; right < nums.length; right++) {
        const countR = counter.get(nums[right]) || 0;
        counter.set(nums[right], countR + 1);

        while (counter.size === target) {
            const countL = counter.get(nums[left]);
            if (countL === 1) {
                break;
            }
            counter.set(nums[left], countL - 1);
            left++;
        }

        if (counter.size === target) {
            res += left + 1;
        }
    }

    return res;
}
