export function resultsArray(nums: number[], k: number): number[] {
    let window = 1;
    const pows = [];

    if (k === 1) {
        return [...nums];
    }

    for (let idx = 1; idx < nums.length; idx++) {
        if (nums[idx - 1] !== nums[idx] - 1) {
            window = 0;
        }

        window = Math.min(window + 1, k);

        if (window === k) {
            pows.push(nums[idx]);
        } else if (idx >= k - 1) {
            pows.push(-1);
        }
    }

    return pows;
}
