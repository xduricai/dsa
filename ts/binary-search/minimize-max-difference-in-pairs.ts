// LC 2616 (https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs)

export function minimizeMax(nums: number[], p: number): number {
    nums.sort((a, b) => a - b);
    let left = 0;
    let right = nums.at(-1) - nums.at(0);

    const countValid = (maxDiff: number) => {
        let count = 0;

        for (let idx = 1; idx < nums.length; idx++) {
            if (nums[idx] - nums[idx - 1] <= maxDiff) {
                count++;
                idx++;
            }
        }

        return count;
    }
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (countValid(mid) >= p) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
};