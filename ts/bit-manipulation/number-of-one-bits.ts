export function hammingWeight(n: number): number {
    let count = 0;

    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
}

export function hammingWeightAlt(n: number): number {
    let count = 0;

    while (n) {
        count += n % 2;
        n >>= 1;
    }
    return count;
}
