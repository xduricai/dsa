export function maximumSubarraySum(nums: number[], k: number): number {
    const counter = new Map<number, number>();
    let max = 0;
    let sum = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        if (idx >= k) {
            const left = nums[idx - k];
            const leftCount = counter.get(left) - 1;
            counter.set(left, leftCount);
            sum -= left;

            if (leftCount === 0) {
                counter.delete(left);
            }
        }

        const right = nums[idx];
        const rightCount = (counter.get(right) || 0) + 1;
        counter.set(right, rightCount);
        sum += right;

        if (counter.size === k) {
            max = Math.max(max, sum);
        }
    }

    return max;
}
