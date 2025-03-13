export function minZeroArray(nums: number[], queries: number[][]): number {
    // init as -1 because 0 queries is also a valid answer
    let left = -1;
    let right = queries.length;

    while (left < right) {
        const mid = left + ((right - left) >> 1);

        if (applyQueries(nums, queries, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    // array is still non-zero after all queries
    if (left === queries.length) {
        return -1;
    }
    return left + 1;
}

function applyQueries(nums: number[], queries: number[][], k: number): boolean {
    // prefix array to track the value across k queries
    const prefix = Array(nums.length + 1).fill(0);
    let curr = 0;

    for (let idx = 0; idx <= k; idx++) {
        const [left, right, val] = queries[idx];
        prefix[left] += val;
        prefix[right + 1] -= val;
    }

    for (let idx = 0; idx < nums.length; idx++) {
        curr += prefix[idx];

        // at least one element in the array cannot be reduced to 0
        if (nums[idx] > curr) {
            return false;
        }
    }

    return true;
}
