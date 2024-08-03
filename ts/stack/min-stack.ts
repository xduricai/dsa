class MinStack {
    stack = [];
    mins = [];

    push(val: number): void {
        this.stack.push(val);

        if (this.mins.length && this.mins[this.mins.length - 1] < val)
            this.mins.push(this.mins[this.mins.length - 1]);
        else this.mins.push(val);
    }

    pop(): void {
        this.stack.pop();
        this.mins.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.mins[this.stack.length - 1];
    }
}
