export function topKFrequent(nums: number[], k: number): number[] {
    const map = new Map<number, number>();
    const arr: number[][] = [];
    const ret: number[] = [];

    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
        arr.push([]);
    }

    for (let [key, value] of map.entries()) {
        arr[value - 1].push(key);
    }

    for (let idx = nums.length-1; idx >= 0; idx--) {
        for (let item of arr[idx]) {
            ret.push(item);
            if (ret.length === k) return ret;
        }
    }
    return ret;
};