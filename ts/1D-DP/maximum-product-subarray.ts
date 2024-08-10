export function maxProduct(nums: number[]): number {
    let res = nums[0];
    let currMin = 1;
    let currMax = 1;

    for (let num of nums) {
        const newMin = currMin * num;
        const newMax = currMax * num;

        currMin = Math.min(newMin, newMax, num);
        currMax = Math.max(newMin, newMax, num);
        res = Math.max(res, currMax);
    }
    return res;
}
