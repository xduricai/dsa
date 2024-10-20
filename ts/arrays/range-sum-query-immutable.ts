export class NumArray {
    prefix: number[];

    constructor(nums: number[]) {
        this.prefix = Array(nums.length);
        let sum = 0;

        for (let idx = 0; idx < nums.length; idx++) {
            sum += nums[idx];
            this.prefix[idx] = sum;
        }
    }

    sumRange(left: number, right: number): number {
        const rightSum = this.prefix[right];
        const leftSum = left > 0 ? this.prefix[left - 1] : 0;

        return rightSum - leftSum;
    }
}
