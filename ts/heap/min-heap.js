/**
 * @param {number[]} data
 */
class MinHeap {
    data;

    /**
     * @param {number[]} data
     * @return {void}
     */
    constructor(data = []) {
        this.data = data;

        if (data.length > 2) {
            this.heapify(this.data);
        }
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.data.push(val);
        this.heapifyUp(this.data.length - 1);
    }

    /**
     * @return {number}
     */
    pop() {
        if (!this.data.length) {
            return -1;
        }
        if (this.data.length === 1) {
            return this.data.pop();
        }
        const output = this.data[0];

        this.data[0] = this.data.pop();
        this.heapifyDown(0);
        return output;
    }

    /**
     * @return {number}
     */
    top() {
        if (!this.data.length) {
            return -1;
        }
        return this.data[0];
    }

    /**
     * @param {number[]} nums
     * @return {void}
     */
    heapify(nums) {
        this.data = [...nums];

        for (let idx = this.parent(nums.length - 1); idx >= 0; idx--) {
            this.heapifyDown(idx);
        }
    }

    /**
     * @param {number} idx
     * @return {void}
     */
    heapifyUp(idx) {
        if (idx === 0) {
            return;
        }
        const parentIdx = this.parent(idx);

        if (this.data[parentIdx] < this.data[idx]) {
            return;
        }

        const temp = this.data[parentIdx];
        this.data[parentIdx] = this.data[idx];
        this.data[idx] = temp;
        this.heapifyUp(parentIdx);
    }

    /**
     * @param {number} idx
     * @return {void}
     */
    heapifyDown(idx) {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (leftIdx >= this.data.length) {
            return;
        }

        if (rightIdx === this.data.length) {
            if (this.data[idx] < this.data[leftIdx]) {
                return;
            }

            const temp = this.data[leftIdx];
            this.data[leftIdx] = this.data[idx];
            this.data[idx] = temp;
            return;
        }

        if (
            this.data[idx] < this.data[leftIdx] &&
            this.data[idx] < this.data[rightIdx]
        ) {
            return;
        }

        if (this.data[leftIdx] < this.data[rightIdx]) {
            const temp = this.data[leftIdx];
            this.data[leftIdx] = this.data[idx];
            this.data[idx] = temp;
            this.heapifyDown(leftIdx);
        } else {
            const temp = this.data[rightIdx];
            this.data[rightIdx] = this.data[idx];
            this.data[idx] = temp;
            this.heapifyDown(rightIdx);
        }
    }

    /**
     * @param {number} idx
     * @return {number}
     */
    parent(idx) {
        return Math.floor((idx - 1) / 2);
    }
    /**
     * @param {number} idx
     * @return {number}
     */
    leftChild(idx) {
        return idx * 2 + 1;
    }
    /**
     * @param {number} idx
     * @return {number}
     */
    rightChild(idx) {
        return idx * 2 + 2;
    }
}
