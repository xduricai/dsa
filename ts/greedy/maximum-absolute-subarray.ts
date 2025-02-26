export function maxAbsoluteSum(nums: number[]): number {
    let currMax = 0;
    let currMin = 0;
    let max = 0;

    for (const num of nums) {
        currMax = Math.max(currMax + num, num);
        currMin = Math.min(currMin + num, num);
        max = Math.max(max, currMax, -currMin);
    }

    return max;
}
