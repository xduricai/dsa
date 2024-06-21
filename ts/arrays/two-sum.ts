export function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();

    for (let idx = 0; idx < nums.length; idx++) {
        const pairIdx = map.get(target - nums[idx]);
        
        if (pairIdx != undefined) return [idx, pairIdx];
        map.set(nums[idx], idx);
    }
    return [-1, -1];
};