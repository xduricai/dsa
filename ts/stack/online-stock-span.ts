export class StockSpanner {
    stack = [];

    next(price: number): number {
        let span = 1;

        while (this.stack.length && this.stack.at(-1)[0] <= price) {
            span += this.stack.pop()[1];
        }

        this.stack.push([price, span]);
        return span;
    }
}
