export class Heap {
    data;
    size;
    compare;

    constructor(compare, data = []) {
        this.compare = compare;
        this.data = [...data];
        this.size = this.data.length;

        if (data.length > 1) {
            this.heapify(this.data);
        }
    }

    push(val) {
        this.data.push(val);
        this.heapifyUp(this.data.length - 1);
        this.size++;
    }

    pop() {
        if (!this.data.length) {
            return null;
        }
        this.size--;

        if (this.data.length === 1) {
            return this.data.pop();
        }
        const output = this.data[0];

        this.data[0] = this.data.pop();
        this.heapifyDown(0);
        return output;
    }

    peek() {
        if (!this.data.length) {
            return null;
        }
        return this.data[0];
    }

    heapify(values) {
        this.data = [...values];

        for (let idx = this.parent(values.length - 1); idx >= 0; idx--) {
            this.heapifyDown(idx);
        }
    }

    heapifyUp(idx) {
        if (idx === 0) {
            return;
        }
        const parentIdx = this.parent(idx);

        if (this.compare(this.data[parentIdx], this.data[idx]) < 0) {
            return;
        }

        const temp = this.data[parentIdx];
        this.data[parentIdx] = this.data[idx];
        this.data[idx] = temp;
        this.heapifyUp(parentIdx);
    }

    heapifyDown(idx) {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (leftIdx >= this.data.length) {
            return;
        }

        if (rightIdx === this.data.length) {
            if (this.compare(this.data[idx], this.data[leftIdx]) < 0) {
                return;
            }

            const temp = this.data[leftIdx];
            this.data[leftIdx] = this.data[idx];
            this.data[idx] = temp;
            return;
        }

        if (
            this.compare(this.data[idx], this.data[leftIdx]) < 0 &&
            this.compare(this.data[idx], this.data[rightIdx]) < 0
        ) {
            return;
        }

        if (this.compare(this.data[leftIdx], this.data[rightIdx]) < 0) {
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

    parent(idx) {
        return Math.floor((idx - 1) / 2);
    }

    leftChild(idx) {
        return idx * 2 + 1;
    }

    rightChild(idx) {
        return idx * 2 + 2;
    }
}
