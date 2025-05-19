// LC 3024 (https://leetcode.com/problems/type-of-triangle)

export function triangleType(nums: number[]): string {
    nums.sort((a, b) => a - b);

    if (nums[0] + nums[1] <= nums[2]) {
        return "none";
    }

    if (nums[0] === nums[2]) {
        return "equilateral";
    }

    if (nums[1] === nums[0] || nums[1] === nums[2]) {
        return "isosceles";
    }

    return "scalene";
}
