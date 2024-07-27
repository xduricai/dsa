export class Heap {
    length = 0;
    data = [];

    peek() {
        if (!this.length) return undefined;
        return this.data[0];
    }

    add(value) {
        this.data.push(value);
        this.heapifyUp(this.length);
        this.length++;
    }

    delete() {
        if (!this.length) return undefined;

        this.length--;
        if (!this.length) return this.data.pop();

        const out = this.data[0];
        this.data[0] = this.data.pop();
        this.heapifyDown(0);

        return out;
    }

    heapifyUp(idx) {
        if (!idx) return;

        const parentIdx = this.parent(idx);
        const value = this.data[idx];
        const parentValue = this.data[parentIdx];

        if (value < parentValue) {
            this.data[idx] = parentValue;
            this.data[parentIdx] = value;
            this.heapifyUp(parentIdx);
        }
    }

    heapifyDown(idx) {
        if (idx >= this.length - 1) return;

        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        const value = this.data[idx];
        const leftValue = this.data[leftIdx];

        if (rightIdx === this.length) {
            if (value > leftValue) {
                this.data[idx] = leftValue;
                this.data[leftIdx] = value;
            }
            return;
        }

        const rightValue = this.data[rightIdx];

        if (leftValue > rightValue && value > rightValue) {
            this.data[idx] = rightValue;
            this.data[rightIdx] = value;
            this.heapifyDown(rightIdx);
        } else if (value > leftValue) {
            this.data[idx] = leftValue;
            this.data[leftIdx] = value;
            this.heapifyDown(leftIdx);
        }
    }

    parent = (idx) => Math.floor((idx - 1) / 2);
    leftChild = (idx) => idx * 2 + 1;
    rightChild = (idx) => idx * 2 + 2;
}