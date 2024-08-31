export class MyStack {
    queueA: number[] = [];
    queueB: number[] = [];

    push(x: number): void {
        if (!this.queueA.length) {
            this.queueA.push(x);

            while (this.queueB.length) {
                this.queueA.push(this.queueB.shift());
            }
        } else {
            this.queueB.push(x);

            while (this.queueA.length) {
                this.queueB.push(this.queueA.shift());
            }
        }
    }

    pop(): number {
        return this.queueA.length ? this.queueA.shift() : this.queueB.shift();
    }

    top(): number {
        return this.queueA.length ? this.queueA[0] : this.queueB[0];
    }

    empty(): boolean {
        return !this.queueA.length && !this.queueB.length;
    }
}
