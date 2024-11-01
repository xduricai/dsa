export class SegmentTree {
    tree: number[];
    size: number;

    constructor(size: number) {
        this.tree = Array(size * 2).fill(0);
        this.size = size;
    }

    update(idx: number, val: number) {
        idx += this.size;
        this.tree[idx] = val;

        while (idx > 1) {
            idx >>= 1;
            this.tree[idx] = Math.max(
                this.tree[idx * 2],
                this.tree[idx * 2 + 1]
            );
        }
    }

    query(L: number, R: number) {
        L += this.size;
        R += this.size;
        let res = 0;

        while (L < R) {
            if (L & 1) {
                res = Math.max(res, this.tree[L]);
                L++;
            }
            if (R & 1) {
                R--;
                res = Math.max(res, this.tree[R]);
            }

            L >>= 1;
            R >>= 1;
        }

        return res;
    }
}

export function lengthOfLIS(nums: number[], k: number): number {
    const tree = new SegmentTree(Math.max(...nums));
    let res = 1;

    for (const num of nums) {
        const premax = tree.query(Math.max(0, num - k - 1), num - 1) + 1;
        tree.update(num - 1, premax);
        res = Math.max(res, premax);
    }

    return res;
}
