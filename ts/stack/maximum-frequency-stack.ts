export class FreqStack {
    stacks = [[]];
    counter = new Map<number, number>();

    push(val: number): void {
        const count = (this.counter.get(val) || 0) + 1;
        this.counter.set(val, count);

        if (count === this.stacks.length) {
            this.stacks.push([]);
        }

        this.stacks[count].push(val);
    }

    pop(): number {
        const val = this.stacks.at(-1).pop();
        const count = this.counter.get(val) - 1;
        this.counter.set(val, count);

        if (!this.stacks.at(-1).length) {
            this.stacks.pop();
        }

        return val;
    }
}
