export function canSortArray(nums: number[]): boolean {
    const bits = new Map<number, number>();
    for (const num of nums) {
        bits.set(num, countBits(num));
    }
    let max = nums[0];

    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx] >= max) {
            max = nums[idx];
            continue;
        }

        const currentBits = bits.get(nums[idx]);
        let canSwap = true;

        for (let i = idx - 1; i >= 0; i--) {
            if (bits.get(nums[i]) !== currentBits) {
                canSwap = false;
            }

            if (nums[i] > nums[idx] && !canSwap) {
                return false;
            }
        }
    }
    return true;
}

function countBits(num: number): number {
    let count = 0;

    while (num > 0) {
        num &= num - 1;
        count++;
    }
    return count;
}
