export function countFairPairs(
    nums: number[],
    lower: number,
    upper: number
): number {
    const countPairsUnder = (upperBound: number) => {
        let count = 0;
        let left = 0;
        let right = nums.length - 1;

        while (left < right) {
            while (left < right && nums[left] + nums[right] >= upperBound) {
                right--;
            }

            if (left >= right) {
                return count;
            }

            count += right - left;
            left++;
        }
        return count;
    };

    nums.sort((a, b) => a - b);

    const lessThanUpper = countPairsUnder(upper + 1);
    const lessThanLower = countPairsUnder(lower);

    return lessThanUpper - lessThanLower;
}

// binary search solution
export function countFairPairsAlt(
    nums: number[],
    lower: number,
    upper: number
): number {
    const binarySearch = (left: number, right: number, target: number) => {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] >= target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return right;
    };

    nums.sort((a, b) => a - b);
    let result = 0;

    for (let idx = 0; idx < nums.length - 1; idx++) {
        const low = lower - nums[idx];
        const upp = upper - nums[idx];

        result +=
            binarySearch(idx + 1, nums.length - 1, upp + 1) -
            binarySearch(idx + 1, nums.length - 1, low);
    }
    return result;
}
