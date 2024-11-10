export function minimumSubarrayLength(nums: number[], k: number): number {
    const bitmask = Array(31).fill(0);
    let res = Infinity;
    let left = 0;

    const bitmaskValue = () => {
        let current = 0;

        for (let idx = 0; idx < 31; idx++) {
            if (bitmask[idx] > 0) {
                current += 1 << idx;
            }
        }
        return current;
    };

    const diffBits = (num: number, diff: number) => {
        for (let idx = 0; idx < 31; idx++) {
            if (num & (1 << idx)) {
                bitmask[idx] += diff;
            }
        }
    };

    for (let right = 0; right < nums.length; right++) {
        diffBits(nums[right], 1);

        while (left <= right && bitmaskValue() >= k) {
            res = Math.min(res, right - left + 1);
            diffBits(nums[left], -1);
            left++;
        }
    }

    if (res === Infinity) {
        return -1;
    }
    return res;
}
