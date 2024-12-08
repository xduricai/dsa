// similar problems: LC 239, LC 84, LC 739

export function shortestSubarray(nums: number[], k: number): number {
    let res = Infinity;
    let sum = 0;
    // [prefix sum, end index of prefix]
    const deque: [number, number][] = [];

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        if (sum >= k) {
            res = Math.min(res, right + 1);
        }

        // find the minimum valid window ending at right
        while (deque.length && sum - deque[0][0] >= k) {
            const [prefix, left] = deque.shift();
            res = Math.min(res, right - left);
        }

        // validate monotonic property of the deque
        while (deque.length && deque[deque.length - 1][0] > sum) {
            deque.pop();
        }
        deque.push([sum, right]);
    }

    if (res === Infinity) {
        return -1;
    }
    return res;
}
