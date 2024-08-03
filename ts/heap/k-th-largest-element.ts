import { Heap } from "./heap";

export function findKthLargest(nums: number[], k: number): number {
    k = nums.length - k;

    const quickSelect = (left: number, right: number) => {
        const pivot = nums[right];
        let ptr = left;

        for (let idx = left; idx < right; idx++) {
            if (nums[idx] > pivot) continue;

            const temp = nums[ptr];
            nums[ptr] = nums[idx];
            nums[idx] = temp;
            ptr++;
        }
        const temp = nums[ptr];
        nums[ptr] = nums[right];
        nums[right] = temp;

        if (ptr > k) {
            return quickSelect(left, ptr - 1);
        }
        if (ptr < k) {
            return quickSelect(ptr + 1, right);
        }
        return nums[ptr];
    };
    return quickSelect(0, nums.length - 1);
}

export function findKthLargestAlt(nums: number[], k: number): number {
    const heap = new Heap<number>();

    for (let num of nums) {
        heap.add(num);
    }
    for (let iter = 0; iter < nums.length - k; iter++) {
        heap.delete();
    }

    return heap.peek();
}
