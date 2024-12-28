export function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
    // total number of possible subarrays
    const N = nums.length - k + 1;
    // sums of all possible subarrays
    const sums = Array(N).fill(0);
    // max subarray some to the left of current subarray
    const maxLeft = Array.from({ length: N }, () => ({ sum: 0, start: -1 }));
    // max subarray some to the right of current subarray
    const maxRight = Array.from({ length: N }, () => ({ sum: 0, start: -1 }));

    let sum = 0;
    // compute all possible subarray sums
    for (let idx = 0; idx < nums.length; idx++) {
        sum += nums[idx];

        if (idx >= k) {
            sum -= nums[idx - k];
        }

        if (idx + 1 >= k) {
            sums[idx + 1 - k] = sum;
        }
    }

    maxLeft[0] = { sum: sums[0], start: 0 };
    maxRight[N - 1] = { sum: sums[N - 1], start: N - 1 };

    // poulate the max left/right arrays
    for (let idx = 1; idx < N; idx++) {
        if (maxLeft[idx - 1].sum < sums[idx]) {
            maxLeft[idx].sum = sums[idx];
            maxLeft[idx].start = idx;
        } else {
            maxLeft[idx].sum = maxLeft[idx - 1].sum;
            maxLeft[idx].start = maxLeft[idx - 1].start;
        }

        if (maxRight[N - idx].sum <= sums[N - idx - 1]) {
            maxRight[N - idx - 1].sum = sums[N - idx - 1];
            maxRight[N - idx - 1].start = N - idx - 1;
        } else {
            maxRight[N - idx - 1].sum = maxRight[N - idx].sum;
            maxRight[N - idx - 1].start = maxRight[N - idx].start;
        }
    }

    let maxSum = 0;
    let result = [];

    // find the max sum and its associated array
    for (let idx = k; idx < N - k; idx++) {
        const sum = maxLeft[idx - k].sum + sums[idx] + maxRight[idx + k].sum;

        if (sum > maxSum) {
            maxSum = sum;
            result = [maxLeft[idx - k].start, idx, maxRight[idx + k].start];
        }
    }

    return result;
}

// 2D DP solution
export function maxSumOfThreeSubarraysAlt(nums: number[], k: number): number[] {
    const sums = Array(nums.length - k + 1).fill(0);
    let sum = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        sum += nums[idx];

        if (idx >= k) {
            sum -= nums[idx - k];
        }

        if (idx + 1 >= k) {
            sums[idx + 1 - k] = sum;
        }
    }

    const emptyCell = { sum: 0, starts: [] };
    let dp: { sum: number; starts: number[] }[] = Array(
        nums.length - k + 2
    ).fill(emptyCell);

    for (let iter = 1; iter <= 3; iter++) {
        const current: { sum: number; starts: number[] }[] = Array(
            nums.length - k + 2
        );

        for (let idx = 0; idx <= (iter - 1) * k; idx++) {
            current[idx] = emptyCell;
        }

        for (let idx = (iter - 1) * k + 1; idx <= sums.length; idx++) {
            current[idx] = {
                sum: current[idx - 1].sum,
                starts: [...current[idx - 1].starts],
            };

            const include = idx - k >= 0 ? dp[idx - k] : emptyCell;

            if (include.sum + sums[idx - 1] > current[idx].sum) {
                current[idx].sum = include.sum + sums[idx - 1];
                current[idx].starts = [...include.starts, idx - 1];
            }
        }

        dp = current;
    }

    return dp[sums.length].starts.sort((a, b) => a - b);
}
