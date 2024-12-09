class MinHeap {
    data: number[];

    constructor(data: number[] = []) {
        this.data = data;

        if (data.length > 1) {
            this.heapify(this.data);
        }
    }

    push(val: number) {
        this.data.push(val);
        this.heapifyUp(this.data.length - 1);
    }

    pop(): number {
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

    top(): number {
        if (!this.data.length) {
            return -1;
        }
        return this.data[0];
    }

    heapify(nums: number[]) {
        this.data = [...nums];

        for (let idx = this.parent(nums.length - 1); idx >= 0; idx--) {
            this.heapifyDown(idx);
        }
    }

    heapifyUp(idx: number) {
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

    heapifyDown(idx: number) {
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

    parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
