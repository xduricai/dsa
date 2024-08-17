export function canJump(nums: number[]): boolean {
    let goal = nums.length - 1;

    for (let idx = nums.length - 2; idx >= 0; idx--) {
        if (idx + nums[idx] >= goal) {
            goal = idx;
        }
    }
    return goal === 0;
}
