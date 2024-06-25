export function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const ret = [];

    for (let idx = 0; idx < nums.length - 2; idx++) {
        if (idx > 0 && nums[idx] === nums[idx - 1]) continue;

        let low = idx + 1;
        let hi = nums.length - 1;

        while (low < hi) {
            if (low > idx + 1 && nums[low] === nums[low - 1]) {
                low++;
                continue;
            }
            if (hi < nums.length - 1 && nums[hi] === nums[hi + 1]) {
                hi--;
                continue;
            }

            const sum = nums[low] + nums[hi] + nums[idx];

            if (sum > 0) {
                hi--;
                continue;
            } 
            if (sum < 0) {
                low++;
                continue;
            } 
            ret.push([nums[idx], nums[low], nums[hi]]);
            low++;                
        }
    }
    return ret;
}