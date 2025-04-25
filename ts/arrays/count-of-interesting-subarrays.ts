// LC 2845 (https://leetcode.com/problems/count-of-interesting-subarrays)

export function countInterestingSubarrays(
    nums: number[],
    modulo: number,
    k: number
): number {
    const counter = new Map<number, number>([[0, 1]]);
    let count = 0;
    let res = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        if (nums[idx] % modulo === k) {
            count++;
        }
        res += counter.get((count - k + modulo) % modulo) || 0;

        const key = count % modulo;
        const val = counter.get(key) || 0;
        counter.set(key, val + 1);
    }

    return res;
}
