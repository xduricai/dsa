import { Heap } from "./custom-heap";

export function maxRemoval(nums: number[], queries: number[][]): number {
    queries.sort((a, b) => a[0] - b[0]);
    const heap = new Heap<number>((a, b) => b - a);
    const delta = Array(nums.length + 1).fill(0);
    let query = 0;
    let curr = 0;

    for (let idx = 0; idx < nums.length; idx++) {
        curr += delta[idx];

        while (query < queries.length && queries[query][0] === idx) {
            heap.push(queries[query][1]);
            query++;
        }

        while (curr < nums[idx] && heap.size && heap.peek() >= idx) {
            curr++;
            delta[heap.pop() + 1]--;
        }

        if (curr < nums[idx]) {
            return -1;
        }
    }

    return heap.size;
}
