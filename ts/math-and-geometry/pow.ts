export function myPow(x: number, n: number): number {
    const res = helper(x, Math.abs(n));

    return n >= 0 ? res : 1 / res;
}

export function helper(x: number, n: number): number {
    if (x === 0) return 0;
    if (n === 0) return 1;

    const res = helper(x * x, Math.floor(n / 2));
    return n % 2 === 0 ? res : res * x;
}
