// Do not return anything, modify nums in-place instead.

// cyclical traversal approach
export function rotate(nums: number[], k: number): void {
    const n = nums.length;
    let moves = 0;
    k %= n;

    for (let start = 0; moves < n; start++) {
        let idx = start;
        let num = nums[start];

        while (true) {
            const nextIdx = (idx + k) % n;
            const temp = nums[nextIdx];

            nums[nextIdx] = num;
            num = temp;
            idx = nextIdx;
            moves++;

            if (idx === start) {
                break;
            }
        }
    }
}

// array reversal approach
export function rotateAlt(nums: number[], k: number): void {
    const n = nums.length;
    k %= n;

    // reverse the entire array
    reverse(nums, 0, n - 1);
    // reverse the first k elements
    reverse(nums, 0, k - 1);
    // reverse the remaining elements
    reverse(nums, k, n - 1);
}

function reverse(nums: number[], left: number, right: number) {
    while (left < right) {
        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;

        left++;
        right--;
    }
}
