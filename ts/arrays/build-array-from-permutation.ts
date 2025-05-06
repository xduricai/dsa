// LC 1920 (https://leetcode.com/problems/build-array-from-permutation)

// O(1) space complexity solution, uses negative numbers to keep of which elements have already been visited
export function buildArray(nums: number[]): number[] {
    for (let idx = 0; idx < nums.length; idx++) {
        // element is already in the correct place
        if (nums[idx] === idx) {
            nums[idx] = -nums[idx] - 1;
        }
        // element is a part of an already explored loop
        if (nums[idx] < 0) {
            continue;
        }

        let start = -nums[idx] - 1;
        let ptr = idx;
        let next = -1;

        while (true) {
            // the end of the loop has been reached
            if (nums[nums[ptr]] < 0) {
                nums[ptr] = start;
                break;
            }

            next = nums[ptr];
            nums[ptr] = -nums[next] - 1;
            ptr = next;
        }
    }

    // convert values back to positive integers
    for (let idx = 0; idx < nums.length; idx++) {
        nums[idx] = -nums[idx] - 1;
    }

    return nums;
}

// single pass solution with O(n) space complexity
function buildArrayAlt(nums: number[]): number[] {
    return nums.map((num) => nums[num]);
}
