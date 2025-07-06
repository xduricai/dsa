// LC 1865 (https://leetcode.com/problems/finding-pairs-with-a-certain-sum)

export class FindSumPairs {
    left: number[];
    right: number[];
    counter = new Map<number, number>();

    constructor(nums1: number[], nums2: number[]) {
        this.left = nums1.sort((a, b) => a - b);
        this.right = nums2;

        for (const num of nums2) {
            const count = this.counter.get(num) || 0;
            this.counter.set(num, count + 1);
        }
    }

    add(idx: number, val: number): void {
        const oldCount = this.counter.get(this.right[idx]);
        this.counter.set(this.right[idx], oldCount - 1);
        this.right[idx] += val;

        const newCount = this.counter.get(this.right[idx]) || 0;
        this.counter.set(this.right[idx], newCount + 1);
    }

    count(total: number): number {
        let res = 0;

        for (
            let idx = 0;
            idx < this.left.length && this.left[idx] < total;
            idx++
        ) {
            res += this.counter.get(total - this.left[idx]) || 0;
        }

        return res;
    }
}
