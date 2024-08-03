export function maxSlidingWindow(nums: number[], k: number) {
    const output = [];
    const queue = [];

    let left = 0;
    let right = 0;

    while (right < nums.length) {
        while (
            queue.length > 0 &&
            nums[queue[queue.length - 1]] < nums[right]
        ) {
            queue.pop();
        }
        queue.push(right);

        if (left > queue[0]) {
            queue.shift();
        }
        if (right + 1 >= k) {
            output.push(nums[queue[0]]);
            left++;
        }
        right++;
    }
    return output;
}
