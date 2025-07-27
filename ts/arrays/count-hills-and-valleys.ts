// LC 2210 (https://leetcode.com/problems/count-hills-and-valleys-in-an-array)

export function countHillValley(nums: number[]): number {
    let inc = null;
    let res = 0;

    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx - 1] > nums[idx] && inc === true) {
            inc = false;
            res++;
        } else if (nums[idx - 1] < nums[idx] && inc === false) {
            inc = true;
            res++;
        } else if (nums[idx - 1] !== nums[idx]) {
            inc = nums[idx - 1] < nums[idx];
        }
    }

    return res;
}
