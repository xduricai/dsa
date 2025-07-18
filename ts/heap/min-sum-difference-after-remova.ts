// LC 2163 (https://leetcode.com/problems/minimum-difference-in-sums-after-removal-of-elements)

import { Heap } from "./custom-heap";

export function minimumDifference(nums: number[]): number {
    const n = nums.length / 3;
    const left = nums.slice(0, n);
    const mid = nums.slice(n, n * 2);
    const right = nums.slice(n * 2, n * 3);
    
    // left side
    const min = Array(n + 1).fill(0);
    const maxHeap = new Heap((a, b) => b - a, left);
    let minSum = left.reduce((acc, curr) => acc + curr, 0);
    min[0] = minSum;

    // right side
    const max = Array(n);
    const minHeap = new Heap<number>((a, b) => a - b, right);
    let maxSum = right.reduce((acc, curr) => acc + curr, 0);

    for (let idx = 0; idx < n; idx++) {
        minSum += mid[idx];
        maxHeap.push(mid[idx]);
        minSum -= maxHeap.pop();
        min[idx + 1] = minSum;
    }
    let res = min.at(-1) - maxSum;

    for (let idx = n - 1; idx >= 0; idx--) {
        maxSum += mid[idx];
        minHeap.push(mid[idx]);
        maxSum -= minHeap.pop();
        res = Math.min(res, min[idx] - maxSum);
    }

    return res;
};