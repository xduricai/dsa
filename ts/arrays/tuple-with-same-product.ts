// count == 1 -> 0 pairs -> 0 tuples
// count == 2 -> 1 pairs -> 8 tuples (sum of 1..1 * 8)
// count == 3 -> 3 pairs -> 24 tuples (sum of 1..2 * 8)
// count == 4 -> 6 pairs -> 48 tuples (sum of 1..3 * 8)
// count == 5 -> 10 pairs -> 80 tuples (sum of 1..4 * 8)

export function tupleSameProduct(nums: number[]): number {
    const productCount = new Map<number, number>();
    let res = 0;

    for (let left = 0; left < nums.length - 1; left++) {
        for (let right = left + 1; right < nums.length; right++) {
            const product = nums[left] * nums[right];
            const count = productCount.get(product) || 0;
            productCount.set(product, count + 1);
        }
    }

    for (const [_, count] of productCount) {
        // sum of all numbers
        const pairs = (count * (count - 1)) >> 1;
        res += pairs * 8;
    }
    return res;
}

export function tupleSameProductAlt(nums: number[]): number {
    const productCount = new Map<number, number>();
    const pairCount = new Map<number, number>();
    let res = 0;

    for (let left = 0; left < nums.length - 1; left++) {
        for (let right = left + 1; right < nums.length; right++) {
            const product = nums[left] * nums[right];

            const pairCurrent = pairCount.get(product) || 0;
            const productCurrent = productCount.get(product) || 0;

            pairCount.set(product, pairCurrent + productCurrent);
            productCount.set(product, productCurrent + 1);
        }
    }

    for (const [_, count] of pairCount) {
        res += count * 8;
    }
    return res;
}
