export class SegmentNode {
    sum;
    left;
    right;
    L;
    R;

    constructor(L, R, nums) {
        this.L = L;
        this.R = R;

        if (L === R) {
            this.sum = nums[L];
            return;
        }

        const M = Math.floor((L + R) / 2);
        this.left = new SegmentNode(L, M, nums);
        this.right = new SegmentNode(M + 1, R, nums);
        this.sum = this.left.sum + this.right.sum;
    }

    update(index, val) {
        if (this.L === this.R) {
            this.sum = val;
            return;
        }

        if (index <= Math.floor((this.L + this.R) / 2)) {
            this.left.update(index, val);
        } else {
            this.right.update(index, val);
        }
        this.sum = this.left.sum + this.right.sum;
    }

    query(L, R) {
        if (L === this.L && R === this.R) {
            return this.sum;
        }
        const M = Math.floor((this.L + this.R) / 2);

        if (L > M) {
            return this.right.query(L, R);
        } else if (R <= M) {
            return this.left.query(L, R);
        } else {
            return this.left.query(L, M) + this.right.query(M + 1, R);
        }
    }
}

export class SegmentTree {
    root;

    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.root = new SegmentNode(0, nums.length - 1, nums);
    }

    /**
     * @param {number} index
     * @param {number} val
     */
    update(index, val) {
        this.root.update(index, val);
    }

    /**
     * @param {number} L
     * @param {number} R
     * @returns {number}
     */
    query(L, R) {
        return this.root.query(L, R);
    }
}
