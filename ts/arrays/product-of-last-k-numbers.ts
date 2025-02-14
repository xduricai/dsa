export class ProductOfNumbers {
    // suffix product array
    products: number[] = [1];
    // length of the longest suffix that does not contain a 0
    maxK = 0;

    add(num: number): void {
        if (num === 0) {
            this.products.push(1);
            this.maxK = 0;
        } else {
            this.products.push(this.products.at(-1) * num);
            this.maxK++;
        }
    }

    getProduct(k: number): number {
        if (k > this.maxK) {
            return 0;
        }
        return this.products.at(-1) / this.products.at(-k - 1);
    }
}
