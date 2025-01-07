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
    k %= nums.length;
    const pivot = nums.length - k;

    reverse(nums, 0, pivot - 1);
    reverse(nums, pivot, nums.length - 1);
    reverse(nums, 0, nums.length - 1);
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
