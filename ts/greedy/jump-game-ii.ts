export function jump(nums: number[]): number {
    let start = 0;
    let reach = 0;
    let count = 0;

    while (reach < nums.length - 1) {
        let maxReach = 0;

        for (let idx = start; idx <= reach; idx++) {
            maxReach = Math.max(maxReach, idx + nums[idx]);
        }
        start = reach + 1;
        reach = maxReach;
        count++;
    }
    return count;
}
