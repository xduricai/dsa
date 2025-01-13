export function splitArray(nums: number[], k: number): number {
    let left = Math.max(...nums);
    let right = nums.reduce((acc, curr) => acc + curr, 0);

    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (checkSums(nums, mid, k)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

function checkSums(nums: number[], maxSum: number, k: number) {
    let sum = 0;

    for (const num of nums) {
        sum += num;

        if (sum > maxSum) {
            sum = num;
            k--;
        }

        if (k === 0) {
            return false;
        }
    }

    return true;
}
