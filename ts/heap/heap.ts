export class Heap {
    length: number = 0;
    private data: number[] = [];

    peek() {
        if (!this.data.length) return undefined;
        return this.data[0];
    }

    add(value: number) {
        this.data.push(value);
        this.heapifyUp(this.length);
        this.length++;
    }

    delete() {
        if (!this.data.length) return undefined;

        this.length--;
        if (!this.data.length) return this.data.pop();

        const out = this.data[0];
        this.data[0] = this.data.pop();
        this.heapifyDown(0);

        return out;
    }

    private heapifyUp(idx: number) {
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

    private heapifyDown(idx: number) {
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

    private parent = (idx: number) => Math.floor((idx - 1) / 2);
    private leftChild = (idx: number) => idx * 2 + 1;
    private rightChild = (idx: number) => idx * 2 + 2;
}