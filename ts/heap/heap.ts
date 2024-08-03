export class Heap<T extends number | [number, ...any]> {
    length: number = 0;
    private data: T[] = [];

    peek() {
        if (!this.length) return undefined;
        return this.data[0];
    }

    add(value: T) {
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

    private heapifyUp(idx: number) {
        if (!idx) return;

        const parentIdx = this.parent(idx);
        const value = this.data[idx];
        const parentValue = this.data[parentIdx];

        if (
            (Array.isArray(value) && value[0] < parentValue[0]) ||
            (!Array.isArray(value) && value < parentValue)
        ) {
            this.data[idx] = parentValue;
            this.data[parentIdx] = value;
            this.heapifyUp(parentIdx);
        }
    }

    private heapifyDown(idx: number) {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (idx >= this.length || leftIdx >= this.length) return;

        const value = this.data[idx];
        const leftValue = this.data[leftIdx];

        if (rightIdx === this.length) {
            if (
                (Array.isArray(value) && value[0] > leftValue[0]) ||
                (!Array.isArray(value) && value > leftValue)
            ) {
                this.data[idx] = leftValue;
                this.data[leftIdx] = value;
            }
            return;
        }

        const rightValue = this.data[rightIdx];

        if (
            (Array.isArray(value) &&
                leftValue[0] > rightValue[0] &&
                value[0] > rightValue[0]) ||
            (!Array.isArray(value) &&
                leftValue > rightValue &&
                value > rightValue)
        ) {
            this.data[idx] = rightValue;
            this.data[rightIdx] = value;
            this.heapifyDown(rightIdx);
        } else if (
            (Array.isArray(value) && value[0] > leftValue[0]) ||
            (!Array.isArray(value) && value > leftValue)
        ) {
            this.data[idx] = leftValue;
            this.data[leftIdx] = value;
            this.heapifyDown(leftIdx);
        }
    }

    private parent(idx: number) {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number) {
        return idx * 2 + 1;
    }
    private rightChild(idx: number) {
        return idx * 2 + 2;
    }
}
