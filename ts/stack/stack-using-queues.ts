export class MyStack {
    queue: number[] = [];

    push(x: number): void {
        this.queue.push(x);
    }

    pop(): number {
        const len = this.queue.length;

        for (let iter = 0; iter < len - 1; iter++) {
            this.queue.push(this.queue.shift());
        }

        return this.queue.shift();
    }

    top(): number {
        return this.queue.at(-1);
    }

    empty(): boolean {
        return !this.queue.length;
    }
}
