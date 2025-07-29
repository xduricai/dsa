// LC 2411 (https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or)

export function smallestSubarrays(nums: number[]): number[] {
    const n = nums.length;
    const res = Array(n);
    const suffix = Array(n + 1).fill(0);
    const bitmask = Array(32).fill(0);
    let curr = 0;
    let right = -1;

    const update = () => {
        curr = 0;

        for (let idx = 0; idx < 32; idx++) {
            if (bitmask[idx]) {
                curr |= 1 << idx;
            }
        }
    };

    const add = (num: number) => {
        let idx = 0;
        curr = 0;

        while (num) {
            if (num & 1) {
                bitmask[idx]++;
            }
            num >>= 1;
            idx++;
        }
        update();
    };

    const remove = (num: number) => {
        let idx = 0;
        curr = 0;

        while (num) {
            if (num & 1) {
                bitmask[idx]--;
            }
            num >>= 1;
            idx++;
        }
        update();
    };

    for (let idx = n - 1; idx >= 0; idx--) {
        suffix[idx] = nums[idx] | suffix[idx + 1];
    }

    for (let left = 0; left < n; left++) {
        const target = suffix[left];

        while (curr < target) {
            right++;
            add(nums[right]);
        }

        res[left] = Math.max(right - left + 1, 1);
        remove(nums[left]);
    }

    return res;
}
