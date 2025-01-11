// ammortized constant time
export class MyQueue {
    stack = [];
    queueStack = [];

    push(x: number): void {
        this.stack.push(x);
    }

    pop(): number {
        this.refill();
        return this.queueStack.pop();
    }

    peek(): number {
        this.refill();
        return this.queueStack.at(-1);
    }

    empty(): boolean {
        return !this.stack.length && !this.queueStack.length;
    }

    private refill(): void {
        if (!this.queueStack.length) {
            while (this.stack.length) {
                this.queueStack.push(this.stack.pop());
            }
        }
    }
}
